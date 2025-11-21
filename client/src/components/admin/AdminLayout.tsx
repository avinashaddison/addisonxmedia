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
  Search,
  Image,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoUrl from "@assets/image_1763672898572.png";

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
    title: "SEO Settings",
    url: "/admin/seo",
    icon: Search,
  },
  {
    title: "Favicon",
    url: "/admin/favicon",
    icon: Image,
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
    "--sidebar-width-icon": "4rem",
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="admin-ui-theme">
      <SidebarProvider style={sidebarStyle as React.CSSProperties} defaultOpen={true}>
        <div className="flex h-screen w-full">
          <Sidebar collapsible="icon" className="border-r bg-sidebar">
            <SidebarHeader className="border-b p-4 group-data-[collapsible=icon]:p-2">
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <div className="relative flex-shrink-0">
                  <img 
                    src={logoUrl} 
                    alt="AddisonX Media Logo" 
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                  <h2 className="text-sm font-bold truncate">AddisonX Media</h2>
                  <p className="text-xs text-muted-foreground truncate">Admin Panel</p>
                </div>
              </div>
            </SidebarHeader>

          <SidebarContent className="py-2">
            <SidebarGroup>
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
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive} 
                          data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                          tooltip={item.title}
                          className="h-10"
                        >
                          <Link href={item.url}>
                            <Icon className="h-5 w-5" />
                            <span className="flex-1">{item.title}</span>
                            {showBadge && (
                              <Badge 
                                className="ml-auto h-5 px-1.5 bg-primary text-white text-xs group-data-[collapsible=icon]:hidden" 
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

          <SidebarFooter className="border-t p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  data-testid="button-logout"
                  tooltip="Logout"
                  className="h-10"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.profileImageUrl || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {user?.firstName?.[0] || user?.email?.[0] || "A"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                      <p className="text-xs font-medium truncate">
                        {user?.firstName || user?.email || "Admin"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">Logout</p>
                    </div>
                    <LogOut className="h-4 w-4 flex-shrink-0 group-data-[collapsible=icon]:hidden" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="relative flex items-center justify-between gap-4 px-6 py-4 border-b border-primary/20 bg-card/50 backdrop-blur-xl shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-primary/10 hover:text-primary transition-colors" />
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
              <div>
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/20 to-orange-500/20 text-primary text-xs font-bold border border-primary/30 shadow-sm">
                Admin
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/10">
            {children}
          </main>
        </div>
      </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
