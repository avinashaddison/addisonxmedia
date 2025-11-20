import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
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
  ArrowRight
} from "lucide-react";
import type { Testimonial, TeamMember } from "@shared/schema";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

import heroBanner from "@assets/Phoenix_10_Create_a_modern_premium_promotional_banner_in_the_s_2_1763291282547.jpg";
import reviewQR from "@assets/WhatsApp Image 2025-11-17 at 3.50.29 PM_1763395709789.jpeg";

// Helper function to convert storage path to displayable API URL
const convertServiceBannerToUrl = (storagePath: string | null | undefined): string | null => {
  if (!storagePath) return null;
  
  // If it's already an API URL, return as is
  if (storagePath.startsWith('/api/service-banner')) {
    return storagePath;
  }
  
  // Convert storage path to API URL
  const encodedPath = encodeURIComponent(storagePath);
  return `/api/service-banner?path=${encodedPath}`;
};

function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 4 },
      '(min-width: 768px)': { slidesToScroll: 2 }
    }
  });

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                style={{ minWidth: 0 }}
              >
                <Card className="p-6 h-full hover-elevate" data-testid={`testimonial-card-${index}`}>
                  <div className="flex items-center mb-4">
                    {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4" data-testid={`text-testimonial-review-${index}`}>
                    "{testimonial.testimonialText}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar>
                      <AvatarImage src={testimonial.photoUrl || undefined} alt={testimonial.clientName} />
                      <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm" data-testid={`text-testimonial-name-${index}`}>
                        {testimonial.clientName}
                      </p>
                      {testimonial.companyName && (
                        <p className="text-xs text-muted-foreground" data-testid={`text-testimonial-company-${index}`}>
                          {testimonial.companyName}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBanner({ customBannerUrl }: { customBannerUrl?: string | null }) {
  const bannerUrl = convertServiceBannerToUrl(customBannerUrl) || heroBanner;
  
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

  const { data: homeBanner } = useQuery<any>({
    queryKey: ["/api/service-banners", "home"],
  });

  const activeTestimonials = testimonials || [];
  const activeTeamMembers = teamMembers || [];

  // Use customized or default values
  const servicesTitle = servicesCustomization?.content?.title || "Our Services";
  const servicesDescription = servicesCustomization?.content?.description || "Comprehensive digital marketing solutions tailored to elevate your brand and drive measurable results";
  const customServices = servicesCustomization?.content?.services || services;
  const customHeroBanner = homeBanner?.bannerUrl || null;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full mx-auto">
        <HeroBanner customBannerUrl={customHeroBanner} />
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-value-0">
                100+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground" data-testid="text-stat-label-0">
                Projects Completed
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-value-1">
                50+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground" data-testid="text-stat-label-1">
                Happy Clients
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-value-2">
                5+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground" data-testid="text-stat-label-2">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/30 text-primary hover:from-primary/30 hover:to-purple-500/30">
                What We Offer
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent" data-testid="text-services-title">
              {servicesTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              {servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customServices.map((service: any, index: number) => {
              const Icon = service.icon || Code;
              const IconComponent = typeof Icon === 'string' ? Code : Icon;
              
              // Map service titles to their correct slugs
              const titleToSlugMap: Record<string, string> = {
                "Web Development": "web-development",
                "Ecommerce Development": "ecommerce-development",
                "Brand Promotion": "brand-promotion",
                "Local SEO": "local-seo",
                "Ads Management": "ads-management",
                "Graphic Designing": "graphic-designing",
                "WhatsApp Marketing": "whatsapp-marketing",
                "Social Media Marketing": "social-media-marketing",
                "Custom Development": "custom-development"
              };
              
              const serviceSlug = titleToSlugMap[service.title] || service.title.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <a key={index} href={`/service/${serviceSlug}`}>
                  <Card 
                    className="group p-6 cursor-pointer hover-elevate relative overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300" 
                    data-testid={`card-service-${index}`}
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      {/* Icon container with gradient */}
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <IconComponent className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300" data-testid={`text-service-title-${index}`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed" data-testid={`text-service-description-${index}`}>
                        {service.description}
                      </p>
                      
                      {/* Learn More Link with Arrow */}
                      <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a href="/service">
              <Button size="lg" className="group" data-testid="button-explore-all-services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {activeTestimonials.length > 0 && <TestimonialsCarousel testimonials={activeTestimonials} />}

      {/* Team Section - Grass Theme */}
      <section className="py-12 md:py-16 bg-green-50/30 dark:bg-green-950/10 border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-300" data-testid="text-team-title">
              Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-team-description">
              Our passionate team of digital marketing experts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {activeTeamMembers.map((member, index) => (
              <Card key={member.id} className="p-6 text-center relative overflow-hidden border-green-200 dark:border-green-800 hover-elevate" data-testid={`card-team-${index}`}>
                {/* Grass Pattern at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-green-500 dark:bg-green-600"
                        style={{
                          height: `${12 + Math.random() * 15}px`,
                          opacity: 0.4,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Team Member Content */}
                <div className="relative z-10 mb-6">
                  <div className="mb-4">
                    {/* Avatar with Green Border */}
                    <div className="w-32 h-32 mx-auto rounded-full border-2 border-green-500 overflow-hidden">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.fullName}
                          className="w-full h-full object-cover"
                          data-testid={`img-team-photo-${index}`}
                        />
                      ) : (
                        <div className="w-full h-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                          <div className="text-4xl font-bold text-green-700 dark:text-green-400">
                            {member.fullName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold mb-1" data-testid={`text-team-name-${index}`}>
                    {member.fullName}
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mb-2" data-testid={`text-team-position-${index}`}>
                    {member.position}
                  </p>
                  
                  {member.employeeId && (
                    <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" data-testid={`badge-employee-id-${index}`}>
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                        ID No - {member.employeeId}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-card border-y overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-partners-title">
              Our Partners
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-partners-description">
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

      {/* Review QR Section */}
      <section className="py-12 md:py-16 bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - QR Code Card */}
            <div className="flex justify-center lg:justify-start">
              <Card className="p-6 md:p-8 border-2 border-primary/20">
                <img
                  src={reviewQR}
                  alt="Google Review QR Code"
                  className="w-full max-w-[300px] mx-auto rounded-lg"
                  data-testid="img-review-qr"
                />
                
                {/* Scan Me Badge */}
                <div className="mt-6 text-center">
                  <Badge className="px-6 py-3 text-base bg-red-500 hover:bg-red-600 border-none">
                    <Star className="h-4 w-4 mr-2" />
                    SCAN ME!
                    <Star className="h-4 w-4 ml-2" />
                  </Badge>
                </div>

                {/* Google Review Badge */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-semibold">Google Review</span>
                </div>
              </Card>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-review-title">
                  How Was Your Experience?
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-review-subtitle">
                  <span className="text-primary font-semibold">Scan the QR code</span> to leave a review and let us know how we did!
                </p>
              </div>
              
              <Card className="p-6 border hover-elevate">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground flex-1">
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
