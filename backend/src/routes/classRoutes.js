import {
  getClassData,
  getSubjectsByClass
} from "../controllers/ClassController.js";

export default async function classRoutes(fastify, options) {
  fastify.get("/api/class", getClassData);
  fastify.get("/api/class/:id", getSubjectsByClass);
}