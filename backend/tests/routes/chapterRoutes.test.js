import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Chapter Route - GET /api/class/:class_id/:subject_id', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/class/1/1' // Testing with class_id 1 and subject_id 1
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  
  // Assert that it returns an array of chapters
  assert.ok(Array.isArray(body), 'Expected body to be an array');
  
  if (body.length > 0) {
    // Check if the chapter has expected properties
    const chapter = body[0];
    assert.ok(chapter.hasOwnProperty('id'));
    assert.ok(chapter.hasOwnProperty('name'));
    assert.ok(chapter.hasOwnProperty('subject_id'));
  }
});
