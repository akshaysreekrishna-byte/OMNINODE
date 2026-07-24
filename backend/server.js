import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import indexRoutes from './src/routes/indexRoutes.js';

import cors from "@fastify/cors";   // Add this with the other imports
import 'dotenv/config';

const fastify = Fastify({
  logger: true
});

// 👇 Add these lines here
await fastify.register(cors, {
  origin: true
});

fastify.setErrorHandler(function (error, request, reply) {
  this.log.error(error);
  reply.status(500).send({ status: false, error: 'Internal Server Error', message: error.message });
});

// Existing code
fastify.register(indexRoutes);

// Register Static File Plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../assets'),
  prefix: '/assets/', 
});

// Run the server!
const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};


if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  start();
}



export { fastify };
