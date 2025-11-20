import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useWebSocket } from "@/hooks/useWebSocket";
import { playNotificationSound } from "@/lib/notificationSound";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Star,
  BarChart3,
  MessageSquare,
  UserCircle2,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
  Building2,
  TrendingUp,
  Palette,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoUrl from "@assets/Screenshot 2025-11-15 182956_1763354765864.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    url: "/admin/employees",
    icon: Users,
  },
  {
    title: "Clients",
    url: "/admin/clients",
    icon: Building2,
  },
  {
    title: "Leads",
    url: "/admin/leads",
    icon: TrendingUp,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Invoices",
    url: "/admin/invoices",
    icon: FileText,
  },
  {
    title: "Contact Submissions",
    url: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Team Members",
    url: "/admin/team-members",
    icon: UserCircle2,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Customize",
    url: "/admin/customize",
    icon: Palette,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [location] = useLocation();

  // Fetch unread contact count
  const { data: unreadData } = useQuery<{ count: number }>({
    queryKey: ['/api/contact/unread-count'],
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const unreadCount = unreadData?.count || 0;

  // Debounce notification handling to prevent duplicates
  const lastNotificationIdRef = useRef<string | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout>();

  // Set up WebSocket connection for real-time notifications
  useWebSocket((message) => {
    if (message.type === 'new_contact_submission') {
      const submissionId = message.data.id;
      
      // Prevent duplicate notifications for the same submission within 5 seconds
      if (lastNotificationIdRef.current === submissionId) {
        return;
      }
      
      lastNotificationIdRef.current = submissionId;
      
      // Play notification sound
      playNotificationSound();
      
      // Show toast notification
      toast({
        title: "New Contact Submission",
        description: `${message.data.name} sent a message`,
        duration: 5000,
      });
      
      // Invalidate unread count query to refresh the badge
      queryClient.invalidateQueries({ queryKey: ['/api/contact/unread-count'] });
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      
      // Reset the last notification ID after 5 seconds
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      notificationTimeoutRef.current = setTimeout(() => {
        lastNotificationIdRef.current = null;
      }, 5000);
    }
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

  // Cleanup notification timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

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

  // Get current page title based on location
  const getCurrentPageTitle = () => {
    // Handle exact dashboard match
    if (location === "/admin" || location === "/admin/dashboard") {
      return "Dashboard";
    }
    
    // Sort menu items by URL length (longest first) to match most specific routes first
    // This prevents "/admin/employee" from matching before "/admin/employees"
    const sortedItems = [...menuItems]
      .filter(item => item.url !== "/admin")
      .sort((a, b) => b.url.length - a.url.length);
    
    // Find matching menu item for current location
    const matchedItem = sortedItems.find(item => 
      location?.startsWith(item.url)
    );
    
    return matchedItem?.title || "Dashboard";
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="admin-ui-theme">
      <SidebarProvider style={sidebarStyle as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border p-6">
              <div className="flex flex-col gap-3">
                <img 
                  src={logoUrl} 
                  alt="AddisonX Media Logo" 
                  className="h-12 w-auto rounded-md object-contain p-2 bg-white shadow-lg"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 77, 54, 0.4), 0 0 40px rgba(255, 77, 54, 0.2)'
                  }}
                />
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-gradient-to-r from-primary/20 via-orange-500/20 to-primary/20 border border-primary/30 backdrop-blur-sm">
                  <span className="text-xs font-semibold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent tracking-wide">
                    CEO - Mr. AJAY KUMAR
                  </span>
                </div>
              </div>
            </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-muted-foreground px-3 py-2">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = 
                      item.url === "/admin" 
                        ? location === "/admin" || location === "/admin/dashboard"
                        : location?.startsWith(item.url) || false;
                    
                    const showBadge = item.title === "Contact Submissions" && unreadCount > 0;
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Link href={item.url}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {showBadge && (
                              <Badge 
                                className="ml-auto bg-primary text-white animate-pulse" 
                                data-testid="badge-unread-count"
                              >
                                {unreadCount}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4 bg-sidebar/50">
            <div className="flex items-center gap-3 mb-3 px-1">
              <Avatar className="h-8 w-8 border border-sidebar-border">
                <AvatarImage src={user?.profileImageUrl || undefined} />
                <AvatarFallback className="bg-sidebar-accent">
                  <UserCircle2 className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.firstName || user?.email || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 px-6 py-4 border-b bg-card/30 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="h-8 w-px bg-border/50"></div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="px-3 py-1.5 rounded-md bg-primary/15 text-primary text-xs font-medium border border-primary/20">
                Admin
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
