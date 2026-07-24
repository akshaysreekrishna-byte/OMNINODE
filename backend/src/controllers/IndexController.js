import { classData } from "../models/ClassModel.js";
import { subjectData } from "../models/SubjectModel.js";
import { chapterData } from "../models/ChapterModel.js";
import { topicData } from "../models/topicModel.js";

export async function getAllClasses(request, reply) {
    const data = classData();
    return reply.send(data);
}

export async function getSubjectsForClass(request, reply) {
    const { class_id } = request.params;
    const data = subjectData(class_id);
    return reply.send(data);
}

export async function getChaptersForSubject(request, reply) {
    const { subject_id } = request.params;
    const data = chapterData(subject_id);
    return reply.send(data);
}

export async function getTopicsForChapter(request, reply) {
    const { chapter_id } = request.params;
    const data = topicData(chapter_id);
    return reply.send(data);
}
