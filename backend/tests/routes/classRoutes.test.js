import test from 'node:test';
import assert from 'node:assert';
import { fastify } from '../../server.js';

test('Class Route - GET /api/class', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/api/class'
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  
  // Assert that it returns an array of classes
  assert.ok(Array.isArray(body), 'Expected body to be an array');
  
  if (body.length > 0) {
    // Check if the class has expected properties
    const classItem = body[0];
    assert.ok(classItem.hasOwnProperty('id'));
    assert.ok(classItem.hasOwnProperty('level'));
    assert.ok(classItem.hasOwnProperty('name'));
  }
});
