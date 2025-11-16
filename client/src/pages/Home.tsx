import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
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
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { Testimonial } from "@shared/schema";

import heroImage1 from "@assets/stock_images/digital_marketing_te_6e20120c.jpg";
import heroImage2 from "@assets/stock_images/digital_marketing_te_01875939.jpg";
import heroImage3 from "@assets/stock_images/web_development_codi_8ffa3130.jpg";
import heroImage4 from "@assets/stock_images/business_team_collab_a0270f86.jpg";
import heroImage5 from "@assets/stock_images/business_team_collab_65b62d2f.jpg";

const heroImages = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5
];

function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  return (
    <div className="absolute inset-0">
      <div className="overflow-hidden h-full w-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {heroImages.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                data-testid={`img-hero-slide-${index}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover-elevate active-elevate-2 backdrop-blur-md rounded-full p-3 transition-all pointer-events-auto"
        aria-label="Previous slide"
        data-testid="button-hero-prev"
      >
        <ChevronLeft className="h-6 w-6 text-white pointer-events-none" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover-elevate active-elevate-2 backdrop-blur-md rounded-full p-3 transition-all pointer-events-auto"
        aria-label="Next slide"
        data-testid="button-hero-next"
      >
        <ChevronRight className="h-6 w-6 text-white pointer-events-none" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all pointer-events-auto ${
              index === selectedIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : "false"}
            data-testid={`button-hero-dot-${index}`}
          />
        ))}
      </div>
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Image Slider */}
        <HeroSlider />
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10 pointer-events-none"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob z-10 pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 z-10 pointer-events-none"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-36 text-center relative z-40 pointer-events-none">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white" data-testid="text-location-badge">
              Ranchi's Premier Digital Marketing Agency
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-8 text-white animate-in fade-in slide-in-from-bottom-4 duration-1000" data-testid="text-hero-title">
            Transform Your<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Digital Presence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200" data-testid="text-hero-description">
            We deliver cutting-edge digital marketing solutions that drive growth, 
            enhance brand visibility, and maximize your business potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/services" className="pointer-events-auto">
              <Button size="lg" className="min-w-[220px] h-14 text-base group" data-testid="button-view-services">
                <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact" className="pointer-events-auto">
              <Button size="lg" variant="outline" className="min-w-[220px] h-14 text-base backdrop-blur-sm border-white/30 text-white hover:bg-white/20" data-testid="button-get-consultation">
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
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
