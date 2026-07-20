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
    db.exec(`
      DELETE FROM submissions;
      DELETE FROM assignments;
      DELETE FROM topics;
      DELETE FROM chapters;
      DELETE FROM subjects;
      DELETE FROM classes;
      DELETE FROM sqlite_sequence;
    `);

    db.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_subjects_unique ON subjects (name, class_id);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_chapters_unique ON chapters (name, subject_id);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_topics_unique ON topics (title, chapter_id);
    `);

    const insertClass = db.prepare('INSERT INTO classes (level, name) VALUES (?, ?)');
    const insertSubject = db.prepare('INSERT INTO subjects (name, class_id) VALUES (?, ?)');
    const insertChapter = db.prepare('INSERT INTO chapters (name, subject_id) VALUES (?, ?)');
    const insertTopic = db.prepare('INSERT INTO topics (title, chapter_id, content_type, file_path, sms_content) VALUES (?, ?, ?, ?, ?)');

    const grade1Id = insertClass.run(1, 'Grade 1').lastInsertRowid;
    const grade2Id = insertClass.run(2, 'Grade 2').lastInsertRowid;

    const subjectIds = {
      [`${grade1Id}:Math`]: insertSubject.run('Math', grade1Id).lastInsertRowid,
      [`${grade1Id}:English`]: insertSubject.run('English', grade1Id).lastInsertRowid,
      [`${grade1Id}:Science`]: insertSubject.run('Science', grade1Id).lastInsertRowid,
      [`${grade2Id}:Math`]: insertSubject.run('Math', grade2Id).lastInsertRowid,
      [`${grade2Id}:English`]: insertSubject.run('English', grade2Id).lastInsertRowid,
      [`${grade2Id}:Science`]: insertSubject.run('Science', grade2Id).lastInsertRowid
    };

    const chapterIds = [];

    // Insert chapters for Grade 1 Math
    chapterIds.push(insertChapter.run('Addition & Subtraction', subjectIds[`${grade1Id}:Math`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Fractions', subjectIds[`${grade1Id}:Math`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Shapes', subjectIds[`${grade1Id}:Math`]).lastInsertRowid);

    // Insert chapters for Grade 1 English
    chapterIds.push(insertChapter.run('Alphabets', subjectIds[`${grade1Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Vowels', subjectIds[`${grade1Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Words', subjectIds[`${grade1Id}:English`]).lastInsertRowid);

    // Insert chapters for Grade 1 Science
    chapterIds.push(insertChapter.run('Our Earth', subjectIds[`${grade1Id}:Science`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Living Things', subjectIds[`${grade1Id}:Science`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Non-Living Things', subjectIds[`${grade1Id}:Science`]).lastInsertRowid);

    // Insert chapters for Grade 2 English
    chapterIds.push(insertChapter.run('Grammer', subjectIds[`${grade2Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Tenses', subjectIds[`${grade2Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Conjugation', subjectIds[`${grade2Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Synonyms & Antonyms', subjectIds[`${grade2Id}:English`]).lastInsertRowid);
    chapterIds.push(insertChapter.run('Sentence Structuring', subjectIds[`${grade2Id}:English`]).lastInsertRowid);

    // Topics for Math chapters
    insertTopic.run('Intro to Addition', chapterIds[0], 'video', '/assets/addition_intro.mp4', null);
    insertTopic.run('Basic Subtraction', chapterIds[0], 'pdf', '/assets/subtraction_basics.pdf', null);
    insertTopic.run('Math Riddle 1', chapterIds[0], 'sms_riddle', null, 'What is 2 + 2?');

    insertTopic.run('Understanding Fractions', chapterIds[1], 'video', '/assets/fractions_intro.mp4', null);
    insertTopic.run('Fraction Practice', chapterIds[1], 'pdf', '/assets/fractions_practice.pdf', null);
    insertTopic.run('Fraction Challenge', chapterIds[1], 'sms_riddle', null, 'If you split a pizza into 4 equal parts, what is one part called?');

    insertTopic.run('Recognizing Shapes', chapterIds[2], 'video', '/assets/shapes_intro.mp4', null);
    insertTopic.run('Shape Matching Activity', chapterIds[2], 'pdf', '/assets/shape_matching.pdf', null);
    insertTopic.run('Shape Hunt', chapterIds[2], 'sms_riddle', null, 'I have three sides and three corners. What am I?');

    // Topics for English chapters
    insertTopic.run('Alphabet Basics', chapterIds[3], 'video', '/assets/alphabet_basics.mp4', null);
    insertTopic.run('Letter Tracing Practice', chapterIds[3], 'pdf', '/assets/letter_tracing.pdf', null);
    insertTopic.run('Alphabet Sound Game', chapterIds[3], 'sms_riddle', null, 'Which letter comes after B?');

    insertTopic.run('Vowel Sounds', chapterIds[4], 'video', '/assets/vowel_sounds.mp4', null);
    insertTopic.run('Vowel Practice Worksheet', chapterIds[4], 'pdf', '/assets/vowel_practice.pdf', null);
    insertTopic.run('Vowel Detective', chapterIds[4], 'sms_riddle', null, 'Which vowel is in the word "apple"?');

    insertTopic.run('Building Simple Words', chapterIds[5], 'video', '/assets/simple_words.mp4', null);
    insertTopic.run('Word Formation Activity', chapterIds[5], 'pdf', '/assets/word_formation.pdf', null);
    insertTopic.run('Word Puzzle', chapterIds[5], 'sms_riddle', null, 'What word is formed with C-A-T?');

    // Topics for Science chapters
    insertTopic.run('Earth as Our Home', chapterIds[6], 'video', '/assets/earth_home.mp4', null);
    insertTopic.run('Earth Facts Worksheet', chapterIds[6], 'pdf', '/assets/earth_facts.pdf', null);
    insertTopic.run('Planet Puzzle', chapterIds[6], 'sms_riddle', null, 'What planet do we live on?');

    insertTopic.run('Living Things Around Us', chapterIds[7], 'video', '/assets/living_things.mp4', null);
    insertTopic.run('Living vs Non-Living Chart', chapterIds[7], 'pdf', '/assets/living_chart.pdf', null);
    insertTopic.run('Nature Observation Task', chapterIds[7], 'sms_riddle', null, 'Is a tree living or non-living?');

    insertTopic.run('Non-Living Things in Nature', chapterIds[8], 'video', '/assets/non_living_things.mp4', null);
    insertTopic.run('Classify Objects Activity', chapterIds[8], 'pdf', '/assets/classify_objects.pdf', null);
    insertTopic.run('Object Sorting Challenge', chapterIds[8], 'sms_riddle', null, 'Is a stone living or non-living?');

    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

initializeDatabase();
