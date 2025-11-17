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

function HeroBanner({ heroContent }: { heroContent?: any }) {
  const title = heroContent?.title || "Digital Marketing Excellence";
  const subtitle = heroContent?.subtitle || "Grow Your Business with AddisonX Media";
  const description = heroContent?.description || "Professional digital marketing services in Ranchi";
  const buttonText = heroContent?.buttonText || "Get Started Now";
  const buttonLink = heroContent?.buttonLink || "/contact";

  return (
    <div className="relative w-full lg:rounded-lg lg:overflow-hidden">
      <img
        src={heroBanner}
        alt="AddisonX Media - Professional Digital Marketing Services"
        className="w-full h-auto object-cover"
        data-testid="img-hero-banner"
      />
      
      {/* Hero Content Overlay - Always shown with fallback defaults */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4" data-testid="text-hero-title">
              {title}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 md:mb-4" data-testid="text-hero-subtitle">
              {subtitle}
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8" data-testid="text-hero-description">
              {description}
            </p>
            <Link href={buttonLink}>
              <Button size="default" className="shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-hero-cta">
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
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

  const { data: customizationData } = useQuery<any[]>({
    queryKey: ["/api/customization"],
  });

  const activeTestimonials = testimonials?.filter(t => t.isActive === "true").slice(0, 3) || [];

  // Extract customization settings
  const heroCustomization = customizationData?.find(c => c.section === 'hero');
  const servicesCustomization = customizationData?.find(c => c.section === 'services');
  const bannersCustomization = customizationData?.find(c => c.section === 'banners');

  // Use customized or default values
  const servicesTitle = servicesCustomization?.content?.title || "Our Services";
  const servicesDescription = servicesCustomization?.content?.description || "Comprehensive digital marketing solutions tailored to elevate your brand and drive measurable results";
  const customServices = servicesCustomization?.content?.services || services;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full mx-auto overflow-hidden">
        {/* Hero Banner */}
        <HeroBanner heroContent={heroCustomization?.content} />
        
        {/* Gradient Transition Overlay - Desktop Only */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="py-6 md:py-12 lg:py-16 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-8 lg:gap-12">
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-1 md:mb-2 lg:mb-3">
                <div className="hidden md:block absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-0">
                  <AnimatedCounter end={100} />+
                </div>
              </div>
              <div className="text-[10px] md:text-sm lg:text-base font-medium text-muted-foreground" data-testid="text-stat-label-0">
                Projects Completed
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-1 md:mb-2 lg:mb-3">
                <div className="hidden md:block absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-1">
                  <AnimatedCounter end={50} />+
                </div>
              </div>
              <div className="text-[10px] md:text-sm lg:text-base font-medium text-muted-foreground" data-testid="text-stat-label-1">
                Happy Clients
              </div>
            </div>
            
            <div className="text-center group cursor-default">
              <div className="relative inline-block mb-1 md:mb-2 lg:mb-3">
                <div className="hidden md:block absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-stat-value-2">
                  <AnimatedCounter end={5} />+
                </div>
              </div>
              <div className="text-[10px] md:text-sm lg:text-base font-medium text-muted-foreground" data-testid="text-stat-label-2">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
        <div className="hidden md:block absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-3 md:mb-4">
              <Sparkles className="h-3 w-3 mr-2" />
              What We Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6" data-testid="text-services-title">
              {servicesTitle}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-services-description">
              {servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {customServices.map((service: any, index: number) => {
              const Icon = service.icon || Code;
              const IconComponent = typeof Icon === 'string' ? Code : Icon;
              return (
                <Card key={index} className="group p-5 md:p-6 lg:p-8 transition-all duration-500 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-card/80" data-testid={`card-service-${index}`}>
                  <div className="mb-4 md:mb-5 lg:mb-6 relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <IconComponent className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8 md:mt-12 lg:mt-16">
            <Link href="/services">
              <Button size="default" className="group shadow-lg hover:shadow-xl transition-all duration-300 md:px-8 lg:px-10" data-testid="button-explore-all-services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
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
                      <Star key={i} className="h-5 w-5 fill-green-700 text-green-700" />
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

      {/* Team Section */}
      <section className="py-12 md:py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-3 md:mb-4">
              <Sparkles className="h-3 w-3 mr-2" />
              Meet Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6" data-testid="text-team-title">
              AddisonX Media Team
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-team-description">
              Our passionate team of digital marketing experts dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
            {/* CEO & Founder */}
            <Card className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden border-2 border-primary/20 hover-elevate active-elevate-2 transition-all duration-300 hover:border-primary/40 hover:shadow-xl group" data-testid="card-team-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">A</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid="text-team-name-0">
                  Ajay Kumar
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold" data-testid="text-team-position-0">
                  CEO & Founder
                </p>
              </div>
            </Card>

            {/* Co-Founder */}
            <Card className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden border-2 border-primary/20 hover-elevate active-elevate-2 transition-all duration-300 hover:border-primary/40 hover:shadow-xl group" data-testid="card-team-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">N</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid="text-team-name-1">
                  Neha Kumari
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold" data-testid="text-team-position-1">
                  Co-Founder
                </p>
              </div>
            </Card>

            {/* Web Developer */}
            <Card className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden border-2 border-primary/20 hover-elevate active-elevate-2 transition-all duration-300 hover:border-primary/40 hover:shadow-xl group" data-testid="card-team-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">V</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid="text-team-name-2">
                  Vikash Munda
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold" data-testid="text-team-position-2">
                  Web Developer
                </p>
              </div>
            </Card>

            {/* Social Media Manager */}
            <Card className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden border-2 border-primary/20 hover-elevate active-elevate-2 transition-all duration-300 hover:border-primary/40 hover:shadow-xl group" data-testid="card-team-3">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">S</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid="text-team-name-3">
                  Suraj Munda
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold" data-testid="text-team-position-3">
                  Social Media Manager
                </p>
              </div>
            </Card>

            {/* Sales Manager */}
            <Card className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden border-2 border-primary/20 hover-elevate active-elevate-2 transition-all duration-300 hover:border-primary/40 hover:shadow-xl group" data-testid="card-team-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">P</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid="text-team-name-4">
                  Priyanshu Singh
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold" data-testid="text-team-position-4">
                  Sales Manager
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-24 bg-card border-y overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-2" />
              Trusted Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-partners-title">
              Our Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-partners-description">
              Partnering with industry leaders to deliver exceptional results
            </p>
          </div>

          <div className="relative">
            <div className="flex animate-slide-infinite gap-16">
              {/* First set of partners */}
              <div className="flex gap-16 shrink-0">
                <div className="text-center min-w-[120px]" data-testid="partner-logo-0">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">ChatGPT</div>
                  <div className="text-xs text-muted-foreground">OpenAI</div>
                </div>

                <div className="text-center min-w-[120px]" data-testid="partner-logo-1">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Make</div>
                  <div className="text-xs text-muted-foreground">Automation</div>
                </div>

                <div className="text-center min-w-[120px]" data-testid="partner-logo-2">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Google</div>
                  <div className="text-xs text-muted-foreground">Cloud & Ads</div>
                </div>

                <div className="text-center min-w-[120px]" data-testid="partner-logo-3">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Facebook</div>
                  <div className="text-xs text-muted-foreground">Meta Business</div>
                </div>

                <div className="text-center min-w-[120px]" data-testid="partner-logo-4">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Titan</div>
                  <div className="text-xs text-muted-foreground">Email Suite</div>
                </div>

                <div className="text-center min-w-[120px]" data-testid="partner-logo-5">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Perplexity</div>
                  <div className="text-xs text-muted-foreground">AI Search</div>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex gap-16 shrink-0" aria-hidden="true">
                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">ChatGPT</div>
                  <div className="text-xs text-muted-foreground">OpenAI</div>
                </div>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Make</div>
                  <div className="text-xs text-muted-foreground">Automation</div>
                </div>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Google</div>
                  <div className="text-xs text-muted-foreground">Cloud & Ads</div>
                </div>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Facebook</div>
                  <div className="text-xs text-muted-foreground">Meta Business</div>
                </div>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Titan</div>
                  <div className="text-xs text-muted-foreground">Email Suite</div>
                </div>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground/70 mb-1">Perplexity</div>
                  <div className="text-xs text-muted-foreground">AI Search</div>
                </div>
              </div>
            </div>
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
