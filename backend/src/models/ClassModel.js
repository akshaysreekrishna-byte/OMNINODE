import db from '../../db/database.js';

function classData() {
    const classes = db.prepare("SELECT * FROM classes");
    return classes.all();
}


function subjectData(classId) {
    const subjects = db.prepare(
        "SELECT * FROM subjects WHERE class_id = ?"
    );
    return subjects.all(classId);
}
export { classData, subjectData };

