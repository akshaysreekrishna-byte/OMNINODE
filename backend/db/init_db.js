import db from './database.js';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function initializeDatabase() {
  console.log('Initializing database...');
  const schemaPath = join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Run the schema to create tables
  db.exec(schema);
  console.log('Database tables created successfully.');
  
  // Seed some dummy data
  try {
    const insertClass = db.prepare('INSERT OR IGNORE INTO classes (level, name) VALUES (?, ?)');
    insertClass.run(1, 'Grade 1');
    insertClass.run(2, 'Grade 2');
    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

initializeDatabase();
