import { classData } from "../models/ClassModel.js";

export async function getClassData(request, reply) {
    const data = classData();
    return reply.send(data);
}