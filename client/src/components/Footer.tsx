import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-primary/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 pb-8 md:pb-12">
          {/* Company Info - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 border border-primary/30">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                AddisonX Media
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-xs">
              Ranchi's premier digital marketing agency delivering exceptional results through innovative strategies and creative excellence.
            </p>
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-9 w-9 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 hover:scale-110 transition-all duration-300" 
                data-testid="button-social-facebook"
              >
                <Facebook className="h-4 w-4 text-slate-300" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="h-9 w-9 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 hover:scale-110 transition-all duration-300" 
                data-testid="button-social-twitter"
              >
                <Twitter className="h-4 w-4 text-slate-300" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="h-9 w-9 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 hover:scale-110 transition-all duration-300" 
                data-testid="button-social-instagram"
              >
                <Instagram className="h-4 w-4 text-slate-300" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="h-9 w-9 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 hover:scale-110 transition-all duration-300" 
                data-testid="button-social-linkedin"
              >
                <Linkedin className="h-4 w-4 text-slate-300" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
              <h3 className="text-base md:text-lg font-bold text-white">Quick Links</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              <a href="/about" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-about">
                  About Us
                </span>
              </a>
              <a href="/service" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-services">
                  Our Services
                </span>
              </a>
              <a href="/verify-employee" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-verify">
                  Verify Employee
                </span>
              </a>
              <a href="/contact" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-contact">
                  Contact Us
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
              <h3 className="text-base md:text-lg font-bold text-white">Our Services</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              <a href="/service/web-development" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-web-development">
                  Web Development
                </span>
              </a>
              <a href="/service/ecommerce-development" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-ecommerce">
                  Ecommerce Development
                </span>
              </a>
              <a href="/service/brand-promotion" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-brand-promotion">
                  Brand Promotion
                </span>
              </a>
              <a href="/service/local-seo" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-local-seo">
                  Local SEO
                </span>
              </a>
              <a href="/service/social-media-marketing" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-social-media-marketing">
                  Social Media Marketing
                </span>
              </a>
              <a href="/service/graphic-designing" className="group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                <span className="text-sm text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" data-testid="footer-link-graphic-designing">
                  Graphic Designing
                </span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
              <h3 className="text-base md:text-lg font-bold text-white">Contact Us</h3>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed" data-testid="text-location">
                  Itki Road, Vishwakarma Complex, Near Kawasaki Showroom (834001)
                </span>
              </div>
              <a href="tel:+919709707311" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center group-hover:border-primary/50 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors" data-testid="text-phone-1">
                  +91 97097 07311
                </span>
              </a>
              <a href="tel:+919142647797" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center group-hover:border-primary/50 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors" data-testid="text-phone-2">
                  +91 91426 47797
                </span>
              </a>
              <a href="mailto:team@addisonxmedia.com" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center group-hover:border-primary/50 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors break-all" data-testid="text-email">
                  team@addisonxmedia.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-slate-800/50 pt-6 md:pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-slate-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-primary font-semibold">AddisonX Media</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xs md:text-sm text-slate-400">
                Crafted with <span className="text-primary">❤</span> in Ranchi
              </p>
              <Button
                size="icon"
                variant="outline"
                onClick={scrollToTop}
                className="h-9 w-9 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-primary hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 hover:scale-110 transition-all duration-300"
                data-testid="button-scroll-to-top"
              >
                <ArrowUp className="h-4 w-4 text-slate-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
