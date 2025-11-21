import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { insertSeoSettingSchema, type InsertSeoSetting, type SeoSetting } from "@shared/schema";
import {
  Globe,
  Save,
  Eye,
  Code,
  Share2,
  Twitter,
  Search,
  Calendar,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

// Available pages for SEO configuration
const AVAILABLE_PAGES = [
  { value: "home", label: "Home Page" },
  { value: "about", label: "About Page" },
  { value: "services", label: "Services Page" },
  { value: "contact", label: "Contact Page" },
  { value: "verify-employee", label: "Employee Verification" },
  { value: "web-development", label: "Web Development Service" },
  { value: "ecommerce", label: "Ecommerce Service" },
  { value: "seo", label: "SEO Service" },
  { value: "social-media", label: "Social Media Service" },
  { value: "brand-promotion", label: "Brand Promotion Service" },
  { value: "graphic-design", label: "Graphic Design Service" },
];

// Meta Preview Component
function MetaPreview({ data }: { data: Partial<InsertSeoSetting> }) {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5" />
          Search Engine Preview
        </CardTitle>
        <CardDescription>How your page will appear in search results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Preview */}
        <div className="p-4 bg-card border rounded-lg space-y-2">
          <div className="text-xs text-muted-foreground">
            https://addisonxmedia.com/{data.customSlug || data.page}
          </div>
          <div className="text-xl text-blue-600 dark:text-blue-400 font-medium">
            {data.metaTitle || "Page Title - AddisonX Media"}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {data.metaDescription || "Page description will appear here..."}
          </div>
        </div>

        {/* Social Preview (Open Graph) */}
        {data.ogImage && (
          <div className="p-4 bg-card border rounded-lg space-y-2">
            <div className="text-xs font-medium text-muted-foreground mb-2">Social Media Preview</div>
            <div className="border rounded overflow-hidden bg-muted/30">
              <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground text-xs">
                {data.ogImage ? `Image: ${data.ogImage}` : "No image"}
              </div>
              <div className="p-3 space-y-1">
                <div className="text-sm font-medium">
                  {data.ogTitle || data.metaTitle || "Page Title"}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {data.ogDescription || data.metaDescription || "Description"}
                </div>
                <div className="text-xs text-muted-foreground">
                  addisonxmedia.com
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function SeoSettings() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<string>("home");

  // Fetch SEO settings for selected page
  const { data: seoSetting, isLoading } = useQuery<SeoSetting>({
    queryKey: ["/api/seo", selectedPage],
    enabled: !!selectedPage,
  });

  const form = useForm<InsertSeoSetting>({
    resolver: zodResolver(insertSeoSettingSchema),
    defaultValues: {
      page: selectedPage,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      metaRobots: "index,follow",
      canonicalUrl: "",
      customSlug: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogType: "website",
      ogUrl: "",
      twitterCard: "summary_large_image",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      structuredData: null,
      hreflangTags: null,
      isPublished: true,
      isDraft: false,
      scheduledPublishAt: null,
    },
  });

  // Update form when SEO setting data loads or page changes
  useEffect(() => {
    // Always reset form when page changes or data loads
    const formData = seoSetting ? {
      page: selectedPage,
      metaTitle: seoSetting.metaTitle || "",
      metaDescription: seoSetting.metaDescription || "",
      metaKeywords: seoSetting.metaKeywords || "",
      metaRobots: seoSetting.metaRobots || "index,follow",
      canonicalUrl: seoSetting.canonicalUrl || "",
      customSlug: seoSetting.customSlug || "",
      ogTitle: seoSetting.ogTitle || "",
      ogDescription: seoSetting.ogDescription || "",
      ogImage: seoSetting.ogImage || "",
      ogType: seoSetting.ogType || "website",
      ogUrl: seoSetting.ogUrl || "",
      twitterCard: seoSetting.twitterCard || "summary_large_image",
      twitterTitle: seoSetting.twitterTitle || "",
      twitterDescription: seoSetting.twitterDescription || "",
      twitterImage: seoSetting.twitterImage || "",
      structuredData: seoSetting.structuredData as any,
      hreflangTags: seoSetting.hreflangTags as any,
      isPublished: seoSetting.isPublished ?? true,
      isDraft: seoSetting.isDraft ?? false,
      scheduledPublishAt: seoSetting.scheduledPublishAt || null,
    } : {
      // Default values when no settings exist
      page: selectedPage,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      metaRobots: "index,follow",
      canonicalUrl: "",
      customSlug: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogType: "website",
      ogUrl: "",
      twitterCard: "summary_large_image",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      structuredData: null,
      hreflangTags: null,
      isPublished: true,
      isDraft: false,
      scheduledPublishAt: null,
    };

    form.reset(formData);
  }, [seoSetting, selectedPage]);

  // Update page when selector changes
  const handlePageChange = (newPage: string) => {
    setSelectedPage(newPage);
    form.setValue("page", newPage);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: InsertSeoSetting) => {
      const response = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save SEO settings");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo", selectedPage] });
      toast({
        title: "Success",
        description: "SEO settings saved successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save SEO settings",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSeoSetting) => {
    saveMutation.mutate(data);
  };

  const formValues = form.watch();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
            SEO Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure meta tags, Open Graph, and search engine settings for each page
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Globe className="h-4 w-4" />
          Page-Level Control
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Selector */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Select Page
              </CardTitle>
              <CardDescription>Choose which page to configure SEO settings for</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedPage} onValueChange={handlePageChange}>
                <SelectTrigger data-testid="select-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_PAGES.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* SEO Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="publish">Publishing</TabsTrigger>
                </TabsList>

                {/* Basic Meta Tags */}
                <TabsContent value="basic" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Code className="h-5 w-5" />
                        Basic Meta Tags
                      </CardTitle>
                      <CardDescription>
                        Essential meta tags for search engines
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="AddisonX Media - Digital Marketing Agency"
                                data-testid="input-meta-title"
                              />
                            </FormControl>
                            <FormDescription>
                              Recommended: 50-60 characters
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
                              <Textarea
                                {...field}
                                value={field.value || ""}
                                placeholder="Professional digital marketing services including web development, SEO, social media marketing..."
                                rows={3}
                                data-testid="input-meta-description"
                              />
                            </FormControl>
                            <FormDescription>
                              Recommended: 150-160 characters
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
                            <FormLabel>Meta Keywords</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="digital marketing, web development, SEO, social media"
                                data-testid="input-meta-keywords"
                              />
                            </FormControl>
                            <FormDescription>
                              Comma-separated keywords (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaRobots"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Robots</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || "index,follow"}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-meta-robots">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="index,follow">Index, Follow</SelectItem>
                                <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                                <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                                <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Control how search engines crawl this page
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="canonicalUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Canonical URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="https://addisonxmedia.com/about"
                                data-testid="input-canonical-url"
                              />
                            </FormControl>
                            <FormDescription>
                              Preferred URL for this page (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customSlug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Slug</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="about-us"
                                data-testid="input-custom-slug"
                              />
                            </FormControl>
                            <FormDescription>
                              SEO-friendly URL slug (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Social Media Tags */}
                <TabsContent value="social" className="space-y-4">
                  {/* Open Graph */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Share2 className="h-5 w-5" />
                        Open Graph (Facebook, LinkedIn)
                      </CardTitle>
                      <CardDescription>
                        How your page appears when shared on social media
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="ogTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="Leave empty to use Meta Title"
                                data-testid="input-og-title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ogDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value || ""}
                                placeholder="Leave empty to use Meta Description"
                                rows={2}
                                data-testid="input-og-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ogImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Image URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="https://addisonxmedia.com/og-image.jpg"
                                data-testid="input-og-image"
                              />
                            </FormControl>
                            <FormDescription>
                              Recommended: 1200x630px
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ogType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || "website"}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-og-type">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="profile">Profile</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ogUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="https://addisonxmedia.com/about"
                                data-testid="input-og-url"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Twitter Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Twitter className="h-5 w-5" />
                        Twitter Card
                      </CardTitle>
                      <CardDescription>
                        How your page appears on Twitter/X
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="twitterCard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Card Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || "summary_large_image"}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-twitter-card">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="summary">Summary</SelectItem>
                                <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                                <SelectItem value="app">App</SelectItem>
                                <SelectItem value="player">Player</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitterTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="Leave empty to use Meta Title"
                                data-testid="input-twitter-title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitterDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value || ""}
                                placeholder="Leave empty to use Meta Description"
                                rows={2}
                                data-testid="input-twitter-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitterImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Image URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="https://addisonxmedia.com/twitter-image.jpg"
                                data-testid="input-twitter-image"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Settings */}
                <TabsContent value="advanced" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Code className="h-5 w-5" />
                        Advanced SEO Settings
                      </CardTitle>
                      <CardDescription>
                        Structured data and multilingual support
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="structuredData"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Structured Data (JSON-LD)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value ? JSON.stringify(field.value, null, 2) : ""}
                                onChange={(e) => {
                                  try {
                                    const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                                    field.onChange(parsed);
                                  } catch {
                                    // Invalid JSON, keep as is
                                  }
                                }}
                                placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                                rows={8}
                                className="font-mono text-xs"
                                data-testid="input-structured-data"
                              />
                            </FormControl>
                            <FormDescription>
                              JSON-LD structured data for rich snippets
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hreflangTags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hreflang Tags (JSON)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value ? JSON.stringify(field.value, null, 2) : ""}
                                onChange={(e) => {
                                  try {
                                    const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                                    field.onChange(parsed);
                                  } catch {
                                    // Invalid JSON, keep as is
                                  }
                                }}
                                placeholder='{"en": "https://example.com/en", "es": "https://example.com/es"}'
                                rows={4}
                                className="font-mono text-xs"
                                data-testid="input-hreflang-tags"
                              />
                            </FormControl>
                            <FormDescription>
                              Multilingual alternate URLs
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Publishing Controls */}
                <TabsContent value="publish" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="h-5 w-5" />
                        Publishing Controls
                      </CardTitle>
                      <CardDescription>
                        Manage visibility and publishing schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="isPublished"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Published</FormLabel>
                              <FormDescription>
                                Make this page visible to search engines
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value ?? true}
                                onCheckedChange={field.onChange}
                                data-testid="switch-is-published"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isDraft"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Draft</FormLabel>
                              <FormDescription>
                                Keep these settings as draft
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value ?? false}
                                onCheckedChange={field.onChange}
                                data-testid="switch-is-draft"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="scheduledPublishAt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Publish</FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                onChange={(e) => field.onChange(e.target.value || null)}
                                data-testid="input-scheduled-publish"
                              />
                            </FormControl>
                            <FormDescription>
                              Optional: Schedule when to publish these settings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Save Button */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={saveMutation.isPending || isLoading}
                    data-testid="button-save-seo"
                  >
                    {saveMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save SEO Settings
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <MetaPreview data={formValues} />
          </div>
        </div>
      </div>
    </div>
  );
}
