import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AddisonX Media</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ranchi's premier digital marketing agency delivering exceptional results through innovative strategies and creative excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-about">
                  About Us
                </span>
              </Link>
              <Link href="/services">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-services">
                  Our Services
                </span>
              </Link>
              <Link href="/verify-employee">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-verify">
                  Verify Employee
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-contact">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground" data-testid="text-location">
                  AddisonX Media, Ranchi, Jharkhand
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground" data-testid="text-phone">
                  +91 XXX XXX XXXX
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground" data-testid="text-email">
                  info@addisonxmedia.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AddisonX Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
