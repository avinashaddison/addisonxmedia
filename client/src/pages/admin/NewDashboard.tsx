import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Users,
  Building2,
  TrendingUp,
  FolderKanban,
  FileText,
  Star,
  MessageSquare,
  BarChart3,
  Plus,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Employee, ContactSubmission, Testimonial, Client, Lead, Project, Invoice } from "@shared/schema";

export default function NewDashboard() {
  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  const { data: contacts = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const { data: leads = [] } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: invoices = [] } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  // Calculate stats
  const newContacts = contacts.filter(c => c.status === "new").length;
  const activeClients = clients.filter(c => c.status === "active").length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const activeProjects = projects.filter(p => p.status === "in-progress").length;
  const pendingInvoices = invoices.filter(i => i.status === "pending").length;
  const activeTestimonials = testimonials.filter(t => t.isActive === true).length;

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      link: "/admin/employees",
    },
    {
      title: "Active Clients",
      value: activeClients,
      total: clients.length,
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100",
      link: "/admin/clients",
    },
    {
      title: "New Leads",
      value: newLeads,
      total: leads.length,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      link: "/admin/leads",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      total: projects.length,
      icon: FolderKanban,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      link: "/admin/projects",
    },
    {
      title: "Pending Invoices",
      value: pendingInvoices,
      total: invoices.length,
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-100",
      link: "/admin/invoices",
    },
    {
      title: "New Contacts",
      value: newContacts,
      total: contacts.length,
      icon: MessageSquare,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      link: "/admin/contacts",
    },
  ];

  const quickActions = [
    {
      title: "Add Employee",
      description: "Register a new employee",
      icon: Users,
      link: "/admin/employees/new",
      color: "text-blue-600",
      enabled: true,
    },
    {
      title: "Add Testimonial",
      description: "Add client review",
      icon: Star,
      link: "/admin/testimonials/new",
      color: "text-yellow-600",
      enabled: true,
    },
    {
      title: "View Contacts",
      description: "Manage contact submissions",
      icon: MessageSquare,
      link: "/admin/contacts",
      color: "text-teal-600",
      enabled: true,
    },
  ];

  const recentActivity = [
    {
      type: "New Contact",
      count: newContacts,
      icon: MessageSquare,
      color: "text-teal-600",
    },
    {
      type: "New Leads",
      count: newLeads,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      type: "Active Projects",
      count: activeProjects,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      type: "Pending Payments",
      count: pendingInvoices,
      icon: DollarSign,
      color: "text-red-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-title">
          Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="text-dashboard-subtitle">
          Welcome to AddisonX Media Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.link}>
              <Card className="p-6 hover-elevate transition-all cursor-pointer" data-testid={`card-stat-${index}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {stat.value}
                      {stat.total !== undefined && (
                        <span className="text-base text-muted-foreground ml-1">
                          / {stat.total}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-md ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.link}>
                <Card className="p-4 hover-elevate transition-all cursor-pointer" data-testid={`card-action-${index}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                    <span className="text-sm font-medium">{activity.type}</span>
                  </div>
                  <span className="text-sm font-bold">{activity.count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Active Testimonials</span>
              </div>
              <span className="text-sm font-bold">{activeTestimonials}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Team Members</span>
              </div>
              <span className="text-sm font-bold">{employees.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Total Clients</span>
              </div>
              <span className="text-sm font-bold">{clients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderKanban className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Total Projects</span>
              </div>
              <span className="text-sm font-bold">{projects.length}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
