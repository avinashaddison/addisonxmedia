import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactSubmission } from "@shared/schema";
import { format } from "date-fns";
import { Mail, Phone, Building2, MessageSquare, CheckCircle2, Clock, X, Eye } from "lucide-react";

export default function Contacts() {
  const { toast } = useToast();
  const markedIdsRef = useRef<Set<string>>(new Set());
  const markTimeoutRef = useRef<NodeJS.Timeout>();
  
  const { data: contacts = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  // Mark all unread contacts as read after a delay (so admin can see the notification)
  useEffect(() => {
    if (contacts.length > 0 && !isLoading) {
      const unreadContacts = contacts.filter(c => !c.isRead && !markedIdsRef.current.has(c.id));
      
      if (unreadContacts.length > 0) {
        // Clear any existing timeout
        if (markTimeoutRef.current) {
          clearTimeout(markTimeoutRef.current);
        }
        
        // Wait 3 seconds before marking as read (gives time to see notifications)
        markTimeoutRef.current = setTimeout(async () => {
          try {
            // Add IDs to marked set to prevent re-marking
            unreadContacts.forEach(c => markedIdsRef.current.add(c.id));
            
            // Mark all unread contacts as read in parallel
            await Promise.all(
              unreadContacts.map(contact => 
                apiRequest("PATCH", `/api/contact/${contact.id}/mark-read`, {})
              )
            );
            
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['/api/contact/unread-count'] });
            queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
          } catch (error) {
            console.error("Failed to mark contacts as read:", error);
            // Remove from marked set on error so it can be retried
            unreadContacts.forEach(c => markedIdsRef.current.delete(c.id));
          }
        }, 3000);
      }
    }
    
    return () => {
      if (markTimeoutRef.current) {
        clearTimeout(markTimeoutRef.current);
      }
    };
  }, [contacts, isLoading]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/contact/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Status Updated",
        description: "Contact submission status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />New</Badge>;
      case "contacted":
        return <Badge><CheckCircle2 className="h-3 w-3 mr-1" />Contacted</Badge>;
      case "closed":
        return <Badge variant="outline"><X className="h-3 w-3 mr-1" />Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
        <p className="text-muted-foreground">
          Manage and track contact form submissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{contacts.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New</p>
              <p className="text-2xl font-bold">
                {contacts.filter(c => c.status === "new").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contacted</p>
              <p className="text-2xl font-bold">
                {contacts.filter(c => c.status === "contacted").length}
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact submissions yet</p>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id} className="p-6" data-testid={`contact-${contact.id}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    {getStatusBadge(contact.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    {contact.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {contact.createdAt && format(new Date(contact.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {contact.status === "new" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatusMutation.mutate({ id: contact.id, status: "contacted" })}
                      disabled={updateStatusMutation.isPending}
                    >
                      Mark as Contacted
                    </Button>
                  )}
                  {contact.status === "contacted" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: contact.id, status: "closed" })}
                      disabled={updateStatusMutation.isPending}
                    >
                      Close
                    </Button>
                  )}
                  {contact.status === "closed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: contact.id, status: "new" })}
                      disabled={updateStatusMutation.isPending}
                    >
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
