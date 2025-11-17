import { Link, useLocation } from "wouter";
import { Phone, Mail, Sparkles, Home, Info, Briefcase, UserCheck, MessageCircle, MessageSquare, Code, ShoppingCart, TrendingUp, Search, Target, Palette, Share2, Wrench } from "lucide-react";
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
    description: "Custom websites built with modern technologies"
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    description: "Complete online store solutions"
  },
  {
    icon: TrendingUp,
    title: "Brand Promotion",
    description: "Strategic brand building campaigns"
  },
  {
    icon: Search,
    title: "Local SEO",
    description: "Dominate local search results"
  },
  {
    icon: Target,
    title: "Ads Management",
    description: "Data-driven advertising campaigns"
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Creative visual designs"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    description: "Direct customer engagement"
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build and engage your community"
  },
  {
    icon: Wrench,
    title: "Custom Development",
    description: "Tailored software solutions"
  }
];

export function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/services?filter=web-development", label: "Web Dev", icon: Code },
    { path: "/services?filter=ads-management", label: "Ads", icon: Target },
    { path: "/services?filter=whatsapp-marketing", label: "WhatsApp", icon: MessageCircle },
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
                <a href="tel:+919709707311" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-phone">
                  <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>+91 97097 07311</span>
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
            {/* Mobile Logo with Brand Info */}
            <Link href="/" data-testid="link-home" className="flex-1 lg:flex-none">
              <div className="flex items-center gap-3 cursor-pointer group">
                {/* Logo Container with Glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 lg:hidden"></div>
                  <div className="relative bg-gradient-to-br from-primary/5 to-purple-500/5 p-1.5 rounded-xl lg:bg-transparent lg:p-0">
                    <img 
                      src={logoUrl} 
                      alt="AddisonX Media" 
                      className="h-9 md:h-14 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
                      data-testid="img-logo"
                    />
                  </div>
                </div>
                
                {/* Mobile Brand Text with Gradient */}
                <div className="lg:hidden flex flex-col">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient">
                    AddisonX
                  </span>
                  <span className="text-[9px] text-muted-foreground font-medium tracking-wide">
                    Digital Marketing
                  </span>
                </div>
              </div>
            </Link>

            {/* Mobile Action Buttons with Premium Style */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Phone Call Button */}
              <a 
                href="tel:+919709707311"
                className="relative group"
                data-testid="button-mobile-call"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-emerald-600/40 rounded-xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200/50 dark:border-green-800/50 transition-all duration-300 group-active:scale-90 shadow-lg">
                  <Phone className="h-4.5 w-4.5 text-green-600 dark:text-green-400" />
                </div>
              </a>

              {/* Contact Message Button */}
              <Link href="/contact">
                <button 
                  className="relative group"
                  data-testid="button-mobile-contact"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-xl blur-md opacity-60 group-active:opacity-90 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-xl shadow-primary/40 transition-all duration-300 group-active:scale-90">
                    <MessageSquare className="h-4.5 w-4.5 text-white" />
                  </div>
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
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${location === '/services' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/services">
                        <Code className="h-4 w-4 mr-2" />
                        Web Development
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Ads Management */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${location === '/services' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/services">
                        <Target className="h-4 w-4 mr-2" />
                        Ads Management
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* WhatsApp Marketing */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${location === '/services' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <Link href="/services">
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
                              <Link href="/services" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" data-testid={`nav-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
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

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link href="/contact">
                <Button 
                  size="default" 
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-6"
                  data-testid="button-cta-desktop"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Accent Line */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </nav>
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
            const isActive = location === link.path;
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
