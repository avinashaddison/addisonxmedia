import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Code, 
  ShoppingCart, 
  TrendingUp, 
  Search, 
  Target, 
  Palette, 
  MessageCircle, 
  Share2, 
  Wrench,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap
} from "lucide-react";
import type { Testimonial } from "@shared/schema";

import heroBanner from "@assets/Phoenix_10_Create_a_modern_premium_promotional_banner_in_the_s_2_1763291282547.jpg";

function HeroBanner() {
  return (
    <div className="w-full h-full">
      <img
        src={heroBanner}
        alt="AddisonX Media - Professional Digital Marketing Services"
        className="w-full h-full object-cover"
        data-testid="img-hero-banner"
      />
    </div>
  );
}

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

const benefits = [
  {
    icon: CheckCircle,
    title: "Expert Team",
    description: "Experienced professionals dedicated to your success"
  },
  {
    icon: CheckCircle,
    title: "Local Knowledge",
    description: "Deep understanding of Ranchi market dynamics"
  },
  {
    icon: CheckCircle,
    title: "Proven Results",
    description: "Track record of delivering measurable outcomes"
  },
  {
    icon: CheckCircle,
    title: "24/7 Support",
    description: "Always available to address your concerns"
  }
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function Home() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const activeTestimonials = testimonials?.filter(t => t.isActive === "true").slice(0, 3) || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1728px] mx-auto overflow-hidden" style={{ height: '576px' }}>
        {/* Hero Banner */}
        <HeroBanner />
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-0">
                  <AnimatedCounter end={100} />+
                </div>
              </div>
              <div className="text-base font-medium text-muted-foreground" data-testid="text-stat-label-0">
                Projects Completed
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-1">
                  <AnimatedCounter end={50} />+
                </div>
              </div>
              <div className="text-base font-medium text-muted-foreground" data-testid="text-stat-label-1">
                Happy Clients
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-2">
                  <AnimatedCounter end={5} />+
                </div>
              </div>
              <div className="text-base font-medium text-muted-foreground" data-testid="text-stat-label-2">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-2" />
              What We Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group p-8 hover-elevate transition-all duration-500 border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10" data-testid={`card-service-${index}`}>
                  <div className="mb-6">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-8 w-8 text-primary group-hover:rotate-6 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/services">
              <Button size="lg" variant="outline" className="group border-2 hover:border-primary/50" data-testid="button-explore-all-services">
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-why-choose-title">
              Why Choose AddisonX Media?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-why-choose-description">
              We combine local expertise with global best practices to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {activeTestimonials.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-testimonials-title">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {activeTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="p-6 md:p-8 hover-elevate transition-all duration-300" data-testid={`testimonial-card-${index}`}>
                  <div className="flex items-center mb-4">
                    {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-testimonial-review-${index}`}>
                    "{testimonial.testimonialText}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.photoUrl || undefined} alt={testimonial.clientName} />
                      <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                        {testimonial.clientName}
                      </p>
                      {testimonial.companyName && (
                        <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-company-${index}`}>
                          {testimonial.companyName}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 to-background border-t">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed" data-testid="text-cta-description">
            Let's discuss how we can help you achieve your digital marketing goals and take your business to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="min-w-[200px] h-12" data-testid="button-get-started">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="min-w-[200px] h-12" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
