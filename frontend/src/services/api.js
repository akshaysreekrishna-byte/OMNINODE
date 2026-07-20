import { renderClasses } from "../components/ClassList";
import { renderSubjects } from "../components/SubjectList";
import { renderChapters } from "../components/ChapterList";
import { renderTopics } from "../components/topics";
import { updateBreadcrumbs } from "../components/Layout";

let selectedClassId = null;
let selectedSubjectId = null;
let classesCache = [];
let subjectsCache = [];
let chaptersCache = [];

export function loadClasses() {
  fetch("http://localhost:5000/api/class")
    .then(res => res.json())
    .then(classes => {
      classesCache = classes;
      subjectsCache = [];
      chaptersCache = [];
      selectedClassId = null;
      selectedSubjectId = null;
      renderClasses(classes);
      updateBreadcrumbs({ reset: true });
    })
    .catch(err => {
      console.error("LOAD CLASSES ERROR:", err);
      alert(err.message);

      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading classes</p>";
    });
}

export function loadSubjects(id) {
  selectedClassId = id;
  selectedSubjectId = null;

  fetch(`http://localhost:5000/api/class/${id}`)
    .then(res => res.json())
    .then(subjects => {
      subjectsCache = subjects;
      chaptersCache = [];
      const className = classesCache.find((item) => item.id === id)?.name || "Class";
      renderSubjects(subjects);
      updateBreadcrumbs({ step: "subjects", className });
    })
    .catch(err => {
      console.error("LOAD SUBJECTS ERROR:", err);
      alert(err.message);

      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading subjects</p>";
    });
}

export function loadChapters(subjectId) {
  selectedSubjectId = subjectId;
  const classId = selectedClassId ?? 1;

  fetch(`http://localhost:5000/api/class/${classId}/${subjectId}`)
    .then(res => res.json())
    .then(chapters => {
      chaptersCache = chapters;
      const className = classesCache.find((item) => item.id === classId)?.name || "Class";
      const subjectName = subjectsCache.find((item) => item.id === subjectId)?.name || "Subject";
      renderChapters(chapters);
      updateBreadcrumbs({ step: "chapters", className, subjectName });
    })
    .catch(err => {
      console.error("LOAD CHAPTERS ERROR:", err);
      alert(err.message);

      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading chapters</p>";
    });
}

window.loadSubjects = loadSubjects;
window.loadChapters = loadChapters;
window.loadTopics = (chapterId) => {
  const classId = selectedClassId ?? 1;
  const subjectId = selectedSubjectId ?? 1;

  fetch(`http://localhost:5000/api/class/${classId}/${subjectId}/${chapterId}`)
    .then(res => res.json())
    .then(topics => {
      const className = classesCache.find((item) => item.id === classId)?.name || "Class";
      const subjectName = subjectsCache.find((item) => item.id === subjectId)?.name || "Subject";
      const chapterName = chaptersCache.find((item) => item.id === chapterId)?.name || "Chapter";
      renderTopics(topics);
      updateBreadcrumbs({ step: "topics", className, subjectName, chapterName });
    })
    .catch(err => {
      console.error("LOAD TOPICS ERROR:", err);
      document.querySelector(".lesson-grid").innerHTML = "<p>Error loading topics</p>";
    });
};