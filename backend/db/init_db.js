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
    const insertSubject = db.prepare('INSERT OR IGNORE INTO subjects (name, class_id) VALUES (?, ?)');
    const insertChapter = db.prepare('INSERT OR IGNORE INTO chapters (name, subject_id) VALUES (?, ?)');
    
    // Insert classes
    insertClass.run(1, 'Grade 1');
    insertClass.run(2, 'Grade 2');
    
    // Insert subjects
    insertSubject.run('Math', 1);
    insertSubject.run('English', 1);
    insertSubject.run('Science', 1); // ID: 3
    insertSubject.run('Math', 2); // ID: 4
    insertSubject.run('English', 2); // ID: 5
    insertSubject.run('Science', 2); // ID: 6

    // Insert chapters (e.g. for Math Grade 1)
    insertChapter.run('Addition & Subtraction', 1);
    insertChapter.run('Fractions', 1);
    insertChapter.run('Shapes', 1);
    // Insert chapters for English Grade 2
    insertChapter.run('Grammer', 5);
    insertChapter.run('Tenses', 5);
    insertChapter.run('Conjugation', 5);
    insertChapter.run('Synonyms & Antonyms', 5);
    insertChapter.run('Sentence Structuring', 5);

    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

initializeDatabase();
