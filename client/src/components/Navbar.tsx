import { Link, useLocation } from "wouter";
import { Phone, Mail, Sparkles, Home, Info, Briefcase, UserCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/Screenshot 2025-11-15 182956_1763276506016.png";

export function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/services", label: "Services", icon: Briefcase },
    { path: "/verify-employee", label: "Verify", icon: UserCheck },
    { path: "/contact", label: "Contact", icon: MessageCircle },
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
      <nav className="bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo - Optimized for Mobile */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img 
                  src={logoUrl} 
                  alt="AddisonX Media" 
                  className="h-10 md:h-14 w-auto transition-transform group-hover:scale-105"
                  data-testid="img-logo"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Button
                    variant={location === link.path ? "default" : "ghost"}
                    size="default"
                    data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="font-medium px-4"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
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
