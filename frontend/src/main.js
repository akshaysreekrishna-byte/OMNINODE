import "./style.css";
import { createLayout } from "./components/Layout";
import { loadClasses, loadSubjects, loadChapters } from "./services/api";

createLayout();
loadClasses();

window.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;

  if (target.matches(".btn")) {
    const text = target.textContent?.trim() || "";

    if (text === "Grade 1" || text === "Grade 2") {
      const gradeId = text.includes("1") ? 1 : 2;
      loadSubjects(gradeId);
    } else if (["Math", "English", "Science"].includes(text)) {
      const subjectId = text === "Math" ? 1 : text === "English" ? 2 : 3;
      loadChapters(subjectId);
    }
  }
});