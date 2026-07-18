import db from '../../db/database.js';

function topicData(chapter_id) {
    try {
        const topics = db.prepare("SELECT * FROM topics WHERE chapter_id = ?").all(chapter_id);
        return topics;
    } catch (error) {
        return { status: false, error: error };
    }
}

export { topicData };
