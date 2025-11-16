# AddisonX Media - Digital Marketing Agency Website

## Overview

AddisonX Media is a digital marketing agency based in Ranchi, Jharkhand, offering comprehensive services including web development, ecommerce solutions, SEO, social media marketing, brand promotion, and graphic design. This is a full-stack web application built to showcase the agency's services, enable employee verification, and provide an admin dashboard for managing employee records.

The application follows a modern monorepo structure with a React frontend powered by Vite, an Express.js backend, and PostgreSQL database using Drizzle ORM. It implements Replit's authentication system for admin access and provides both public-facing pages and protected administrative functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for the UI layer
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query** (React Query) for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with custom design tokens
- **Class Variance Authority (CVA)** for component variant management
- Design follows the "New York" shadcn style with custom typography (Inter for headings, Open Sans for body text)

**State Management Approach**
- Server state managed via TanStack Query with infinite stale time
- Form state handled by React Hook Form with Zod validation
- No global client state management (follows server-driven architecture)

**Route Structure**
- Public routes: Home, About, Services, Contact, Employee Verification
- Admin routes: Dashboard, Employee Management (Create/Edit)
- 404 fallback for undefined routes

### Backend Architecture

**Server Framework**
- **Express.js** application with TypeScript
- Custom middleware for request logging and JSON parsing
- Vite integration for development with HMR support
- Production build uses esbuild for server bundling

**Authentication & Authorization**
- **Replit OpenID Connect (OIDC)** for admin authentication
- **Passport.js** with OpenID Client strategy
- **Express Session** with PostgreSQL session store
- Session-based authentication with 7-day TTL
- Protected routes use `isAuthenticated` middleware

**API Design**
- RESTful endpoints under `/api` prefix
- Public endpoint: `GET /api/employees/verify/:employeeId`
- Protected endpoints: Employee CRUD operations requiring authentication
- Consistent error handling with appropriate HTTP status codes

**Storage Layer Pattern**
- Interface-based storage abstraction (`IStorage`)
- `DatabaseStorage` implementation for PostgreSQL operations
- Separates data access logic from route handlers
- Supports future storage backend swaps without changing business logic

### Data Storage

**Database**
- **PostgreSQL** via Neon serverless database
- **Drizzle ORM** for type-safe database operations
- Connection pooling using `@neondatabase/serverless` with WebSocket support

**Schema Design**
```
users
├── id (UUID, primary key)
├── email (unique)
├── firstName, lastName
├── profileImageUrl
└── createdAt, updatedAt

employees
├── id (UUID, primary key)
├── employeeId (unique, indexed)
├── fullName
├── mobile
├── email
├── position
├── department
├── joiningDate
└── photoUrl

sessions (for Replit Auth)
├── sid (primary key)
├── sess (JSONB)
└── expire (indexed)
```

**Migration Strategy**
- Schema definitions in `shared/schema.ts` using Drizzle Kit
- Push-based migrations via `drizzle-kit push`
- Shared types between frontend and backend via path aliases

### External Dependencies

**Third-Party Services**
- **Replit Authentication**: OpenID Connect for admin login
- **Neon Database**: Serverless PostgreSQL hosting
- **Google Cloud Storage**: Object storage for file uploads (configured but not actively used in current implementation)

**Key NPM Packages**
- **UI Components**: @radix-ui/* (20+ component primitives), cmdk (command palette)
- **Forms & Validation**: react-hook-form, @hookform/resolvers, zod, drizzle-zod
- **Authentication**: passport, openid-client, express-session, connect-pg-simple
- **Styling**: tailwindcss, class-variance-authority, clsx, tailwind-merge
- **Icons**: lucide-react (consistent icon library)
- **Date Handling**: date-fns

**Development Tools**
- **TypeScript** with strict mode enabled
- **ESM modules** throughout (type: "module" in package.json)
- **tsx** for running TypeScript in development
- **esbuild** for production server bundling
- Path aliases: `@/` (client), `@shared/` (shared schemas)

**Deployment Configuration**
- Vite production build outputs to `dist/public`
- Server bundle outputs to `dist/index.js`
- Static file serving in production mode
- Environment variables: `DATABASE_URL`, `SESSION_SECRET`, `ISSUER_URL`, `REPL_ID`, `PRIVATE_OBJECT_DIR`