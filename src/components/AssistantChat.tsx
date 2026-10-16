import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menu.ts';
import { useDialog } from '../hooks/useDialog.ts';

interface Message { role: 'user' | 'assistant'; content: string; }
interface AssistantChatProps { open: boolean; onOpen: () => void; onClose: () => void; cartVisible: boolean; hidden?: boolean; }
const quickQuestions = ['¿Qué promociones tienen?', '¿Dónde están ubicados?', '¿Hacen delivery?', '¿Cuál es el horario?'];

function MessageText({ text }: { text: string }) {
  return <>{text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => /^https?:\/\//.test(part) ? <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part.includes('wa.me') ? 'Consultar por WhatsApp' : part.includes('maps') ? 'Abrir en Google Maps' : 'Abrir enlace'} <ArrowUpRight size={12} /></a> : <span key={index}>{part}</span>)}</>;
}

export function AssistantChat({ open, onOpen, onClose, cartVisible, hidden }: AssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'ai' | 'guide' | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const inviteShownRef = useRef(false);
  const inviteTimerRef = useRef<number | undefined>(undefined);
  const dialogRef = useDialog(open, onClose);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'auto' }); }, [messages, pending, error, open]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { if (open && !pending && messages.length > 0) inputRef.current?.focus({ preventScroll: true }); }, [open, pending, messages.length]);
  useEffect(() => {
    let previousScrollY = window.scrollY;
    const showInviteOnScrollDown = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > previousScrollY && currentScrollY > 180 && !inviteShownRef.current && !open && !hidden) {
        inviteShownRef.current = true;
        setShowInvite(true);
        inviteTimerRef.current = window.setTimeout(() => setShowInvite(false), 6500);
      }
      previousScrollY = currentScrollY;
    };
    window.addEventListener('scroll', showInviteOnScrollDown, { passive: true });
    return () => {
      window.removeEventListener('scroll', showInviteOnScrollDown);
      window.clearTimeout(inviteTimerRef.current);
    };
  }, [open, hidden]);
  useEffect(() => {
    if (open || hidden) {
      setShowInvite(false);
      window.clearTimeout(inviteTimerRef.current);
    }
  }, [open, hidden]);

  const send = async (text: string, retry = false) => {
    const content = text.trim();
    if (!content || busyRef.current || content.length > 1200) return;
    const updated: Message[] = retry ? messages : [...messages, { role: 'user', content }];
    if (!retry) { setMessages(updated); setInput(''); }
    setError(''); setPending(true); busyRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 28000);
    try {
      let history = updated.slice(-7).map(message => ({ ...message, content: message.content.slice(0, 1800) }));
      if (history[0]?.role === 'assistant') history = history.slice(1);
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }), signal: controller.signal });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.reply !== 'string') throw new Error(response.status === 429 ? 'Muchas consultas seguidas. Espera un minuto o escríbenos por WhatsApp.' : data?.error || 'No se pudo conectar. Inténtalo de nuevo.');
      setMode(data.mode === 'guide' ? 'guide' : 'ai');
      setMessages([...updated, { role: 'assistant', content: data.reply }]);
    } catch (cause) { setError(cause instanceof Error && cause.name !== 'AbortError' ? cause.message : 'La respuesta tardó demasiado. Puedes reintentar o hablar con el local.'); }
    finally { clearTimeout(timeout); setPending(false); busyRef.current = false; }
  };

  return <div className={`assistant-widget ${cartVisible ? 'with-cart' : ''} ${hidden ? 'widget-hidden' : ''}`}>
    <AnimatePresence>{open && <motion.div className="assistant-panel" role="dialog" aria-modal="true" aria-labelledby="assistant-title" ref={dialogRef} initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.97 }} transition={{ duration: 0.2 }}>
      <div className="assistant-header"><span className="assistant-avatar"><img src={LOGO_URL} alt="" /></span><div><h2 id="assistant-title">Asistente inteligente</h2><span><span className="live-dot" /> {mode === 'guide' ? 'Guía de Pollería El Toñito' : 'Pollería El Toñito · IA'}</span></div><button className="icon-button" onClick={onClose} aria-label="Cerrar asistente"><X size={20} /></button></div>
      <div className="assistant-messages" ref={scrollRef} role="log" aria-label="Conversación con el asistente" aria-live="polite" aria-relevant="additions text">
        <div className="chat-welcome"><span>¡BUEN SABOR, BUENA ELECCIÓN!</span><h3>Hola, ¿qué se<br />te antoja hoy? <span>🍗</span></h3><p>Te ayudo con la carta, precios, ubicación y cómo pedir. La disponibilidad y los pedidos los confirma nuestro equipo.</p></div>
        {mode === 'guide' && <div className="guide-notice"><Check size={15} /><span>Modo guía: la IA aún no está configurada. Estas respuestas provienen de los datos publicados del local.</span></div>}
        {messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><small>{message.role === 'user' ? 'TÚ' : mode === 'guide' ? 'GUÍA EL TOÑITO' : 'EL TOÑITO · IA'}</small><p><MessageText text={message.content} /></p></div>)}
        {pending && <div className="chat-typing" role="status" aria-label="Preparando respuesta"><span /><span /><span /></div>}
        {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => send(messages[messages.length - 1]?.content || '', true)}><RotateCcw size={14} /> Reintentar</button></div>}
        {messages.length === 0 && <div className="quick-questions">{quickQuestions.map(question => <button key={question} onClick={() => send(question)} disabled={pending}>{question}<ArrowUpRight size={15} /></button>)}</div>}
      </div>
      <form className="assistant-form" onSubmit={event => { event.preventDefault(); send(input); }}><label className="sr-only" htmlFor="assistant-input">Tu pregunta sobre la pollería</label><textarea ref={inputRef} id="assistant-input" rows={1} value={input} maxLength={1200} disabled={pending} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(input); } }} placeholder="Pregúntame por algo rico…" /><button type="submit" disabled={pending || !input.trim()} aria-label="Enviar pregunta"><Send size={19} /></button></form>
      <div className="assistant-disclaimer"><p>Te orientamos sobre la carta, precios y ubicación. Para confirmar pedidos o disponibilidad, escríbenos.</p><a href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <MessageCircle size={15} /></a></div>
    </motion.div>}</AnimatePresence>
    <AnimatePresence>
      {showInvite && !open && <motion.button className="assistant-invite" onClick={onOpen} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.2 }} aria-label="Abrir asistente: ¿Necesitas ayuda? Estamos aquí para orientarte."><img src={LOGO_URL} alt="" /><span><strong>¿Necesitas ayuda?</strong><small>Estamos aquí para orientarte</small></span><ArrowUpRight size={16} /></motion.button>}
    </AnimatePresence>
    <button className={`assistant-launcher ${open ? 'is-open' : ''}`} onClick={open ? onClose : onOpen} aria-label={open ? 'Cerrar asistente de El Toñito' : 'Abrir asistente de El Toñito'} aria-expanded={open}>{open ? <X size={23} /> : <img src={LOGO_URL} alt="" />}{!open && <i />}</button>
  </div>;
}
