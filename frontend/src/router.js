import { loadClasses, loadSubjects, loadChapters, loadTopics } from "./services/api.js";

/**
 * Hash-based router for SPA navigation.
 *
 * URL patterns:
 *   #/                                       → classes list (home)
 *   #/class/:classId                          → subjects for a class
 *   #/class/:classId/:subjectId               → chapters for a subject
 *   #/class/:classId/:subjectId/:chapterId    → topics for a chapter
 *
 * The router listens to hashchange events and dispatches to the correct
 * load function. A guard flag prevents double-dispatching when a load
 * function itself calls navigate() to sync the URL.
 */

let navigatingProgrammatically = false;

export function initRouter() {
  window.addEventListener("hashchange", () => {
    // Skip if this hashchange was caused by a load function calling navigate()
    if (navigatingProgrammatically) {
      navigatingProgrammatically = false;
      return;
    }
    handleRoute();
  });
  handleRoute(); // handle the current URL on page load / reload
}

/**
 * Called by navigate() to set the guard flag before changing the hash.
 * This prevents the hashchange listener from re-dispatching.
 */
export function markProgrammaticNavigation() {
  navigatingProgrammatically = true;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || "/";
  const parts = hash.split("/").filter(Boolean);

  // #/ or empty → home
  if (parts.length === 0) {
    loadClasses();
    return;
  }

  // Expect "class" as first segment
  if (parts[0] !== "class") {
    loadClasses();
    return;
  }

  const classId = Number(parts[1]);

  if (parts.length === 2 && !isNaN(classId)) {
    // #/class/1 → subjects
    loadSubjects(classId);
  } else if (parts.length === 3) {
    // #/class/1/2 → chapters
    const subjectId = Number(parts[2]);
    loadChapters(subjectId, classId);
  } else if (parts.length === 4) {
    // #/class/1/2/3 → topics
    const subjectId = Number(parts[2]);
    const chapterId = Number(parts[3]);
    loadTopics(chapterId, classId, subjectId);
  } else {
    loadClasses();
  }
}
