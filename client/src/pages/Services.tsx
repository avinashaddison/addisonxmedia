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
  Wrench,
  Check
} from "lucide-react";

const services = [
  {
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
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build and engage your community across Facebook, Instagram, LinkedIn, and Twitter.",
    features: [
      "Social media strategy development",
      "Content creation and curation",
      "Community management",
      "Influencer collaboration",
      "Analytics and reporting"
    ]
  },
  {
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
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-services-page-title">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-services-page-description">
              Comprehensive digital marketing solutions designed to grow your business 
              and establish a strong online presence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 md:p-8" data-testid={`card-service-detail-${index}`}>
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-primary/10 mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid={`text-service-detail-title-${index}`}>
                      {service.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed" data-testid={`text-service-detail-description-${index}`}>
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Key Features
                    </h3>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground" data-testid={`text-feature-${index}-${featureIndex}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-process-title">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-process-description">
              A proven methodology that delivers results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: "01", title: "Discovery", description: "We learn about your business, goals, and target audience" },
              { step: "02", title: "Strategy", description: "We develop a customized plan tailored to your objectives" },
              { step: "03", title: "Execution", description: "We implement the strategy with precision and creativity" },
              { step: "04", title: "Optimization", description: "We continuously monitor and improve performance" }
            ].map((phase, index) => (
              <div key={index} className="text-center" data-testid={`card-process-${index}`}>
                <div className="text-5xl font-bold text-primary/20 mb-4" data-testid={`text-process-step-${index}`}>
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid={`text-process-phase-title-${index}`}>
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-process-phase-description-${index}`}>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
