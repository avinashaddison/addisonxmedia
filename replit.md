# AddisonX Media - Digital Marketing Agency Website

## Overview

AddisonX Media is a digital marketing agency based in Ranchi, Jharkhand, offering comprehensive services including web development, ecommerce solutions, SEO, social media marketing, brand promotion, and graphic design. This is a full-stack web application built to showcase the agency's services, enable employee verification, and provide an admin dashboard for managing employee records.

The application follows a modern monorepo structure with a React frontend powered by Vite, an Express.js backend, and PostgreSQL database using Drizzle ORM. It implements Replit's authentication system for admin access and provides both public-facing pages and protected administrative functionality.

**Recent Updates:**
- **November 17, 2025 (Latest)**: Added active state styling to desktop navigation menu - current page is highlighted with orange (primary) background and white text. Desktop navigation includes dropdown menu under "Services" link displaying all 9 services in a 3-column grid layout. Each service shows icon, title, and description with hover effects. All navigation items use NavigationMenuLink with asChild pattern for proper keyboard accessibility and valid HTML (no nested anchors). Mobile navigation unchanged.
- **November 17, 2025**: Implemented comprehensive website customization system enabling dynamic homepage control through admin panel. Added new Customize page with 3 tabs (Services, Images, SEO) allowing administrators to modify services section content (title/description/service list), banner/slider images, and SEO meta tags for all pages. Created homepage_customization and seo_settings database tables with upsert-based API routes. Homepage displays clean banner image without text overlay in hero section. Services section respects admin customizations while maintaining default service list with safe fallback to defaults when no customization exists. All forms properly hydrate existing data via useEffect hooks. Architect-reviewed and approved.
- **November 17, 2025**: Implemented fully functional dark theme with toggle button - admin panel defaults to dark mode on load, theme toggle in header switches between light/dark with smooth animations, theme preference persists in localStorage, synchronous initialization prevents light-mode flash. Updated admin sidebar to display full horizontal AddisonX Media logo (complete with AX symbol and "AddisonX Media.Com" text) featuring subtle rounded corners, white background, and red/orange glow effect matching brand colors. Added stylish "CEO - Mr. AJAY KUMAR" badge below logo with gradient background, gradient text, and backdrop blur for modern appearance. Enhanced dark theme with deeper backgrounds (3% lightness), darker cards and sidebar, subtler borders, enhanced shadows for better depth. All features architect-approved.
- **November 17, 2025**: Completed full CRUD implementation for all admin features - Clients, Leads, Projects, Invoices, and Settings management. All placeholder pages now have complete functionality including listing pages with statistics, comprehensive forms with validation, and full backend API integration with PostgreSQL storage.
- **November 17, 2025**: Comprehensive admin panel with vertical Shadcn Sidebar, featuring 13 management categories including dashboard with analytics, contact submissions tracking, employee management. Layout refactored to separate admin and public routes completely.
- **November 16, 2025**: Homepage hero section now features a custom promotional banner (1728 x 576 pixels) showcasing AddisonX Media's professional digital marketing services with branding, service highlights, and "Get Started Now" CTA.

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
- **Public routes**: Home, About, Services, Contact, Employee Verification
- **Admin routes** (all wrapped with AdminLayout):
  - Dashboard: Analytics overview with statistics and quick actions
  - Employees: Full CRUD employee management
  - Contacts: Contact submission tracking with status management (new/contacted/closed)
  - Testimonials: Testimonial management with approval workflow
  - Analytics: Verification statistics and metrics
  - **Clients**: Complete client management with status tracking (active/pending/inactive)
  - **Leads**: Lead management with source tracking and follow-up dates (new/contacted/qualified/converted/lost)
  - **Projects**: Project management with budget tracking and payment status (planning/in-progress/review/completed/cancelled)
  - **Invoices**: Invoice management with payment tracking and due dates (pending/paid/overdue/cancelled)
  - **Customize**: Website customization with tabbed interface for hero section, services, images, and SEO settings management
  - **Settings**: Company configuration management (company info, contact details, system settings)
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
- **Public endpoints**:
  - `GET /api/employees/verify/:employeeId` - Employee verification
  - `GET /api/testimonials/active` - Active testimonials for public display
  - `GET /api/customization` - Get all homepage customizations (used by homepage)
  - `GET /api/seo` - Get all SEO settings
- **Protected endpoints** (require authentication):
  - Employee CRUD: GET/POST/PUT/DELETE `/api/employees`
  - Contact submissions: GET `/api/contact`, PATCH `/api/contact/:id/status`
  - Testimonials: GET/POST/PUT/DELETE `/api/testimonials`
  - Analytics: GET `/api/analytics/verification-stats`
  - **Clients CRUD**: GET/POST/PUT/DELETE `/api/clients` (name, email, phone, company, status, assignedTo)
  - **Leads CRUD**: GET/POST/PUT/DELETE `/api/leads` (name, email, phone, source, status, followUpDate)
  - **Projects CRUD**: GET/POST/PUT/DELETE `/api/projects` (name, clientId, status, priority, budget, paymentStatus)
  - **Invoices CRUD**: GET/POST/PUT/DELETE `/api/invoices` (invoiceNumber, clientId, projectId, amount, tax, status)
  - **Customization**: POST `/api/customization` (upsert homepage customization by section: hero, services, banners)
  - **SEO Settings**: POST `/api/seo` (upsert SEO settings by page: home, about, services, contact)
  - **Settings**: GET/POST `/api/settings` (key-value pair storage with upsert functionality)
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

contact_submissions
├── id (VARCHAR UUID, primary key)
├── name, email, phone, company
├── message
├── status (new/contacted/closed)
└── createdAt

testimonials
├── id (VARCHAR UUID, primary key)
├── clientName, position, company
├── content, rating, photoUrl
├── isActive (boolean)
└── createdAt, updatedAt

clients
├── id (VARCHAR UUID, primary key)
├── name, email, phone, company
├── address, notes
├── status (active/pending/inactive)
├── assignedTo
└── createdAt

leads
├── id (VARCHAR UUID, primary key)
├── name, email, phone, company
├── source (website/referral/social/ad)
├── status (new/contacted/qualified/converted/lost)
├── assignedTo, notes
├── followUpDate
└── createdAt

projects
├── id (VARCHAR UUID, primary key)
├── name, clientId, description
├── status (planning/in-progress/review/completed/cancelled)
├── priority (low/medium/high)
├── assignedTo
├── startDate, deadline
├── budget, paymentStatus (pending/partial/paid)
└── createdAt

invoices
├── id (VARCHAR UUID, primary key)
├── invoiceNumber, clientId, projectId
├── amount, tax, total
├── status (pending/paid/overdue/cancelled)
├── dueDate, paidDate
├── notes
└── createdAt

settings
├── id (SERIAL, primary key)
├── key (unique)
├── value
├── category
└── updatedAt

homepage_customization
├── id (SERIAL, primary key)
├── section (unique: hero/services/banners)
├── content (JSONB: flexible structure per section)
├── isActive (VARCHAR)
├── createdAt
└── updatedAt

seo_settings
├── id (SERIAL, primary key)
├── page (unique: home/about/services/contact)
├── metaTitle, metaDescription, metaKeywords
├── ogTitle, ogDescription, ogImage
└── updatedAt

sessions (for Replit Auth)
├── sid (primary key)
├── sess (JSONB)
└── expire (indexed)

verification_logs
├── id (serial, primary key)
├── employeeId, found (for analytics)
└── timestamp
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