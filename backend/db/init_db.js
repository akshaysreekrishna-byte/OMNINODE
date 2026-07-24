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

    const chapterIds = {
      // Grade 1 Math
      [`${grade1Id}:Math:Addition & Subtraction`]: insertChapter.run('Addition & Subtraction', subjectIds[`${grade1Id}:Math`]).lastInsertRowid,
      [`${grade1Id}:Math:Fractions`]:              insertChapter.run('Fractions',               subjectIds[`${grade1Id}:Math`]).lastInsertRowid,
      [`${grade1Id}:Math:Shapes`]:                 insertChapter.run('Shapes',                  subjectIds[`${grade1Id}:Math`]).lastInsertRowid,

      // Grade 1 English
      [`${grade1Id}:English:Alphabets`]:           insertChapter.run('Alphabets',               subjectIds[`${grade1Id}:English`]).lastInsertRowid,
      [`${grade1Id}:English:Vowels`]:              insertChapter.run('Vowels',                  subjectIds[`${grade1Id}:English`]).lastInsertRowid,
      [`${grade1Id}:English:Words`]:               insertChapter.run('Words',                   subjectIds[`${grade1Id}:English`]).lastInsertRowid,

      // Grade 1 Science
      [`${grade1Id}:Science:Our Earth`]:           insertChapter.run('Our Earth',               subjectIds[`${grade1Id}:Science`]).lastInsertRowid,
      [`${grade1Id}:Science:Living Things`]:       insertChapter.run('Living Things',           subjectIds[`${grade1Id}:Science`]).lastInsertRowid,
      [`${grade1Id}:Science:Non-Living Things`]:   insertChapter.run('Non-Living Things',       subjectIds[`${grade1Id}:Science`]).lastInsertRowid,

      // Grade 2 English
      [`${grade2Id}:English:Grammer`]:             insertChapter.run('Grammer',                 subjectIds[`${grade2Id}:English`]).lastInsertRowid,
      [`${grade2Id}:English:Tenses`]:              insertChapter.run('Tenses',                  subjectIds[`${grade2Id}:English`]).lastInsertRowid,
      [`${grade2Id}:English:Conjugation`]:         insertChapter.run('Conjugation',             subjectIds[`${grade2Id}:English`]).lastInsertRowid,
      [`${grade2Id}:English:Synonyms & Antonyms`]: insertChapter.run('Synonyms & Antonyms',     subjectIds[`${grade2Id}:English`]).lastInsertRowid,
      [`${grade2Id}:English:Sentence Structuring`]:insertChapter.run('Sentence Structuring',    subjectIds[`${grade2Id}:English`]).lastInsertRowid
    };

    // Topics for Math chapters
    insertTopic.run('Intro to Addition',      chapterIds[`${grade1Id}:Math:Addition & Subtraction`], 'video',     '/assets/addition_intro.mp4',     null);
    insertTopic.run('Basic Subtraction',      chapterIds[`${grade1Id}:Math:Addition & Subtraction`], 'pdf',       '/assets/subtraction_basics.pdf', null);
    insertTopic.run('Math Riddle 1',          chapterIds[`${grade1Id}:Math:Addition & Subtraction`], 'sms_riddle', null,                            'What is 2 + 2?');

    insertTopic.run('Understanding Fractions',chapterIds[`${grade1Id}:Math:Fractions`], 'video',     '/assets/fractions_intro.mp4',    null);
    insertTopic.run('Fraction Practice',      chapterIds[`${grade1Id}:Math:Fractions`], 'pdf',       '/assets/fractions_practice.pdf', null);
    insertTopic.run('Fraction Challenge',     chapterIds[`${grade1Id}:Math:Fractions`], 'sms_riddle', null,                            'If you split a pizza into 4 equal parts, what is one part called?');

    insertTopic.run('Recognizing Shapes',     chapterIds[`${grade1Id}:Math:Shapes`], 'video',     '/assets/shapes_intro.mp4',  null);
    insertTopic.run('Shape Matching Activity',chapterIds[`${grade1Id}:Math:Shapes`], 'pdf',       '/assets/shape_matching.pdf', null);
    insertTopic.run('Shape Hunt',             chapterIds[`${grade1Id}:Math:Shapes`], 'sms_riddle', null,                         'I have three sides and three corners. What am I?');

    // Topics for English chapters
    insertTopic.run('Alphabet Basics',        chapterIds[`${grade1Id}:English:Alphabets`], 'video',     '/assets/alphabet_basics.mp4', null);
    insertTopic.run('Letter Tracing Practice',chapterIds[`${grade1Id}:English:Alphabets`], 'pdf',       '/assets/letter_tracing.pdf',  null);
    insertTopic.run('Alphabet Sound Game',    chapterIds[`${grade1Id}:English:Alphabets`], 'sms_riddle', null,                          'Which letter comes after B?');

    insertTopic.run('Vowel Sounds',           chapterIds[`${grade1Id}:English:Vowels`], 'video',     '/assets/vowel_sounds.mp4',       null);
    insertTopic.run('Vowel Practice Worksheet',chapterIds[`${grade1Id}:English:Vowels`], 'pdf',      '/assets/vowel_practice.pdf',     null);
    insertTopic.run('Vowel Detective',        chapterIds[`${grade1Id}:English:Vowels`], 'sms_riddle', null,                             'Which vowel is in the word "apple"?');

    insertTopic.run('Building Simple Words',  chapterIds[`${grade1Id}:English:Words`], 'video',     '/assets/simple_words.mp4',      null);
    insertTopic.run('Word Formation Activity',chapterIds[`${grade1Id}:English:Words`], 'pdf',       '/assets/word_formation.pdf',    null);
    insertTopic.run('Word Puzzle',            chapterIds[`${grade1Id}:English:Words`], 'sms_riddle', null,                            'What word is formed with C-A-T?');

    // Topics for Science chapters
    insertTopic.run('Earth as Our Home',      chapterIds[`${grade1Id}:Science:Our Earth`], 'video',     '/assets/earth_home.mp4',   null);
    insertTopic.run('Earth Facts Worksheet',  chapterIds[`${grade1Id}:Science:Our Earth`], 'pdf',       '/assets/earth_facts.pdf',  null);
    insertTopic.run('Planet Puzzle',          chapterIds[`${grade1Id}:Science:Our Earth`], 'sms_riddle', null,                       'What planet do we live on?');

    insertTopic.run('Living Things Around Us',  chapterIds[`${grade1Id}:Science:Living Things`], 'video',     '/assets/living_things.mp4', null);
    insertTopic.run('Living vs Non-Living Chart',chapterIds[`${grade1Id}:Science:Living Things`], 'pdf',      '/assets/living_chart.pdf',  null);
    insertTopic.run('Nature Observation Task',  chapterIds[`${grade1Id}:Science:Living Things`], 'sms_riddle', null,                        'Is a tree living or non-living?');

    insertTopic.run('Non-Living Things in Nature',chapterIds[`${grade1Id}:Science:Non-Living Things`], 'video',     '/assets/non_living_things.mp4',  null);
    insertTopic.run('Classify Objects Activity', chapterIds[`${grade1Id}:Science:Non-Living Things`], 'pdf',       '/assets/classify_objects.pdf',   null);
    insertTopic.run('Object Sorting Challenge',  chapterIds[`${grade1Id}:Science:Non-Living Things`], 'sms_riddle', null,                             'Is a stone living or non-living?');

    // Topics for Grade 2 English chapters
    insertTopic.run('Grammar Rules',          chapterIds[`${grade2Id}:English:Grammer`], 'video',     '/assets/grammar_rules.mp4',      null);
    insertTopic.run('Grammar Exercises',      chapterIds[`${grade2Id}:English:Grammer`], 'pdf',       '/assets/grammar_exercises.pdf',  null);
    insertTopic.run('Grammar Quiz',           chapterIds[`${grade2Id}:English:Grammer`], 'sms_riddle', null,                            'What is a noun?');

    insertTopic.run('Intro to Tenses',        chapterIds[`${grade2Id}:English:Tenses`], 'video',      '/assets/tenses_intro.mp4',       null);
    insertTopic.run('Tenses Chart',           chapterIds[`${grade2Id}:English:Tenses`], 'pdf',        '/assets/tenses_chart.pdf',       null);
    insertTopic.run('Tense Challenge',        chapterIds[`${grade2Id}:English:Tenses`], 'sms_riddle', null,                             'What is the past tense of "go"?');

    insertTopic.run('Verb Conjugation',       chapterIds[`${grade2Id}:English:Conjugation`], 'video', '/assets/conjugation.mp4',        null);
    insertTopic.run('Conjugation Practice',   chapterIds[`${grade2Id}:English:Conjugation`], 'pdf',   '/assets/conjugation_practice.pdf', null);
    insertTopic.run('Conjugation Riddle',     chapterIds[`${grade2Id}:English:Conjugation`], 'sms_riddle', null,                        'I run, he ___.');

    insertTopic.run('Synonyms & Antonyms',    chapterIds[`${grade2Id}:English:Synonyms & Antonyms`], 'video', '/assets/synonyms_antonyms.mp4', null);
    insertTopic.run('Vocabulary Builder',     chapterIds[`${grade2Id}:English:Synonyms & Antonyms`], 'pdf',   '/assets/vocab_builder.pdf',  null);
    insertTopic.run('Word Match',             chapterIds[`${grade2Id}:English:Synonyms & Antonyms`], 'sms_riddle', null,                'What is the opposite of hot?');

    insertTopic.run('Sentence Structure Basics', chapterIds[`${grade2Id}:English:Sentence Structuring`], 'video', '/assets/sentence_structure.mp4', null);
    insertTopic.run('Building Sentences',     chapterIds[`${grade2Id}:English:Sentence Structuring`], 'pdf', '/assets/building_sentences.pdf', null);
    insertTopic.run('Sentence Fix',           chapterIds[`${grade2Id}:English:Sentence Structuring`], 'sms_riddle', null,               'Correct: "The dog bark."');

    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

initializeDatabase();
