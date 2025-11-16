import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Edit, Trash2, UserCheck } from "lucide-react";
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
import type { Employee } from "@shared/schema";

interface EmployeeListProps {
  employees: Employee[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      toast({
        title: "Success",
        description: "Employee deleted successfully",
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
        description: "Failed to delete employee",
        variant: "destructive",
      });
    },
  });

  if (employees.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2" data-testid="text-no-employees">
            No employees yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding your first employee
          </p>
          <Link href="/admin/employees/new">
            <Button data-testid="button-add-first-employee">
              Add Employee
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-6" data-testid={`card-employee-${employee.id}`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Photo */}
              <div className="flex-shrink-0">
                {employee.photoUrl ? (
                  <img
                    src={employee.photoUrl}
                    alt={employee.fullName}
                    className="w-20 h-20 rounded-md object-cover"
                    data-testid={`img-employee-${employee.id}`}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1" data-testid={`text-employee-name-${employee.id}`}>
                  {employee.fullName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <p data-testid={`text-employee-id-${employee.id}`}>
                    <span className="font-semibold">ID:</span> {employee.employeeId}
                  </p>
                  <p data-testid={`text-employee-position-${employee.id}`}>
                    <span className="font-semibold">Position:</span> {employee.position}
                  </p>
                  <p data-testid={`text-employee-mobile-${employee.id}`}>
                    <span className="font-semibold">Mobile:</span> {employee.mobile}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-2 md:items-end">
                <Link href={`/admin/employees/${employee.id}/edit`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid={`button-edit-${employee.id}`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(employee.id)}
                  data-testid={`button-delete-${employee.id}`}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee
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
    </>
  );
}
