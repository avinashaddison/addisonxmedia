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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Users } from "lucide-react";
import { Link } from "wouter";
import { insertTeamMemberSchema, type InsertTeamMember, type TeamMember } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function TeamMemberForm() {
  const [, params] = useRoute("/admin/team-members/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const memberId = params?.id;
  const isEditing = !!memberId;

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isAuthLoading]);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const { data: teamMember } = useQuery<TeamMember>({
    queryKey: [`/api/team-members/${memberId}`],
    enabled: isEditing && isAuthenticated && !isAuthLoading,
    retry: false,
  });

  const form = useForm<InsertTeamMember>({
    resolver: zodResolver(insertTeamMemberSchema),
    defaultValues: {
      fullName: "",
      position: "",
      photoUrl: "",
      displayOrder: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (teamMember) {
      form.reset({
        fullName: teamMember.fullName,
        position: teamMember.position,
        photoUrl: teamMember.photoUrl || "",
        displayOrder: teamMember.displayOrder,
        isActive: teamMember.isActive,
      });
      if (teamMember.photoUrl) {
        setPhotoPreview(teamMember.photoUrl);
      }
    }
  }, [teamMember, form]);

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
      const response = await fetch("/api/team-members/upload-photo", {
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
    mutationFn: async (data: InsertTeamMember) => {
      let photoUrl = data.photoUrl;

      if (photoFile) {
        photoUrl = await uploadPhotoMutation.mutateAsync(photoFile);
      }

      if (isEditing) {
        return await apiRequest("PATCH", `/api/team-members/${memberId}`, {
          ...data,
          photoUrl,
        });
      } else {
        return await apiRequest("POST", "/api/team-members", {
          ...data,
          photoUrl,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/team-members/active"] });
      toast({
        title: "Success",
        description: `Team member ${isEditing ? "updated" : "created"} successfully`,
      });
      navigate("/admin/team-members");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} team member`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTeamMember) => {
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
        <div className="mb-6">
          <Link href="/admin/team-members">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team Members
            </Button>
          </Link>
        </div>

        <Card className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-form-title">
              {isEditing ? "Edit Team Member" : "Add Team Member"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update team member information" : "Add a new team member to your website"}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          data-testid="input-full-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CEO"
                          {...field}
                          data-testid="input-position"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          value={field.value}
                          data-testid="input-display-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        data-testid="select-status"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true" data-testid="option-active">Active</SelectItem>
                          <SelectItem value="false" data-testid="option-inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Photo</FormLabel>
                  <div className="flex flex-col gap-4">
                    {photoPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={photoPreview}
                          alt="Team member preview"
                          className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
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
                      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                        <Users className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="cursor-pointer"
                        data-testid="input-photo"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload a square photo for best results
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  data-testid="button-submit"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEditing ? "Update Team Member" : "Add Team Member"}
                    </>
                  )}
                </Button>
                <Link href="/admin/team-members">
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
