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
import { insertProjectSchema, type Project } from "@shared/schema";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";

const projectFormSchema = insertProjectSchema.extend({
  startDate: z.string().optional(),
  deadline: z.string().optional(),
});
type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function ProjectForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: isEditing,
  });

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      clientId: "",
      description: "",
      status: "planning",
      priority: "medium",
      assignedTo: "",
      startDate: "",
      deadline: "",
      budget: "",
      paymentStatus: "pending",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const prepared = prepareFormData(data, ["clientId", "assignedTo", "description", "startDate", "deadline", "budget"]);
      const payload = {
        ...prepared,
        startDate: prepared.startDate ? new Date(prepared.startDate) : undefined,
        deadline: prepared.deadline ? new Date(prepared.deadline) : undefined,
      };
      await apiRequest("POST", "/api/projects", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setLocation("/admin/projects");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const prepared = prepareFormData(data, ["clientId", "assignedTo", "description", "startDate", "deadline", "budget"]);
      const payload = {
        ...prepared,
        startDate: prepared.startDate ? new Date(prepared.startDate) : undefined,
        deadline: prepared.deadline ? new Date(prepared.deadline) : undefined,
      };
      await apiRequest("PUT", `/api/projects/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setLocation("/admin/projects");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectFormData) => {
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
            <p className="text-lg font-semibold">Loading project...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && project) {
    form.reset({
      name: project.name,
      clientId: project.clientId || "",
      description: project.description || "",
      status: project.status,
      priority: project.priority,
      assignedTo: project.assignedTo || "",
      startDate: project.startDate ? format(new Date(project.startDate), "yyyy-MM-dd") : "",
      deadline: project.deadline ? format(new Date(project.deadline), "yyyy-MM-dd") : "",
      budget: project.budget || "",
      paymentStatus: project.paymentStatus,
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation("/admin/projects")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Project" : "Create New Project"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update project information" : "Fill in the details to create a new project"}
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border shadow-lg p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Project Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Project name" data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Client ID</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="Client ID" data-testid="input-client-id" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Status & Priority</h3>
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
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Priority *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
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
                <h3 className="text-lg font-semibold mb-4">Timeline & Budget</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Start Date</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} type="date" data-testid="input-start-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Deadline</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} type="date" data-testid="input-deadline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Budget (₹)</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="50000" data-testid="input-budget" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Payment Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-payment-status">
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Description</h3>
                <Separator className="mb-6" />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Description</FormLabel>
                    <FormControl>
                      <Textarea {...normalizeNullableField(field)} placeholder="Project description" rows={3} data-testid="input-description" />
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
                    {isEditing ? "Update Project" : "Create Project"}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setLocation("/admin/projects")}
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
