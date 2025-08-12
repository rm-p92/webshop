# Webshop Monorepo

This project is a monorepo containing:
- **webshop-api**: Ruby on Rails API backend
- **webshop-frontend**: React (Create React App) frontend
- **MySQL**: Database, managed via Docker

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- (Optional) Node.js and npm/yarn for local frontend development
- (Optional) Ruby and Bundler for local backend development

## Project Structure

```
webshop/
├── webshop-api/         # Rails API backend
├── webshop-frontend/    # React frontend
├── docker-compose.yml   # Multi-service Docker Compose config
├── .env                 # Environment variables for Docker Compose (not committed)
├── .env.example         # Example environment variables (safe to commit)
├── .gitignore
└── README.md
```

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

## Development

- **Frontend**: Edit files in `webshop-frontend/`. Changes will hot-reload in the Docker container.
- **Backend**: Edit files in `webshop-api/`. Rails server will reload code changes.

## Useful Commands

- **Rails Console:**  
  `docker compose exec web bin/rails console`
- **Frontend Shell:**  
  `docker compose exec frontend sh`
- **Database Shell:**  
  `docker compose exec db mysql -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE`

## Environment Variables

- See `.env.example` for required variables.
- **Never commit your real `.env` file.**