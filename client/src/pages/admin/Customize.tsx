import { useState, useEffect, useRef } from "react";
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
import { Settings, Image, Search, Plus, X, Upload, Loader2 } from "lucide-react";
import type { HomepageCustomization, SeoSetting } from "@shared/schema";

// Helper function to convert storage path to displayable API URL
const convertHeroBannerToUrl = (storagePath: string | null): string | null => {
  if (!storagePath) return null;
  
  // If it's already an API URL, return as is
  if (storagePath.startsWith('/api/hero-banner')) {
    return storagePath;
  }
  
  // Convert storage path to API URL
  const encodedPath = encodeURIComponent(storagePath);
  return `/api/hero-banner?path=${encodedPath}`;
};

export default function Customize() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("services");

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
        <TabsList className="grid w-full grid-cols-3">
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

  useEffect(() => {
    if (customization?.content) {
      const content = customization.content as any;
      setTitle(content.title || "Our Services");
      setDescription(content.description || "");
      setServices(content.services || []);
    }
  }, [customization]);

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const content = customization?.content as any || {
    heroBanner: null,
    banners: [],
    sliders: []
  };

  const [heroBanner, setHeroBanner] = useState<string | null>(content.heroBanner || null);
  const [banners, setBanners] = useState(content.banners || []);
  const [sliders, setSliders] = useState(content.sliders || []);

  useEffect(() => {
    if (customization?.content) {
      const content = customization.content as any;
      setHeroBanner(content.heroBanner || null);
      setBanners(content.banners || []);
      setSliders(content.sliders || []);
    }
  }, [customization]);

  // Hero Banner Upload Mutation
  const uploadHeroBannerMutation = useMutation({
    mutationFn: async (file: File) => {
      // Request upload URL with file metadata for server-side validation
      const response = await fetch("/api/customization/upload-banner", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: file.type,
          fileSize: file.size,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get upload URL");
      }

      const { uploadURL, normalizedPath } = await response.json();

      await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      return normalizedPath;
    },
    onSuccess: (normalizedPath) => {
      setHeroBanner(normalizedPath);
      toast({
        title: "Success",
        description: "Hero banner uploaded successfully. Don't forget to save!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload hero banner",
        variant: "destructive",
      });
    },
  });

  const handleHeroBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      uploadHeroBannerMutation.mutate(file);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/customization", {
        section: "banners",
        content: { heroBanner, banners, sliders },
        isActive: "true",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customization"] });
      queryClient.invalidateQueries({ queryKey: ["/api/customization/banners"] });
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
          Manage hero banner, banner images and slider images for your homepage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hero Banner Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-semibold">Hero Banner</Label>
              <p className="text-sm text-muted-foreground mt-1">Upload a custom hero banner image for your homepage</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleHeroBannerChange}
              className="hidden"
              data-testid="input-hero-banner-file"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadHeroBannerMutation.isPending}
              size="sm"
              data-testid="button-upload-hero-banner"
            >
              {uploadHeroBannerMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Hero Banner
                </>
              )}
            </Button>
          </div>

          {heroBanner && (
            <Card className="p-4 bg-muted/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Current Hero Banner</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setHeroBanner(null)}
                    data-testid="button-remove-hero-banner"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
                <img
                  src={heroBanner ? (convertHeroBannerToUrl(heroBanner) || heroBanner) : ""}
                  alt="Hero Banner Preview"
                  className="w-full h-48 object-cover rounded-md border-2 border-primary/20"
                  data-testid="image-hero-banner-preview"
                />
                <p className="text-xs text-muted-foreground">This banner will be displayed at the top of your homepage</p>
              </div>
            </Card>
          )}

          {!heroBanner && (
            <Card className="p-6 bg-muted/30 border-dashed">
              <div className="text-center space-y-2">
                <Image className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No hero banner uploaded. Upload one to replace the default banner.</p>
              </div>
            </Card>
          )}
        </div>

        <div className="border-t pt-6"></div>

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

  useEffect(() => {
    const seo = seoSettings.find(s => s.page === selectedPage);
    form.reset({
      page: selectedPage,
      metaTitle: seo?.metaTitle || "",
      metaDescription: seo?.metaDescription || "",
      metaKeywords: seo?.metaKeywords || "",
      ogTitle: seo?.ogTitle || "",
      ogDescription: seo?.ogDescription || "",
      ogImage: seo?.ogImage || "",
    });
  }, [seoSettings, selectedPage, form]);

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
