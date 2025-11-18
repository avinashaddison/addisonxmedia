import { useRoute } from "wouter";
import { Link } from "wouter";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowRight, Code, ShoppingCart, TrendingUp, Search, Target, Palette, MessageCircle, Share2, Wrench, Phone, Mail, MapPin, Star, Users, Award, Clock } from "lucide-react";

// TODO: Implement service banner upload feature in admin panel
// Helper function will be used when custom banners are added
// const convertServiceBannerToUrl = (storagePath: string | null): string | null => {
//   if (!storagePath) return null;
//   if (storagePath.startsWith('/api/service-banner')) return storagePath;
//   const encodedPath = encodeURIComponent(storagePath);
//   return `/api/service-banner?path=${encodedPath}`;
// };

const services = {
  "web-development": {
    icon: Code,
    title: "Web Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience",
    longDescription: "In today's digital age, your website is your business's front door. We create custom, responsive websites that not only look stunning but also perform exceptionally. Our team uses the latest technologies and frameworks to build fast, secure, and scalable web solutions tailored to your business needs.",
    stats: [
      { label: "Projects Completed", value: "100+", icon: Award },
      { label: "Average Load Time", value: "<2s", icon: Clock },
      { label: "Client Satisfaction", value: "98%", icon: Star },
      { label: "Years Experience", value: "5+", icon: Users }
    ],
    features: [
      "Custom website design and development",
      "Responsive and mobile-friendly layouts",
      "Fast loading times and performance optimization",
      "SEO-friendly architecture",
      "Content management systems",
      "E-commerce integration",
      "Progressive Web Apps (PWA)",
      "API development and integration"
    ],
    benefits: [
      "Increase online visibility and reach",
      "Improve user engagement and conversion",
      "Build trust with professional design",
      "Scale your business globally"
    ],
    process: [
      { step: "1", title: "Discovery & Planning", description: "We understand your goals, audience, and requirements" },
      { step: "2", title: "Design & Prototyping", description: "Create mockups and get your approval" },
      { step: "3", title: "Development & Testing", description: "Build your website with quality assurance" },
      { step: "4", title: "Launch & Support", description: "Deploy and provide ongoing maintenance" }
    ],
    caseStudies: [
      {
        title: "Local Restaurant Chain Website",
        client: "Popular Restaurant in Ranchi",
        challenge: "Needed an online presence to showcase menu, enable table bookings, and increase foot traffic",
        solution: "Built a modern responsive website with online menu, reservation system, and location finder",
        results: [
          "300% increase in online reservations",
          "45% increase in weekday traffic",
          "Improved brand visibility in Ranchi market"
        ]
      }
    ],
    portfolio: [
      {
        title: "Corporate Business Website",
        description: "Professional business website with CMS integration",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      },
      {
        title: "E-commerce Platform",
        description: "Full-featured online store with payment gateway",
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=600&fit=crop"
      }
    ]
  },
  "ecommerce": {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    description: "Complete online store solutions that drive sales and enhance customer engagement",
    longDescription: "Transform your retail business with a powerful ecommerce platform. We build secure, scalable online stores that provide seamless shopping experiences and drive conversions. From product catalog management to secure payment processing, we handle everything.",
    stats: [
      { label: "Stores Built", value: "50+", icon: Award },
      { label: "Revenue Generated", value: "₹10Cr+", icon: TrendingUp },
      { label: "Avg Conversion Rate", value: "3.5%", icon: Star },
      { label: "Payment Gateways", value: "10+", icon: Target }
    ],
    features: [
      "Custom ecommerce platforms",
      "Payment gateway integration",
      "Inventory management systems",
      "Shopping cart optimization",
      "Order tracking and management",
      "Product recommendations",
      "Multi-vendor marketplace support",
      "Mobile commerce solutions"
    ],
    benefits: [
      "Sell 24/7 without geographical limits",
      "Reduce overhead costs",
      "Track customer behavior and sales data",
      "Easy inventory and order management"
    ],
    process: [
      { step: "1", title: "Business Analysis", description: "Understand your products, customers, and goals" },
      { step: "2", title: "Platform Setup", description: "Configure ecommerce platform and features" },
      { step: "3", title: "Payment & Shipping", description: "Integrate payment gateways and logistics" },
      { step: "4", title: "Launch & Optimize", description: "Go live and continuously improve performance" }
    ],
    caseStudies: [
      {
        title: "Fashion Boutique Online Store",
        client: "Local Fashion Retailer",
        challenge: "Wanted to expand beyond physical store and reach customers across Jharkhand",
        solution: "Developed full-featured ecommerce platform with inventory sync and multiple payment options",
        results: [
          "₹10L+ in online sales within first 3 months",
          "Customer base expanded by 250%",
          "Reduced operational costs by 30%"
        ]
      }
    ],
    portfolio: [
      {
        title: "Fashion E-store",
        description: "Modern fashion ecommerce with AR try-on",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
      }
    ]
  },
  "brand-promotion": {
    icon: TrendingUp,
    title: "Brand Promotion",
    description: "Strategic brand building campaigns that elevate your market presence and recognition",
    longDescription: "Build a brand that resonates with your audience and stands out in the market. Our brand promotion strategies combine creativity with data-driven insights to increase brand awareness, engagement, and loyalty.",
    stats: [
      { label: "Campaigns Launched", value: "200+", icon: Award },
      { label: "Avg Brand Reach", value: "100K+", icon: Users },
      { label: "Engagement Rate", value: "8.5%", icon: Star },
      { label: "ROI Average", value: "350%", icon: TrendingUp }
    ],
    features: [
      "Brand strategy development",
      "Market positioning analysis",
      "Creative campaign design",
      "Multi-channel promotion",
      "Brand awareness metrics tracking",
      "Influencer partnerships",
      "Content marketing",
      "Brand identity design"
    ],
    benefits: [
      "Build strong brand recognition",
      "Differentiate from competitors",
      "Create emotional connections with customers",
      "Increase customer loyalty and lifetime value"
    ],
    process: [
      { step: "1", title: "Brand Audit", description: "Analyze current brand position and opportunities" },
      { step: "2", title: "Strategy Creation", description: "Develop comprehensive brand promotion plan" },
      { step: "3", title: "Campaign Execution", description: "Launch campaigns across multiple channels" },
      { step: "4", title: "Monitor & Optimize", description: "Track results and refine strategies" }
    ],
    caseStudies: [
      {
        title: "Startup Brand Launch",
        client: "Tech Startup in Ranchi",
        challenge: "New company needing to establish brand presence in competitive market",
        solution: "Created comprehensive brand strategy with multi-channel campaign across social media and local events",
        results: [
          "Achieved 50K+ social media followers in 4 months",
          "Featured in 5 major publications",
          "Secured 3 major partnerships"
        ]
      }
    ],
    portfolio: []
  },
  "local-seo": {
    icon: Search,
    title: "Local SEO",
    description: "Dominate local search results in Ranchi and beyond with our targeted SEO strategies",
    longDescription: "When potential customers in Ranchi search for your services, will they find you? Our local SEO strategies ensure your business appears at the top of local search results, driving more foot traffic and local customers to your business.",
    stats: [
      { label: "Businesses Ranked #1", value: "80+", icon: Award },
      { label: "Avg Traffic Increase", value: "400%", icon: TrendingUp },
      { label: "Keywords Ranked", value: "500+", icon: Target },
      { label: "GMB Optimizations", value: "150+", icon: MapPin }
    ],
    features: [
      "Local keyword research and optimization",
      "Google My Business optimization",
      "Local directory submissions",
      "Location-based content creation",
      "Review management and reputation",
      "Local link building",
      "Citation building",
      "Local schema markup"
    ],
    benefits: [
      "Appear in Google's Local Pack",
      "Drive more store visits and calls",
      "Build local authority and trust",
      "Beat local competitors in search"
    ],
    process: [
      { step: "1", title: "Local Audit", description: "Assess current local search visibility" },
      { step: "2", title: "GMB Optimization", description: "Optimize Google My Business profile" },
      { step: "3", title: "Content & Citations", description: "Create local content and build citations" },
      { step: "4", title: "Review & Monitor", description: "Manage reviews and track rankings" }
    ],
    caseStudies: [
      {
        title: "Medical Clinic SEO Success",
        client: "Healthcare Provider in Ranchi",
        challenge: "Struggling to appear in local searches despite quality service",
        solution: "Implemented comprehensive local SEO strategy with GMB optimization and local content",
        results: [
          "Ranked #1 for 15+ local healthcare keywords",
          "400% increase in website traffic from Ranchi area",
          "80% increase in new patient appointments"
        ]
      }
    ],
    portfolio: []
  },
  "ads-management": {
    icon: Target,
    title: "Ads Management",
    description: "Data-driven advertising campaigns across platforms for maximum ROI and reach",
    longDescription: "Maximize your advertising ROI with expertly managed campaigns across Google Ads, Facebook, Instagram, and more. We create, monitor, and optimize campaigns to ensure every rupee spent delivers measurable results.",
    stats: [
      { label: "Ad Campaigns", value: "300+", icon: Award },
      { label: "Avg ROAS", value: "450%", icon: TrendingUp },
      { label: "Cost Reduction", value: "35%", icon: Target },
      { label: "Conversion Increase", value: "210%", icon: Star }
    ],
    features: [
      "Campaign strategy and planning",
      "Ad creative development",
      "Targeting and audience research",
      "Budget optimization",
      "Performance tracking and reporting",
      "A/B testing",
      "Conversion rate optimization",
      "Remarketing campaigns"
    ],
    benefits: [
      "Reach your ideal customers precisely",
      "Pay only for results",
      "Scale campaigns profitably",
      "Get detailed performance insights"
    ],
    process: [
      { step: "1", title: "Goal Setting", description: "Define objectives and KPIs" },
      { step: "2", title: "Campaign Setup", description: "Create ads and configure targeting" },
      { step: "3", title: "Launch & Monitor", description: "Run campaigns and track performance" },
      { step: "4", title: "Optimize & Scale", description: "Improve results and increase budget" }
    ],
    caseStudies: [
      {
        title: "Real Estate Lead Generation",
        client: "Property Developer",
        challenge: "High cost per lead with low conversion rates from advertising",
        solution: "Restructured ad campaigns with better targeting and optimized landing pages",
        results: [
          "Reduced cost per lead by 60%",
          "Increased conversion rate from 2% to 12%",
          "Generated 200+ qualified leads per month"
        ]
      }
    ],
    portfolio: []
  },
  "graphic-designing": {
    icon: Palette,
    title: "Graphic Designing",
    description: "Creative visual designs that capture attention and communicate your brand message",
    longDescription: "Great design is more than just aesthetics—it's communication. Our graphic designers create visually stunning assets that not only look beautiful but effectively communicate your brand message and engage your audience.",
    stats: [
      { label: "Designs Created", value: "1000+", icon: Award },
      { label: "Happy Clients", value: "120+", icon: Users },
      { label: "Design Awards", value: "15+", icon: Star },
      { label: "Avg Turnaround", value: "48hrs", icon: Clock }
    ],
    features: [
      "Logo and brand identity design",
      "Marketing collateral creation",
      "Social media graphics",
      "Infographic design",
      "Print and digital design",
      "Packaging design",
      "Presentation design",
      "Motion graphics"
    ],
    benefits: [
      "Create memorable brand identity",
      "Stand out from competition",
      "Communicate effectively with visuals",
      "Maintain consistent brand image"
    ],
    process: [
      { step: "1", title: "Brief & Research", description: "Understand your vision and target audience" },
      { step: "2", title: "Concept Development", description: "Create initial design concepts" },
      { step: "3", title: "Refinement", description: "Revise based on your feedback" },
      { step: "4", title: "Final Delivery", description: "Provide all files and formats needed" }
    ],
    caseStudies: [],
    portfolio: [
      {
        title: "Brand Identity Package",
        description: "Complete visual identity for new business",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
      }
    ]
  },
  "whatsapp-marketing": {
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    description: "Direct engagement with customers through strategic WhatsApp marketing campaigns",
    longDescription: "Reach your customers where they are most active. WhatsApp marketing allows for direct, personal communication with your audience, driving engagement and conversions through one of the world's most popular messaging platforms.",
    stats: [
      { label: "Messages Sent", value: "1M+", icon: MessageCircle },
      { label: "Open Rate", value: "98%", icon: Star },
      { label: "Response Time", value: "<5min", icon: Clock },
      { label: "Customer Satisfaction", value: "95%", icon: Users }
    ],
    features: [
      "WhatsApp Business API integration",
      "Automated messaging campaigns",
      "Customer support automation",
      "Broadcast messaging",
      "Rich media sharing",
      "Analytics and tracking",
      "Chatbot development",
      "CRM integration"
    ],
    benefits: [
      "98% message open rates",
      "Instant customer communication",
      "Personalized customer experience",
      "Higher engagement than email"
    ],
    process: [
      { step: "1", title: "Account Setup", description: "Configure WhatsApp Business API" },
      { step: "2", title: "Strategy Planning", description: "Define messaging strategy and workflows" },
      { step: "3", title: "Automation Setup", description: "Create chatbots and automated responses" },
      { step: "4", title: "Launch & Engage", description: "Start campaigns and engage customers" }
    ],
    caseStudies: [
      {
        title: "Retail Store Customer Engagement",
        client: "Electronics Retailer",
        challenge: "Needed better customer communication and post-sale support",
        solution: "Implemented WhatsApp Business with automated updates and customer support",
        results: [
          "Customer satisfaction increased to 92%",
          "Response time reduced from 2 hours to 5 minutes",
          "30% increase in repeat purchases"
        ]
      }
    ],
    portfolio: []
  },
  "social-media-marketing": {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build and engage your community across all major social media platforms",
    longDescription: "Social media is where your audience lives, connects, and makes decisions. We create and execute social media strategies that build communities, drive engagement, and convert followers into loyal customers.",
    stats: [
      { label: "Followers Gained", value: "500K+", icon: Users },
      { label: "Avg Engagement", value: "12%", icon: Star },
      { label: "Content Created", value: "5000+", icon: Award },
      { label: "Platforms Managed", value: "8+", icon: Share2 }
    ],
    features: [
      "Social media strategy development",
      "Content creation and curation",
      "Community management",
      "Paid social advertising",
      "Influencer partnerships",
      "Analytics and reporting",
      "Social listening",
      "Brand reputation management"
    ],
    benefits: [
      "Build loyal community",
      "Increase brand awareness",
      "Drive website traffic and sales",
      "Get customer feedback and insights"
    ],
    process: [
      { step: "1", title: "Audit & Strategy", description: "Analyze current presence and create plan" },
      { step: "2", title: "Content Planning", description: "Develop content calendar and assets" },
      { step: "3", title: "Publishing & Engagement", description: "Post content and interact with audience" },
      { step: "4", title: "Analyze & Improve", description: "Review metrics and optimize strategy" }
    ],
    caseStudies: [
      {
        title: "Restaurant Social Media Growth",
        client: "Fine Dining Restaurant",
        challenge: "Low social media presence limiting reach and reservations",
        solution: "Created engaging content strategy with food photography and user-generated content",
        results: [
          "Grew Instagram from 500 to 25K followers",
          "Average post reach of 50K+ users",
          "Social media attributed bookings increased by 200%"
        ]
      }
    ],
    portfolio: []
  },
  "custom-development": {
    icon: Wrench,
    title: "Custom Development",
    description: "Tailored software solutions designed specifically for your unique business needs",
    longDescription: "Every business is unique, and sometimes off-the-shelf solutions don't cut it. We build custom software applications tailored to your specific workflows, requirements, and goals.",
    stats: [
      { label: "Custom Apps Built", value: "60+", icon: Award },
      { label: "Time Saved", value: "70%", icon: Clock },
      { label: "Client Retention", value: "100%", icon: Star },
      { label: "Integrations", value: "50+", icon: Wrench }
    ],
    features: [
      "Custom web applications",
      "API development and integration",
      "Database design and optimization",
      "Third-party integrations",
      "Ongoing support and maintenance",
      "Cloud deployment",
      "Performance optimization",
      "Security implementation"
    ],
    benefits: [
      "Perfectly fits your workflow",
      "Scalable as you grow",
      "Competitive advantage",
      "Full ownership and control"
    ],
    process: [
      { step: "1", title: "Requirements Gathering", description: "Deep dive into your business needs" },
      { step: "2", title: "Architecture Design", description: "Plan technical solution and database" },
      { step: "3", title: "Agile Development", description: "Build in sprints with regular demos" },
      { step: "4", title: "Deploy & Support", description: "Launch and provide ongoing maintenance" }
    ],
    caseStudies: [],
    portfolio: []
  }
};

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;

  // TODO: Add admin UI for service banner management
  // const { data: serviceBannersData } = useQuery<any>({
  //   queryKey: ["/api/customization/service-banners"],
  // });

  if (!slug || !(slug in services)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-service-not-found">Service Not Found</h1>
          <Link href="/services">
            <Button data-testid="button-back-to-services">Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const service = services[slug as keyof typeof services];
  const Icon = service.icon;

  // For now, use gradient background (custom banners can be added via admin panel later)
  const bannerUrl = null;

  return (
    <div className="flex flex-col">
      {/* Hero Section with Banner */}
      <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {bannerUrl ? (
          <div className="absolute inset-0">
            <img 
              src={bannerUrl} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-500/20"></div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6" data-testid="icon-service">
              <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white" data-testid="text-service-title">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8" data-testid="text-service-description">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg" data-testid="button-contact-cta">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" data-testid="button-learn-more" className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {service.stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover-elevate transition-all">
                  <StatIcon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About This Service</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {service.longDescription}
            </p>

            {/* Benefits */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <Card key={index} className="p-4 hover-elevate transition-all">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">What's Included</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Comprehensive Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed with {service.title.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature, index) => (
              <Card key={index} className="p-5 hover-elevate transition-all" data-testid={`feature-card-${index}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground leading-relaxed">{feature}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How We Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven process that delivers results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <Card key={index} className="relative p-6 hover-elevate transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.step}
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {service.caseStudies && service.caseStudies.length > 0 && (
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4">Success Stories</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Real Results
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how we've helped businesses like yours succeed
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {service.caseStudies.map((caseStudy, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">{caseStudy.client}</Badge>
                        <h3 className="text-2xl md:text-3xl font-bold">{caseStudy.title}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            The Challenge
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Our Solution
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Results Achieved
                        </h4>
                        <ul className="space-y-3">
                          {caseStudy.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground font-medium">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio */}
      {service.portfolio && service.portfolio.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Work</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Portfolio Showcase
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Examples of our {service.title.toLowerCase()} projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.portfolio.map((item, index) => (
                <Card key={index} className="overflow-hidden hover-elevate transition-all group">
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Card className="p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how {service.title.toLowerCase()} can help transform your business and achieve your goals.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button size="lg" className="text-lg" data-testid="button-contact-us">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="text-lg" data-testid="button-all-services">
                  View All Services
                </Button>
              </Link>
            </div>

            <Separator className="my-8" />

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Call Us</div>
                  <a href="tel:+919709707311" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 97097 07311
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email Us</div>
                  <a href="mailto:team@addisonxmedia.com" className="text-muted-foreground hover:text-primary transition-colors">
                    team@addisonxmedia.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Visit Us</div>
                  <p className="text-muted-foreground">
                    Ranchi, Jharkhand
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
