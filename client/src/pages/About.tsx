import { Card } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    description: "To empower businesses in Ranchi and beyond with innovative digital marketing solutions that drive measurable results and sustainable growth."
  },
  {
    icon: Eye,
    title: "Vision",
    description: "To be the most trusted digital marketing partner in Jharkhand, known for creativity, integrity, and exceptional client success."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in every project, continuously learning and adapting to deliver outstanding results."
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our success. We build lasting partnerships based on trust, transparency, and measurable outcomes."
  }
];

export default function About() {
  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="py-16 md:py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-about-title">
              About AddisonX Media
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-about-description">
              Your trusted digital marketing partner in Ranchi, dedicated to transforming 
              businesses through innovative strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center" data-testid="text-story-title">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6 px-2" data-testid="text-story-paragraph-1">
                AddisonX Media was founded with a clear vision: to bridge the digital divide 
                for businesses in Ranchi and across Jharkhand. We recognized that many local 
                businesses were struggling to establish a strong online presence and compete 
                in the digital marketplace.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6 px-2" data-testid="text-story-paragraph-2">
                Since our inception, we've been committed to delivering world-class digital 
                marketing services that combine global best practices with local market insights. 
                Our team of experienced professionals brings together expertise in web development, 
                SEO, social media marketing, and creative design to help businesses thrive online.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed px-2" data-testid="text-story-paragraph-3">
                Today, we're proud to be Ranchi's premier digital marketing agency, serving 
                clients across various industries and helping them achieve measurable growth 
                through strategic digital initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-12 md:py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4" data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-values-description">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-4 md:p-6 lg:p-8" data-testid={`card-value-${index}`}>
                  <div className="mb-3 md:mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3" data-testid={`text-value-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid={`text-value-description-${index}`}>
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center" data-testid="text-why-choose-title">
              Why Choose AddisonX Media?
            </h2>
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3" data-testid="text-reason-title-0">
                  Local Expertise, Global Standards
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-reason-description-0">
                  We understand the Ranchi market intimately while applying international 
                  best practices to ensure your business stands out.
                </p>
              </Card>
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3" data-testid="text-reason-title-1">
                  Comprehensive Solutions
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-reason-description-1">
                  From web development to social media marketing, we offer end-to-end 
                  digital services under one roof.
                </p>
              </Card>
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3" data-testid="text-reason-title-2">
                  Proven Track Record
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-reason-description-2">
                  Our portfolio of successful projects and satisfied clients speaks to 
                  our commitment to delivering exceptional results.
                </p>
              </Card>
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3" data-testid="text-reason-title-3">
                  Transparent Communication
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid="text-reason-description-3">
                  We believe in keeping you informed every step of the way with clear 
                  reporting and open dialogue.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
