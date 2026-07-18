import { checkDbConnection } from '../models/TestModel.js';

export async function checkHealth(request, reply) {
  const isDbConnected = checkDbConnection();
  
  return reply.send({ 
    status: 'ok', 
    message: 'OMNINODE API is running',
    database: isDbConnected ? 'connected' : 'disconnected'
  });
}
