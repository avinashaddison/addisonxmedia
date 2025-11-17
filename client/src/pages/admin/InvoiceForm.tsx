import { useEffect } from "react";
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
import { insertInvoiceSchema, type Invoice } from "@shared/schema";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";

const invoiceFormSchema = insertInvoiceSchema.extend({
  dueDate: z.string().optional(),
  paidDate: z.string().optional(),
});
type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

export default function InvoiceForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: invoice, isLoading } = useQuery<Invoice>({
    queryKey: ["/api/invoices", id],
    enabled: isEditing,
  });

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      clientId: "",
      projectId: "",
      amount: "",
      tax: "0",
      total: "",
      status: "pending",
      dueDate: "",
      paidDate: "",
      notes: "",
    },
  });

  const amount = form.watch("amount");
  const tax = form.watch("tax");

  useEffect(() => {
    const amountNum = parseFloat(amount || "0");
    const taxNum = parseFloat(tax || "0");
    const total = (amountNum + taxNum).toFixed(2);
    form.setValue("total", total);
  }, [amount, tax, form]);

  const createMutation = useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const prepared = prepareFormData(data, ["clientId", "projectId", "notes", "paidDate"]);
      const payload = {
        ...prepared,
        dueDate: prepared.dueDate ? new Date(prepared.dueDate) : undefined,
        paidDate: prepared.paidDate ? new Date(prepared.paidDate) : undefined,
      };
      await apiRequest("POST", "/api/invoices", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      setLocation("/admin/invoices");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const prepared = prepareFormData(data, ["clientId", "projectId", "notes", "paidDate"]);
      const payload = {
        ...prepared,
        dueDate: prepared.dueDate ? new Date(prepared.dueDate) : undefined,
        paidDate: prepared.paidDate ? new Date(prepared.paidDate) : undefined,
      };
      await apiRequest("PUT", `/api/invoices/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      toast({
        title: "Success",
        description: "Invoice updated successfully",
      });
      setLocation("/admin/invoices");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InvoiceFormData) => {
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
            <p className="text-lg font-semibold">Loading invoice...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && invoice) {
    form.reset({
      invoiceNumber: invoice.invoiceNumber,
      clientId: invoice.clientId || "",
      projectId: invoice.projectId || "",
      amount: invoice.amount,
      tax: invoice.tax,
      total: invoice.total,
      status: invoice.status,
      dueDate: invoice.dueDate ? format(new Date(invoice.dueDate), "yyyy-MM-dd") : "",
      paidDate: invoice.paidDate ? format(new Date(invoice.paidDate), "yyyy-MM-dd") : "",
      notes: invoice.notes || "",
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation("/admin/invoices")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Invoice" : "Generate New Invoice"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update invoice information" : "Fill in the details to generate a new invoice"}
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border shadow-lg p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Invoice Number *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="INV-2024-001" data-testid="input-invoice-number" />
                      </FormControl>
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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

                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Project ID</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} placeholder="Project ID" data-testid="input-project-id" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Amount & Calculation</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Amount (₹) *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="10000" data-testid="input-amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Tax (₹) *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="1800" data-testid="input-tax" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Total (₹) *</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly data-testid="input-total" className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Schedule</h3>
                <Separator className="mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Due Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" data-testid="input-due-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paidDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Paid Date</FormLabel>
                      <FormControl>
                        <Input {...normalizeNullableField(field)} type="date" data-testid="input-paid-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
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
                    {isEditing ? "Update Invoice" : "Create Invoice"}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setLocation("/admin/invoices")}
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
