import db from '../../db/database.js';

function classData() {
    try {
        const classes = db.prepare("SELECT * FROM classes");
        return classes.all();
    } catch (error) {
        console.error('Class Data failed:', error);
        return error;
    }
}

export { classData };