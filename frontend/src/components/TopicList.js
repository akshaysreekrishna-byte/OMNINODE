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

    const title = document.createElement("h3");
    title.textContent = topic.title;

    const type = document.createElement("p");
    type.textContent = topic.content_type?.toUpperCase() || "Lesson";

    card.appendChild(title);
    card.appendChild(type);
    container.appendChild(card);
});

}
