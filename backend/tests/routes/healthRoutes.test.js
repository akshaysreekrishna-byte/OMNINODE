import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Health Route - GET /api/health', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/health'
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  assert.strictEqual(body.status, 'ok');
  assert.strictEqual(body.message, 'OMNINODE API is running');
});
