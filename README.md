# Event Management Application

This is a Node.js application for managing events, built with Next.js and Drizzle ORM.

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/SSameer20/event-management
cd event-management
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following format:

```
# Database connection string
DATABASE_URL=p

# Redis connection string
REDIS_URL=
```

### 4. Generate and Migrate Database

Generate database types and run migrations:

```
npm run db:generate
npm run db:migrate
```

### 5. Start the Development Server

```
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run db:generate` — Generate database types using Drizzle
- `npm run db:migrate` — Run database migrations
- `npm run dev` — Start the development server

## Project Structure

- `app/` — Next.js application pages and API routes
- `components/` — React components
- `db/` — Database schema, migrations, and types
- `lib/` — Helper utilities
- `services/` — Service layer for business logic
- `types/` — TypeScript types
