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
import type { Testimonial, TeamMember } from "@shared/schema";

import heroBanner from "@assets/Phoenix_10_Create_a_modern_premium_promotional_banner_in_the_s_2_1763291282547.jpg";
import reviewQR from "@assets/WhatsApp Image 2025-11-17 at 3.50.29 PM_1763395709789.jpeg";

// Helper function to convert storage path to displayable API URL
const convertHeroBannerToUrl = (storagePath: string | null | undefined): string | null => {
  if (!storagePath) return null;
  
  // If it's already an API URL, return as is
  if (storagePath.startsWith('/api/hero-banner')) {
    return storagePath;
  }
  
  // Convert storage path to API URL
  const encodedPath = encodeURIComponent(storagePath);
  return `/api/hero-banner?path=${encodedPath}`;
};

function HeroBanner({ customBannerUrl }: { customBannerUrl?: string | null }) {
  const bannerUrl = convertHeroBannerToUrl(customBannerUrl) || heroBanner;
  
  return (
    <div className="relative w-full lg:rounded-lg lg:overflow-hidden">
      <img
        src={bannerUrl}
        alt="AddisonX Media - Professional Digital Marketing Services"
        className="w-full h-auto object-cover"
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
    queryKey: ["/api/testimonials/active"],
  });

  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members/active"],
  });

  const { data: servicesCustomization } = useQuery<any>({
    queryKey: ["/api/customization/services"],
  });

  const { data: bannersCustomization } = useQuery<any>({
    queryKey: ["/api/customization/banners"],
  });

  const activeTestimonials = testimonials || [];
  const activeTeamMembers = teamMembers || [];

  // Use customized or default values
  const servicesTitle = servicesCustomization?.content?.title || "Our Services";
  const servicesDescription = servicesCustomization?.content?.description || "Comprehensive digital marketing solutions tailored to elevate your brand and drive measurable results";
  const customServices = servicesCustomization?.content?.services || services;
  const customHeroBanner = bannersCustomization?.content?.heroBanner || null;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full mx-auto overflow-hidden">
        {/* Hero Banner */}
        <HeroBanner customBannerUrl={customHeroBanner} />
        
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

      {/* Services Grid - Cool Modern Design */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-purple-500/5"></div>
        <div className="hidden md:block absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden md:block absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-orange-500/10 to-purple-600/10 border border-primary/20 mb-4 shadow-lg">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary via-orange-500 to-purple-600 bg-clip-text text-transparent">What We Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent" data-testid="text-services-title">
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
                <Card 
                  key={index} 
                  className="group relative p-5 md:p-6 lg:p-8 transition-all duration-500 border-2 overflow-visible bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2" 
                  data-testid={`card-service-${index}`}
                >
                  {/* Animated gradient border effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-orange-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"></div>
                  
                  {/* Glowing icon container */}
                  <div className="mb-4 md:mb-5 lg:mb-6 relative">
                    <div className="relative inline-flex items-center justify-center">
                      {/* Multi-layer glow effect */}
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary via-orange-500 to-purple-600 opacity-20 blur-md group-hover:opacity-40 group-hover:blur-lg transition-all duration-500"></div>
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 opacity-10 blur-2xl group-hover:opacity-30 transition-all duration-500"></div>
                      
                      {/* Icon box with gradient border */}
                      <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary via-orange-500 to-purple-600 p-[2px] group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                          <IconComponent className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary group-hover:text-orange-500 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:via-orange-500 group-hover:to-purple-600 bg-clip-text transition-all duration-300" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8 md:mt-12 lg:mt-16">
            <Link href="/services">
              <Button size="default" className="group relative shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 md:px-8 lg:px-10 overflow-visible" data-testid="button-explore-all-services">
                <span className="relative z-10 flex items-center">
                  Explore All Services
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary via-orange-500 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {activeTestimonials.length > 0 && (
        <section className="py-8 md:py-12 lg:py-16 bg-card">
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

      {/* Team Section - Cool Design */}
      <section className="py-8 md:py-12 lg:py-16 relative bg-gradient-to-br from-background via-primary/3 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Meet Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent" data-testid="text-team-title">
              AddisonX Media Team
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-team-description">
              Our passionate team of digital marketing experts dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {activeTeamMembers.map((member, index) => (
              <Card key={member.id} className="p-4 md:p-6 lg:p-8 text-center relative overflow-hidden bg-gradient-to-br from-card to-primary/5 border-2 border-primary/30 shadow-lg" data-testid={`card-team-${index}`}>
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full bg-gradient-to-br from-primary via-orange-500 to-purple-600 p-[3px] shadow-xl">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.fullName}
                        className="w-full h-full rounded-full object-cover bg-background"
                        data-testid={`img-team-photo-${index}`}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-primary via-orange-500 to-purple-600 bg-clip-text text-transparent">
                          {member.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1" data-testid={`text-team-name-${index}`}>
                  {member.fullName}
                </h3>
                <p className="text-xs md:text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent" data-testid={`text-team-position-${index}`}>
                  {member.position}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-10 md:py-14 bg-card border-y overflow-hidden">
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

      {/* Review QR Section - Ultra Cool Design */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-yellow-500/10 to-red-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-purple-500/10 to-primary/10"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-green-500 to-green-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-10 right-0 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Side - QR Code Card with Enhanced Effects */}
            <div className="order-1 flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Multi-layer Glow Effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-primary rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                
                {/* Main Card with Gradient Border */}
                <div className="relative bg-gradient-to-br from-primary via-orange-500 to-purple-600 p-[3px] rounded-3xl shadow-2xl group-hover:shadow-[0_0_80px_rgba(255,165,0,0.5)] transition-all duration-500">
                  <Card className="relative p-6 md:p-8 lg:p-10 bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl transition-all duration-500 group-hover:scale-[1.02]">
                    {/* Animated Corner Accents */}
                    <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    
                    <div className="relative">
                      <img
                        src={reviewQR}
                        alt="Google Review QR Code"
                        className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px] mx-auto rounded-xl shadow-lg"
                        data-testid="img-review-qr"
                      />
                    </div>
                    
                    {/* Enhanced Scan Me Badge */}
                    <div className="mt-6 relative text-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-16 bg-red-500 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                      </div>
                      <div className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-red-500/50 transition-all duration-300 animate-pulse">
                        <Star className="h-5 w-5 text-white animate-pulse" />
                        <span className="text-lg md:text-xl font-black text-white tracking-widest">SCAN ME!</span>
                        <Star className="h-5 w-5 text-white animate-pulse" />
                      </div>
                    </div>

                    {/* Google Review Badge */}
                    <div className="mt-5 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border border-primary/20">
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm md:text-base font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">The Google review</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Side - Content with Animations */}
            <div className="order-2 space-y-6">
              {/* Heading with Enhanced Gradients */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight" data-testid="text-review-title">
                  <span className="block bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                    HOW WAS YOUR
                  </span>
                  <span className="block bg-gradient-to-r from-green-500 via-yellow-500 via-red-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                    EXPERIENCE?
                  </span>
                </h2>
              </div>
              
              {/* Description Cards */}
              <Card className="p-4 md:p-6 bg-gradient-to-br from-card/80 to-primary/5 border-2 border-primary/20 backdrop-blur-sm hover-elevate">
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed" data-testid="text-review-subtitle">
                  <span className="text-primary font-semibold">Scan the QR code</span> to leave a review and let us know how we did!
                </p>
              </Card>
              
              <Card className="p-4 md:p-6 bg-gradient-to-br from-card/80 to-purple-500/5 border-2 border-purple-500/20 backdrop-blur-sm hover-elevate">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                    Your feedback helps us improve and serve you better. Share your experience with AddisonX Media and help us continue delivering exceptional digital marketing services.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
