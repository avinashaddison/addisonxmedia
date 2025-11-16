import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-card via-background to-card border-t-2 border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AddisonX Media
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Ranchi's premier digital marketing agency delivering exceptional results through innovative strategies and creative excellence.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="h-9 w-9" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-9 w-9" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-9 w-9" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-9 w-9" data-testid="button-social-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/about">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors hover:translate-x-1 inline-block" data-testid="footer-link-about">
                  → About Us
                </span>
              </Link>
              <Link href="/services">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors hover:translate-x-1 inline-block" data-testid="footer-link-services">
                  → Our Services
                </span>
              </Link>
              <Link href="/verify-employee">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors hover:translate-x-1 inline-block" data-testid="footer-link-verify">
                  → Verify Employee
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors hover:translate-x-1 inline-block" data-testid="footer-link-contact">
                  → Contact Us
                </span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">Web Development</span>
              <span className="text-sm text-muted-foreground">Ecommerce Solutions</span>
              <span className="text-sm text-muted-foreground">SEO Optimization</span>
              <span className="text-sm text-muted-foreground">Digital Marketing</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground" data-testid="text-location">
                  Ranchi, Jharkhand, India
                </span>
              </div>
              <a href="tel:+919709707311" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors" data-testid="text-phone">
                  +91 97097 07311
                </span>
              </a>
              <a href="mailto:team@addisonxmedia.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors break-all" data-testid="text-email">
                  team@addisonxmedia.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AddisonX Media. All rights reserved. | Crafted with passion in Ranchi
          </p>
        </div>
      </div>
    </footer>
  );
}
