import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-contact-title">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-contact-description">
              Have a project in mind? We'd love to hear from you. Reach out to discuss 
              how we can help grow your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="text-contact-info-title">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" data-testid="text-office-title">Office Location</h3>
                      <p className="text-muted-foreground" data-testid="text-office-address">
                        AddisonX Media<br />
                        Ranchi, Jharkhand<br />
                        India
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" data-testid="text-phone-title">Phone</h3>
                      <p className="text-muted-foreground" data-testid="text-phone-number">
                        +91 XXX XXX XXXX
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" data-testid="text-email-title">Email</h3>
                      <p className="text-muted-foreground" data-testid="text-email-address">
                        info@addisonxmedia.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" data-testid="text-hours-title">Business Hours</h3>
                      <p className="text-muted-foreground" data-testid="text-hours-weekday">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground" data-testid="text-hours-weekend">
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                      <p className="text-muted-foreground">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Why Contact Us */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="text-why-contact-title">
                Why Work With Us?
              </h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3" data-testid="text-benefit-title-0">
                    Local Expertise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-benefit-description-0">
                    As a Ranchi-based agency, we understand the local market dynamics and 
                    can create strategies that resonate with your target audience.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3" data-testid="text-benefit-title-1">
                    Proven Results
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-benefit-description-1">
                    Our track record speaks for itself. We've helped numerous businesses 
                    achieve their digital marketing goals and grow their online presence.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3" data-testid="text-benefit-title-2">
                    Comprehensive Services
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-benefit-description-2">
                    From web development to social media marketing, we offer all the services 
                    you need under one roof for seamless collaboration.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3" data-testid="text-benefit-title-3">
                    Transparent Communication
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-benefit-description-3">
                    We believe in keeping you informed every step of the way with regular 
                    updates and clear reporting on your campaign performance.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Highlight */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-serving-title">
              Proudly Serving Ranchi & Jharkhand
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-serving-description">
              While we're based in Ranchi, our digital marketing services extend across 
              Jharkhand and beyond. Whether you're a local business or looking to expand 
              your reach, we're here to help you succeed in the digital landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
