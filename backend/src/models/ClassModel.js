import db from '../../db/database.js';

function classData() {
    const classes = db.prepare("SELECT * FROM classes");
    return classes.all();
}
export { classData };
