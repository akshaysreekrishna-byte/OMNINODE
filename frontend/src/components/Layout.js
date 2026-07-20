export function createLayout() {
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
}