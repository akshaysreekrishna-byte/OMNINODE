import db from '../../db/database.js';

// Models encapsulate database queries and data manipulation.
export function checkDbConnection() {
  try {
    // A simple test query to ensure the database is responding
    const stmt = db.prepare('SELECT 1 as is_alive');
    const result = stmt.get();
    
    // Returns true if the query succeeded and returned 1
    return result.is_alive === 1;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}
