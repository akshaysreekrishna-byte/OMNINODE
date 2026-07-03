# OMNINODE Offline Learning Hub

This is a minimalist, mobile-first educational web platform designed to run offline on a Raspberry Pi. It provides a decentralized, offline-first dashboard for student lessons, interactive quizzes, and simulated AI-driven OCR homework grading.

The platform is optimized to be served directly from a Raspberry Pi hotspot via Nginx, utilizing a reactive Svelte frontend and a fast Fastify backend backed by a lightweight SQLite database.

---

## 🛠️ Tech Stack

- **Frontend:** [Svelte](https://svelte.dev/) + Vanilla HTML/CSS/JS (compiled to high-performance, static SPA assets via Vite).
- **Backend:** [Fastify](https://fastify.dev/) (ultrafast, low-overhead Node.js web framework).
- **Database:** [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (very fast, synchronous SQLite3 library for Node.js).
- **Web Server & Reverse Proxy:** [Nginx](https://nginx.org/) running on Raspberry Pi OS.

---

## 📂 File Structure

The project is structured into frontend and backend workspaces:

```text
OMNINODE/
├── backend/
│   ├── db/
│   │   ├── omninode.db           # SQLite database file
│   │   └── schema.sql            # Database schema definitions
│   ├── init_db.js                # Database initialization & seeding script
│   ├── database.js               # better-sqlite3 database connection helper
│   ├── server.js                 # Fastify API server
│   ├── package.json              # Backend dependencies (fastify, better-sqlite3)
│   └── package-lock.json
│
├── frontend/
│   ├── public/                   # Static assets (images, offline videos)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Breadcrumbs.svelte# Reactive path navigation tracking
│   │   │   ├── LessonView.svelte # Lesson body & OCR grading interactive box
│   │   │   └── SelectionGrid.svelte # Clean grid layout for classes/subjects/etc.
│   │   ├── App.svelte            # Main router & app state coordinator
│   │   └── main.js               # Svelte entry point
│   ├── index.html                # App entry template
│   ├── vite.config.js            # Build configuration for static output
│   ├── package.json              # Frontend dev dependencies (svelte, vite)
│   └── package-lock.json
│
├── nginx/
│   └── omninode.conf             # Nginx site configuration for Raspberry Pi
│
├── Project OMNINODE - Prototyping Brief.md
└── README.md                     # Project documentation
```

---

## ⚙️ Setting Up & Running Locally

### 1. Initialize the Database
Before running the server, compile the SQLite schema and seed mock data:
```bash
cd backend
npm install
node init_db.js
```

### 2. Run the Fastify Backend
Start the backend server in development mode:
```bash
node server.js
```
The API server runs locally on `http://localhost:5000`.

### 3. Build & Run the Svelte Frontend
Install frontend packages and start the Vite dev server (for local testing):
```bash
cd ../frontend
npm install
npm run dev
```
Open your browser to the URL displayed in your terminal (usually `http://localhost:5173`).

---

## 🌐 Deploying to Raspberry Pi via Nginx

To turn your Raspberry Pi into an offline learning hotspot, follow these deployment steps:

### 1. Build the Frontend for Production
Compile the Svelte application into optimized static assets (`index.html`, `js`, `css`):
```bash
cd frontend
npm run build
```
This outputs all static assets to the `frontend/dist` directory. Copy this directory to your Raspberry Pi (e.g., to `/var/www/omninode/dist`).

### 2. Set up Backend Service on Pi
Copy the `backend` directory to your Pi (e.g., `/var/www/omninode/backend`), install dependencies, and run Fastify using a process manager like **pm2** to keep it running in the background:
```bash
cd /var/www/omninode/backend
npm install --production
npm install -g pm2
pm2 start server.js --name "omninode-backend"
pm2 save
pm2 startup
```

### 3. Configure Nginx
Nginx will serve the static Svelte assets directly and forward `/api` requests to Fastify.

Create a new file `/etc/nginx/sites-available/omninode` with the following configuration:

```nginx
server {
    listen 80;
    server_name omninode.local;

    # Serve Svelte compiled static assets
    root /var/www/omninode/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Fastify backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/omninode /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Captive Portal (Optional)
To automatically redirect connected users to the OMNINODE page when they join the Raspberry Pi's offline Wi-Fi access point:
1. Configure `dnsmasq` to resolve all DNS queries to the Raspberry Pi's IP address (e.g., `192.168.4.1`).
2. Add a default/catch-all Nginx block that redirects all unauthorized traffic to `http://192.168.4.1` (or `omninode.local`), prompting devices to open the dashboard automatically.
