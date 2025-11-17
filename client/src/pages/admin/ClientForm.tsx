import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { normalizeNullableField, prepareFormData } from "@/lib/formHelpers";
import { insertClientSchema, type Client } from "@shared/schema";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { z } from "zod";

const clientFormSchema = insertClientSchema;
type ClientFormData = z.infer<typeof clientFormSchema>;

export default function ClientForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: client, isLoading } = useQuery<Client>({
    queryKey: ["/api/clients", id],
    enabled: isEditing,
  });

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "active",
      assignedTo: "",
      notes: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      const prepared = prepareFormData(data, ["phone", "company", "assignedTo", "address", "notes"]);
      await apiRequest("POST", "/api/clients", prepared);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      toast({
        title: "Success",
        description: "Client created successfully",
      });
      setLocation("/admin/clients");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create client",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      const prepared = prepareFormData(data, ["phone", "company", "assignedTo", "address", "notes"]);
      await apiRequest("PUT", `/api/clients/${id}`, prepared);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      toast({
        title: "Success",
        description: "Client updated successfully",
      });
      setLocation("/admin/clients");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update client",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ClientFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <div>
            <p className="text-lg font-semibold">Loading client...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && client) {
    form.reset({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
      company: client.company || "",
      address: client.address || "",
      status: client.status,
      assignedTo: client.assignedTo || "",
      notes: client.notes || "",
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation("/admin/clients")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Client" : "Add New Client"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update client information" : "Fill in the details to add a new client"}
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border shadow-lg p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Client name" data-testid="input-name" />
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
                      <FormLabel className="text-sm font-semibold">Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="client@example.com" data-testid="input-email" />
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
                      <FormLabel className="text-sm font-semibold">Phone</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="+91 98765 43210" data-testid="input-phone" />
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
                      <FormLabel className="text-sm font-semibold">Company</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="Company name" data-testid="input-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Status & Assignment</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Assigned To (Employee ID)</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="Employee ID" data-testid="input-assigned-to" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                <Separator className="mb-6" />
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Address</FormLabel>
                      <FormControl>
                        <Textarea {...normalizeNullableField(field)} placeholder="Client address" rows={3} data-testid="input-address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Notes</FormLabel>
                      <FormControl>
                        <Textarea {...normalizeNullableField(field)} placeholder="Additional notes" rows={3} data-testid="input-notes" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />
            
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-submit"
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update Client" : "Create Client"}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setLocation("/admin/clients")}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
