export function renderChapters(chapters) {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  if (!Array.isArray(chapters) || chapters.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No chapters available for this subject.";
    container.appendChild(message);
    return;
  }

  chapters.forEach((chapter) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = chapter.name;
    button.dataset.type = "chapter";
    button.dataset.id = String(chapter.id);
    button.addEventListener("click", () => window.loadTopics(chapter.id));
    container.appendChild(button);
  });
}