let breadcrumbState = {
    step: "home",
    className: null,
    subjectName: null,
    chapterName: null,
    topicName: null
};

export function createLayout() {
    document.querySelector("#app").innerHTML = `
        <div class="container">
            <header class="gmail-bar">
                <div class="brand">OMNINODE</div>
                <nav class="top-nav">
                    <a href="#" class="nav-link" data-nav="classes">Classes</a>
                    <a href="#" class="nav-link" data-nav="subjects">Subjects</a>
                    <a href="#" class="nav-link" data-nav="chapters">Chapters</a>
                    <a href="#" class="nav-link" data-nav="topics">Topics</a>
                </nav>
            </header>

            <main>
                <section class="card">
                    <nav class="breadcrumbs" aria-label="Breadcrumb"></nav>
                    <h2>Welcome Student</h2>
                    <p>Please select a class below to get started.</p>

                    <div class="lesson-grid">
                        Loading...
                    </div>
                </section>
            </main>
        </div>
    `;

    updateBreadcrumbs();
}

export function updateBreadcrumbs(state = {}) {
    if (state.reset) {
        breadcrumbState = {
            step: "home",
            className: null,
            subjectName: null,
            chapterName: null,
            topicName: null
        };
    } else {
        breadcrumbState = { ...breadcrumbState, ...state };
    }

    const container = document.querySelector(".breadcrumbs");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.classList.remove("active");
    });

    const activeNav = {
        home: "classes",
        subjects: "subjects",
        chapters: "chapters",
        topics: "topics"
    }[breadcrumbState.step] || "classes";

    const activeLink = document.querySelector(`.nav-link[data-nav="${activeNav}"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }

    if (!container) return;

    const items = [];

    if (breadcrumbState.step === "home") {
        items.push({ label: "Home", active: true });
    } else {
        items.push({ label: "Home", active: false, reset: true });

        if (breadcrumbState.step === "subjects") {
            items.push({ label: "Subjects", active: true });
        } else if (breadcrumbState.step === "chapters") {
            items.push({ label: "Subjects", active: false });
            items.push({ label: "Chapters", active: true });
        } else if (breadcrumbState.step === "topics") {
            items.push({ label: "Subjects", active: false });
            items.push({ label: "Chapters", active: false });
            items.push({ label: "Topics", active: true });
        }
    }

    container.innerHTML = "";

    items.forEach((item, index) => {
        const crumb = document.createElement("span");
        crumb.className = item.active ? "breadcrumb-item active" : "breadcrumb-item";

        if (item.reset) {
            crumb.classList.add("breadcrumb-link");
            crumb.textContent = item.label;
            crumb.addEventListener("click", (event) => {
                event.preventDefault();
                if (window.loadClasses) {
                    window.loadClasses();
                }
            });
        } else {
            crumb.textContent = item.label;
        }

        container.appendChild(crumb);

        if (index < items.length - 1) {
            const separator = document.createElement("span");
            separator.className = "breadcrumb-separator";
            separator.textContent = "›";
            container.appendChild(separator);
        }
    });
}