import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Link } from "wouter";
import { insertTestimonialSchema, type InsertTestimonial, type Testimonial } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function TestimonialForm() {
  const [, params] = useRoute("/admin/testimonials/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const testimonialId = params?.id;
  const isEditing = !!testimonialId;

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isAuthLoading]);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const { data: testimonial } = useQuery<Testimonial>({
    queryKey: [`/api/testimonials/${testimonialId}`],
    enabled: isEditing && isAuthenticated && !isAuthLoading,
    retry: false,
  });

  const form = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      clientName: "",
      clientPosition: "",
      companyName: "",
      testimonialText: "",
      rating: "5",
      photoUrl: "",
      isActive: "true",
    },
  });

  useEffect(() => {
    if (testimonial) {
      form.reset({
        clientName: testimonial.clientName,
        clientPosition: testimonial.clientPosition || "",
        companyName: testimonial.companyName || "",
        testimonialText: testimonial.testimonialText,
        rating: testimonial.rating as "3" | "4" | "5",
        photoUrl: testimonial.photoUrl || "",
        isActive: testimonial.isActive as "true" | "false",
      });
      if (testimonial.photoUrl) {
        setPhotoPreview(testimonial.photoUrl);
      }
    }
  }, [testimonial, form]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    form.setValue("photoUrl", "");
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      const response = await fetch("/api/testimonials/upload-photo", {
        method: "POST",
        credentials: "include",
      });
      const { uploadURL } = await response.json();

      await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const photoUrl = uploadURL.split("?")[0];
      return photoUrl;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      let photoUrl = data.photoUrl;

      if (photoFile) {
        photoUrl = await uploadPhotoMutation.mutateAsync(photoFile);
      }

      if (isEditing) {
        return await apiRequest("PUT", `/api/testimonials/${testimonialId}`, {
          ...data,
          photoUrl,
        });
      } else {
        return await apiRequest("POST", "/api/testimonials", {
          ...data,
          photoUrl,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({
        title: "Success",
        description: `Testimonial ${isEditing ? "updated" : "created"} successfully`,
      });
      navigate("/admin/testimonials");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} testimonial`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTestimonial) => {
    saveMutation.mutate(data);
  };

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/testimonials">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testimonials
          </Button>
        </Link>

        <Card className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6" data-testid="text-form-title">
            {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        data-testid="input-client-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CEO"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-client-position"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company Name"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-company-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="testimonialText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the client's feedback..."
                        rows={6}
                        {...field}
                        data-testid="input-testimonial-text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-rating">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Client Photo (Optional)</FormLabel>
                <div className="mt-2">
                  {photoPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover"
                        data-testid="img-photo-preview"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2"
                        onClick={removePhoto}
                        data-testid="button-remove-photo"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload client photo
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="max-w-xs mx-auto"
                        data-testid="input-photo"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  data-testid="button-save"
                >
                  {saveMutation.isPending ? "Saving..." : isEditing ? "Update" : "Create"}
                </Button>
                <Link href="/admin/testimonials">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
