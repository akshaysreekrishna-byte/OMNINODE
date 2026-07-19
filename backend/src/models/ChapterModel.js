import db from '../../db/database.js';

function chapterData(subject_id) {
    const chapters = db.prepare("SELECT * FROM chapters WHERE subject_id = ?").all(subject_id);
    return chapters;
}

export { chapterData };
