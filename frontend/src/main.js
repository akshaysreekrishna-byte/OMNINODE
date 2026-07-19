import "./style.css";

function loadClasses() {
  fetch("http://localhost:5000/api/class")
    .then(res => res.json())
    .then(classes => {
      const html = classes.map(c => `
        <button class="btn" onclick="loadSubjects(${c.id})">
          ${c.name}
        </button>
      `).join("");

      document.querySelector(".lesson-grid").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.querySelector(".lesson-grid").innerHTML =
        "<p>Error loading classes</p>";
    });
}

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

document.querySelector("#app").innerHTML = `
<div class="container">
  <header>
    <h1>OMNINODE</h1>
    <p class="subtitle">Offline Learning Hub</p>
  </header>

  <main>
    <section class="card">
      <h2>Welcome Student</h2>
      <p>Please select a class below to get started.</p>

      <div class="lesson-grid">
        Loading...
      </div>
    </section>
  </main>
</div>
`;

loadClasses();