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
import { insertLeadSchema, type Lead } from "@shared/schema";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";

const leadFormSchema = insertLeadSchema.extend({
  followUpDate: z.string().optional(),
});
type LeadFormData = z.infer<typeof leadFormSchema>;

export default function LeadForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: lead, isLoading } = useQuery<Lead>({
    queryKey: ["/api/leads", id],
    enabled: isEditing,
  });

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "website",
      status: "new",
      assignedTo: "",
      notes: "",
      followUpDate: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const prepared = prepareFormData(data, ["phone", "company", "assignedTo", "notes", "followUpDate"]);
      const payload = {
        ...prepared,
        followUpDate: prepared.followUpDate ? new Date(prepared.followUpDate) : undefined,
      };
      await apiRequest("POST", "/api/leads", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Success",
        description: "Lead created successfully",
      });
      setLocation("/admin/leads");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create lead",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const prepared = prepareFormData(data, ["phone", "company", "assignedTo", "notes", "followUpDate"]);
      const payload = {
        ...prepared,
        followUpDate: prepared.followUpDate ? new Date(prepared.followUpDate) : undefined,
      };
      await apiRequest("PUT", `/api/leads/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Success",
        description: "Lead updated successfully",
      });
      setLocation("/admin/leads");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormData) => {
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
            <p className="text-lg font-semibold">Loading lead...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && lead) {
    form.reset({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      company: lead.company || "",
      source: lead.source,
      status: lead.status,
      assignedTo: lead.assignedTo || "",
      notes: lead.notes || "",
      followUpDate: lead.followUpDate ? format(new Date(lead.followUpDate), "yyyy-MM-dd") : "",
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation("/admin/leads")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Lead" : "Add New Lead"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update lead information" : "Fill in the details to add a new lead"}
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border shadow-lg p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
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
                        <Input {...field} placeholder="Lead name" data-testid="input-name" />
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
                        <Input {...field} type="email" placeholder="lead@example.com" data-testid="input-email" />
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
                <h3 className="text-lg font-semibold mb-4">Lead Details</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Source *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-source">
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="ad">Ad</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
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

                <FormField
                  control={form.control}
                  name="followUpDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Follow Up Date</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} type="date" data-testid="input-follow-up-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
                <Separator className="mb-6" />
              </div>
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
                    {isEditing ? "Update Lead" : "Create Lead"}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setLocation("/admin/leads")}
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
