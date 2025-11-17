import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Pencil, Trash2, Users, CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import type { TeamMember } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function TeamMembers() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isAuthLoading]);

  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
    enabled: isAuthenticated && !isAuthLoading,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/team-members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/team-members/active"] });
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
      setDeleteId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    },
  });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-team-members-title">
              Team Members
            </h1>
            <p className="text-muted-foreground" data-testid="text-team-members-description">
              Manage your team members displayed on the website
            </p>
          </div>
          <Link href="/admin/team-members/new">
            <Button size="lg" data-testid="button-add-team-member">
              <Plus className="h-5 w-5 mr-2" />
              Add Team Member
            </Button>
          </Link>
        </div>

        {teamMembers && teamMembers.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No team members yet</h2>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first team member
              </p>
              <Link href="/admin/team-members/new">
                <Button data-testid="button-add-first-team-member">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Team Member
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers?.map((member) => (
              <Card key={member.id} className="p-6" data-testid={`card-team-member-${member.id}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.fullName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        data-testid={`img-team-member-photo-${member.id}`}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1" data-testid={`text-member-name-${member.id}`}>
                    {member.fullName}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-member-position-${member.id}`}>
                    {member.position}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={member.isActive ? "default" : "secondary"} data-testid={`badge-status-${member.id}`}>
                      {member.isActive ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </Badge>
                    <Badge variant="outline" data-testid={`badge-order-${member.id}`}>
                      Order: {member.displayOrder}
                    </Badge>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Link href={`/admin/team-members/${member.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-edit-${member.id}`}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(member.id)}
                      data-testid={`button-delete-${member.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team member? This action cannot be undone.
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
