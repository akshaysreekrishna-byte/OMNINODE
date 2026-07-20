export function renderTopics(topics) {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  if (!Array.isArray(topics) || topics.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No topics available for this chapter.";
    container.appendChild(message);
    return;
  }

  topics.forEach((topic) => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <p>${topic.content_type?.toUpperCase() || "Lesson"}</p>
    `;
    container.appendChild(card);
  });
}
