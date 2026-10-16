import { handleAssistantRequest } from '../../server/assistant.ts';

export default (request: Request) => handleAssistantRequest(request);

export const config = {
  path: '/api/assistant',
  rateLimit: { windowLimit: 12, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' },
};
