import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'omninode.db');

// Create a new database connection
// We use WAL mode to improve concurrent read performance
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export default db;
