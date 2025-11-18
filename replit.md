# AddisonX Media - Digital Marketing Agency Website

## Overview

AddisonX Media is a digital marketing agency offering web development, ecommerce, SEO, social media marketing, brand promotion, and graphic design services. This full-stack web application showcases services, enables employee verification, and provides an admin dashboard for managing records. It features a modern monorepo architecture with a React frontend (Vite), Express.js backend, and PostgreSQL database (Drizzle ORM), utilizing Replit's authentication for admin access. The project aims to provide a comprehensive platform for the agency's operations and client engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend uses **React 18** with TypeScript, **Vite** for building, and **Wouter** for routing. **TanStack Query** manages server state. The UI is built with **shadcn/ui** (based on Radix UI) and styled with **Tailwind CSS**, following the "New York" shadcn style with custom typography. State management is primarily server-driven with **React Hook Form** and **Zod** for form validation.

**Route Structure**:
- **Public**: Home, About, Services, Contact, Employee Verification.
- **Admin**: Dashboard, Employees, Contacts, Testimonials, Team Members, Analytics, Clients, Leads, Projects, Invoices, Customize (homepage/SEO), Settings.

### Backend Architecture

The backend is an **Express.js** application with TypeScript. **Replit OpenID Connect (OIDC)** and **Passport.js** handle admin authentication and authorization, secured by session-based authentication.

**API Design**:
- **RESTful endpoints** under `/api`.
- **Public endpoints** for employee verification, active testimonials, active team members, customization data, and SEO settings.
- **Protected endpoints** for full CRUD operations across Employees, Contact Submissions, Testimonials, Team Members, Clients, Leads, Projects, Invoices, Customization, and Settings.
- **Image upload support** for employee photos, testimonial photos, and team member photos via object storage.
- Consistent error handling is implemented.

**Storage Layer**: An interface-based storage abstraction (`IStorage`) with a `DatabaseStorage` implementation separates data access logic.

### Data Storage

**Database**: **PostgreSQL** (Neon serverless) is used with **Drizzle ORM** for type-safe operations.

**Schema Design**: Key tables include `users`, `employees`, `contact_submissions`, `testimonials`, `team_members`, `clients`, `leads`, `projects`, `invoices`, `settings`, `homepage_customization`, `seo_settings`, `sessions`, and `verification_logs`. The `team_members` table uses proper integer type for `displayOrder` and boolean type for `isActive` to ensure correct sorting and filtering. Schema definitions are managed via `drizzle-kit`.

### UI/UX Decisions
- **Navbar**: Clean, minimal design with simple logo (no animations or effects). Eye-catching "Contact Us" button with static gradient background (primary→purple), rounded-full pill shape, bold white text, subtle white border, and shadow for depth - no animations.
- **Team Section**: Dynamic team member display with database-driven content. Cool modern design in 3x2 grid layout with gradient title text, premium badge, triple-gradient avatar rings (primary→orange→purple), gradient job titles, enhanced shadows, and consistent card styling. Supports custom photos via object storage or displays initials. Managed through admin panel with full CRUD, image upload, display ordering, and active/inactive status.
- **Service Detail Pages**: Completely redesigned with modern, conversion-focused layout including:
  - Full-width hero section with gradient backgrounds, service icon, title, description, and dual CTAs
  - 4-column stats grid showing key metrics (projects completed, success rate, etc.)
  - About section with benefits grid highlighting service advantages
  - Comprehensive 3-column features grid with checkmark icons
  - 4-step process workflow visualization
  - Enhanced case studies layout with challenge/solution/results
  - Portfolio showcase with image gallery and hover effects
  - Final CTA section with contact information
  - Service banner API endpoint (`/api/service-banner`) ready for future custom banner uploads via admin panel
- **WhatsApp Widget**: Interactive chat with quick reply buttons, custom input, and mobile-responsive design.
- **Navigation**: Main navigation restructured for service-specific links. Mobile bottom navigation mirrors desktop.
- **Website Customization**: Admin panel for dynamic homepage control (services, images, SEO meta tags).
- **Dark Theme**: Fully functional dark theme with toggle, localStorage persistence, and synchronous initialization. Admin panel defaults to dark mode. Enhanced dark theme visuals.
- **Admin Panel**: Vertical Shadcn Sidebar with a full AddisonX Media logo and a "CEO" badge. Full CRUD for all admin features.

## External Dependencies

### Third-Party Services
- **Replit Authentication**: OpenID Connect for admin login.
- **Neon Database**: Serverless PostgreSQL hosting.
- **Google Cloud Storage**: For file uploads (configured).

### Key NPM Packages
- **UI**: `@radix-ui/*`, `cmdk`.
- **Forms & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`, `drizzle-zod`.
- **Authentication**: `passport`, `openid-client`, `express-session`, `connect-pg-simple`.
- **Styling**: `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`.
- **Icons**: `lucide-react`.
- **Date Handling**: `date-fns`.

### Development Tools
- **TypeScript** (strict mode), **ESM modules**.
- `tsx` for development, `esbuild` for production server bundling.
- Path aliases: `@/`, `@shared/`.

### Deployment Configuration
- Vite outputs to `dist/public`, server bundle to `dist/index.js`.
- Utilizes environment variables: `DATABASE_URL`, `SESSION_SECRET`, `ISSUER_URL`, `REPL_ID`, `PRIVATE_OBJECT_DIR`.