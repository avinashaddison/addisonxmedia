import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Search,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { formatDistance } from "date-fns";
import type { VerificationLog } from "@shared/schema";

interface VerificationStats {
  totalSearches: number;
  successfulSearches: number;
  failedSearches: number;
  recentLogs: VerificationLog[];
}

export default function Analytics() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated && !redirecting) {
      setRedirecting(true);
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isAuthLoading, redirecting]);

  const { data: stats, isLoading } = useQuery<VerificationStats>({
    queryKey: ["/api/analytics/verification-stats"],
    enabled: isAuthenticated && !isAuthLoading && !redirecting,
    retry: false,
  });

  if (isAuthLoading || !isAuthenticated || redirecting) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const successRate = stats && stats.totalSearches > 0
    ? ((stats.successfulSearches / stats.totalSearches) * 100).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-analytics-title">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track employee verification searches and trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-total-searches">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Searches
              </CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-searches">
                {stats?.totalSearches || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All time verification attempts
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-successful-searches">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Successful
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-successful-searches">
                {stats?.successfulSearches || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Employees found
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-failed-searches">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Not Found
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600" data-testid="text-failed-searches">
                {stats?.failedSearches || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Employees not found
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-success-rate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-success-rate">
                {successRate}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Verification success rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Verification Logs</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Latest 100 employee verification attempts
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {!stats?.recentLogs || stats.recentLogs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No verification attempts yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 rounded-md border hover-elevate"
                    data-testid={`log-${log.id}`}
                  >
                    <div className="flex items-center gap-4">
                      {log.found === "true" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium" data-testid={`text-employee-id-${log.id}`}>
                          {log.employeeId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {log.searchDate && formatDistance(new Date(log.searchDate), new Date(), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={log.found === "true" ? "default" : "secondary"}
                      data-testid={`badge-status-${log.id}`}
                    >
                      {log.found === "true" ? "Found" : "Not Found"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
