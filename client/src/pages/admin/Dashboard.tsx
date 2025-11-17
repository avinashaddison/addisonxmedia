import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Plus, LogOut, Star, BarChart3 } from "lucide-react";
import { EmployeeList } from "@/components/admin/EmployeeList";
import type { Employee } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  const { data: employees = [], isLoading: isLoadingEmployees } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" data-testid="text-dashboard-title">
                Admin Dashboard
              </h1>
              <p className="text-base text-muted-foreground mt-1" data-testid="text-dashboard-subtitle">
                Manage employee information and system settings
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/admin/employees/new">
            <Card className="p-8 border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 hover-elevate transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Manage Employees</h3>
                  <p className="text-sm text-muted-foreground">
                    {employees.length} employees registered
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/testimonials">
            <Card className="p-8 border border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover-elevate transition-all cursor-pointer" data-testid="card-testimonials">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Manage Testimonials</h3>
                  <p className="text-sm text-muted-foreground">
                    Client reviews and testimonials
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="p-8 border border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover-elevate transition-all cursor-pointer" data-testid="card-analytics">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Verification search statistics
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight" data-testid="text-employees-title">
            Employees
          </h2>
          <Link href="/admin/employees/new">
            <Button data-testid="button-add-employee">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Employee List */}
        {isLoadingEmployees ? (
          <Card className="p-16 border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-6"></div>
              <p className="text-lg text-muted-foreground">Loading employees...</p>
            </div>
          </Card>
        ) : (
          <EmployeeList employees={employees} />
        )}
      </main>
    </div>
  );
}
