# 🔗 Authenticated URL Shortener Service

A URL Shortening RESTful backend built with **TypeScript**, **NestJS**, **MongoDB**, and **Redis**. It provides secure user authentication, email OTP verification via Brevo, and efficient URL shortening with collision handling and fast redirection.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Running](#installation--running)
- [API Documentation](#-api-documentation)
- [Design References & Inspirations](#-design-references--inspirations)
- [AI-Assisted Development Disclosure](#-ai-assisted-development-disclosure)
- [License](#-license)

---

## 🏛 Overview & Architecture

```
[ HTTP Requests ]
       │
       ▼
[ Guards / Pipes ]  (JWT Auth Guard, Zod Validation Pipe)
       │
       ▼
[ Controllers ]  (HTTP Layer / Request-Response Orchestration)
       │
       ▼
  [ Providers / Services ]   (Business Logic, Domain Rules, Token Creation, Hashing)
       │
       ▼
[ Repositories ] (Data Access Layer - Mongo & Redis)
       │
       ▼
 [ MongoDB / Redis / External Services (Brevo) ]
       │
       ▼
[ Interceptors / Filters ]  (Response Interceptor, Global Exception Filter)
```

### Architectural Highlights:
- **Modular Architecture:** Features are organized into NestJS modules (`AuthModule`, `UrlModule`, `UserModule`) plus infrastructure modules for the database, email, and Redis, each encapsulating its own controllers, providers, and dependencies.
- **Dependency Injection:** Services and repositories are injected through NestJS's built-in IoC container, keeping layers decoupled and easy to mock in tests.
- **Consistent API Responses:** A global response interceptor wraps successful responses and a global exception filter normalizes errors into a common shape.
- **DTO Validation via Zod:** Every incoming request payload is strictly typed and validated before reaching the controller using a custom Zod validation pipe.
- **Resilient Short Link Generation:** Utilizes `nanoid` for generating compact, collision-resistant unique identifiers with built-in existence checks.
- **Dual-Layer Storage:** Persistent URL and User records are maintained in MongoDB (via `@nestjs/mongoose`), while ephemeral data (such as temporary OTPs with TTL) is delegated to Redis.

---

## ✨ Key Features

- **Robust Authentication & Security:**
  - Password hashing with salt rounds via `bcrypt`.
  - Dual-token lifecycle: Short-lived Access Tokens and Refresh Tokens via `jsonwebtoken`.
  - Route protection with a global JWT auth guard; public routes opt out via a `@Public()` decorator.
  - Email verification workflow with time-limited OTPs sent through the Brevo Email API.
  - Ephemeral OTP caching with Redis expiration (TTL).
- **URL Management:**
  - Authenticated route for generating short URLs.
  - Automatic deduplication: If a user submits an existing long URL, the existing short URL is returned.
  - Fast redirection (`GET /:shortId`) resolving to the destination address.
- **Enterprise-Grade Developer Experience:**
  - Fast linting with Oxlint (type-aware) and formatting with Prettier.
  - Hot-reload local development via the Nest CLI (`nest start --watch`).
  - Unit and e2e testing with Jest and Supertest.

---

## 🛠 Tech Stack

- **Runtime & Language:** Node.js (v20+ recommended), TypeScript 6
- **Web Framework:** NestJS 12 (`@nestjs/platform-express`)
- **Configuration:** `@nestjs/config`
- **Databases & Cache:** MongoDB (via `@nestjs/mongoose` + Mongoose 9), Redis 6.3
- **Validation & Serialization:** Zod 4
- **Security & Tokens:** `bcrypt`, `jsonwebtoken`
- **Identifier Generation:** `nanoid`
- **Email Infrastructure:** Brevo (Sendinblue) API
- **Build, Lint & Test Tooling:** Nest CLI, Oxlint, Prettier, Jest, Supertest

---

## 📂 Project Directory Structure

```text
shortly-api/
├── src/
│   ├── common/
│   │   ├── constants/        # Status codes
│   │   ├── decorators/       # @CurrentUser(), @Public()
│   │   ├── dtos/             # Shared Zod field schemas
│   │   ├── filters/          # Global exception filter
│   │   ├── guards/           # JWT auth guard
│   │   ├── interceptors/     # Response formatting interceptor
│   │   ├── interfaces/       # API response & base repository contracts
│   │   ├── pipes/            # Zod validation pipe
│   │   ├── repo/             # Generic base repository
│   │   ├── types/            # Global type declarations
│   │   └── utils/            # OTP generation, password hashing, ObjectId helpers
│   ├── config/               # Environment configuration
│   ├── infrastructure/
│   │   ├── database/         # MongoDB module
│   │   ├── email/            # Brevo email integration
│   │   └── redis/            # Redis module, repository & interface
│   ├── modules/
│   │   ├── auth/             # Controller, service, DTOs, JWT token service, messages
│   │   ├── url/              # Controller, service, repo, schema, DTOs, interfaces
│   │   └── user/             # Repo, schema, mapper, interfaces, messages
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application bootstrap & HTTP server entrypoint
├── test/                     # e2e tests
├── jest.config.ts
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v20.x or higher)
- [MongoDB](https://www.mongodb.com/) (running standalone or replica set `rs0`)
- [Redis](https://redis.io/)

### Environment Variables

Create a `.env` file in the root of the project directory:

```env
# Application Settings
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database & Cache
MONGO_URI=mongodb://127.0.0.1:27017/url?replicaSet=rs0
REDIS_URI=redis://127.0.0.1:6379

# Email Infrastructure (Brevo)
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER=your_verified_sender@example.com

# JSON Web Token
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Base Short URL Domain
BASE=http://localhost:3000
```

---

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd shortly-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode (watch):**
   ```bash
   npm run start:dev
   ```

4. **Linting and Formatting:**
   ```bash
   npm run lint        # Type-aware linting with Oxlint
   npm run format      # Format codebase with Prettier
   ```

5. **Testing:**
   ```bash
   npm run test        # Unit tests
   npm run test:e2e    # End-to-end tests
   npm run test:cov    # Coverage report
   ```

6. **Production Build & Start:**
   ```bash
   npm run build
   npm run start:prod
   ```

---

## 📡 API Documentation

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user and dispatch OTP via Brevo | No |
| `POST` | `/api/auth/verify-otp` | Verify email OTP stored in Redis cache | No |
| `POST` | `/api/auth/resend-otp` | Generate and resend a new OTP via Brevo | No |
| `POST` | `/api/auth/login` | Authenticate user credentials & issue Access/Refresh tokens | No |
| `POST` | `/api/auth/refresh` | Renew access token using a valid refresh token | No |

---

### 2. URL Management & Redirection Routes

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/url` | Create a short URL (returns existing if already shortened) | **Yes (JWT)** |
| `GET` | `/:shortId` | Public redirect to the original destination URL | **No (Public)** |

---

## 📖 Design References & Inspirations

- The core mechanics and requirements for URL identifier mapping and HTTP redirection were referenced from LogRocket's guide:
  - Reference: [How to build a URL shortener in Node.js (LogRocket)](https://blog.logrocket.com/how-build-url-shortener-node-js/#why-use-url-shortener)

---

## 🤖 AI-Assisted Development Disclosure

- **Claude AI:**
  - Used for frontend UI layout and styling—specifically generating the landing/home page, responsive navigation bar, and authentication/URL submission forms.
  - Assisted in generating the website favicons and visual branding assets.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).