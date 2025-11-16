import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Phone, MapPin, Briefcase, AlertCircle, Shield, CheckCircle2, Sparkles } from "lucide-react";
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
      <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Shield className="h-3 w-3 mr-2" />
              Secure Verification System
            </Badge>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
                <UserCheck className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-verify-title">
              Employee Verification
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-verify-description">
              Enter an employee ID to verify their credentials and view their information securely
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-20 -mt-10 relative z-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <Card className="p-8 md:p-10 shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/80">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Search Employee</h2>
                <p className="text-sm text-muted-foreground">Enter the employee ID to get instant verification</p>
              </div>
              <div>
                <label htmlFor="employee-id" className="block text-sm font-semibold mb-3">
                  Employee ID
                </label>
                <div className="flex gap-3">
                  <Input
                    id="employee-id"
                    type="text"
                    placeholder="e.g., EMP001"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="flex-1 h-12 text-base"
                    data-testid="input-employee-id"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="h-12 px-8 shadow-lg"
                    data-testid="button-search-employee"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Results Section */}
          {searchId && (
            <div className="mt-8">
              {isLoading && (
                <Card className="p-12 bg-gradient-to-br from-card to-card/80">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-6"></div>
                    <p className="text-lg font-medium" data-testid="text-loading">
                      Searching for employee...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">This will only take a moment</p>
                  </div>
                </Card>
              )}

              {error && (
                <Alert variant="destructive" className="border-2" data-testid="alert-error">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-base">
                    Employee not found. Please check the ID and try again.
                  </AlertDescription>
                </Alert>
              )}

              {employee && !isLoading && (
                <Card className="p-8 md:p-10 shadow-2xl border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500" data-testid="card-employee-result">
                  {/* Verified Badge */}
                  <div className="mb-6 flex justify-center">
                    <Badge variant="default" className="text-base px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      <span data-testid="text-verified-badge">Verified Employee</span>
                    </Badge>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Employee Photo */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      {employee.photoUrl ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                          <img
                            src={employee.photoUrl}
                            alt={employee.fullName}
                            className="relative w-40 h-40 rounded-2xl object-cover border-4 border-primary/20"
                            data-testid="img-employee-photo"
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20">
                          <UserCheck className="h-16 w-16 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Employee Details */}
                    <div className="flex-1 space-y-6">
                      <div className="text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-employee-name">
                            {employee.fullName}
                          </h2>
                          <div className="flex-shrink-0">
                            <CheckCircle2 className="h-8 w-8 text-blue-500 fill-blue-500" />
                          </div>
                        </div>
                        <p className="text-base text-muted-foreground mt-2" data-testid="text-employee-id-display">
                          Employee ID: <span className="font-semibold text-primary">{employee.employeeId}</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Position</p>
                            <p className="text-base font-semibold" data-testid="text-employee-position">
                              {employee.position}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Mobile Number</p>
                            <p className="text-base font-semibold" data-testid="text-employee-mobile">
                              {employee.mobile}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 md:col-span-2">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Address</p>
                            <p className="text-base font-semibold" data-testid="text-employee-address">
                              {employee.address}
                            </p>
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-card via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="h-3 w-3 mr-2" />
              Secure & Reliable
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-info-title">
              Why Verify Employees?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-info-description">
              Our employee verification system ensures transparency and trust. You can 
              verify the credentials of any AddisonX Media team member working with you 
              to ensure authenticity and professionalism.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="text-feature-0-title">Instant Verification</h3>
              <p className="text-base text-muted-foreground" data-testid="text-feature-0-description">
                Get immediate access to employee information with just one click
              </p>
            </Card>
            <Card className="p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="text-feature-1-title">Secure System</h3>
              <p className="text-base text-muted-foreground" data-testid="text-feature-1-description">
                Protected database with verified records ensuring data security
              </p>
            </Card>
            <Card className="p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="text-feature-2-title">Build Trust</h3>
              <p className="text-base text-muted-foreground" data-testid="text-feature-2-description">
                Confirm authenticity of team members and build client confidence
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
