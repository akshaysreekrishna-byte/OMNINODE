import "./style.css";
import { createLayout } from "./components/Layout";
import { loadClasses } from "./services/api";

window.loadSubjects = function(id) {
  fetch(`http://localhost:5000/api/class/${id}`)
    .then(res => res.json())
    .then(subjects => {
      const html = subjects.map(s => `
        <button class="btn">${s.name}</button>
      `).join("");

      document.querySelector(".lesson-grid").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading subjects</p>";
    });
};

createLayout();
loadClasses();