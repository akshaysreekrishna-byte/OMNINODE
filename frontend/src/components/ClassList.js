export function renderClasses(classes) {
  const html = classes.map(c => `
    <button class="btn" onclick="window.loadSubjects(${c.id})">
      ${c.name}
    </button>
  `).join("");

  document.querySelector(".lesson-grid").innerHTML = html;
}