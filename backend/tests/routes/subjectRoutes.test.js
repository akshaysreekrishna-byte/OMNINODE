import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Subject Route - GET /api/subjects/:class_id', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/subjects/1' // Testing with class_id 1
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);

  assert.ok(Array.isArray(body), 'Expected body to be an array');

  if (body.length > 0) {
    const subject = body[0];
    assert.ok(subject.hasOwnProperty('id'));
    assert.ok(subject.hasOwnProperty('name'));
    assert.ok(subject.hasOwnProperty('class_id'));
  }
});

test('Class Route - GET /api/class/:id returns subjects without duplicates', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/class/1'
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);

  assert.ok(Array.isArray(body), 'Expected body to be an array');

  const names = body.map(subject => subject.name);
  const uniqueNames = new Set(names);
  assert.strictEqual(uniqueNames.size, names.length, 'Expected subject names to be unique for a class');
});
