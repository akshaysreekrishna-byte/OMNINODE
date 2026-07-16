export async function checkHealth(request, reply) {
  return reply.send({ status: 'ok', message: 'OMNINODE API is running' });
}
