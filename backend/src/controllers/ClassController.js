import { classData, subjectData } from "../models/ClassModel.js";

export async function getClassData(request, reply) {
    const data = classData();
    return reply.send(data);
}

export async function getSubjectsByClass(request, reply) {
    const { id } = request.params;
    const data = subjectData(id);
    return reply.send(data);
}