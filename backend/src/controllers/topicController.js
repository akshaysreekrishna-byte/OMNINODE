import { topicData } from "../models/topicModel.js";

export async function getTopicData(request, reply) {
    const chapterId = request.params.chapter_id;
    const data = topicData(chapterId);
    return reply.send(data);
}
