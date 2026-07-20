export function renderSubjects(subjects) {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  subjects.forEach((subject) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = subject.name;
    button.dataset.type = "subject";
    button.dataset.id = String(subject.id);
    button.addEventListener("click", () => window.loadChapters(subject.id));
    container.appendChild(button);
  });
}