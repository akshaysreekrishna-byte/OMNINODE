import { subjectData } from "../models/SubjectModel.js";


export async function getSubjectData(request, reply) {
    const data = subjectData(request.params.class_id);
    return reply.send(data);
}