import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
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

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
                AX
              </div>
              <div>
                <h2 className="font-semibold text-sm">AddisonX Media</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = 
                      item.url === "/admin" 
                        ? location === "/admin" || location === "/admin/dashboard"
                        : location?.startsWith(item.url) || false;
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Link href={item.url}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profileImageUrl || undefined} />
                <AvatarFallback>
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
          <header className="flex items-center gap-2 p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
