import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/Screenshot 2025-11-15 182956_1763276506016.png";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/verify-employee", label: "Verify Employee" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary/90 to-purple-600/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-10 text-xs md:text-sm">
            <div className="flex items-center gap-4 md:gap-6 text-white/90">
              <a href="tel:+919709707311" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-phone">
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span className="hidden sm:inline">+91 97097 07311</span>
              </a>
              <a href="mailto:team@addisonxmedia.com" className="flex items-center gap-1.5 hover:text-white transition-colors" data-testid="link-email">
                <Mail className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span className="hidden sm:inline">team@addisonxmedia.com</span>
              </a>
            </div>
            <div className="text-white/90 font-medium hidden md:block">
              Ranchi's Premier Digital Marketing Agency
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img 
                  src={logoUrl} 
                  alt="AddisonX Media" 
                  className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105"
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <Button
                      variant={location === link.path ? "default" : "ghost"}
                      size="default"
                      className="w-full justify-start font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button 
                    size="default" 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-cta-mobile"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
