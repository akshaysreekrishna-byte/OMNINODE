import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header>
      <h1>OMNINODE</h1>
      <p class="subtitle">Offline Learning Hub</p>
    </header>
    
    <main>
      <section class="card">
        <h2>Welcome Student</h2>
        <p>Please select a lesson below to get started. No internet connection is required.</p>
        <div class="lesson-grid">
          <button class="btn">Math Level 1</button>
          <button class="btn">Science Level 1</button>
          <button class="btn">Reading Level 1</button>
        </div>
      </section>
    </main>
  </div>
`
