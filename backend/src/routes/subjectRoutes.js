import { getSubjectData } from "../controllers/SubjectController.js";


export default async function subjectRoutes(fastify, options) {
    fastify.get("/api/class/:class_id", getSubjectData);
}
