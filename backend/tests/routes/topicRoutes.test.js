import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Topic Route - GET /api/class/:class_id/:subject_id/:chapter_id', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/class/1/1/1' // Testing with chapter 1 which we seeded earlier
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  
  // Assert that it returns an array of topics
  assert.ok(Array.isArray(body), 'Expected body to be an array');
  
  if (body.length > 0) {
    // Check if the topic has expected properties
    const topic = body[0];
    assert.ok(topic.hasOwnProperty('id'));
    assert.ok(topic.hasOwnProperty('title'));
    assert.ok(topic.hasOwnProperty('chapter_id'));
    assert.ok(topic.hasOwnProperty('content_type'));
  }
});
