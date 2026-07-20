import { getSubjectData } from "../controllers/SubjectController.js";

const subjectSchema = {
  params: {
    type: 'object',
    required: ['class_id'],
    properties: {
      class_id: { type: 'integer' }
    }
  }
};

export default async function subjectRoutes(fastify, options) {
  fastify.get("/api/subjects/:class_id", { schema: subjectSchema }, getSubjectData);
}