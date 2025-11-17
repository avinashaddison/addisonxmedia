import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, FileText, Edit, Trash2 } from "lucide-react";
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
import type { Invoice } from "@shared/schema";
import { format } from "date-fns";

export default function Invoices() {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: invoices = [], isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/invoices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      toast({
        title: "Success",
        description: "Invoice deleted successfully",
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
        description: "Failed to delete invoice",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading invoices...</p>
        </div>
      </div>
    );
  }

  const pendingInvoices = invoices.filter(i => i.status === "pending").length;
  const paidInvoices = invoices.filter(i => i.status === "paid").length;
  const overdueInvoices = invoices.filter(i => i.status === "overdue").length;
  const cancelledInvoices = invoices.filter(i => i.status === "cancelled").length;

  const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.total || "0"), 0);
  const paidAmount = invoices.filter(i => i.status === "paid").reduce((sum, inv) => sum + parseFloat(inv.total || "0"), 0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "paid": return "default";
      case "overdue": return "destructive";
      case "cancelled": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">Generate and manage invoices</p>
        </div>
        <Link href="/admin/invoices/new">
          <Button data-testid="button-add-invoice">
            <Plus className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold" data-testid="stat-total">{invoices.length}</p>
            </div>
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold" data-testid="stat-pending">{pendingInvoices}</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-2xl font-bold" data-testid="stat-paid">{paidInvoices}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold" data-testid="stat-overdue">{overdueInvoices}</p>
            </div>
            <FileText className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cancelled</p>
              <p className="text-2xl font-bold" data-testid="stat-cancelled">{cancelledInvoices}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="text-lg font-bold" data-testid="stat-collected">₹{paidAmount.toFixed(2)}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {invoices.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2" data-testid="text-no-invoices">
              No invoices yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by generating your first invoice
            </p>
            <Link href="/admin/invoices/new">
              <Button data-testid="button-add-first-invoice">
                Generate Invoice
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-6" data-testid={`card-invoice-${invoice.id}`}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold" data-testid={`text-invoice-number-${invoice.id}`}>
                      {invoice.invoiceNumber}
                    </h3>
                    <Badge 
                      variant={getStatusVariant(invoice.status)}
                      data-testid={`badge-status-${invoice.id}`}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <p data-testid={`text-invoice-amount-${invoice.id}`}>
                      <span className="font-semibold">Amount:</span> ₹{invoice.amount}
                    </p>
                    <p data-testid={`text-invoice-tax-${invoice.id}`}>
                      <span className="font-semibold">Tax:</span> ₹{invoice.tax}
                    </p>
                    <p data-testid={`text-invoice-total-${invoice.id}`}>
                      <span className="font-semibold">Total:</span> ₹{invoice.total}
                    </p>
                    {invoice.dueDate && (
                      <p data-testid={`text-invoice-due-${invoice.id}`}>
                        <span className="font-semibold">Due:</span> {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
                      </p>
                    )}
                    {invoice.paidDate && (
                      <p data-testid={`text-invoice-paid-${invoice.id}`}>
                        <span className="font-semibold">Paid:</span> {format(new Date(invoice.paidDate), "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:items-end">
                  <Link href={`/admin/invoices/${invoice.id}/edit`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-edit-${invoice.id}`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(invoice.id)}
                    data-testid={`button-delete-${invoice.id}`}
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
              This action cannot be undone. This will permanently delete the invoice
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
