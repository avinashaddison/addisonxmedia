import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Phone, MapPin, Briefcase, AlertCircle, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Employee } from "@shared/schema";
import verifiedBadge from "@assets/verify_1763302805305.png";

export default function VerifyEmployee() {
  const [location] = useLocation();
  
  // Get employee ID from URL query parameter
  const getEmployeeIdFromUrl = () => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    return urlParams.get('id') || '';
  };
  
  const [employeeId, setEmployeeId] = useState(getEmployeeIdFromUrl());
  const [searchId, setSearchId] = useState(getEmployeeIdFromUrl());
  
  // Update when location changes
  useEffect(() => {
    const urlEmployeeId = getEmployeeIdFromUrl();
    if (urlEmployeeId) {
      setEmployeeId(urlEmployeeId);
      setSearchId(urlEmployeeId);
    }
  }, [location]);

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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
        <div className="w-full max-w-3xl">
          {/* Main Card */}
          <Card className="border shadow-sm">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSearch} className="space-y-5">
                {/* Input Section */}
                <div className="space-y-4">
                  <label htmlFor="employee-id" className="block text-lg font-semibold text-center">
                    Employee ID
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        id="employee-id"
                        type="text"
                        placeholder="Enter Employee ID (e.g., AXM-MKT-001)"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="h-12"
                        data-testid="input-employee-id"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isLoading}
                      className="h-12 px-8 w-full sm:w-auto"
                      data-testid="button-search-employee"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-background border-t-transparent mr-3"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-3" />
                          Verify Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>

          {/* Results Section */}
          {searchId && (
            <div className="mt-6">
              {isLoading && (
                <Card className="p-12 border shadow-sm">
                  <div className="text-center space-y-4">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-3 border-muted border-t-primary"></div>
                    <p className="text-lg font-semibold" data-testid="text-loading">
                      Verifying Employee...
                    </p>
                  </div>
                </Card>
              )}

              {error && (
                <Alert variant="destructive" className="border shadow-sm" data-testid="alert-error">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold mb-1">Employee Not Found</h3>
                    <AlertDescription>
                      The employee ID you entered could not be verified. Please check the ID and try again.
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              {employee && !isLoading && (
                <Card className="p-6 md:p-8 border shadow-sm" data-testid="card-employee-result">
                  {/* Success Header */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-600 dark:text-green-400" data-testid="text-verified-badge">
                        Verified Employee
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    {/* Employee Photo */}
                    <div className="flex-shrink-0">
                      {employee.photoUrl ? (
                        <img
                          src={employee.photoUrl}
                          alt={employee.fullName}
                          className="w-40 h-40 rounded-2xl object-cover border-2 border-primary/20"
                          data-testid="img-employee-photo"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-2xl bg-muted flex items-center justify-center border-2 border-primary/20">
                          <UserCheck className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Employee Details */}
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      {/* Name & Badge */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                          <h2 className="text-2xl font-bold" data-testid="text-employee-name">
                            {employee.fullName}
                          </h2>
                          <img 
                            src={verifiedBadge} 
                            alt="Verified" 
                            className="h-6 w-6"
                            data-testid="img-verified-badge"
                          />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          ID: <span data-testid="text-employee-id-display">{employee.employeeId}</span>
                        </Badge>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-lg bg-muted/50 border">
                          <div className="flex items-start gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground mb-0.5">Position</p>
                              <p className="text-sm font-medium break-words" data-testid="text-employee-position">
                                {employee.position}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/50 border">
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground mb-0.5">Mobile Number</p>
                              <p className="text-sm font-medium break-words" data-testid="text-employee-mobile">
                                {employee.mobile}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/50 border sm:col-span-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground mb-0.5">Address</p>
                              <p className="text-sm font-medium break-words" data-testid="text-employee-address">
                                {employee.address}
                              </p>
                            </div>
                          </div>
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
      <section className="py-12 bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-info-title">
              Why Verify Employees?
            </h2>
            <p className="text-muted-foreground" data-testid="text-info-description">
              Our employee verification system ensures transparency and trust. Verify the credentials of any AddisonX Media team member to ensure authenticity and professionalism.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center border shadow-sm hover-elevate">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2" data-testid="text-feature-0-title">Instant Verification</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-feature-0-description">
                Get immediate access to employee information with just one click
              </p>
            </Card>
            <Card className="p-6 text-center border shadow-sm hover-elevate">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2" data-testid="text-feature-1-title">Secure System</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-feature-1-description">
                Protected database with verified records ensuring data security
              </p>
            </Card>
            <Card className="p-6 text-center border shadow-sm hover-elevate">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2" data-testid="text-feature-2-title">Build Trust</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-feature-2-description">
                Confirm authenticity of team members and build client confidence
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
