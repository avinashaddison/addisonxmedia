import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, Phone, MapPin, Briefcase, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Employee } from "@shared/schema";

export default function VerifyEmployee() {
  const [employeeId, setEmployeeId] = useState("");
  const [searchId, setSearchId] = useState("");

  const { data: employee, isLoading, error } = useQuery<Employee>({
    queryKey: ["/api/employees/verify", searchId],
    queryFn: async () => {
      const response = await fetch(`/api/employees/verify/${searchId}`);
      if (!response.ok) {
        throw new Error("Employee not found");
      }
      return response.json();
    },
    enabled: !!searchId,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim()) {
      setSearchId(employeeId.trim());
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-verify-title">
              Employee Verification
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-verify-description">
              Enter an employee ID to verify their credentials and view their information.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="employee-id" className="block text-sm font-semibold mb-2">
                  Employee ID
                </label>
                <div className="flex gap-3">
                  <Input
                    id="employee-id"
                    type="text"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="flex-1"
                    data-testid="input-employee-id"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    data-testid="button-search-employee"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Results Section */}
          {searchId && (
            <div className="mt-8">
              {isLoading && (
                <Card className="p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground" data-testid="text-loading">
                      Searching for employee...
                    </p>
                  </div>
                </Card>
              )}

              {error && (
                <Alert variant="destructive" data-testid="alert-error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Employee not found. Please check the ID and try again.
                  </AlertDescription>
                </Alert>
              )}

              {employee && !isLoading && (
                <Card className="p-6 md:p-8" data-testid="card-employee-result">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Employee Photo */}
                    <div className="flex-shrink-0">
                      {employee.photoUrl ? (
                        <img
                          src={employee.photoUrl}
                          alt={employee.fullName}
                          className="w-32 h-32 rounded-md object-cover"
                          data-testid="img-employee-photo"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-md bg-muted flex items-center justify-center">
                          <UserCheck className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Employee Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-1" data-testid="text-employee-name">
                          {employee.fullName}
                        </h2>
                        <p className="text-sm text-muted-foreground" data-testid="text-employee-id-display">
                          Employee ID: {employee.employeeId}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Briefcase className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold mb-1">Position</p>
                            <p className="text-sm text-muted-foreground" data-testid="text-employee-position">
                              {employee.position}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold mb-1">Mobile Number</p>
                            <p className="text-sm text-muted-foreground" data-testid="text-employee-mobile">
                              {employee.mobile}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 md:col-span-2">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold mb-1">Address</p>
                            <p className="text-sm text-muted-foreground" data-testid="text-employee-address">
                              {employee.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="inline-flex items-center gap-2 text-sm text-primary">
                          <UserCheck className="h-4 w-4" />
                          <span data-testid="text-verified-badge">Verified Employee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-info-title">
              Why Verify Employees?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="text-info-description">
              Our employee verification system ensures transparency and trust. You can 
              verify the credentials of any AddisonX Media team member working with you 
              to ensure authenticity and professionalism.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2" data-testid="text-feature-0-title">Instant Verification</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-feature-0-description">
                  Get immediate access to employee information
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2" data-testid="text-feature-1-title">Secure System</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-feature-1-description">
                  Protected database with verified records
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2" data-testid="text-feature-2-title">Build Trust</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-feature-2-description">
                  Confirm authenticity of team members
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
