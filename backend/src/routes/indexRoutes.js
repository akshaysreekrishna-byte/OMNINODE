import {
  getAllClasses,
  getSubjectsForClass,
  getChaptersForSubject,
  getTopicsForChapter
} from "../controllers/IndexController.js";

const classParamSchema = {
  params: {
    type: 'object',
    required: ['class_id'],
    properties: {
      class_id: { type: 'integer' }
    }
  }
};

const subjectParamSchema = {
  params: {
    type: 'object',
    required: ['class_id', 'subject_id'],
    properties: {
      class_id: { type: 'integer' },
      subject_id: { type: 'integer' }
    }
  }
};

const chapterParamSchema = {
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

export default async function indexRoutes(fastify, options) {
  fastify.get("/api/index", getAllClasses);
  fastify.get("/api/index/:class_id", { schema: classParamSchema }, getSubjectsForClass);
  fastify.get("/api/index/:class_id/:subject_id", { schema: subjectParamSchema }, getChaptersForSubject);
  fastify.get("/api/index/:class_id/:subject_id/:chapter_id", { schema: chapterParamSchema }, getTopicsForChapter);
}
