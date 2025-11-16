import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, ArrowRight, Code, ShoppingCart, TrendingUp, Search, Target, Palette, MessageCircle, Share2, Wrench } from "lucide-react";

const services = {
  "web-development": {
    icon: Code,
    title: "Web Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience",
    longDescription: "In today's digital age, your website is your business's front door. We create custom, responsive websites that not only look stunning but also perform exceptionally. Our team uses the latest technologies and frameworks to build fast, secure, and scalable web solutions tailored to your business needs.",
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
    caseStudies: [],
    portfolio: []
  }
};

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;

  if (!slug || !(slug in services)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const service = services[slug as keyof typeof services];
  const Icon = service.icon;

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 mb-6">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-service-title">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-service-description">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {service.longDescription}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {service.features.map((feature, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                </Card>
              ))}
            </div>

            {service.caseStudies && service.caseStudies.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Success Stories</h2>
                <div className="space-y-8">
                  {service.caseStudies.map((caseStudy, index) => (
                    <Card key={index} className="p-6 md:p-8">
                      <Badge className="mb-4">{caseStudy.client}</Badge>
                      <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-2">The Challenge</h4>
                          <p className="text-muted-foreground">{caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Our Solution</h4>
                          <p className="text-muted-foreground">{caseStudy.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Results</h4>
                          <ul className="space-y-2">
                            {caseStudy.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {service.portfolio && service.portfolio.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.portfolio.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how {service.title.toLowerCase()} can help grow your business in Ranchi and beyond.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" data-testid="button-all-services">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
