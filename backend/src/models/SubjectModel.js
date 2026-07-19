import db from '../../db/database.js';


function subjectData(id) {
    const classes = db.prepare("SELECT * FROM subjects WHERE class_id = ? ").all(id);
    return classes;
}

export { subjectData };