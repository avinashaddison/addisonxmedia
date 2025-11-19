import { Link, useLocation } from "wouter";
import { Phone, Mail, Sparkles, Home, Info, Briefcase, UserCheck, MessageCircle, MessageSquare, Code, ShoppingCart, TrendingUp, Search, Target, Palette, Share2, Wrench, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logoUrl from "@assets/Screenshot 2025-11-15 182956_1763276506016.png";

const services = [
  {
    icon: Code,
    title: "Web Development",
    slug: "web-development",
    description: "Custom websites built with modern technologies",
    subcategories: [
      "Business Website",
      "Portfolio Website",
      "School / College Website",
      "Hospital / Clinic Website",
      "Restaurant & Cafe Website",
      "Real Estate Website",
      "NGO Website",
      "Corporate Website",
      "Landing Page Design",
      "Multi-Page / Single Page Websites",
      "Website Redesign",
      "Speed Optimization",
      "Hosting + Domain Setup",
      "Business Email Setup",
      "Website Maintenance"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    slug: "ecommerce-development",
    description: "Complete online store solutions",
    subcategories: [
      "Full eCommerce Store",
      "Product Management System",
      "Shopping Cart Integration",
      "Payment Gateway Integration",
      "COD + Online Payment Setup",
      "Order Tracking System",
      "Inventory Management",
      "Coupon & Discount System",
      "Multi-Vendor eCommerce",
      "Product Uploading",
      "Store Automation (Email/WhatsApp)"
    ]
  },
  {
    icon: TrendingUp,
    title: "Brand Promotion",
    slug: "brand-promotion",
    description: "Strategic brand building campaigns",
    subcategories: [
      "Online Branding Strategy",
      "Brand Awareness Campaigns",
      "Google Business Profile Optimization",
      "Reputation Management",
      "Brand Guidelines Creation",
      "Hashtag Research",
      "Review Boosting Strategy",
      "Influencer Collaboration Planning"
    ]
  },
  {
    icon: Search,
    title: "Local SEO",
    slug: "local-seo",
    description: "Dominate local search results",
    subcategories: [
      "Google Maps Ranking",
      "Local Keyword Optimization",
      "Business Listing Optimization",
      "Review Management",
      "NAP Citations (Name/Address/Phone)",
      "Local Backlinks",
      "Local Content Creation",
      "Competitor Research"
    ]
  },
  {
    icon: Target,
    title: "Ads Management",
    slug: "ads-management",
    description: "Data-driven advertising campaigns",
    subcategories: [
      "Facebook Ads",
      "Instagram Ads",
      "Google Search Ads",
      "Google Display Ads",
      "Lead Generation Ads",
      "Remarketing Ads",
      "Conversion Optimization",
      "Ad Creative Designing",
      "A/B Testing",
      "Analytics & Reporting"
    ]
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: "Creative visual designs",
    subcategories: [
      "Logo Design",
      "Business Card",
      "Poster / Banner",
      "Social Media Creatives",
      "Brochures / Flyers",
      "Visiting Card",
      "Packaging Design",
      "YouTube Thumbnail",
      "Ad Creatives",
      "Brand Identity Kit"
    ]
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    slug: "whatsapp-marketing",
    description: "Direct customer engagement",
    subcategories: [
      "Bulk WhatsApp Messaging",
      "WhatsApp Chatbot Setup",
      "Automated Reply System",
      "WhatsApp API Setup",
      "Customer Follow-up Automation",
      "Campaign Management",
      "Business Catalog Setup"
    ]
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Build and engage your community",
    subcategories: [
      "Instagram Management",
      "Facebook Page Management",
      "Daily Posting & Scheduling",
      "Reels Strategy",
      "Content Writing",
      "Hashtag Research",
      "Engagement Boosting",
      "Page Growth Strategy",
      "Social Media Ads Integration",
      "Monthly Analytics Report"
    ]
  },
  {
    icon: Wrench,
    title: "Custom Development",
    slug: "custom-development",
    description: "Tailored software solutions",
    subcategories: [
      "Custom Web Tools",
      "Client Management System (CRM)",
      "Booking Systems",
      "Appointment Software",
      "Automation Tools",
      "Custom Dashboard",
      "Billing/Invoice Software",
      "Membership/Subscription Systems"
    ]
  }
];

export function Navbar() {
  const [location] = useLocation();
  const isServiceDetailPage = location.startsWith('/service/');
  const currentServiceSlug = isServiceDetailPage ? location.split('/service/')[1] : null;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/service/web-development", label: "Web Dev", icon: Code },
    { path: "/service/ads-management", label: "Ads", icon: Target },
    { path: "/service/whatsapp-marketing", label: "WhatsApp", icon: MessageCircle },
    { path: "/services", label: "All Services", icon: Briefcase },
  ];

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top Bar - Hidden on Mobile for App-like Feel */}
        <div className="bg-gradient-to-r from-primary/90 to-purple-600/90 backdrop-blur-sm hidden md:block">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-10 text-xs md:text-sm">
              <div className="flex items-center gap-4 md:gap-6 text-white/90">
                <div className="flex items-center gap-1.5" data-testid="business-hours">
                  <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>10:30 AM - 7:00 PM</span>
                </div>
                <a href="tel:+919709707311" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-phone-1">
                  <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>+91 97097 07311</span>
                </a>
                <a href="tel:+919142647797" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-phone-2">
                  <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>+91 91426 47797</span>
                </a>
                <a href="mailto:team@addisonxmedia.com" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-email">
                  <Mail className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>team@addisonxmedia.com</span>
                </a>
              </div>
              <div className="text-white/90 font-medium">
                Ranchi's Premier Digital Marketing Agency
              </div>
            </div>
          </div>
        </div>

      {/* Main Navigation */}
      <nav className="relative bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Desktop Logo - Simple Design */}
            <Link href="/" data-testid="link-home" className="hidden lg:block">
              <div className="flex items-center gap-3 cursor-pointer group">
                <img 
                  src={logoUrl} 
                  alt="AddisonX Media" 
                  className="h-12 w-auto"
                  data-testid="img-logo"
                />
              </div>
            </Link>

            {/* Mobile Logo with Brand Info */}
            <Link href="/" data-testid="link-home-mobile" className="flex-1 lg:hidden">
              <div className="flex items-center gap-3 cursor-pointer">
                <img 
                  src={logoUrl} 
                  alt="AddisonX Media" 
                  className="h-9 md:h-14 w-auto"
                  data-testid="img-logo-mobile"
                />
                
                {/* Mobile Brand Text */}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary">
                    AddisonX
                  </span>
                  <span className="text-[9px] text-muted-foreground font-medium tracking-wide">
                    Digital Marketing
                  </span>
                </div>
              </div>
            </Link>

            {/* Mobile Action Buttons */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Phone Call Button */}
              <a 
                href="tel:+919709707311"
                className="flex items-center justify-center w-11 h-11 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 hover-elevate"
                data-testid="button-mobile-call"
              >
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </a>

              {/* Contact Message Button */}
              <Link href="/contact">
                <button 
                  className="flex items-center justify-center w-11 h-11 rounded-md bg-primary text-white hover-elevate"
                  data-testid="button-mobile-contact"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${location === '/' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/">
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Web Development */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${currentServiceSlug === 'web-development' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/service/web-development">
                        <Code className="h-4 w-4 mr-2" />
                        Web Development
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Ads Management */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${currentServiceSlug === 'ads-management' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/service/ads-management">
                        <Target className="h-4 w-4 mr-2" />
                        Ads Management
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* WhatsApp Marketing */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${currentServiceSlug === 'whatsapp-marketing' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/service/whatsapp-marketing">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Marketing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* All Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger data-testid="nav-all-services-trigger" className={location === '/services' ? 'bg-primary text-primary-foreground' : ''}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      All Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[800px] gap-3 p-6 md:grid-cols-3">
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <NavigationMenuLink key={service.title} asChild>
                              <Link href={`/service/${service.slug}`} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" data-testid={`nav-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                                    <Icon className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="text-sm font-medium leading-none">{service.title}</div>
                                </div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTA Button - Desktop - Cool Static Design */}
            <div className="hidden lg:block">
              <Link href="/contact">
                <Button 
                  size="default" 
                  className="bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg px-8 rounded-full border-2 border-white/20"
                  data-testid="button-cta-desktop"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Accent Line */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </nav>

      {/* Cool Submenu - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isActive = currentServiceSlug === service.slug;
                  return (
                    <NavigationMenuItem key={service.slug}>
                      <NavigationMenuTrigger 
                        className={`h-11 text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                        data-testid={`submenu-trigger-${service.slug}`}
                      >
                        <Icon className="h-4 w-4 mr-1.5" />
                        {service.title}
                        <ChevronDown className="ml-1 h-3 w-3 opacity-60" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[450px] p-4">
                          {/* Service Header */}
                          <Link href={`/service/${service.slug}`}>
                            <div className="flex items-center gap-3 p-3 mb-3 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 hover-elevate cursor-pointer group">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-xs text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                          </Link>

                          {/* Subcategories Grid */}
                          <div className="grid grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto">
                            {service.subcategories.map((subcategory, idx) => (
                              <Link 
                                key={idx} 
                                href={`/service/${service.slug}`}
                                className="group"
                              >
                                <div className="flex items-center gap-2 p-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                                  <span className="text-xs font-medium leading-tight">{subcategory}</span>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* View All Link */}
                          <Link href={`/service/${service.slug}`}>
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                                <span className="text-xs font-semibold text-primary">View {service.title} Details</span>
                                <ChevronDown className="h-3 w-3 text-primary rotate-[-90deg]" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Bottom Navigation Bar - Premium App Experience */}
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient Backdrop Blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/95 backdrop-blur-2xl"></div>
      
      {/* Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Navigation Content */}
      <div className="relative px-2 pt-2 pb-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            let isActive = false;
            
            if (link.path === '/') {
              isActive = location === '/';
            } else if (link.path.startsWith('/service/')) {
              isActive = location === link.path;
            } else {
              isActive = location === link.path;
            }
            
            return (
              <Link key={link.path} href={link.path}>
                <button
                  className={`
                    relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl
                    transition-all duration-300 ease-out min-w-[68px]
                    ${isActive 
                      ? 'bg-primary/10 scale-105' 
                      : 'hover:bg-muted/50 active:scale-95'
                    }
                  `}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/20 rounded-2xl blur-xl opacity-60"></div>
                  )}
                  
                  {/* Icon Container */}
                  <div className={`
                    relative flex items-center justify-center w-10 h-10 rounded-xl
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30' 
                      : 'bg-transparent'
                    }
                  `}>
                    {isActive && (
                      <div className="absolute inset-0 bg-primary rounded-xl blur-md opacity-40 animate-pulse"></div>
                    )}
                    <Icon className={`
                      relative z-10 transition-all duration-300
                      ${isActive 
                        ? 'h-5 w-5 text-white stroke-[2.5]' 
                        : 'h-6 w-6 text-muted-foreground stroke-[2]'
                      }
                    `} />
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    text-[9px] font-medium transition-all duration-300 relative z-10
                    ${isActive 
                      ? 'text-primary font-bold tracking-wide' 
                      : 'text-muted-foreground'
                    }
                  `}>
                    {link.label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
    </>
  );
}
