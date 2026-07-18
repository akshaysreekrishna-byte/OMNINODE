import Fastify from 'fastify';
import healthRoutes from './src/routes/healthRoutes.js';
import classRoutes from './src/routes/classRoutes.js';
import subjectRoutes from './src/routes/subjectRoutes.js';
import chapterRoutes from './src/routes/chapterRoutes.js';

const fastify = Fastify({
  logger: true
});

// Register Routes
fastify.register(healthRoutes);
fastify.register(classRoutes);
fastify.register(subjectRoutes);
fastify.register(chapterRoutes);

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
if (process.argv[1] === new URL(import.meta.url).pathname) {
  start();
}

export { fastify };
