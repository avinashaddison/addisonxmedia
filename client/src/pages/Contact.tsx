import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "" as string | undefined,
      company: "" as string | undefined,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset({
        name: "",
        email: "",
        phone: "" as string | undefined,
        company: "" as string | undefined,
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      <section className="py-12 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6" data-testid="text-contact-title">
              Get In Touch
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-2" data-testid="text-contact-description">
              Have a project in mind? We'd love to hear from you. Reach out to discuss 
              how we can help grow your business in Ranchi and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8" data-testid="text-contact-info-title">
                Contact Information
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                <Card className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base" data-testid="text-office-title">Office Location</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed" data-testid="text-office-address">
                        AddisonX Media<br />
                        Itki Road, Near Kawasaki Showroom<br />
                        Ranchi, Jharkhand - 834005<br />
                        India
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base" data-testid="text-phone-title">Phone</h3>
                      <a href="tel:+919709707311" className="text-primary hover:underline text-sm md:text-base" data-testid="text-phone-number">
                        +91 97097 07311
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base" data-testid="text-email-title">Email</h3>
                      <a href="mailto:team@addisonxmedia.com" className="text-primary hover:underline text-sm md:text-base" data-testid="text-email-address">
                        team@addisonxmedia.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base" data-testid="text-hours-title">Business Hours</h3>
                      <p className="text-muted-foreground text-sm md:text-base" data-testid="text-hours-weekday">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground text-sm md:text-base" data-testid="text-hours-weekend">
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                      <p className="text-muted-foreground text-sm md:text-base">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8" data-testid="text-contact-form-title">
                Send Us a Message
              </h2>
              
              <Card className="p-4 md:p-6 lg:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              data-testid="input-contact-name"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your@email.com" 
                              data-testid="input-contact-email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+91 1234567890" 
                              data-testid="input-contact-phone"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company name" 
                              data-testid="input-contact-company"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or inquiry..." 
                              className="min-h-32"
                              data-testid="input-contact-message"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={mutation.isPending}
                      data-testid="button-contact-submit"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6" data-testid="text-location-title">
              Find Us Here
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed px-2" data-testid="text-location-description">
              Visit our office in Ranchi to discuss your digital marketing needs in person. 
              We're conveniently located near Kawasaki Showroom on Itki Road.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden" data-testid="card-google-maps">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.2116410958984!2d85.29144099999999!3d23.380559699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1547faba215%3A0x14446796ff2072c2!2sAddisonX%20Media!5e0!3m2!1sen!2sin!4v1763371489401!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AddisonX Media Location"
                  data-testid="iframe-google-maps"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6" data-testid="text-serving-title">
              Proudly Serving Ranchi & Jharkhand
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed px-2" data-testid="text-serving-description">
              While we're based in Ranchi, our digital marketing services extend across 
              Jharkhand and beyond. Whether you're a local business or looking to expand 
              your reach, we're here to help you succeed in the digital landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
