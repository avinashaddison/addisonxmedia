import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Building2, Edit, Trash2 } from "lucide-react";
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
import type { Client } from "@shared/schema";

export default function Clients() {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      toast({
        title: "Success",
        description: "Client deleted successfully",
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
        description: "Failed to delete client",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading clients...</p>
        </div>
      </div>
    );
  }

  const activeClients = clients.filter(c => c.status === "active").length;
  const inactiveClients = clients.filter(c => c.status === "inactive").length;
  const pendingClients = clients.filter(c => c.status === "pending").length;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Clients</h1>
          <p className="text-base text-muted-foreground">Manage your clients and their information</p>
        </div>
        <Link href="/admin/clients/new">
          <Button data-testid="button-add-client">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Clients</p>
              <p className="text-3xl font-bold" data-testid="stat-total">{clients.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-green-500/10 to-green-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active</p>
              <p className="text-3xl font-bold" data-testid="stat-active">{activeClients}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold" data-testid="stat-pending">{pendingClients}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-gray-500/10 to-gray-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Inactive</p>
              <p className="text-3xl font-bold" data-testid="stat-inactive">{inactiveClients}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </Card>
      </div>

      {clients.length === 0 ? (
        <Card className="p-16 border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3" data-testid="text-no-clients">
              No clients yet
            </h3>
            <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
              Get started by adding your first client to begin tracking your business relationships
            </p>
            <Link href="/admin/clients/new">
              <Button size="lg" data-testid="button-add-first-client">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="p-6 border border-border/50 hover-elevate transition-all" data-testid={`card-client-${client.id}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold" data-testid={`text-client-name-${client.id}`}>
                      {client.name}
                    </h3>
                    <Badge 
                      className={client.status === "active" ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" : client.status === "pending" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20" : ""}
                      variant={client.status === "active" ? "default" : client.status === "pending" ? "secondary" : "outline"}
                      data-testid={`badge-status-${client.id}`}
                    >
                      {client.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <p className="text-muted-foreground" data-testid={`text-client-email-${client.id}`}>
                      <span className="font-semibold text-foreground">Email:</span> {client.email}
                    </p>
                    {client.phone && (
                      <p className="text-muted-foreground" data-testid={`text-client-phone-${client.id}`}>
                        <span className="font-semibold text-foreground">Phone:</span> {client.phone}
                      </p>
                    )}
                    {client.company && (
                      <p className="text-muted-foreground" data-testid={`text-client-company-${client.id}`}>
                        <span className="font-semibold text-foreground">Company:</span> {client.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:items-end">
                  <Link href={`/admin/clients/${client.id}/edit`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-edit-${client.id}`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(client.id)}
                    data-testid={`button-delete-${client.id}`}
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
              This action cannot be undone. This will permanently delete the client
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
