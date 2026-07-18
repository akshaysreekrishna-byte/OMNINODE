import { getChapterData } from "../controllers/ChapterController.js";

export default async function chapterRoutes(fastify, options) {
    fastify.get("/api/class/:class_id/:subject_id", getChapterData);
}
