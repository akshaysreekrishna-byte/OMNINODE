import { renderList } from "../components/ListRenderer.js";
import { renderTopics } from "../components/TopicList.js";
import { updateBreadcrumbs } from "../components/Layout.js";
import { navigate } from "../navigate.js";

// API base URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Centralized state
let selectedClassId = null;
let selectedSubjectId = null;
let classesCache = [];
let subjectsCache = [];
let chaptersCache = [];

// --- Helpers ---

/**
 * Fetch wrapper that validates the response status before parsing JSON.
 */
async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/** Show a loading spinner in the content area. */
function showLoading() {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  const spinner = document.createElement("div");
  spinner.className = "loading-spinner";
  spinner.setAttribute("role", "status");
  spinner.setAttribute("aria-label", "Loading");

  const text = document.createElement("span");
  text.textContent = "Loading...";
  text.className = "sr-only";

  spinner.appendChild(text);
  container.appendChild(spinner);
}

/** Show an error message with an optional retry button. */
function showError(message, retryFn) {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-state";
  errorDiv.setAttribute("role", "alert");

  const msg = document.createElement("p");
  msg.textContent = message;
  errorDiv.appendChild(msg);

  if (retryFn) {
    const retryBtn = document.createElement("button");
    retryBtn.className = "btn";
    retryBtn.textContent = "Retry";
    retryBtn.addEventListener("click", retryFn);
    errorDiv.appendChild(retryBtn);
  }

  container.appendChild(errorDiv);
}

/** Move focus to the content area after a content swap. */
function focusContent() {
  const grid = document.querySelector(".lesson-grid");
  if (grid) grid.focus();
}

// --- Data Loading Functions ---

export function loadClasses() {
  showLoading();
  navigate("/");

  apiFetch("/api/index")
    .then((classes) => {
      classesCache = classes;
      subjectsCache = [];
      chaptersCache = [];
      selectedClassId = null;
      selectedSubjectId = null;
      renderList(classes, loadSubjects, "No classes available.");
      updateBreadcrumbs({ reset: true });
      focusContent();
    })
    .catch((err) => {
      console.error("LOAD CLASSES ERROR:", err);
      showError("Failed to load classes. Please try again.", loadClasses);
    });
}

/**
 * @param {number} id - Class ID
 * @param {number} [explicitClassId] - Ignored (included for signature consistency with router)
 */
export function loadSubjects(id) {
  selectedClassId = id;
  selectedSubjectId = null;
  showLoading();
  navigate(`/class/${id}`);

  apiFetch(`/api/index/${id}`)
    .then((subjects) => {
      subjectsCache = subjects;
      chaptersCache = [];
      const className =
        classesCache.find((item) => item.id === id)?.name || "Class";
      renderList(subjects, loadChapters, "No subjects available.");
      updateBreadcrumbs({ step: "subjects", className });
      focusContent();
    })
    .catch((err) => {
      console.error("LOAD SUBJECTS ERROR:", err);
      showError("Failed to load subjects. Please try again.", () =>
        loadSubjects(id)
      );
    });
}

/**
 * @param {number} subjectId
 * @param {number} [explicitClassId] - Used by the router on page reload when selectedClassId isn't set yet
 */
export function loadChapters(subjectId, explicitClassId) {
  if (explicitClassId != null) {
    selectedClassId = explicitClassId;
  }
  selectedSubjectId = subjectId;
  const classId = selectedClassId ?? 1;
  showLoading();
  navigate(`/class/${classId}/${subjectId}`);

  apiFetch(`/api/index/${classId}/${subjectId}`)
    .then((chapters) => {
      chaptersCache = chapters;
      const className =
        classesCache.find((item) => item.id === classId)?.name || "Class";
      const subjectName =
        subjectsCache.find((item) => item.id === subjectId)?.name || "Subject";
      renderList(chapters, loadTopics, "No chapters available.");
      updateBreadcrumbs({ step: "chapters", className, subjectName });
      focusContent();
    })
    .catch((err) => {
      console.error("LOAD CHAPTERS ERROR:", err);
      showError("Failed to load chapters. Please try again.", () =>
        loadChapters(subjectId)
      );
    });
}

/**
 * @param {number} chapterId
 * @param {number} [explicitClassId] - Used by the router on page reload
 * @param {number} [explicitSubjectId] - Used by the router on page reload
 */
export function loadTopics(chapterId, explicitClassId, explicitSubjectId) {
  if (explicitClassId != null) {
    selectedClassId = explicitClassId;
  }
  if (explicitSubjectId != null) {
    selectedSubjectId = explicitSubjectId;
  }
  const classId = selectedClassId ?? 1;
  const subjectId = selectedSubjectId ?? 1;
  showLoading();
  navigate(`/class/${classId}/${subjectId}/${chapterId}`);

  apiFetch(`/api/index/${classId}/${subjectId}/${chapterId}`)
    .then((topics) => {
      const className =
        classesCache.find((item) => item.id === classId)?.name || "Class";
      const subjectName =
        subjectsCache.find((item) => item.id === subjectId)?.name || "Subject";
      const chapterName =
        chaptersCache.find((item) => item.id === chapterId)?.name || "Chapter";
      renderTopics(topics);
      updateBreadcrumbs({ step: "topics", className, subjectName, chapterName });
      focusContent();
    })
    .catch((err) => {
      console.error("LOAD TOPICS ERROR:", err);
      showError("Failed to load topics. Please try again.", () =>
        loadTopics(chapterId)
      );
    });
}

// Export selected state getters for Layout breadcrumb navigation
export function getSelectedClassId() {
  return selectedClassId;
}

export function getSelectedSubjectId() {
  return selectedSubjectId;
}