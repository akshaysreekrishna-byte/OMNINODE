import { getTopicData } from "../controllers/topicController.js";

const topicSchema = {
  params: {
    type: 'object',
    required: ['class_id', 'subject_id', 'chapter_id'],
    properties: {
      class_id: { type: 'integer' },
      subject_id: { type: 'integer' },
      chapter_id: { type: 'integer' }
    }
  }
};

export default async function topicRoutes(fastify, options) {
    fastify.get("/api/class/:class_id/:subject_id/:chapter_id", { schema: topicSchema }, getTopicData);
}
