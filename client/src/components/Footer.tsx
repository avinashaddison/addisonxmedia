import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-primary/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              AddisonX Media
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Ranchi's premier digital marketing agency delivering exceptional results through innovative strategies and creative excellence.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="h-10 w-10 border-slate-700 hover:border-primary hover:bg-primary/10 transition-all" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4 text-slate-300" />
              </Button>
              <Button size="icon" variant="outline" className="h-10 w-10 border-slate-700 hover:border-primary hover:bg-primary/10 transition-all" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4 text-slate-300" />
              </Button>
              <Button size="icon" variant="outline" className="h-10 w-10 border-slate-700 hover:border-primary hover:bg-primary/10 transition-all" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4 text-slate-300" />
              </Button>
              <Button size="icon" variant="outline" className="h-10 w-10 border-slate-700 hover:border-primary hover:bg-primary/10 transition-all" data-testid="button-social-linkedin">
                <Linkedin className="h-4 w-4 text-slate-300" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <a href="/about">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-about">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  About Us
                </span>
              </a>
              <a href="/service">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-services">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Our Services
                </span>
              </a>
              <a href="/verify-employee">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-verify">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Verify Employee
                </span>
              </a>
              <a href="/contact">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-contact">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Contact Us
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <div className="flex flex-col gap-3">
              <a href="/service/web-development">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-web-development">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Web Development
                </span>
              </a>
              <a href="/service/ecommerce-development">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-ecommerce">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Ecommerce Development
                </span>
              </a>
              <a href="/service/brand-promotion">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-brand-promotion">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Brand Promotion
                </span>
              </a>
              <a href="/service/local-seo">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-local-seo">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Local SEO
                </span>
              </a>
              <a href="/service/ads-management">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-ads-management">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Ads Management
                </span>
              </a>
              <a href="/service/graphic-designing">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-graphic-designing">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Graphic Designing
                </span>
              </a>
              <a href="/service/whatsapp-marketing">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-whatsapp-marketing">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  WhatsApp Marketing
                </span>
              </a>
              <a href="/service/social-media-marketing">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-social-media-marketing">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Social Media Marketing
                </span>
              </a>
              <a href="/service/custom-development">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer hover:translate-x-1 inline-block group" data-testid="footer-link-custom-development">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary"></span>
                  Custom Development
                </span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed" data-testid="text-location">
                  AddisonX Media, Itki Road, Vishwakarma Complex, Near Kawasaki Showroom (834001)
                </span>
              </div>
              <a href="tel:+919709707311" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/50 transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors" data-testid="text-phone-1">
                  +91 97097 07311
                </span>
              </a>
              <a href="tel:+919142647797" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/50 transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors" data-testid="text-phone-2">
                  +91 91426 47797
                </span>
              </a>
              <a href="mailto:team@addisonxmedia.com" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/50 transition-all">
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
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} <span className="text-primary font-semibold">AddisonX Media</span>. All rights reserved.
            </p>
            <p className="text-sm text-slate-400">
              Crafted with <span className="text-primary">❤</span> in Ranchi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
