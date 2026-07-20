import { renderClasses } from "../components/ClassList";

export function loadClasses() {
  fetch("http://localhost:5000/api/class")
    .then(res => res.json())
    .then(classes => {
    renderClasses(classes);
    })
    .catch(err => {
      console.error(err);
      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading classes</p>";
    });
}
export function loadSubjects(id) {
    fetch(`http://localhost:5000/api/class/${id}`)
        .then(res => res.json())
        .then(subjects => {
            renderClasses(classes);
        })
        .catch(err => {
            console.error(err);
            document.querySelector(".lesson-grid").innerHTML =
                "<p>Error loading subjects</p>";
        });
}

window.loadSubjects = loadSubjects;