# AddisonX Media - Digital Marketing Agency Website

## Overview

AddisonX Media is a digital marketing agency offering web development, ecommerce, SEO, social media marketing, brand promotion, and graphic design services. This full-stack web application showcases services, enables employee verification, and provides an admin dashboard for managing records. It features a modern monorepo architecture with a React frontend (Vite), Express.js backend, and MySQL database (Drizzle ORM), utilizing Replit's authentication for admin access. The project aims to provide a comprehensive platform for the agency's operations and client engagement.

Recent additions: Complete SEO management system with dynamic sitemap.xml generation, robots.txt serving, and favicon management with upload/URL capabilities.

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
- **Public endpoints** for employee verification, active testimonials, active team members, customization data, SEO settings, sitemap.xml, robots.txt, and favicon serving.
- **Protected endpoints** for full CRUD operations across Employees, Contact Submissions, Testimonials, Team Members, Clients, Leads, Projects, Invoices, Customization, Settings, SEO Settings, and Favicon Management.
- **WebSocket endpoint** at `/ws` for real-time notifications (new contact submissions broadcast to all connected admin clients).
- **Contact submission tracking**: GET `/api/contact/unread-count` for unread count, PATCH `/api/contact/:id/mark-read` to mark as read.
- **Image upload support** for employee photos, testimonial photos, team member photos, and favicon via object storage.
- **SEO routes**: GET `/sitemap.xml` for dynamic sitemap, GET `/robots.txt` for robots.txt, GET `/favicon.ico` for favicon serving.
- **Favicon management**: GET `/api/favicon` to fetch current favicon, POST `/api/favicon` to update favicon URL, POST `/api/favicon/upload-url` for signed upload URL.
- Consistent error handling is implemented.

**Storage Layer**: An interface-based storage abstraction (`IStorage`) with a `DatabaseStorage` implementation separates data access logic.

### Data Storage

**Database**: **MySQL** (External hosted database at storage2300.is.cc) is used with **Drizzle ORM** for type-safe operations. Migrated from PostgreSQL to MySQL with full schema conversion.

**MySQL-Specific Implementation**:
- Connection via `mysql2/promise` with connection pooling
- UUID generation handled in application layer using `uuid` package
- Storage layer uses `.onDuplicateKeyUpdate()` for upserts instead of PostgreSQL's `.onConflictDoUpdate()`
- Insert/Update operations manually SELECT after execution (MySQL doesn't support RETURNING clause)
- All varchar columns have explicit length specifications
- JSON columns use MySQL's `json` type instead of PostgreSQL's `jsonb`

**Schema Design**: Key tables include `users`, `employees`, `contact_submissions`, `testimonials`, `team_members`, `clients`, `leads`, `projects`, `invoices`, `settings`, `homepage_customization`, `seo_settings`, `service_banners`, `sessions`, and `verification_logs`. All tables use VARCHAR(255) for UUID primary keys. The `contact_submissions` table includes `isRead` BOOLEAN field for tracking unread status. The `team_members` table uses INT for `displayOrder`, BOOLEAN for `isActive`, and optional VARCHAR(100) for `employeeId` to link team members with employee verification records. Schema definitions managed via Drizzle with MySQL dialect.

### UI/UX Decisions
- **Navbar**: Clean, minimal design with simple logo (no animations or effects). Eye-catching "Contact Us" button with static gradient background (primary→purple), rounded-full pill shape, bold white text, subtle white border, and shadow for depth - no animations.
- **Team Section**: Dynamic team member display with database-driven content. Cool modern design in 3x2 grid layout with gradient title text, premium badge, triple-gradient avatar rings (primary→orange→purple), gradient job titles, enhanced shadows, and consistent card styling. Supports custom photos via object storage or displays initials. Managed through admin panel with full CRUD, image upload, display ordering, and active/inactive status. **Employee Verification Integration**: Team members can optionally be linked to employee IDs. When linked, each card displays an employee ID badge and "Verify Employee" button that directs to the verification page with pre-filled ID.
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
- **Admin Panel**: Vertical Shadcn Sidebar with a full AddisonX Media logo and a "CEO" badge. Full CRUD for all admin features. **Real-time Notifications**: WebSocket-based real-time notifications for new contact form submissions with sound effects and toast notifications. Unread count badge displayed on "Contact Submissions" sidebar menu item. Auto-mark-as-read functionality with 3-second delay when viewing the Contacts page.

## External Dependencies

### Third-Party Services
- **Replit Authentication**: OpenID Connect for admin login.
- **External MySQL Database**: Hosted at storage2300.is.cc (database: st57186_addisonxmedia).
- **Google Cloud Storage**: For file uploads (configured).

### Key NPM Packages
- **Database**: `mysql2`, `drizzle-orm`, `drizzle-zod`, `uuid` (for UUID generation).
- **UI**: `@radix-ui/*`, `cmdk`.
- **Forms & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`.
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
- Utilizes environment variables: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `SESSION_SECRET`, `ISSUER_URL`, `REPL_ID`, `PRIVATE_OBJECT_DIR`.