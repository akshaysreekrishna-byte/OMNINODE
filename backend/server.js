import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import healthRoutes from './src/routes/healthRoutes.js';
import classRoutes from './src/routes/classRoutes.js';
import subjectRoutes from './src/routes/subjectRoutes.js';
import chapterRoutes from './src/routes/chapterRoutes.js';
import topicRoutes from './src/routes/topicRoutes.js';

import cors from "@fastify/cors";   // Add this with the other imports

const fastify = Fastify({
  logger: true
});

// 👇 Add these lines here
await fastify.register(cors, {
  origin: true
});

// Existing code
fastify.register(healthRoutes);
fastify.register(classRoutes);
fastify.register(subjectRoutes);
fastify.register(chapterRoutes);
fastify.register(topicRoutes);

// Register Static File Plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../assets'),
  prefix: '/assets/', 
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Start the server if this file is run directly
// This check allows us to import the fastify instance for testing without starting the server
fastify.get('/', async (request, reply) => {
  return { message: 'Backend is working!' };
});
  start();


export { fastify };
