import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { Readable } from 'node:stream';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleAssistantRequest } from './server/assistant.ts';

function assistantApi(apiKey: string, model: string): Plugin {
  return {
    name: 'el-tonito-assistant-api',
    configureServer(server) {
      server.middlewares.use('/api/assistant', async (incoming, outgoing) => {
        try {
          const host = incoming.headers.host || 'localhost:3000';
          const headers = new Headers();
          for (const [key, value] of Object.entries(incoming.headers)) if (typeof value === 'string') headers.set(key, value);
          const method = incoming.method || 'GET';
          const init = { method, headers, ...(method === 'POST' ? { body: Readable.toWeb(incoming), duplex: 'half' } : {}) };
          const response = await handleAssistantRequest(new Request(`http://${host}/api/assistant`, init as RequestInit), { apiKey, model });
          outgoing.writeHead(response.status, Object.fromEntries(response.headers));
          outgoing.end(await response.text());
        } catch {
          outgoing.writeHead(500, { 'Content-Type': 'application/json' });
          outgoing.end(JSON.stringify({ error: 'No se pudo procesar la consulta.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), assistantApi(env.GEMINI_API_KEY || '', env.GEMINI_MODEL || 'gemini-2.5-flash')],
    resolve: { alias: { '@': resolve(import.meta.dirname, '.') } },
    build: {
      rollupOptions: {
        input: Object.fromEntries(['index', 'carta', 'promociones', 'parrillas', 'ubicacion'].map(page => [page, resolve(import.meta.dirname, `${page}.html`)])),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
