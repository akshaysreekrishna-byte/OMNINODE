import db from '../../db/database.js';


function subjectData(id) {
    try {
        const classes = db.prepare("SELECT * FROM subjects WHERE class_id = ? ").all(id);
        return classes;
    } catch (error) {
        return { status: false, error: error };
    }
}

export { subjectData };