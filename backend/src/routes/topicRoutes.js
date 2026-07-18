import { getTopicData } from "../controllers/topicController.js";

export default async function topicRoutes(fastify, options) {
    fastify.get("/api/class/:class_id/:subject_id/:chapter_id", getTopicData);
}
