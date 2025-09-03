# Webshop Monorepo

This repository is a monorepo for a full-stack webshop application, including:

- **webshop-api**: Ruby on Rails API backend
- **webshop-frontend**: React (Vite) frontend
- **MySQL**: Database, managed via Docker
- **Traefik**: Reverse proxy for local development

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Useful Commands](#useful-commands)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
webshop/
├── webshop-api/         # Rails API backend
│   ├── app/             # Controllers, models, policies, serializers, etc.
│   ├── config/          # Rails configuration
│   ├── db/              # Migrations, schema, seeds
│   ├── spec/ & test/    # RSpec and Minitest tests
│   └── ...
├── webshop-frontend/    # React frontend (Vite)
│   ├── src/             # React components, pages, context
│   ├── public/          # Static assets
│   └── ...
├── docker-compose.yml   # Multi-service Docker Compose config
├── .env                 # Environment variables for Docker Compose (not committed)
├── .env.example         # Example environment variables (safe to commit)
├── .gitignore
└── README.md
```

---

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- (Optional) Node.js (v18+) and npm/yarn for local frontend development
- (Optional) Ruby (3.2+) and Bundler for local backend development

---

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd webshop
```

### 2. Configure environment variables

Copy the example file and edit `.env` to set your database credentials and Rails environment:

```sh
cp .env.example .env
# Then edit .env as needed
```

### 3. Build and start all services

```sh
docker compose up --build
```

- Rails API: [http://localhost:3000](http://localhost:3000)
- React Frontend: [http://localhost:3001](http://localhost:3001)
- MySQL: accessible on port 3307

### 4. Running Rails migrations

In a new terminal:

```sh
docker compose exec web bin/rails db:migrate
```

### 5. Stopping the services

```sh
docker compose down
```

---

## Development

### Frontend (React/Vite)

- Source code: `webshop-frontend/`
- Hot-reloads in Docker or can be run locally:

```sh
cd webshop-frontend
npm install
npm run dev
# App runs on http://localhost:3001
```

### Backend (Rails API)

- Source code: `webshop-api/`
- Auto-reloads in Docker or can be run locally:

```sh
cd webshop-api
bundle install
bin/rails server
# API runs on http://localhost:3000
```

---

## Testing

### Backend (RSpec & Minitest)

```sh
cd webshop-api
# RSpec
bundle exec rspec
# or Minitest
bin/rails test
```



---

## Useful Commands

- **Rails Console:**
  `docker compose exec web bin/rails console`
- **Frontend Shell:**
  `docker compose exec frontend sh`
- **Database Shell:**
  `docker compose exec db mysql -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE`

---

## Environment Variables

- See `.env.example` for required variables.
- **Never commit your real `.env` file.**

---

## Troubleshooting

- If you encounter issues with Docker volumes, try `docker compose down -v` to remove volumes.
- For port conflicts, ensure ports 3000 (API), 3001 (frontend), and 3307 (MySQL) are free.
- For Rails or Node dependency issues, ensure you are using the correct Ruby/Node versions.

---

## License

MIT License. See [LICENSE](LICENSE) for details.