import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, TrendingUp, Edit, Trash2 } from "lucide-react";
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
import type { Lead } from "@shared/schema";
import { format } from "date-fns";

export default function Leads() {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Success",
        description: "Lead deleted successfully",
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
        description: "Failed to delete lead",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

  const newLeads = leads.filter(l => l.status === "new").length;
  const contactedLeads = leads.filter(l => l.status === "contacted").length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;
  const convertedLeads = leads.filter(l => l.status === "converted").length;
  const lostLeads = leads.filter(l => l.status === "lost").length;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "qualified": return "default";
      case "converted": return "default";
      case "lost": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Leads</h1>
          <p className="text-base text-muted-foreground">Track and manage your sales leads</p>
        </div>
        <Link href="/admin/leads/new">
          <Button data-testid="button-add-lead">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">New</p>
              <p className="text-3xl font-bold" data-testid="stat-new">{newLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Contacted</p>
              <p className="text-3xl font-bold" data-testid="stat-contacted">{contactedLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Qualified</p>
              <p className="text-3xl font-bold" data-testid="stat-qualified">{qualifiedLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-green-500/10 to-green-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Converted</p>
              <p className="text-3xl font-bold" data-testid="stat-converted">{convertedLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-border/50 bg-gradient-to-br from-red-500/10 to-red-500/5 hover-elevate transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Lost</p>
              <p className="text-3xl font-bold" data-testid="stat-lost">{lostLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {leads.length === 0 ? (
        <Card className="p-16 border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3" data-testid="text-no-leads">
              No leads yet
            </h3>
            <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
              Start tracking your sales pipeline by adding your first lead
            </p>
            <Link href="/admin/leads/new">
              <Button size="lg" data-testid="button-add-first-lead">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-6 border border-border/50 hover-elevate transition-all" data-testid={`card-lead-${lead.id}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-xl font-bold" data-testid={`text-lead-name-${lead.id}`}>
                      {lead.name}
                    </h3>
                    <Badge 
                      className={
                        lead.status === "new" ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" :
                        lead.status === "contacted" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20" :
                        lead.status === "qualified" ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20" :
                        lead.status === "converted" ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" : ""
                      }
                      variant={getStatusVariant(lead.status)}
                      data-testid={`badge-status-${lead.id}`}
                    >
                      {lead.status}
                    </Badge>
                    <Badge className="bg-muted/50" variant="outline" data-testid={`badge-source-${lead.id}`}>
                      {lead.source}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <p className="text-muted-foreground" data-testid={`text-lead-email-${lead.id}`}>
                      <span className="font-semibold text-foreground">Email:</span> {lead.email}
                    </p>
                    {lead.phone && (
                      <p className="text-muted-foreground" data-testid={`text-lead-phone-${lead.id}`}>
                        <span className="font-semibold text-foreground">Phone:</span> {lead.phone}
                      </p>
                    )}
                    {lead.company && (
                      <p className="text-muted-foreground" data-testid={`text-lead-company-${lead.id}`}>
                        <span className="font-semibold text-foreground">Company:</span> {lead.company}
                      </p>
                    )}
                    {lead.followUpDate && (
                      <p className="text-muted-foreground" data-testid={`text-lead-followup-${lead.id}`}>
                        <span className="font-semibold text-foreground">Follow up:</span> {format(new Date(lead.followUpDate), "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:items-end">
                  <Link href={`/admin/leads/${lead.id}/edit`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-edit-${lead.id}`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(lead.id)}
                    data-testid={`button-delete-${lead.id}`}
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
              This action cannot be undone. This will permanently delete the lead
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
