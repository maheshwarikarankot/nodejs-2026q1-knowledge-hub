# Knowledge Hub API

## Description

Task is to create a REST API for a Knowledge Hub platform using the Nest.js framework. The Knowledge Hub allows users to create, edit, and organize articles by categories and tags.

This repository contains a working implementation of that assignment.

The API manages:

- users
- categories
- articles
- comments

The project includes request validation, Swagger API docs, and automated unit/e2e tests.

## Technical Requirements

- Language: TypeScript (`typescript@^5.9.3`)
- Framework: NestJS (`@nestjs/common@^11.1.17`, `@nestjs/core@^11.1.17`, `@nestjs/platform-express@^11.0.2`)
- Runtime: Node.js 24.x.x (`24.10.0` or higher)
- Package Manager: npm 10.x.x (`10.9.2` or higher)
- Validation: `class-validator@^0.15.1`, `class-transformer@^0.5.1`
- API Documentation: `@nestjs/swagger@^11.2.6`
- Testing: `jest@^30.3.0`, `ts-jest@^29.4.6`, `supertest@^7.2.2`


## Prerequisites

- Node.js 24.10.0+
- npm 10.9.2+

Check versions:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository.

```bash
git clone https://github.com/maheshwarikarankot/nodejs-2026q1-knowledge-hub.git
cd nodejs-2026q1-knowledge-hub
```

2. Install dependencies.

```bash
npm install
```

3. Create your environment file.

```bash
cp .env.example .env
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Standard start:

```bash
npm run start
```

Debug mode:

```bash
npm run start:debug
```

## API Documentation (Swagger)

Swagger UI is available at:

- `http://localhost:<PORT>/doc`

## Available Scripts

- `npm run build`: Build the project
- `npm run start`: Start app
- `npm run start:dev`: Start app in watch mode
- `npm run start:debug`: Start app in debug mode
- `npm run lint`: Run ESLint with auto-fix
- `npm run format`: Format source files
- `npm test`: Run tests
- `npm run test:e2e`: Run e2e tests with `test/jest-e2e.json`

## Project Modules

- `user`: user CRUD + password update
- `category`: category CRUD
- `article`: article CRUD + filtering/pagination
- `comment`: comment CRUD for article discussion

## Core API Endpoints

Base URL:

```text
http://localhost:<PORT>
```

### Users

- `POST /user`
- `GET /user`
- `GET /user/:id`
- `PUT /user/:id` (update password)
- `DELETE /user/:id`

Create user example:

```bash
curl -X POST http://localhost:<PORT>/user \
	-H "Content-Type: application/json" \
	-d '{
		"login": "john",
		"password": "secret123",
		"role": "admin"
	}'
```

### Categories

- `POST /category`
- `GET /category`
- `GET /category/:id`
- `PUT /category/:id`
- `DELETE /category/:id`

Create category example:

```bash
curl -X POST http://localhost:<PORT>/category \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Tech",
		"description": "Technology articles"
	}'
```

### Articles

- `POST /article`
- `GET /article`
- `GET /article/:id`
- `PUT /article/:id`
- `DELETE /article/:id`

Supported query params for `GET /article`:

- `status` (`draft|published|archived`)
- `categoryId`
- `tag`
- `page`
- `limit`
- `sortBy`
- `order` (`asc|desc`)

Create article example:

```bash
curl -X POST http://localhost:<PORT>/article \
	-H "Content-Type: application/json" \
	-d '{
		"title": "Understanding Node.js Streams and Buffers",
		"content": "Streams allow you to process data chunk by chunk...",
		"status": "published",
		"tags": ["nodejs", "streams", "performance"]
	}'
```

### Comments

- `POST /comment`
- `GET /comment?articleId=<UUID>`
- `DELETE /comment/:id`

Create comment example:

```bash
curl -X POST http://localhost:<PORT>/comment \
	-H "Content-Type: application/json" \
	-d '{
		"content": "Great article!",
		"articleId": "550e8400-e29b-41d4-a716-446655440000"
	}'
```

## Validation Behavior

- Global validation is enabled with `ValidationPipe`.
- Unknown fields are stripped (`whitelist: true`).
- Invalid payloads return `400 Bad Request`.
- Some domain-specific checks return `422 Unprocessable Entity` (for example, commenting on a non-existing article).

## Data Storage Note

The current implementation uses in-memory arrays in services. Data resets when the process restarts.

## Testing

Run all tests:

```bash
npm test
```

Run e2e tests:

```bash
npm run test:e2e
```

## Troubleshooting

Port already in use:

```bash
lsof -ti :3000 | xargs kill -9
```

If tests behave unexpectedly after major changes, run:

```bash
npm test -- --runInBand
```