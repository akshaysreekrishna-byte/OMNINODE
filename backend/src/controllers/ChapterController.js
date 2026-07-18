import { chapterData } from "../models/ChapterModel.js";

export async function getChapterData(request, reply) {
    const subjectId = request.params.subject_id;
    const data = chapterData(subjectId);
    return reply.send(data);
}
