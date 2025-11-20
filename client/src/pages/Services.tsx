import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
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
  Check,
  ArrowRight
} from "lucide-react";

const services = [
  {
    slug: "web-development",
    icon: Code,
    title: "Web Development",
    description: "Create powerful, responsive websites that engage your audience and drive conversions.",
    features: [
      "Custom website design and development",
      "Responsive and mobile-friendly layouts",
      "Fast loading times and performance optimization",
      "SEO-friendly architecture",
      "Content management systems"
    ]
  },
  {
    slug: "ecommerce-development",
    icon: ShoppingCart,
    title: "Ecommerce Development",
    description: "Build robust online stores that provide seamless shopping experiences and boost sales.",
    features: [
      "Custom ecommerce platforms",
      "Payment gateway integration",
      "Inventory management systems",
      "Shopping cart optimization",
      "Order tracking and management"
    ]
  },
  {
    slug: "brand-promotion",
    icon: TrendingUp,
    title: "Brand Promotion",
    description: "Elevate your brand presence with strategic campaigns that resonate with your target audience.",
    features: [
      "Brand strategy development",
      "Market positioning analysis",
      "Creative campaign design",
      "Multi-channel promotion",
      "Brand awareness metrics tracking"
    ]
  },
  {
    slug: "local-seo",
    icon: Search,
    title: "Local SEO",
    description: "Dominate local search results in Ranchi with our targeted SEO strategies and optimization.",
    features: [
      "Local keyword research and optimization",
      "Google My Business optimization",
      "Local directory submissions",
      "Location-based content creation",
      "Review management and reputation"
    ]
  },
  {
    slug: "ads-management",
    icon: Target,
    title: "Ads Management",
    description: "Maximize your ROI with data-driven advertising campaigns across Google, Facebook, and more.",
    features: [
      "Campaign strategy and planning",
      "Ad creative development",
      "Targeting and audience research",
      "Budget optimization",
      "Performance tracking and reporting"
    ]
  },
  {
    slug: "graphic-designing",
    icon: Palette,
    title: "Graphic Designing",
    description: "Create stunning visual content that captures attention and communicates your brand message.",
    features: [
      "Logo and brand identity design",
      "Marketing collateral creation",
      "Social media graphics",
      "Infographic design",
      "Print and digital design"
    ]
  },
  {
    slug: "whatsapp-marketing",
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    description: "Reach customers directly with personalized WhatsApp campaigns that drive engagement.",
    features: [
      "Broadcast message campaigns",
      "Customer engagement automation",
      "WhatsApp Business setup",
      "Personalized messaging strategies",
      "Performance analytics"
    ]
  },
  {
    slug: "social-media-marketing",
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build and engage your community across Facebook, Instagram, LinkedIn, and Twitter.",
    features: [
      "Social media strategy development",
      "Content creation and curation",
      "Community management",
      "Influencer partnerships",
      "Analytics and reporting"
    ]
  },
  {
    slug: "custom-development",
    icon: Wrench,
    title: "Custom Development",
    description: "Get tailored software solutions designed specifically for your unique business requirements.",
    features: [
      "Custom web applications",
      "API development and integration",
      "Database design and optimization",
      "Third-party integrations",
      "Ongoing support and maintenance"
    ]
  }
];

export default function Services() {
  const searchParams = new URLSearchParams(window.location.search);
  const filter = searchParams.get('filter');
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (filter && serviceRefs.current[filter]) {
      setTimeout(() => {
        serviceRefs.current[filter]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [filter]);

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-services-title">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-services-description">
              Comprehensive digital marketing solutions to help your business thrive. 
              From web development to social media marketing, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHighlighted = filter === service.slug;
              return (
                <Card 
                  key={index} 
                  ref={(el) => { serviceRefs.current[service.slug] = el; }}
                  className={`p-6 flex flex-col hover-elevate ${isHighlighted ? 'ring-2 ring-primary' : ''}`}
                  data-testid={`card-service-${index}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold" data-testid={`text-service-title-${index}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a href={`/service/${service.slug}`}>
                    <Button className="w-full" variant="outline" data-testid={`button-learn-more-${index}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
              Let's discuss how our services can help your business grow in Ranchi and beyond. 
              Get in touch today for a free consultation.
            </p>
            <a href="/contact">
              <Button size="lg" data-testid="button-get-started">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
