import { checkHealth } from '../controllers/HealthController.js';

export default async function healthRoutes(fastify, options) {
  fastify.get('/api/health', checkHealth);
}
