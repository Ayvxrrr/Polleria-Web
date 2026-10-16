import { GoogleGenAI } from '@google/genai';
import { answerFromGuide, RESTAURANT_SYSTEM_PROMPT } from './restaurant-knowledge.ts';

interface ChatMessage { role: 'user' | 'assistant'; content: string; }
interface AssistantOptions {
  apiKey?: string;
  model?: string;
  generate?: (messages: ChatMessage[]) => Promise<string>;
  logError?: (details: { status: number; name: string; message: string }) => void;
}

const json = (body: object, status = 200, extraHeaders: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders } });

export async function handleAssistantRequest(request: Request, options: AssistantOptions = {}): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Usa POST para enviar tu consulta.' }, 405, { Allow: 'POST' });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Origen no permitido.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Envía tu consulta en formato JSON.' }, 415);
  if (Number(request.headers.get('content-length')) > 18000) return json({ error: 'La conversación es demasiado larga.' }, 413);
  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 18000) return json({ error: 'La conversación es demasiado larga.' }, 413);
    body = JSON.parse(raw);
  } catch { return json({ error: 'No se pudo leer tu consulta.' }, 400); }
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 12 || messages.some(message => !message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 1800) || messages.reduce((sum, message) => sum + message.content.length, 0) > 12000 || messages[0].role !== 'user' || messages[messages.length - 1].role !== 'user') return json({ error: 'Envía una pregunta válida de hasta 1800 caracteres.' }, 400);
  const history: ChatMessage[] = messages.map(({ role, content }) => ({ role, content: content.trim() }));
  const apiKey = options.apiKey ?? process.env.GEMINI_API_KEY;
  if (!apiKey && !options.generate) return json({ reply: answerFromGuide(history[history.length - 1].content), mode: 'guide' });
  try {
    const reply = options.generate ? await options.generate(history) : (await new GoogleGenAI({ apiKey }).models.generateContent({
      model: options.model ?? process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
      contents: history.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
      config: { systemInstruction: RESTAURANT_SYSTEM_PROMPT, temperature: 0.35, maxOutputTokens: 1000, thinkingConfig: { thinkingBudget: 0 }, httpOptions: { timeout: 22000 }, abortSignal: request.signal },
    })).text;
    if (!reply?.trim()) return json({ error: 'No pude generar una respuesta. Intenta con otra pregunta.' }, 502);
    return json({ reply: reply.trim(), mode: 'ai' });
  } catch (error) {
    const status = typeof error === 'object' && error !== null && 'status' in error ? Number(error.status) : 0;
    const details = typeof error === 'object' && error !== null ? error as { name?: unknown; message?: unknown } : {};
    let message = typeof details.message === 'string' ? details.message : '';
    if (apiKey) message = message.replaceAll(apiKey, '[redacted]');
    for (const chatMessage of history) {
      if (chatMessage.content) message = message.replaceAll(chatMessage.content, '[redacted]');
    }
    message = message.replace(/([?&](?:key|api_key|x-goog-api-key)=)[^&\s]+/gi, '$1[redacted]');
    const logDetails = {
      status: Number.isFinite(status) ? status : 0,
      name: typeof details.name === 'string' ? details.name : 'UnknownError',
      message,
    };
    if (options.logError) options.logError(logDetails);
    else console.error('Assistant provider request failed', logDetails);
    return json({ error: status === 429 ? 'El asistente está recibiendo muchas consultas. Espera un momento o escríbenos por WhatsApp.' : 'No pude conectar con la IA. Inténtalo de nuevo o consulta directamente por WhatsApp.' }, status === 429 ? 429 : 502);
  }
}
