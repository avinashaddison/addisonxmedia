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
import { Plus, Pencil, Trash2, Star, CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import type { Testimonial } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Testimonials() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isAuthLoading]);

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    enabled: isAuthenticated && !isAuthLoading,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      setDeleteId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
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
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-testimonials-title">
              Testimonials
            </h1>
            <p className="text-muted-foreground" data-testid="text-testimonials-description">
              Manage client testimonials and reviews
            </p>
          </div>
          <Link href="/admin/testimonials/new">
            <Button size="lg" data-testid="button-add-testimonial">
              <Plus className="h-5 w-5 mr-2" />
              Add Testimonial
            </Button>
          </Link>
        </div>

        {testimonials && testimonials.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No testimonials yet</h2>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first client testimonial
              </p>
              <Link href="/admin/testimonials/new">
                <Button data-testid="button-add-first-testimonial">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Testimonial
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="p-6" data-testid={`card-testimonial-${testimonial.id}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {testimonial.photoUrl && (
                          <img
                            src={testimonial.photoUrl}
                            alt={testimonial.clientName}
                            className="w-12 h-12 rounded-full object-cover"
                            data-testid={`img-testimonial-photo-${testimonial.id}`}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold" data-testid={`text-client-name-${testimonial.id}`}>
                            {testimonial.clientName}
                          </h3>
                          {testimonial.clientPosition && (
                            <p className="text-sm text-muted-foreground">
                              {testimonial.clientPosition}
                              {testimonial.companyName && ` at ${testimonial.companyName}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={testimonial.isActive === "true" ? "default" : "secondary"} data-testid={`badge-status-${testimonial.id}`}>
                          {testimonial.isActive === "true" ? (
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
                        <div className="flex items-center gap-1">
                          {Array.from({ length: parseInt(testimonial.rating) }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 italic" data-testid={`text-testimonial-${testimonial.id}`}>
                      "{testimonial.testimonialText}"
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                        <Button variant="outline" size="sm" data-testid={`button-edit-${testimonial.id}`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(testimonial.id)}
                        data-testid={`button-delete-${testimonial.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
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
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
