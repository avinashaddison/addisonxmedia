import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Upload, Loader2, Trash2, Check } from "lucide-react";
import type { ServiceBanner } from "@shared/schema";

const SERVICES = [
  { slug: "web-development", title: "Web Development" },
  { slug: "ecommerce-development", title: "Ecommerce Development" },
  { slug: "brand-promotion", title: "Brand Promotion" },
  { slug: "local-seo", title: "Local SEO" },
  { slug: "ads-management", title: "Ads Management" },
  { slug: "graphic-designing", title: "Graphic Designing" },
  { slug: "whatsapp-marketing", title: "WhatsApp Marketing" },
  { slug: "social-media-marketing", title: "Social Media Marketing" },
  { slug: "custom-development", title: "Custom Development" },
];

interface BannerUploadProps {
  title: string;
  description: string;
  serviceSlug?: string;
  currentBanner: string | null;
  onBannerUpdate: (bannerUrl: string | null) => void;
}

function BannerUploadCard({ title, description, serviceSlug, currentBanner, onBannerUpdate }: BannerUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setIsUploading(true);
      try {
        const response = await fetch("/api/service-banners/upload", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": file.type },
        });

        await apiRequest("POST", "/api/service-banners", {
          serviceSlug: serviceSlug || "home",
          bannerUrl: normalizedPath,
          isActive: true,
        });

        return normalizedPath;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: (normalizedPath) => {
      onBannerUpdate(normalizedPath);
      queryClient.invalidateQueries({ queryKey: ["/api/service-banners"] });
      toast({
        title: "Success",
        description: `Banner uploaded successfully`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload banner",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const slug = serviceSlug || "home";
      await apiRequest("DELETE", `/api/service-banners/${slug}`);
    },
    onSuccess: () => {
      onBannerUpdate(null);
      queryClient.invalidateQueries({ queryKey: ["/api/service-banners"] });
      toast({
        title: "Success",
        description: "Banner removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove banner",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      uploadMutation.mutate(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || uploadMutation.isPending}
          >
            {isUploading || uploadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {currentBanner ? (
          <div className="space-y-3">
            <div className="relative group">
              <img
                src={currentBanner.startsWith('http') ? currentBanner : `/api/hero-banner?path=${encodeURIComponent(currentBanner)}`}
                alt={`${title} Preview`}
                className="w-full h-48 object-cover rounded-md border-2 border-primary/20"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Banner uploaded successfully</span>
            </div>
          </div>
        ) : (
          <div className="h-48 border-2 border-dashed border-muted-foreground/20 rounded-md flex items-center justify-center">
            <div className="text-center space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No banner uploaded</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function WebsiteBannersManager() {
  const { data: serviceBanners } = useQuery<ServiceBanner[]>({
    queryKey: ["/api/service-banners"],
  });

  const getServiceBanner = (slug: string) => {
    return serviceBanners?.find(b => b.serviceSlug === slug)?.bannerUrl || null;
  };

  const getHomeBanner = () => {
    return serviceBanners?.find(b => b.serviceSlug === "home")?.bannerUrl || null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Website Banners</h2>
        <p className="text-muted-foreground">
          Upload and manage banners for your home page and all service detail pages. Images should be high-quality and optimized for web (max 5MB).
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Home Page Hero Banner</h3>
          <BannerUploadCard
            title="Homepage Hero Section"
            description="Main banner displayed on the home page"
            currentBanner={getHomeBanner()}
            onBannerUpdate={() => {}}
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Service Page Banners</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Upload custom banners for each service detail page. These will be displayed at the top of each service page.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <BannerUploadCard
                key={service.slug}
                title={service.title}
                description={`Banner for ${service.title.toLowerCase()} page`}
                serviceSlug={service.slug}
                currentBanner={getServiceBanner(service.slug)}
                onBannerUpdate={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
