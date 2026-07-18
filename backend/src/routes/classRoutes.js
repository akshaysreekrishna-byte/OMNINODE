import { getClassData } from "../controllers/ClassController.js";

export default async function classRoutes(fastify, options) {
    fastify.get("/api/class", getClassData);
}