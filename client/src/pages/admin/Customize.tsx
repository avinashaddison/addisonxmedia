import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Settings, Image, FileText, Search, Plus, X } from "lucide-react";
import type { HomepageCustomization, SeoSetting } from "@shared/schema";

export default function Customize() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");

  // Fetch all customizations
  const { data: customizations } = useQuery<HomepageCustomization[]>({
    queryKey: ["/api/customization"],
  });

  // Fetch all SEO settings
  const { data: seoSettings } = useQuery<SeoSetting[]>({
    queryKey: ["/api/seo"],
  });

  // Get specific section data
  const getCustomization = (section: string) => {
    return customizations?.find(c => c.section === section);
  };

  const getSeoSetting = (page: string) => {
    return seoSettings?.find(s => s.page === page);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-customize-title">Website Customization</h1>
        <p className="text-muted-foreground" data-testid="text-customize-description">
          Customize your website content, banners, and SEO settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero" data-testid="tab-hero">
            <FileText className="h-4 w-4 mr-2" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="services" data-testid="tab-services">
            <Settings className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="banners" data-testid="tab-banners">
            <Image className="h-4 w-4 mr-2" />
            Banners & Sliders
          </TabsTrigger>
          <TabsTrigger value="seo" data-testid="tab-seo">
            <Search className="h-4 w-4 mr-2" />
            SEO Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroSectionForm customization={getCustomization("hero")} />
        </TabsContent>

        <TabsContent value="services">
          <ServicesForm customization={getCustomization("services")} />
        </TabsContent>

        <TabsContent value="banners">
          <BannersForm customization={getCustomization("banners")} />
        </TabsContent>

        <TabsContent value="seo">
          <SeoForm seoSettings={seoSettings || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Section Form Component
function HeroSectionForm({ customization }: { customization?: HomepageCustomization }) {
  const { toast } = useToast();
  const content = customization?.content as any || {
    title: "Digital Marketing Excellence",
    subtitle: "Grow Your Business with AddisonX Media",
    description: "Professional digital marketing services in Ranchi",
    buttonText: "Get Started Now",
    buttonLink: "/contact"
  };

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    description: z.string().min(1, "Description is required"),
    buttonText: z.string().min(1, "Button text is required"),
    buttonLink: z.string().min(1, "Button link is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: content,
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/customization", {
        section: "hero",
        content: data,
        isActive: "true",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customization"] });
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update hero section",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Content</CardTitle>
        <CardDescription>
          Customize the main hero section of your homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-subtitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="textarea-hero-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-button-text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Link</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-button-link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} data-testid="button-save-hero">
              {mutation.isPending ? "Saving..." : "Save Hero Section"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Services Form Component
function ServicesForm({ customization }: { customization?: HomepageCustomization }) {
  const { toast } = useToast();
  const content = customization?.content as any || {
    title: "Our Services",
    description: "Comprehensive digital marketing solutions",
    services: [
      { title: "Web Development", description: "Professional website development" },
      { title: "SEO", description: "Search engine optimization" },
    ]
  };

  const [services, setServices] = useState(content.services || []);
  const [title, setTitle] = useState(content.title || "Our Services");
  const [description, setDescription] = useState(content.description || "");

  const mutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/customization", {
        section: "services",
        content: { title, description, services },
        isActive: "true",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customization"] });
      toast({
        title: "Success",
        description: "Services updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update services",
        variant: "destructive",
      });
    },
  });

  const addService = () => {
    setServices([...services, { title: "", description: "" }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_: any, i: number) => i !== index));
  };

  const updateService = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Section</CardTitle>
        <CardDescription>
          Customize the services displayed on your homepage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="services-title">Section Title</Label>
          <Input
            id="services-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="input-services-title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="services-description">Section Description</Label>
          <Textarea
            id="services-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            data-testid="textarea-services-description"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Services List</Label>
            <Button
              type="button"
              onClick={addService}
              size="sm"
              data-testid="button-add-service"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {services.map((service: any, index: number) => (
            <Card key={index} className="p-4" data-testid={`service-item-${index}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Service {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeService(index)}
                    data-testid={`button-remove-service-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Service Title"
                  value={service.title}
                  onChange={(e) => updateService(index, "title", e.target.value)}
                  data-testid={`input-service-title-${index}`}
                />
                <Textarea
                  placeholder="Service Description"
                  value={service.description}
                  onChange={(e) => updateService(index, "description", e.target.value)}
                  data-testid={`textarea-service-description-${index}`}
                />
              </div>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          data-testid="button-save-services"
        >
          {mutation.isPending ? "Saving..." : "Save Services"}
        </Button>
      </CardContent>
    </Card>
  );
}

// Banners Form Component
function BannersForm({ customization }: { customization?: HomepageCustomization }) {
  const { toast } = useToast();
  const content = customization?.content as any || {
    banners: [],
    sliders: []
  };

  const [banners, setBanners] = useState(content.banners || []);
  const [sliders, setSliders] = useState(content.sliders || []);

  const mutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/customization", {
        section: "banners",
        content: { banners, sliders },
        isActive: "true",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customization"] });
      toast({
        title: "Success",
        description: "Banners and sliders updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update banners and sliders",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Banners & Slider Images</CardTitle>
        <CardDescription>
          Manage banner images and slider images for your homepage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Banner Images</Label>
            <Button
              type="button"
              onClick={() => setBanners([...banners, { url: "", alt: "" }])}
              size="sm"
              data-testid="button-add-banner"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
          </div>

          {banners.map((banner: any, index: number) => (
            <Card key={index} className="p-4" data-testid={`banner-item-${index}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Banner {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setBanners(banners.filter((_: any, i: number) => i !== index))}
                    data-testid={`button-remove-banner-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Image URL"
                  value={banner.url}
                  onChange={(e) => {
                    const updated = [...banners];
                    updated[index] = { ...updated[index], url: e.target.value };
                    setBanners(updated);
                  }}
                  data-testid={`input-banner-url-${index}`}
                />
                <Input
                  placeholder="Alt Text"
                  value={banner.alt}
                  onChange={(e) => {
                    const updated = [...banners];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    setBanners(updated);
                  }}
                  data-testid={`input-banner-alt-${index}`}
                />
                {banner.url && (
                  <img
                    src={banner.url}
                    alt={banner.alt}
                    className="w-full h-32 object-cover rounded-md"
                    data-testid={`image-banner-preview-${index}`}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Slider Images</Label>
            <Button
              type="button"
              onClick={() => setSliders([...sliders, { url: "", alt: "" }])}
              size="sm"
              data-testid="button-add-slider"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Slider
            </Button>
          </div>

          {sliders.map((slider: any, index: number) => (
            <Card key={index} className="p-4" data-testid={`slider-item-${index}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Slider {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSliders(sliders.filter((_: any, i: number) => i !== index))}
                    data-testid={`button-remove-slider-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Image URL"
                  value={slider.url}
                  onChange={(e) => {
                    const updated = [...sliders];
                    updated[index] = { ...updated[index], url: e.target.value };
                    setSliders(updated);
                  }}
                  data-testid={`input-slider-url-${index}`}
                />
                <Input
                  placeholder="Alt Text"
                  value={slider.alt}
                  onChange={(e) => {
                    const updated = [...sliders];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    setSliders(updated);
                  }}
                  data-testid={`input-slider-alt-${index}`}
                />
                {slider.url && (
                  <img
                    src={slider.url}
                    alt={slider.alt}
                    className="w-full h-32 object-cover rounded-md"
                    data-testid={`image-slider-preview-${index}`}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          data-testid="button-save-banners"
        >
          {mutation.isPending ? "Saving..." : "Save Banners & Sliders"}
        </Button>
      </CardContent>
    </Card>
  );
}

// SEO Form Component
function SeoForm({ seoSettings }: { seoSettings: SeoSetting[] }) {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("home");

  const pages = ["home", "about", "services", "contact"];
  const currentSeo = seoSettings.find(s => s.page === selectedPage);

  const formSchema = z.object({
    page: z.string(),
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      page: selectedPage,
      metaTitle: currentSeo?.metaTitle || "",
      metaDescription: currentSeo?.metaDescription || "",
      metaKeywords: currentSeo?.metaKeywords || "",
      ogTitle: currentSeo?.ogTitle || "",
      ogDescription: currentSeo?.ogDescription || "",
      ogImage: currentSeo?.ogImage || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/seo", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      toast({
        title: "Success",
        description: "SEO settings updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update SEO settings",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>
          Optimize your website for search engines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Page</Label>
          <div className="grid grid-cols-4 gap-2">
            {pages.map((page) => (
              <Button
                key={page}
                type="button"
                variant={selectedPage === page ? "default" : "outline"}
                onClick={() => {
                  setSelectedPage(page);
                  const pageSeo = seoSettings.find(s => s.page === page);
                  form.reset({
                    page,
                    metaTitle: pageSeo?.metaTitle || "",
                    metaDescription: pageSeo?.metaDescription || "",
                    metaKeywords: pageSeo?.metaKeywords || "",
                    ogTitle: pageSeo?.ogTitle || "",
                    ogDescription: pageSeo?.ogDescription || "",
                    ogImage: pageSeo?.ogImage || "",
                  });
                }}
                data-testid={`button-page-${page}`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-meta-title" />
                  </FormControl>
                  <FormDescription>
                    The title that appears in search results (50-60 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="textarea-meta-description" />
                  </FormControl>
                  <FormDescription>
                    The description that appears in search results (150-160 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-meta-keywords" />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords for SEO
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Title (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-og-title" />
                  </FormControl>
                  <FormDescription>
                    Title for social media sharing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="textarea-og-description" />
                  </FormControl>
                  <FormDescription>
                    Description for social media sharing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-og-image" />
                  </FormControl>
                  <FormDescription>
                    Image URL for social media sharing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} data-testid="button-save-seo">
              {mutation.isPending ? "Saving..." : "Save SEO Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
