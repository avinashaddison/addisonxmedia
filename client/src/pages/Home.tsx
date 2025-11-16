import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Code, 
  ShoppingCart, 
  TrendingUp, 
  Search, 
  Target, 
  Palette, 
  MessageCircle, 
  Share2, 
  Wrench 
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience."
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    description: "Complete online store solutions that drive sales and enhance customer engagement."
  },
  {
    icon: TrendingUp,
    title: "Brand Promotion",
    description: "Strategic brand building campaigns that elevate your market presence and recognition."
  },
  {
    icon: Search,
    title: "Local SEO",
    description: "Dominate local search results in Ranchi and beyond with our targeted SEO strategies."
  },
  {
    icon: Target,
    title: "Ads Management",
    description: "Data-driven advertising campaigns across platforms for maximum ROI and reach."
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Creative visual designs that capture attention and communicate your brand message."
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    description: "Direct engagement with customers through strategic WhatsApp marketing campaigns."
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build and engage your community across all major social media platforms."
  },
  {
    icon: Wrench,
    title: "Custom Development",
    description: "Tailored software solutions designed specifically for your unique business needs."
  }
];

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary" data-testid="text-location-badge">
              Ranchi's Premier Digital Marketing Agency
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
            Transform Your Digital Presence with{" "}
            <span className="text-primary">AddisonX Media</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="text-hero-description">
            We deliver cutting-edge digital marketing solutions that drive growth, 
            enhance brand visibility, and maximize your business potential in Ranchi and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="min-w-[180px]" data-testid="button-view-services">
                View Our Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-get-consultation">
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 md:p-8 hover-elevate" data-testid={`card-service-${index}`}>
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" data-testid="button-explore-all-services">
                Explore All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-location-title">
              Serving Ranchi & Beyond
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="text-location-description">
              Based in Ranchi, Jharkhand, we're your local digital marketing partner 
              committed to helping businesses thrive in the digital landscape. Our deep 
              understanding of the local market combined with global best practices 
              ensures exceptional results for our clients.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-us">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-cta-description">
            Let's discuss how we can help you achieve your digital marketing goals
          </p>
          <Link href="/contact">
            <Button size="lg" className="min-w-[200px]" data-testid="button-get-started">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
