import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Phone, MapPin, Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Employee } from "@shared/schema";
import verifiedBadge from "@assets/verify_1763302805305.png";

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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-primary/[0.02] to-background">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl opacity-20"></div>

      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center py-16 px-4 md:px-6 relative z-10">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
            
            <div className="relative p-8 md:p-10">
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
                        placeholder="Enter Employee ID (e.g., EMP001)"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="h-14 text-lg px-6 shadow-lg border-2 border-primary/20 focus:border-primary/40 bg-background/50 backdrop-blur-sm transition-all duration-200"
                        data-testid="input-employee-id"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isLoading}
                      className="h-14 px-10 text-lg font-semibold shadow-xl transition-all duration-200 hover:shadow-2xl w-full sm:w-auto"
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
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isLoading && (
                <Card className="p-16 bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-primary/20">
                  <div className="text-center space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary"></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-semibold" data-testid="text-loading">
                        Verifying Employee...
                      </p>
                      <p className="text-base text-muted-foreground">Please wait while we securely verify the credentials</p>
                    </div>
                  </div>
                </Card>
              )}

              {error && (
                <Alert variant="destructive" className="border-2 shadow-lg p-6" data-testid="alert-error">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Employee Not Found</h3>
                      <AlertDescription className="text-base">
                        The employee ID you entered could not be verified. Please check the ID and try again.
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}

              {employee && !isLoading && (
                <Card className="p-8 md:p-12 shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/98 to-primary/5 animate-in fade-in slide-in-from-bottom-6 duration-700" data-testid="card-employee-result">
                  {/* Success Header */}
                  <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg font-semibold text-green-600 dark:text-green-400" data-testid="text-verified-badge">
                        Verified Employee
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                    {/* Employee Photo */}
                    <div className="flex-shrink-0">
                      {employee.photoUrl ? (
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
                          <img
                            src={employee.photoUrl}
                            alt={employee.fullName}
                            className="relative w-48 h-48 rounded-3xl object-cover border-4 border-primary/30 shadow-2xl"
                            data-testid="img-employee-photo"
                          />
                        </div>
                      ) : (
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-primary/20 rounded-3xl blur-2xl opacity-75"></div>
                          <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 flex items-center justify-center border-4 border-primary/30 shadow-2xl">
                            <UserCheck className="h-20 w-20 text-primary" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Employee Details */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                      {/* Name & Badge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" data-testid="text-employee-name">
                            {employee.fullName}
                          </h2>
                          <div className="flex-shrink-0">
                            <img 
                              src={verifiedBadge} 
                              alt="Verified" 
                              className="h-7 w-7"
                              data-testid="img-verified-badge"
                            />
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
                          <p className="text-xs font-semibold text-muted-foreground">Employee ID:</p>
                          <p className="text-sm font-bold text-primary" data-testid="text-employee-id-display">
                            {employee.employeeId}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10 hover:border-primary/20 transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Position</p>
                              <p className="text-base font-semibold break-words" data-testid="text-employee-position">
                                {employee.position}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10 hover:border-primary/20 transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Mobile Number</p>
                              <p className="text-base font-semibold break-words" data-testid="text-employee-mobile">
                                {employee.mobile}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10 hover:border-primary/20 transition-all duration-200 sm:col-span-2">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Address</p>
                              <p className="text-base font-semibold break-words" data-testid="text-employee-address">
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
