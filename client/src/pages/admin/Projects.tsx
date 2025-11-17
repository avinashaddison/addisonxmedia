import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, FolderKanban, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";
import { format } from "date-fns";

export default function Projects() {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setDeleteId(null);
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
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  const planningProjects = projects.filter(p => p.status === "planning").length;
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length;
  const reviewProjects = projects.filter(p => p.status === "review").length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const cancelledProjects = projects.filter(p => p.status === "cancelled").length;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "planning": return "secondary";
      case "in-progress": return "default";
      case "review": return "secondary";
      case "completed": return "default";
      case "cancelled": return "outline";
      default: return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Projects</h1>
          <p className="text-base text-muted-foreground">Manage projects and track progress</p>
        </div>
        <Link href="/admin/projects/new">
          <Button data-testid="button-add-project">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Planning</p>
              <p className="text-3xl font-bold" data-testid="stat-planning">{planningProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">In Progress</p>
              <p className="text-3xl font-bold" data-testid="stat-in-progress">{inProgressProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Review</p>
              <p className="text-3xl font-bold" data-testid="stat-review">{reviewProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-green-500/10 to-green-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold" data-testid="stat-completed">{completedProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-red-500/10 to-red-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Cancelled</p>
              <p className="text-3xl font-bold" data-testid="stat-cancelled">{cancelledProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {projects.length === 0 ? (
        <Card className="p-16 border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FolderKanban className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3" data-testid="text-no-projects">
              No projects yet
            </h3>
            <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
              Start organizing your work by creating your first project
            </p>
            <Link href="/admin/projects/new">
              <Button size="lg" data-testid="button-add-first-project">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 border border-border/50 hover-elevate transition-all" data-testid={`card-project-${project.id}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-xl font-bold" data-testid={`text-project-name-${project.id}`}>
                      {project.name}
                    </h3>
                    <Badge 
                      className={
                        project.status === "in-progress" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20" :
                        project.status === "completed" ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" :
                        project.status === "planning" ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" :
                        project.status === "review" ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20" : ""
                      }
                      variant={getStatusVariant(project.status)}
                      data-testid={`badge-status-${project.id}`}
                    >
                      {project.status}
                    </Badge>
                    <Badge 
                      className={
                        project.priority === "high" ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" :
                        project.priority === "medium" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20" : ""
                      }
                      variant={getPriorityVariant(project.priority)}
                      data-testid={`badge-priority-${project.id}`}
                    >
                      {project.priority}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    {project.startDate && (
                      <p className="text-muted-foreground" data-testid={`text-project-start-${project.id}`}>
                        <span className="font-semibold text-foreground">Start:</span> {format(new Date(project.startDate), "MMM dd, yyyy")}
                      </p>
                    )}
                    {project.deadline && (
                      <p className="text-muted-foreground" data-testid={`text-project-deadline-${project.id}`}>
                        <span className="font-semibold text-foreground">Deadline:</span> {format(new Date(project.deadline), "MMM dd, yyyy")}
                      </p>
                    )}
                    {project.budget && (
                      <p className="text-muted-foreground" data-testid={`text-project-budget-${project.id}`}>
                        <span className="font-semibold text-foreground">Budget:</span> ₹{project.budget}
                      </p>
                    )}
                    <p className="text-muted-foreground" data-testid={`text-project-payment-${project.id}`}>
                      <span className="font-semibold text-foreground">Payment:</span> {project.paymentStatus}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:items-end">
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-edit-${project.id}`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(project.id)}
                    data-testid={`button-delete-${project.id}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              record from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
