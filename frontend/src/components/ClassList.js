export function renderClasses(classes) {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  classes.forEach((c) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = c.name;
    button.dataset.type = "class";
    button.dataset.id = String(c.id);
    button.addEventListener("click", () => window.loadSubjects(c.id));
    container.appendChild(button);
  });
}