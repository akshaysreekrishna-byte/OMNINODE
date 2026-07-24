import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Index Routes', async (t) => {
  await t.test('GET /api/index', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/index'
    });
    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body));
  });

  await t.test('GET /api/index/:class_id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/index/1'
    });
    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body));
  });

  await t.test('GET /api/index/:class_id/:subject_id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/index/1/1'
    });
    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body));
  });

  await t.test('GET /api/index/:class_id/:subject_id/:chapter_id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/index/1/1/1'
    });
    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body));
  });
});
