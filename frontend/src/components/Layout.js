import {
  getSelectedClassId,
  getSelectedSubjectId,
} from "../services/api.js";
import { navigate } from "../navigate.js";

let breadcrumbState = {
  step: "home",
  className: null,
  subjectName: null,
  chapterName: null,
  topicName: null,
};

export function createLayout() {
  document.querySelector("#app").innerHTML = `
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <div class="container">
            <header class="gmail-bar">
                <div class="brand">OMNINODE</div>
            </header>

            <main id="main-content">
                <h1 class="sr-only">OMNINODE Learning Platform</h1>
                <section class="card">
                    <nav class="breadcrumbs" aria-label="Breadcrumb"></nav>
                    <h2>Welcome Student</h2>
                    <p>Please select a class below to get started.</p>

                    <div class="lesson-grid" tabindex="-1" role="region" aria-live="polite" aria-label="Content area">
                        Loading...
                    </div>
                </section>
            </main>
        </div>
    `;

  updateBreadcrumbs();
}

export function updateBreadcrumbs(state = {}) {
  if (state.reset) {
    breadcrumbState = {
      step: "home",
      className: null,
      subjectName: null,
      chapterName: null,
      topicName: null,
    };
  } else {
    breadcrumbState = { ...breadcrumbState, ...state };
  }

  const container = document.querySelector(".breadcrumbs");
  if (!container) return;

  const items = [];

  if (breadcrumbState.step === "home") {
    items.push({ label: "Home", active: true });
  } else {
    items.push({
      label: "Home",
      active: false,
      action: () => navigate("/"),
    });

    const classId = getSelectedClassId();
    const subjectId = getSelectedSubjectId();

    if (breadcrumbState.step === "subjects") {
      items.push({
        label: breadcrumbState.className || "Subjects",
        active: true,
      });
    } else if (breadcrumbState.step === "chapters") {
      items.push({
        label: breadcrumbState.className || "Subjects",
        active: false,
        action: () => navigate(`/class/${classId}`),
      });
      items.push({
        label: breadcrumbState.subjectName || "Chapters",
        active: true,
      });
    } else if (breadcrumbState.step === "topics") {
      items.push({
        label: breadcrumbState.className || "Subjects",
        active: false,
        action: () => navigate(`/class/${classId}`),
      });
      items.push({
        label: breadcrumbState.subjectName || "Chapters",
        active: false,
        action: () => navigate(`/class/${classId}/${subjectId}`),
      });
      items.push({
        label: breadcrumbState.chapterName || "Topics",
        active: true,
      });
    }
  }

  container.innerHTML = "";

  items.forEach((item, index) => {
    const crumb = document.createElement("span");
    crumb.className = item.active
      ? "breadcrumb-item active"
      : "breadcrumb-item";

    if (!item.active && item.action) {
      crumb.classList.add("breadcrumb-link");
      crumb.setAttribute("role", "link");
      crumb.setAttribute("tabindex", "0");
      crumb.textContent = item.label;
      crumb.addEventListener("click", (event) => {
        event.preventDefault();
        item.action();
      });
      crumb.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          item.action();
        }
      });
    } else {
      crumb.textContent = item.label;
      if (item.active) {
        crumb.setAttribute("aria-current", "page");
      }
    }

    container.appendChild(crumb);

    if (index < items.length - 1) {
      const separator = document.createElement("span");
      separator.className = "breadcrumb-separator";
      separator.setAttribute("aria-hidden", "true");
      separator.textContent = "›";
      container.appendChild(separator);
    }
  });
}