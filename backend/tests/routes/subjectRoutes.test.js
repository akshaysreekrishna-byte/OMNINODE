import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Subject Route - GET /api/class/:class_id', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/class/1' // Testing with class_id 1
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  
  // Assert that it returns an array of subjects
  assert.ok(Array.isArray(body), 'Expected body to be an array');
  
  if (body.length > 0) {
    // Check if the subject has expected properties
    const subject = body[0];
    assert.ok(subject.hasOwnProperty('id'));
    assert.ok(subject.hasOwnProperty('name'));
    assert.ok(subject.hasOwnProperty('class_id'));
  }
});
