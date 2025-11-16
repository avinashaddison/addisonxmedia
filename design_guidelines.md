# Design Guidelines for AddisonX Media Website

## Design Approach
**Selected Framework**: Reference-Based (Digital Agency/SaaS hybrid)
- Primary References: Webflow, Framer, HubSpot for professional service credibility
- Secondary Reference: Linear for clean typography and spatial confidence
- Rationale: Digital marketing agency needs to demonstrate design excellence while maintaining business professionalism

## Typography System
**Font Stack** (Google Fonts):
- Primary: Inter (headings, UI elements) - weights 400, 600, 700
- Secondary: Open Sans (body text, descriptions) - weights 400, 600

**Hierarchy**:
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold, leading-tight
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Service Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg, leading-relaxed
- Small Text/Captions: text-sm

## Layout System
**Spacing Units**: Consistent use of Tailwind units 4, 6, 8, 12, 16, 20, 24
- Section Padding: py-16 md:py-24 lg:py-32
- Component Spacing: gap-8 md:gap-12
- Container: max-w-7xl mx-auto px-4 md:px-6

## Core Page Structures

### Home Page (6-7 Sections)
1. **Hero Section** (80vh min-height):
   - Large background image showing digital workspace/team collaboration
   - Overlay with company tagline and primary CTA
   - Trust badge: "Ranchi's Premier Digital Marketing Agency"
   - Dual CTAs: "View Our Services" + "Get Free Consultation"

2. **Services Grid** (3-column on desktop, stacked mobile):
   - 9 service cards with icons (Heroicons)
   - Icon + Title + Brief description (2 lines max)
   - Hover: Subtle lift effect

3. **Why Choose Us Section**:
   - 2-column layout: Left (numbered stats: Projects, Clients, Years), Right (value propositions)
   - Stats display: Large numbers with descriptive labels

4. **Featured Projects/Results** (if applicable):
   - 2-3 column case study cards with results metrics

5. **Location Highlight**:
   - Prominent "Serving Ranchi & Beyond" section
   - Can include map integration placeholder or location graphic
   - Office address, contact info

6. **Testimonials** (2-column cards):
   - Client name, company, quote, optional photo

7. **CTA Section**: 
   - Bold headline, contact form preview or direct contact button

### About Page
- Company story section (single column, max-w-4xl)
- Team/Values grid (3-4 columns)
- Mission statement highlight box
- Timeline or milestone markers

### Services Page
- Hero: Services overview statement
- Detailed service cards (larger than home, 2-column layout)
- Each service: Icon, title, extended description, key benefits list, "Learn More" CTA
- Process visualization (optional: 4-step workflow)

### Contact Page
- 2-column split: Form (left) + Contact Info/Map (right)
- Form fields: Name, Email, Phone, Service Interest (dropdown), Message
- Contact info box: Address (emphasize Ranchi), phone, email, business hours
- Social media links

### Employee Verification Page
- Professional, secure-looking design
- Search interface: Single input field + Search button (centered, prominent)
- Results card: Photo (left), Details (right) in structured layout
- Not Found state: Helpful message with contact option

### Admin Panel
- Dashboard layout: Sidebar navigation + main content area
- Employee list: Table view with action buttons
- Add/Edit form: Clean form layout with photo upload interface
- Replit Auth integration for security

## Component Library

**Navigation**:
- Desktop: Horizontal nav with logo left, links center/right
- Mobile: Hamburger menu, slide-in drawer
- Sticky on scroll with subtle background

**Cards**:
- Service cards: Rounded corners, subtle shadow, padding p-6 md:p-8
- Employee cards: Structured data display, photo circular or square with rounded corners

**Forms**:
- Input fields: Consistent height (h-12), rounded borders, focus states
- Labels: Positioned above inputs, text-sm font-semibold
- Submit buttons: Full-width on mobile, auto-width on desktop

**Buttons**:
- Primary CTA: Larger (px-8 py-4), bold text
- Secondary: Outlined style
- Icon buttons: For admin actions

**Icons**: Heroicons (outline style for most, solid for emphasis)

## Images

**Required Images**:
1. **Hero Image** (Home): High-quality photo of modern digital workspace, team collaboration, or abstract tech pattern (1920x1080 recommended)
2. **About Page**: Team photo or office environment
3. **Service Icons**: Use Heroicons for all 9 services
4. **Employee Photos**: Uploaded by admin, displayed in verification results

**Image Treatment**:
- Hero: Dark overlay (opacity-50 to opacity-70) for text readability
- Cards: Contained within borders, consistent aspect ratios
- Lazy loading for performance

## Responsive Behavior
- Mobile-first approach
- Breakpoints: md (768px), lg (1024px), xl (1280px)
- Navigation: Hamburger below md
- Grids: 1 column mobile → 2 columns md → 3-4 columns lg
- Typography: Scales down appropriately
- Touch targets: Minimum 44px height for mobile

## SEO & Performance
- Semantic HTML5 tags throughout
- Meta tags: Title, description, OG tags for all pages
- Schema markup for LocalBusiness (Ranchi location)
- Alt text for all images
- Optimized image formats (WebP with fallbacks)
- Minimal JavaScript, no unnecessary animations
- Fast loading target: <3 seconds

## Key Design Principles
1. **Professional Credibility**: Clean, confident layouts that demonstrate design expertise
2. **Local Prominence**: Ranchi location featured throughout, especially home/contact
3. **Service Clarity**: Each of 9 services clearly communicated with strong visual hierarchy
4. **Trust Building**: Testimonials, stats, professional presentation throughout
5. **Conversion Focus**: Strategic CTAs, clear contact pathways
6. **System Security**: Admin panel feels secure and professional with proper authentication