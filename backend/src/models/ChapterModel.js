import db from '../../db/database.js';

function chapterData(subject_id) {
    try {
        const chapters = db.prepare("SELECT * FROM chapters WHERE subject_id = ?").all(subject_id);
        return chapters;
    } catch (error) {
        return { status: false, error: error };
    }
}

export { chapterData };
