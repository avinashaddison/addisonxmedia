import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
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
              <Link href="/about">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-about">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  About Us
                </span>
              </Link>
              <Link href="/services">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-services">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Our Services
                </span>
              </Link>
              <Link href="/verify-employee">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-verify">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Verify Employee
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-slate-300 hover:text-primary cursor-pointer transition-all hover:translate-x-1 inline-block group" data-testid="footer-link-contact">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                  Contact Us
                </span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-slate-300">Web Development</span>
              <span className="text-sm text-slate-300">Ecommerce Solutions</span>
              <span className="text-sm text-slate-300">SEO Optimization</span>
              <span className="text-sm text-slate-300">Digital Marketing</span>
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
                <span className="text-sm text-slate-300" data-testid="text-location">
                  Ranchi, Jharkhand, India
                </span>
              </div>
              <a href="tel:+919709707311" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/50 transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-primary transition-colors" data-testid="text-phone">
                  +91 97097 07311
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
