# Ignis Simple

> A 5-minute quickstart example demonstrating the Ignis framework with CRUD operations for products and configurations.

A TypeScript-based REST API application built with the Ignis framework, featuring complete CRUD operations with PostgreSQL database integration, type-safe ORM with Drizzle, and automatic API documentation.

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)

## General Information

This project serves as a quickstart example for the Ignis framework, demonstrating how to:

- Build a REST API with TypeScript and modern tooling
- Implement CRUD operations with PostgreSQL and Drizzle ORM
- Use dependency injection and clean architecture patterns
- Automatically generate API documentation with Scalar
- Handle database migrations and schema management

**Purpose:** To provide developers with a working example of an Ignis-based application that can be used as a starting point for building production-ready REST APIs.

**Problem it solves:** Reduces the time needed to set up a new TypeScript backend project with database integration, validation, and proper architectural patterns.

## Technologies Used

- [Bun](https://bun.sh) - v1.3.4+ - Fast all-in-one JavaScript runtime and package manager
- [@venizia/ignis](https://www.npmjs.com/package/@venizia/ignis) - Latest - Web application framework
- [Hono](https://hono.dev) - v4.4.12 - Lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team) - v0.45.1 - Type-safe SQL ORM
- [PostgreSQL](https://www.postgresql.org) - Relational database
- [Zod](https://zod.dev) - Schema validation and type inference
- [@scalar/hono-api-reference](https://scalar.com) - Latest - API documentation generator
- [TypeScript](https://www.typescriptlang.org) - v5.5.3 - Type-safe JavaScript

## Features

Ready features:

- **Product Management** - Full CRUD operations for products with validation
- **Configuration Management** - System configuration storage with flexible data types
- **Type-Safe Database** - Drizzle ORM with TypeScript integration
- **Database Migrations** - Automated schema migrations with Drizzle Kit
- **API Documentation** - Auto-generated interactive API docs with Scalar
- **Dependency Injection** - Clean architecture with IoC container
- **Input Validation** - Zod schema validation for all endpoints
- **Audit Fields** - Automatic tracking of created/modified timestamps and users

## Setup

### Prerequisites

- [Bun](https://bun.sh) v1.3.4 or higher installed
- PostgreSQL database instance (local or remote)
- Basic knowledge of TypeScript and REST APIs

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ignis_simple
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with your PostgreSQL configuration:
   ```env
   # Database Configuration
   APP_ENV_POSTGRES_HOST=localhost
   APP_ENV_POSTGRES_PORT=5432
   APP_ENV_POSTGRES_USERNAME=your_username
   APP_ENV_POSTGRES_PASSWORD=your_password
   APP_ENV_POSTGRES_DATABASE=your_database

   # Application Configuration
   APP_ENV_APPLICATION_NAME=My-App
   HOST=0.0.0.0
   PORT=3000
   NODE_ENV=development
   ```

4. Run database migrations:
   ```bash
   bun run migrate:dev
   ```

## Usage

### Development Server

Run the development server with automatic rebuilding:

```bash
bun run server:dev
```

The API will be available at `http://localhost:3000/api` (or your configured HOST/PORT).

### Production Server

```bash
bun run server:prod
```

### API Endpoints

#### Product Endpoints

**Get all products:**
```bash
GET /api/product/
```

**Create a product:**
```bash
POST /api/product/
Content-Type: application/json

{
  "name": "Product Name",
  "code": "PROD-001",
  "description": "Optional description",
  "price": 1000
}
```

#### Configuration Endpoints

Standard CRUD operations available at `/api/configuration/`

### Available Scripts

```bash
# Development
bun run server:dev          # Start dev server with rebuild
bun run server:prod         # Start production server

# Build
bun run build              # Build TypeScript project
bun run rebuild            # Clean and rebuild
bun run clean              # Remove build artifacts
bun run compile:linux      # Compile to Linux binary

# Database
bun run migrate:dev        # Run database migrations
bun run generate-migration:dev  # Generate new migration

# Code Quality
bun run lint               # Check code with ESLint and Prettier
bun run lint:fix           # Fix linting issues automatically
```

### Project Structure

```
ignis_simple/
├── src/
│   ├── application.ts              # Main application configuration
│   ├── index.ts                    # Entry point
│   ├── migration.ts                # Migration configuration
│   ├── controllers/                # API route controllers
│   │   ├── configuration.controller.ts
│   │   └── product.controller.ts
│   ├── datasources/                # Database connections
│   │   └── postgres.datasource.ts
│   ├── models/                     # Data models and schemas
│   │   └── entities/
│   │       ├── configuration.model.ts
│   │       └── product.model.ts
│   └── repositories/               # Data access layer
│       ├── configuration.repository.ts
│       └── product.repository.ts
├── migration/                      # Database migration files
│   ├── 0000_sweet_echo.sql
│   └── 0001_large_invisible_woman.sql
├── scripts/                        # Utility scripts
│   └── clean.sh
├── package.json
├── tsconfig.json
└── README.md
```

## Project Status

Project is: **Complete** ✅

This is a working example/template project that demonstrates the core features of the Ignis framework. It's suitable for use as a starting point for new projects.

## Room for Improvement

Areas for improvement:

- Add authentication and authorization middleware
- Implement pagination for list endpoints
- Add comprehensive error handling
- Include unit and integration tests
- Add logging and monitoring
- Implement rate limiting
- Add request/response caching

To do:

- [ ] Add user authentication (JWT/OAuth)
- [ ] Implement API versioning
- [ ] Add Docker configuration
- [ ] Set up CI/CD pipeline
- [ ] Add comprehensive test suite
- [ ] Implement WebSocket support for real-time features
- [ ] Add file upload capabilities
- [ ] Create admin dashboard

## Acknowledgements

- This project was created as a quickstart example for the [@venizia/ignis](https://www.npmjs.com/package/@venizia/ignis) framework
- Built with [Bun](https://bun.sh) runtime for blazing-fast performance
- Uses [Hono](https://hono.dev) for lightweight routing
- API documentation powered by [Scalar](https://scalar.com)
- ORM functionality provided by [Drizzle](https://orm.drizzle.team)