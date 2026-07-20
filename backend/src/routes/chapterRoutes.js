import { getChapterData } from "../controllers/ChapterController.js";

const chapterSchema = {
  params: {
    type: 'object',
    required: ['class_id', 'subject_id'],
    properties: {
      class_id: { type: 'integer' },
      subject_id: { type: 'integer' }
    }
  }
};

export default async function chapterRoutes(fastify, options) {
   fastify.get("/api/class/:class_id/:subject_id", { schema: chapterSchema }, getChapterData);
}
