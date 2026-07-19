import db from '../../db/database.js';

function topicData(chapter_id) {
    const topics = db.prepare("SELECT * FROM topics WHERE chapter_id = ?").all(chapter_id);
    return topics;
}

export { topicData };
