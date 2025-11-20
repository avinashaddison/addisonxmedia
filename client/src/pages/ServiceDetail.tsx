import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ArrowRight, Code, ShoppingCart, TrendingUp, Search, Target, Palette, MessageCircle, Share2, Wrench, Phone, Mail, MapPin, Star, Users, Award, Clock, Zap, Shield, HeartHandshake, Lightbulb, ChevronRight, Package, Sparkles } from "lucide-react";

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
      { title: "Custom website design and development", description: "Tailored solutions built from scratch to match your brand" },
      { title: "Responsive and mobile-friendly layouts", description: "Perfect display across all devices and screen sizes" },
      { title: "Fast loading times and performance optimization", description: "Speed-optimized for better user experience and SEO" },
      { title: "SEO-friendly architecture", description: "Built with search engine visibility in mind" },
      { title: "Content management systems", description: "Easy-to-use CMS for managing your content" },
      { title: "E-commerce integration", description: "Seamlessly integrate online store functionality" },
      { title: "Progressive Web Apps (PWA)", description: "App-like experience directly from browser" },
      { title: "API development and integration", description: "Connect with third-party services and tools" }
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
    technologies: [
      { name: "React & Next.js", description: "Modern JavaScript frameworks for fast, interactive UIs" },
      { name: "Node.js", description: "Scalable backend development platform" },
      { name: "WordPress", description: "Popular CMS for easy content management" },
      { name: "Cloud Hosting", description: "AWS, Google Cloud, and reliable hosting solutions" }
    ],
    packages: [
      {
        name: "Starter Website",
        price: "₹15,000",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "1 month support"
        ],
        ideal: "Small businesses, startups"
      },
      {
        name: "Business Website",
        price: "₹35,000",
        features: [
          "Up to 15 pages",
          "Custom design",
          "Advanced SEO",
          "CMS integration",
          "3 months support",
          "Analytics setup"
        ],
        ideal: "Growing businesses",
        popular: true
      },
      {
        name: "Enterprise Website",
        price: "Custom",
        features: [
          "Unlimited pages",
          "Custom development",
          "E-commerce features",
          "API integrations",
          "6 months support",
          "Priority updates"
        ],
        ideal: "Large businesses, complex needs"
      }
    ],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer: "A typical business website takes 4-8 weeks from start to finish. The timeline depends on the complexity, number of pages, and custom features required. We provide a detailed timeline after understanding your requirements."
      },
      {
        question: "Do you provide website hosting?",
        answer: "Yes, we can arrange hosting for your website. We work with reliable hosting providers and can set up hosting as part of your package or help you choose the right hosting plan for your needs."
      },
      {
        question: "Can I update the website content myself?",
        answer: "Absolutely! We build websites with user-friendly content management systems (CMS) that allow you to easily update text, images, and other content without technical knowledge. We also provide training on how to use the CMS."
      },
      {
        question: "Will my website be mobile-friendly?",
        answer: "Yes, all our websites are fully responsive and mobile-friendly. With over 60% of web traffic coming from mobile devices, we ensure your website looks perfect and functions flawlessly on all screen sizes."
      },
      {
        question: "Do you offer website maintenance?",
        answer: "Yes, we offer ongoing maintenance and support packages. This includes security updates, content updates, bug fixes, and technical support to keep your website running smoothly."
      }
    ],
    whyChooseUs: [
      { icon: Zap, title: "Lightning Fast", description: "Optimized for speed with load times under 2 seconds" },
      { icon: Shield, title: "Secure & Reliable", description: "Built with security best practices and regular updates" },
      { icon: HeartHandshake, title: "Dedicated Support", description: "Ongoing support even after launch" },
      { icon: Lightbulb, title: "Modern Technology", description: "Using latest frameworks and tools" }
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
      },
      {
        title: "SaaS Application",
        description: "Cloud-based business management software",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      }
    ]
  },
  "ecommerce-development": {
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
      { title: "Custom ecommerce platforms", description: "Built specifically for your products and customers" },
      { title: "Payment gateway integration", description: "Secure checkout with multiple payment options" },
      { title: "Inventory management systems", description: "Real-time stock tracking and management" },
      { title: "Shopping cart optimization", description: "Smooth checkout experience to reduce cart abandonment" },
      { title: "Order tracking and management", description: "Complete order lifecycle management" },
      { title: "Product recommendations", description: "AI-powered suggestions to increase sales" },
      { title: "Multi-vendor marketplace support", description: "Build your own marketplace platform" },
      { title: "Mobile commerce solutions", description: "Optimized for mobile shopping experience" }
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
    technologies: [
      { name: "WooCommerce", description: "Powerful WordPress ecommerce plugin" },
      { name: "Shopify", description: "All-in-one ecommerce platform" },
      { name: "Custom Solutions", description: "Built from scratch for unique needs" },
      { name: "Payment Gateways", description: "Razorpay, PayU, Paytm, and more" }
    ],
    packages: [
      {
        name: "Basic Store",
        price: "₹25,000",
        features: [
          "Up to 50 products",
          "Payment gateway integration",
          "Basic inventory management",
          "Order management",
          "Mobile responsive",
          "1 month support"
        ],
        ideal: "New online businesses"
      },
      {
        name: "Professional Store",
        price: "₹60,000",
        features: [
          "Up to 500 products",
          "Multiple payment options",
          "Advanced inventory system",
          "Email notifications",
          "Product reviews",
          "Analytics dashboard",
          "3 months support"
        ],
        ideal: "Established retailers",
        popular: true
      },
      {
        name: "Enterprise Marketplace",
        price: "Custom",
        features: [
          "Unlimited products",
          "Multi-vendor support",
          "Custom features",
          "Advanced integrations",
          "Dedicated account manager",
          "12 months priority support"
        ],
        ideal: "Large businesses, marketplaces"
      }
    ],
    faqs: [
      {
        question: "Which payment gateways do you integrate?",
        answer: "We integrate all major Indian payment gateways including Razorpay, PayU, Paytm, Instamojo, PhonePe, and international gateways like PayPal and Stripe. We recommend based on your business needs and target audience."
      },
      {
        question: "Can you migrate my existing store to a new platform?",
        answer: "Yes, we specialize in ecommerce migrations. We can safely migrate your products, customer data, orders, and other information from platforms like WooCommerce, Shopify, Magento, or custom solutions to your new store."
      },
      {
        question: "Do you provide inventory management?",
        answer: "Yes, all our ecommerce solutions include inventory management features. You can track stock levels, get low stock alerts, manage variants, and sync inventory across multiple sales channels if needed."
      },
      {
        question: "How secure is the payment processing?",
        answer: "We implement industry-standard security practices including SSL certificates, PCI DSS compliance, and use trusted payment gateway providers. Customer payment information is processed securely through the gateway and never stored on your server."
      },
      {
        question: "Can I sell on social media too?",
        answer: "Yes! We can integrate your store with Facebook Shop, Instagram Shopping, and WhatsApp Business to enable social commerce. This allows customers to discover and purchase products directly from social platforms."
      }
    ],
    whyChooseUs: [
      { icon: Shield, title: "Secure Checkout", description: "Bank-level security for all transactions" },
      { icon: Zap, title: "Fast Performance", description: "Quick loading for better conversions" },
      { icon: HeartHandshake, title: "24/7 Support", description: "Always here when you need us" },
      { icon: TrendingUp, title: "Sales Focused", description: "Built to maximize your revenue" }
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
        description: "Modern fashion ecommerce with product filters",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
      },
      {
        title: "Electronics Marketplace",
        description: "Multi-vendor electronics marketplace",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop"
      }
    ]
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
      { title: "Local keyword research and optimization", description: "Target keywords that local customers actually use" },
      { title: "Google My Business optimization", description: "Maximize your GMB profile visibility" },
      { title: "Local directory submissions", description: "List your business across relevant directories" },
      { title: "Location-based content creation", description: "Content tailored to your local audience" },
      { title: "Review management and reputation", description: "Build and manage your online reviews" },
      { title: "Local link building", description: "Get quality backlinks from local sources" },
      { title: "Citation building", description: "Consistent NAP across the web" },
      { title: "Local schema markup", description: "Help search engines understand your business" }
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
    technologies: [
      { name: "Google My Business", description: "Primary local search platform" },
      { name: "Local SEO Tools", description: "Moz Local, BrightLocal, SEMrush" },
      { name: "Review Platforms", description: "Google, Facebook, JustDial integration" },
      { name: "Analytics", description: "Track local search performance" }
    ],
    packages: [
      {
        name: "Local Starter",
        price: "₹8,000/mo",
        features: [
          "GMB optimization",
          "10 local keywords",
          "Monthly reporting",
          "Citation building (5/month)",
          "Review monitoring"
        ],
        ideal: "Small local businesses"
      },
      {
        name: "Local Pro",
        price: "₹15,000/mo",
        features: [
          "Complete GMB management",
          "25 local keywords",
          "Weekly ranking reports",
          "Citation building (10/month)",
          "Review management",
          "Local content creation",
          "Competitor analysis"
        ],
        ideal: "Growing businesses",
        popular: true
      },
      {
        name: "Local Authority",
        price: "₹25,000/mo",
        features: [
          "Multi-location optimization",
          "50+ keywords",
          "Daily monitoring",
          "Unlimited citations",
          "Advanced reputation management",
          "Local PR & link building",
          "Dedicated SEO specialist"
        ],
        ideal: "Multi-location businesses"
      }
    ],
    faqs: [
      {
        question: "How long does it take to see SEO results?",
        answer: "Local SEO typically shows initial results in 2-3 months, with significant improvements by 6 months. The timeline depends on competition level and current website status. We provide monthly reports to track progress."
      },
      {
        question: "What is Google My Business and why is it important?",
        answer: "Google My Business (GMB) is a free tool that lets you manage how your business appears on Google Search and Maps. A well-optimized GMB profile is crucial for local SEO as it helps you appear in the local 3-pack and provides essential business information to customers."
      },
      {
        question: "Do you guarantee first page rankings?",
        answer: "While we can't guarantee specific rankings (no ethical SEO agency can), we use proven strategies that have consistently helped our clients reach top positions. We focus on sustainable, white-hat techniques that provide long-term results."
      },
      {
        question: "How do you handle online reviews?",
        answer: "We help you build a system for generating positive reviews, monitor all review platforms, provide response templates, and help manage negative reviews professionally. Reviews are crucial for local SEO and customer trust."
      },
      {
        question: "What's the difference between local SEO and regular SEO?",
        answer: "Local SEO focuses on ranking for location-specific searches (like 'restaurants in Ranchi') and appearing in Google Maps results. It emphasizes GMB optimization, local citations, and location-based content, while regular SEO targets broader, non-location keywords."
      }
    ],
    whyChooseUs: [
      { icon: MapPin, title: "Local Expertise", description: "Deep understanding of Ranchi and nearby markets" },
      { icon: TrendingUp, title: "Proven Results", description: "80+ businesses ranked in top 3" },
      { icon: Shield, title: "White Hat Only", description: "Ethical SEO that lasts" },
      { icon: HeartHandshake, title: "Transparent Reporting", description: "Clear monthly progress reports" }
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
      { title: "Social media strategy development", description: "Custom strategy aligned with your business goals" },
      { title: "Content creation and curation", description: "Engaging posts, graphics, and videos" },
      { title: "Community management", description: "Active engagement with your audience" },
      { title: "Paid social advertising", description: "Targeted ads for maximum ROI" },
      { title: "Influencer partnerships", description: "Collaborate with relevant influencers" },
      { title: "Analytics and reporting", description: "Track performance and insights" },
      { title: "Social listening", description: "Monitor brand mentions and trends" },
      { title: "Brand reputation management", description: "Protect and enhance your online image" }
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
    technologies: [
      { name: "Meta Business Suite", description: "Facebook & Instagram management" },
      { name: "LinkedIn", description: "Professional networking platform" },
      { name: "Content Tools", description: "Canva, Adobe Creative Suite" },
      { name: "Analytics", description: "Native insights and third-party tools" }
    ],
    packages: [
      {
        name: "Social Starter",
        price: "₹10,000/mo",
        features: [
          "2 platforms",
          "12 posts/month",
          "Basic graphics",
          "Community management",
          "Monthly report"
        ],
        ideal: "Small businesses starting out"
      },
      {
        name: "Social Growth",
        price: "₹20,000/mo",
        features: [
          "4 platforms",
          "20 posts/month",
          "Professional graphics",
          "Daily engagement",
          "Story management",
          "Weekly analytics",
          "Content calendar"
        ],
        ideal: "Growing brands",
        popular: true
      },
      {
        name: "Social Authority",
        price: "₹40,000/mo",
        features: [
          "All platforms",
          "40+ posts/month",
          "Premium content creation",
          "24/7 monitoring",
          "Influencer campaigns",
          "Paid ad management",
          "Dedicated manager"
        ],
        ideal: "Established brands"
      }
    ],
    faqs: [
      {
        question: "Which social media platforms should I be on?",
        answer: "It depends on your target audience and business type. We typically recommend starting with Facebook and Instagram for most B2C businesses, LinkedIn for B2B, and potentially YouTube for content-heavy brands. We help you choose based on where your customers spend time."
      },
      {
        question: "How often should I post on social media?",
        answer: "Consistency is more important than frequency. We typically recommend 3-5 posts per week on platforms like Facebook and Instagram, daily on Twitter, and 2-3 times per week on LinkedIn. The exact frequency depends on your industry and audience engagement patterns."
      },
      {
        question: "Do you create the content or do I need to provide it?",
        answer: "We create all content including graphics, captions, and hashtags. However, we'll need some input from you initially to understand your brand voice, and we appreciate any product photos or specific announcements you want to share."
      },
      {
        question: "How do you measure social media success?",
        answer: "We track key metrics including follower growth, engagement rate (likes, comments, shares), reach, website clicks, and conversions. Success metrics are customized based on your specific goals - whether that's brand awareness, lead generation, or sales."
      },
      {
        question: "Will you respond to comments and messages?",
        answer: "Yes, community management is included in our packages. We monitor and respond to comments and messages during business hours. For urgent customer service issues, we can set up a protocol to notify you directly."
      }
    ],
    whyChooseUs: [
      { icon: Sparkles, title: "Creative Content", description: "Eye-catching designs that stop the scroll" },
      { icon: TrendingUp, title: "Data-Driven", description: "Strategies based on analytics and insights" },
      { icon: Users, title: "Community Focus", description: "Building real engagement, not just numbers" },
      { icon: Zap, title: "Quick Response", description: "Active monitoring and fast engagement" }
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
      { title: "Logo and brand identity design", description: "Create memorable brand marks and guidelines" },
      { title: "Marketing collateral creation", description: "Brochures, flyers, business cards, and more" },
      { title: "Social media graphics", description: "Eye-catching posts and story designs" },
      { title: "Infographic design", description: "Visual data representation and educational graphics" },
      { title: "Print and digital design", description: "From billboards to web banners" },
      { title: "Packaging design", description: "Product packaging that stands out on shelves" },
      { title: "Presentation design", description: "Professional slides for pitches and meetings" },
      { title: "Motion graphics", description: "Animated visuals for videos and ads" }
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
    technologies: [
      { name: "Adobe Creative Suite", description: "Photoshop, Illustrator, InDesign" },
      { name: "Figma", description: "Collaborative design and prototyping" },
      { name: "Canva Pro", description: "Quick edits and social graphics" },
      { name: "After Effects", description: "Motion graphics and animation" }
    ],
    packages: [
      {
        name: "Brand Essentials",
        price: "₹15,000",
        features: [
          "Logo design (3 concepts)",
          "Business card design",
          "Letterhead design",
          "Social media profile images",
          "Brand color palette",
          "2 revision rounds"
        ],
        ideal: "New businesses"
      },
      {
        name: "Brand Identity",
        price: "₹35,000",
        features: [
          "Complete logo package",
          "Brand style guide",
          "Marketing collateral (5 items)",
          "Social media templates (10)",
          "Email signature",
          "Presentation template",
          "Unlimited revisions"
        ],
        ideal: "Established businesses",
        popular: true
      },
      {
        name: "Creative Retainer",
        price: "₹25,000/mo",
        features: [
          "Unlimited design requests",
          "2-day turnaround",
          "All design categories",
          "Dedicated designer",
          "Brand management",
          "Priority support",
          "Source files included"
        ],
        ideal: "Ongoing design needs"
      }
    ],
    faqs: [
      {
        question: "What's included in a logo design package?",
        answer: "Our logo packages include multiple initial concepts, revision rounds, final files in various formats (PNG, JPG, SVG, PDF), different color variations (full color, black/white, reversed), and a basic brand guide with logo usage guidelines."
      },
      {
        question: "How many revisions do I get?",
        answer: "Most packages include 2-3 revision rounds. Our Brand Identity package includes unlimited revisions. Additional revisions beyond the package limit can be purchased if needed. We aim to get it right within the included revisions through clear communication."
      },
      {
        question: "Do I own the final designs?",
        answer: "Yes! Once the project is complete and paid for, you own all rights to the final approved designs. We transfer complete ownership, and you can use the designs however you wish without any restrictions."
      },
      {
        question: "What file formats will I receive?",
        answer: "You'll receive your designs in all commonly used formats including high-resolution PNG, JPG, vector files (AI, SVG, EPS), and PDF. For logos, we also provide different versions for print and web use."
      },
      {
        question: "Can you match my existing brand style?",
        answer: "Absolutely! If you have existing brand guidelines or a particular style you're following, we can create new designs that perfectly match your current branding. Just share your brand guidelines or examples with us."
      }
    ],
    whyChooseUs: [
      { icon: Lightbulb, title: "Creative Excellence", description: "Award-winning design team" },
      { icon: Zap, title: "Fast Turnaround", description: "Most projects in 48 hours" },
      { icon: HeartHandshake, title: "Collaborative Process", description: "Your input valued at every step" },
      { icon: Package, title: "All Formats", description: "Complete file package delivery" }
    ],
    caseStudies: [],
    portfolio: [
      {
        title: "Brand Identity Package",
        description: "Complete visual identity for tech startup",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
      },
      {
        title: "Marketing Collateral",
        description: "Brochures and promotional materials",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop"
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
      { title: "WhatsApp Business API integration", description: "Official Business API for large-scale messaging" },
      { title: "Automated messaging campaigns", description: "Schedule and automate your campaigns" },
      { title: "Customer support automation", description: "Chatbots for instant responses" },
      { title: "Broadcast messaging", description: "Send updates to multiple contacts" },
      { title: "Rich media sharing", description: "Images, videos, documents, and catalogs" },
      { title: "Analytics and tracking", description: "Monitor message delivery and engagement" },
      { title: "Chatbot development", description: "AI-powered conversations" },
      { title: "CRM integration", description: "Sync with your customer database" }
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
    technologies: [
      { name: "WhatsApp Business API", description: "Official platform for business messaging" },
      { name: "Chatbot Platform", description: "AI-powered conversation automation" },
      { name: "CRM Integration", description: "Connect with existing systems" },
      { name: "Analytics Tools", description: "Track and measure performance" }
    ],
    packages: [
      {
        name: "WhatsApp Starter",
        price: "₹5,000/mo",
        features: [
          "WhatsApp Business setup",
          "Up to 1000 messages/month",
          "Basic automation",
          "Broadcast lists",
          "Quick replies",
          "Monthly report"
        ],
        ideal: "Small businesses"
      },
      {
        name: "WhatsApp Pro",
        price: "₹15,000/mo",
        features: [
          "WhatsApp API integration",
          "Up to 10,000 messages/month",
          "Advanced chatbot",
          "CRM integration",
          "Rich media campaigns",
          "Analytics dashboard",
          "Priority support"
        ],
        ideal: "Growing businesses",
        popular: true
      },
      {
        name: "WhatsApp Enterprise",
        price: "Custom",
        features: [
          "Unlimited messages",
          "Custom API integration",
          "Advanced AI chatbot",
          "Multi-agent support",
          "Custom workflows",
          "Dedicated account manager",
          "24/7 support"
        ],
        ideal: "Large businesses"
      }
    ],
    faqs: [
      {
        question: "What's the difference between WhatsApp Business app and API?",
        answer: "WhatsApp Business app is a free app suitable for small businesses with limited messaging needs. WhatsApp Business API is for medium to large businesses, allowing automation, multiple users, and integration with other systems. We help you choose the right solution."
      },
      {
        question: "Can I send promotional messages to anyone?",
        answer: "No, WhatsApp has strict policies. You can only send messages to customers who have opted in to receive messages from you. We help you build your opt-in list through proper channels and maintain compliance with WhatsApp's policies."
      },
      {
        question: "How does the chatbot work?",
        answer: "Our chatbots use AI to understand customer queries and provide instant responses. They can handle FAQs, take orders, book appointments, and route complex queries to human agents. The bot learns from interactions to improve over time."
      },
      {
        question: "Can I integrate WhatsApp with my existing CRM?",
        answer: "Yes! We can integrate WhatsApp with most popular CRMs including Salesforce, Zoho, HubSpot, and custom systems. This allows you to manage all customer communications from one place and maintain a complete interaction history."
      },
      {
        question: "What kind of messages can I send?",
        answer: "You can send text messages, images, videos, documents, location, product catalogs, and interactive messages with buttons. For promotional messages, you need pre-approved message templates. We help you create compliant and effective templates."
      }
    ],
    whyChooseUs: [
      { icon: MessageCircle, title: "98% Open Rate", description: "Much higher than email marketing" },
      { icon: Zap, title: "Instant Delivery", description: "Messages delivered in seconds" },
      { icon: Shield, title: "Compliant", description: "Follow all WhatsApp policies" },
      { icon: HeartHandshake, title: "Personal Touch", description: "Direct, conversational engagement" }
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
      { title: "Campaign strategy and planning", description: "Custom strategy for your business goals" },
      { title: "Ad creative development", description: "Compelling ad copy and visuals" },
      { title: "Targeting and audience research", description: "Reach the right people at the right time" },
      { title: "Budget optimization", description: "Get the most from your ad spend" },
      { title: "Performance tracking and reporting", description: "Detailed insights and analytics" },
      { title: "A/B testing", description: "Continuous testing to improve results" },
      { title: "Conversion rate optimization", description: "Improve landing pages and funnels" },
      { title: "Remarketing campaigns", description: "Re-engage interested prospects" }
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
    technologies: [
      { name: "Google Ads", description: "Search, Display, YouTube, Shopping ads" },
      { name: "Meta Ads", description: "Facebook and Instagram advertising" },
      { name: "LinkedIn Ads", description: "B2B targeted advertising" },
      { name: "Analytics", description: "Google Analytics, conversion tracking" }
    ],
    packages: [
      {
        name: "Ads Starter",
        price: "₹10,000/mo + ad spend",
        features: [
          "1 platform (Google or Facebook)",
          "Up to ₹25K ad spend/month",
          "Campaign setup",
          "Basic optimization",
          "Monthly report",
          "Email support"
        ],
        ideal: "Testing ads"
      },
      {
        name: "Ads Growth",
        price: "₹20,000/mo + ad spend",
        features: [
          "2-3 platforms",
          "Up to ₹1L ad spend/month",
          "A/B testing",
          "Advanced targeting",
          "Landing page advice",
          "Bi-weekly reports",
          "Dedicated manager"
        ],
        ideal: "Scaling businesses",
        popular: true
      },
      {
        name: "Ads Enterprise",
        price: "Custom + ad spend",
        features: [
          "All platforms",
          "Unlimited ad spend",
          "Advanced optimization",
          "Custom landing pages",
          "Weekly strategy calls",
          "Real-time dashboards",
          "Priority support"
        ],
        ideal: "Large ad budgets"
      }
    ],
    faqs: [
      {
        question: "How much should I spend on advertising?",
        answer: "It depends on your industry, competition, and goals. We typically recommend starting with ₹25,000-₹50,000 per month to gather data and test different approaches. We help you determine the right budget based on your expected return on investment."
      },
      {
        question: "Which platforms should I advertise on?",
        answer: "It depends on your target audience and business type. Google Ads works well for intent-based searches, Facebook/Instagram for B2C and visual products, LinkedIn for B2B, and YouTube for video content. We recommend starting with 1-2 platforms and expanding based on results."
      },
      {
        question: "How quickly will I see results?",
        answer: "You'll typically see initial data within the first week and meaningful results within 2-4 weeks. However, it takes 2-3 months to fully optimize campaigns and achieve consistent, profitable results. Advertising is an ongoing process of testing and refinement."
      },
      {
        question: "What's your fee structure?",
        answer: "We charge a monthly management fee plus your advertising spend (which goes directly to the platforms). Our fee covers strategy, campaign setup, creative development, optimization, and reporting. Ad spend is separate and billed directly by the platforms."
      },
      {
        question: "Can you guarantee a specific ROAS?",
        answer: "While we can't guarantee specific results (as they depend on many factors), our average client achieves 3-5X ROAS. We set realistic expectations based on your industry benchmarks and work systematically to exceed them through continuous optimization."
      }
    ],
    whyChooseUs: [
      { icon: Target, title: "Precision Targeting", description: "Reach exactly who you want" },
      { icon: TrendingUp, title: "Proven Track Record", description: "450% average ROAS" },
      { icon: Lightbulb, title: "Creative Excellence", description: "Ads that convert" },
      { icon: Shield, title: "Transparent Reporting", description: "Full visibility into performance" }
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
      { title: "Brand strategy development", description: "Define your brand positioning and messaging" },
      { title: "Market positioning analysis", description: "Understand competitive landscape" },
      { title: "Creative campaign design", description: "Memorable promotional campaigns" },
      { title: "Multi-channel promotion", description: "Reach audience across platforms" },
      { title: "Brand awareness metrics tracking", description: "Measure brand growth" },
      { title: "Influencer partnerships", description: "Collaborate with relevant voices" },
      { title: "Content marketing", description: "Engaging brand storytelling" },
      { title: "Brand identity design", description: "Visual brand elements and guidelines" }
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
    technologies: [
      { name: "Brand Strategy Tools", description: "Positioning and messaging frameworks" },
      { name: "Creative Suite", description: "Design and content creation tools" },
      { name: "PR Platforms", description: "Media outreach and coverage" },
      { name: "Analytics", description: "Brand awareness and sentiment tracking" }
    ],
    packages: [
      {
        name: "Brand Launch",
        price: "₹50,000",
        features: [
          "Brand strategy workshop",
          "Positioning statement",
          "Brand messaging guide",
          "Launch campaign plan",
          "Basic promotional materials",
          "2-month support"
        ],
        ideal: "New brands"
      },
      {
        name: "Brand Growth",
        price: "₹30,000/mo",
        features: [
          "Ongoing campaign management",
          "Content creation",
          "Social media promotion",
          "PR outreach",
          "Influencer partnerships",
          "Monthly brand reports",
          "Strategy refinement"
        ],
        ideal: "Established brands",
        popular: true
      },
      {
        name: "Brand Authority",
        price: "Custom",
        features: [
          "Complete brand overhaul",
          "Multi-channel campaigns",
          "Large-scale PR",
          "Celebrity partnerships",
          "Event sponsorships",
          "Dedicated brand team",
          "12-month commitment"
        ],
        ideal: "Enterprise level"
      }
    ],
    faqs: [
      {
        question: "What's the difference between marketing and brand promotion?",
        answer: "Marketing focuses on promoting specific products or services to drive sales, while brand promotion focuses on building awareness, recognition, and emotional connection with your overall brand. Brand promotion is a long-term investment in your company's reputation and market position."
      },
      {
        question: "How do you measure brand awareness?",
        answer: "We track metrics like brand recall (unaided and aided), search volume for your brand name, social media mentions, website direct traffic, brand sentiment, and share of voice compared to competitors. We use surveys and analytics tools to measure these indicators."
      },
      {
        question: "Do I need brand promotion if I'm already doing marketing?",
        answer: "Yes! While marketing drives short-term sales, brand promotion builds long-term equity. Strong brands command premium pricing, customer loyalty, and easier market expansion. They're complementary - strong branding makes your marketing more effective."
      },
      {
        question: "How long does it take to build brand awareness?",
        answer: "Building meaningful brand awareness typically takes 6-12 months of consistent effort. However, you'll see early indicators within 2-3 months. Brand building is a marathon, not a sprint - it requires patience and consistent investment."
      },
      {
        question: "What role do influencers play in brand promotion?",
        answer: "Influencers can significantly accelerate brand awareness by lending their credibility and reach to your brand. We identify influencers whose audience matches your target market and whose values align with your brand for authentic partnerships."
      }
    ],
    whyChooseUs: [
      { icon: Lightbulb, title: "Strategic Thinking", description: "Data-driven brand strategies" },
      { icon: Sparkles, title: "Creative Campaigns", description: "Memorable brand experiences" },
      { icon: TrendingUp, title: "Measurable Results", description: "Track brand growth" },
      { icon: HeartHandshake, title: "Long-term Partnership", description: "We grow with your brand" }
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
      { title: "Custom web applications", description: "Bespoke solutions for your workflow" },
      { title: "API development and integration", description: "Connect systems seamlessly" },
      { title: "Database design and optimization", description: "Efficient data management" },
      { title: "Third-party integrations", description: "Connect with existing tools" },
      { title: "Ongoing support and maintenance", description: "We're here long-term" },
      { title: "Cloud deployment", description: "Scalable hosting solutions" },
      { title: "Performance optimization", description: "Fast, efficient applications" },
      { title: "Security implementation", description: "Enterprise-grade protection" }
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
    technologies: [
      { name: "Full Stack", description: "React, Node.js, Python, PHP" },
      { name: "Databases", description: "MySQL, PostgreSQL, MongoDB" },
      { name: "Cloud Services", description: "AWS, Google Cloud, Azure" },
      { name: "Mobile", description: "React Native, Flutter" }
    ],
    packages: [
      {
        name: "Small Project",
        price: "₹75,000",
        features: [
          "Simple custom application",
          "Basic features",
          "Up to 3 user roles",
          "Basic dashboard",
          "3 months support",
          "Documentation"
        ],
        ideal: "Simple automation needs"
      },
      {
        name: "Medium Project",
        price: "₹2,00,000",
        features: [
          "Complex web application",
          "Advanced features",
          "Unlimited user roles",
          "Admin dashboard",
          "API integrations",
          "6 months support",
          "Training included"
        ],
        ideal: "Business process automation",
        popular: true
      },
      {
        name: "Enterprise Project",
        price: "Custom",
        features: [
          "Large-scale application",
          "Custom architecture",
          "Multiple integrations",
          "Mobile apps",
          "Dedicated team",
          "12 months support",
          "SLA guarantee"
        ],
        ideal: "Complex business solutions"
      }
    ],
    faqs: [
      {
        question: "How is custom development different from using ready-made software?",
        answer: "Custom development creates a solution specifically for your business processes and needs. While ready-made software requires you to adapt your workflow to the software, custom development adapts to your existing workflow, providing better efficiency and user adoption."
      },
      {
        question: "How long does custom development take?",
        answer: "Simple projects take 2-3 months, medium complexity projects 4-6 months, and enterprise solutions can take 6-12 months. We use agile development, so you'll see progress and can provide feedback throughout the process, not just at the end."
      },
      {
        question: "What if my requirements change during development?",
        answer: "That's common and expected! Our agile process accommodates changing requirements. We work in 2-week sprints with regular reviews, allowing you to refine requirements as you see the application taking shape. Major changes may affect timeline and cost."
      },
      {
        question: "Will I own the source code?",
        answer: "Yes! Upon final payment, you receive full ownership of the source code, database, and all project assets. We can also provide documentation and optional training for your team to maintain the application."
      },
      {
        question: "Do you provide ongoing support after launch?",
        answer: "Yes, we offer various support packages including bug fixes, feature enhancements, performance monitoring, and updates. Most clients opt for at least 6-12 months of post-launch support to ensure smooth operation."
      }
    ],
    whyChooseUs: [
      { icon: Wrench, title: "Tailored Solutions", description: "Built exactly for your needs" },
      { icon: Shield, title: "Enterprise Quality", description: "Scalable, secure architecture" },
      { icon: Users, title: "Agile Process", description: "Regular demos and feedback" },
      { icon: HeartHandshake, title: "Long-term Partner", description: "Support beyond launch" }
    ],
    caseStudies: [],
    portfolio: []
  }
};

export default function ServiceDetail() {
  const [, params] = useRoute("/service/:slug");
  const slug = params?.slug;

  const { data: serviceBanner } = useQuery<any>({
    queryKey: ["/api/service-banners", slug],
    enabled: !!slug,
  });

  if (!slug || !(slug in services)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-service-not-found">Service Not Found</h1>
          <a href="/service">
            <Button data-testid="button-back-to-services">Back to Services</Button>
          </a>
        </div>
      </div>
    );
  }

  const service = services[slug as keyof typeof services];
  const Icon = service.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-orange-500/5">
        {serviceBanner?.bannerUrl && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90 z-10"></div>
            <img 
              src={serviceBanner.bannerUrl} 
              alt={service.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 text-base px-4 py-2" data-testid="badge-service-category">
              <Icon className="w-4 h-4 mr-2 inline" />
              {service.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-orange-600 bg-clip-text text-transparent" data-testid="text-service-title">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl" data-testid="text-service-description">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#packages">
                <Button 
                  size="lg" 
                  className="text-lg bg-gradient-to-r from-primary via-purple-600 to-orange-600 hover:from-primary/90 hover:via-purple-700 hover:to-orange-700 shadow-lg shadow-primary/25 border-0" 
                  data-testid="button-view-pricing"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-md" 
                  data-testid="button-get-quote"
                >
                  Get Free Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {service.stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <StatIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-primary" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
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
                  <Card key={index} className="p-4 hover-elevate">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`feature-card-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The AddisonX Advantage
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What makes us different from other agencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.whyChooseUs.map((reason, index) => {
              const ReasonIcon = reason.icon;
              return (
                <Card key={index} className="p-6 text-center hover-elevate">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 mb-4">
                    <ReasonIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4">Technology & Tools</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                What We Use
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Industry-leading technologies and platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.technologies.map((tech, index) => (
                <Card key={index} className="p-6 hover-elevate">
                  <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <Card key={index} className="relative p-6 hover-elevate">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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

      {/* Pricing Packages */}
      {service.packages && service.packages.length > 0 && (
        <section id="packages" className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Choose Your Package
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flexible plans to suit businesses of all sizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {service.packages.map((pkg, index) => (
                <Card key={index} className={`relative p-8 hover-elevate ${pkg.popular ? 'border-2 border-primary' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                      {pkg.price.includes('/mo') && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Ideal for {pkg.ideal}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="block">
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about {service.title.toLowerCase()}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

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
                <Card key={index} className="overflow-hidden hover-elevate group">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
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
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 via-purple-500/5 to-orange-500/5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how {service.title.toLowerCase()} can help transform your business and achieve your goals.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a href="/contact">
                <Button size="lg" className="text-lg" data-testid="button-contact-us">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </a>
              <a href="/service">
                <Button size="lg" variant="outline" className="text-lg" data-testid="button-all-services">
                  View All Services
                </Button>
              </a>
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
                  <div className="space-y-1">
                    <a href="tel:+919709707311" className="block text-muted-foreground hover:text-primary transition-colors">
                      +91 97097 07311
                    </a>
                    <a href="tel:+919142647797" className="block text-muted-foreground hover:text-primary transition-colors">
                      +91 91426 47797
                    </a>
                  </div>
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
