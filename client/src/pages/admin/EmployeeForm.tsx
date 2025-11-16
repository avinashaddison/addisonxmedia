import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertEmployeeSchema, type InsertEmployee, type Employee } from "@shared/schema";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "wouter";

export default function EmployeeForm() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [, params] = useRoute("/admin/employees/:id/edit");
  const employeeId = params?.id;
  const isEdit = !!employeeId;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { data: employee, isLoading: isLoadingEmployee } = useQuery<Employee>({
    queryKey: ["/api/employees", employeeId],
    enabled: isEdit && !!employeeId,
  });

  const form = useForm<InsertEmployee>({
    resolver: zodResolver(insertEmployeeSchema),
    defaultValues: {
      employeeId: "",
      fullName: "",
      mobile: "",
      address: "",
      position: "",
      photoUrl: "",
    },
  });

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isAuthLoading, toast]);

  useEffect(() => {
    if (employee && isEdit) {
      form.reset({
        employeeId: employee.employeeId,
        fullName: employee.fullName,
        mobile: employee.mobile,
        address: employee.address,
        position: employee.position,
        photoUrl: employee.photoUrl || "",
      });
      if (employee.photoUrl) {
        setPhotoPreview(employee.photoUrl);
      }
    }
  }, [employee, isEdit, form]);

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

  const mutation = useMutation({
    mutationFn: async (data: InsertEmployee) => {
      let finalPhotoUrl = data.photoUrl;

      // Upload photo if file is selected
      if (photoFile) {
        try {
          // Get presigned URL from backend
          const uploadResponse = await fetch("/api/employees/upload-photo", {
            method: "POST",
            credentials: "include",
          });
          
          if (!uploadResponse.ok) {
            throw new Error("Failed to get upload URL");
          }
          
          const { uploadURL } = await uploadResponse.json();
          
          // Upload file to presigned URL
          const uploadResult = await fetch(uploadURL, {
            method: "PUT",
            headers: {
              "Content-Type": photoFile.type,
            },
            body: photoFile,
          });

          if (!uploadResult.ok) {
            throw new Error("Failed to upload photo");
          }

          // Extract the photo path (remove query parameters)
          finalPhotoUrl = uploadURL.split("?")[0];
        } catch (error) {
          console.error("Photo upload error:", error);
          throw new Error("Failed to upload employee photo");
        }
      }

      // Create or update employee with photo URL
      const employeeData = {
        ...data,
        photoUrl: finalPhotoUrl,
      };

      if (isEdit && employeeId) {
        await apiRequest("PUT", `/api/employees/${employeeId}`, employeeData);
      } else {
        await apiRequest("POST", "/api/employees", employeeData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      toast({
        title: "Success",
        description: `Employee ${isEdit ? "updated" : "added"} successfully`,
      });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "add"} employee`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertEmployee) => {
    mutation.mutate(data);
  };

  if (isAuthLoading || (isEdit && isLoadingEmployee)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-form-title">
                {isEdit ? "Edit Employee" : "Add New Employee"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEdit ? "Update employee information" : "Fill in the employee details"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Card className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo Upload */}
              <div>
                <FormLabel>Employee Photo</FormLabel>
                <div className="mt-2">
                  {photoPreview && (
                    <div className="mb-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-32 h-32 rounded-md object-cover"
                        data-testid="img-photo-preview"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="flex-1"
                      data-testid="input-photo"
                    />
                    <Button type="button" variant="outline" size="icon" disabled>
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., EMP001" 
                        {...field}
                        data-testid="input-form-employee-id"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., John Doe" 
                        {...field}
                        data-testid="input-form-full-name"
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
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Digital Marketing Manager" 
                        {...field}
                        data-testid="input-form-position"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., +91 9876543210" 
                        {...field}
                        data-testid="input-form-mobile"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter full address" 
                        rows={3}
                        {...field}
                        data-testid="input-form-address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={mutation.isPending}
                  data-testid="button-submit-form"
                >
                  {mutation.isPending
                    ? isEdit
                      ? "Updating..."
                      : "Adding..."
                    : isEdit
                    ? "Update Employee"
                    : "Add Employee"}
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline" data-testid="button-cancel-form">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
}
