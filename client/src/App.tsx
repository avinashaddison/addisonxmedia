import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import VerifyEmployee from "@/pages/VerifyEmployee";
import NewDashboard from "@/pages/admin/NewDashboard";
import Employees from "@/pages/admin/Employees";
import EmployeeForm from "@/pages/admin/EmployeeForm";
import Clients from "@/pages/admin/Clients";
import ClientForm from "@/pages/admin/ClientForm";
import Leads from "@/pages/admin/Leads";
import LeadForm from "@/pages/admin/LeadForm";
import Projects from "@/pages/admin/Projects";
import ProjectForm from "@/pages/admin/ProjectForm";
import Invoices from "@/pages/admin/Invoices";
import InvoiceForm from "@/pages/admin/InvoiceForm";
import Contacts from "@/pages/admin/Contacts";
import Testimonials from "@/pages/admin/Testimonials";
import TestimonialForm from "@/pages/admin/TestimonialForm";
import TeamMembers from "@/pages/admin/TeamMembers";
import TeamMemberForm from "@/pages/admin/TeamMemberForm";
import Analytics from "@/pages/admin/Analytics";
import Customize from "@/pages/admin/Customize";
import Settings from "@/pages/admin/Settings";
import NotFound from "@/pages/not-found";
import { AdminLayout } from "@/components/admin/AdminLayout";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/service" component={Services} />
      <Route path="/services">{() => { window.location.href = '/service'; return null; }}</Route>
      <Route path="/service/:slug">
        {(params) => <ServiceDetail key={params.slug} />}
      </Route>
      <Route path="/contact" component={Contact} />
      <Route path="/verify-employee" component={VerifyEmployee} />
      
      {/* Admin Routes - wrapped with AdminLayout */}
      <Route path="/admin">
        {() => <AdminLayout><NewDashboard /></AdminLayout>}
      </Route>
      <Route path="/admin/dashboard">
        {() => <AdminLayout><NewDashboard /></AdminLayout>}
      </Route>
      <Route path="/admin/employees">
        {() => <AdminLayout><Employees /></AdminLayout>}
      </Route>
      <Route path="/admin/employees/new">
        {() => <AdminLayout><EmployeeForm /></AdminLayout>}
      </Route>
      <Route path="/admin/employees/:id/edit">
        {() => <AdminLayout><EmployeeForm /></AdminLayout>}
      </Route>
      <Route path="/admin/clients">
        {() => <AdminLayout><Clients /></AdminLayout>}
      </Route>
      <Route path="/admin/clients/new">
        {() => <AdminLayout><ClientForm /></AdminLayout>}
      </Route>
      <Route path="/admin/clients/:id/edit">
        {() => <AdminLayout><ClientForm /></AdminLayout>}
      </Route>
      <Route path="/admin/leads">
        {() => <AdminLayout><Leads /></AdminLayout>}
      </Route>
      <Route path="/admin/leads/new">
        {() => <AdminLayout><LeadForm /></AdminLayout>}
      </Route>
      <Route path="/admin/leads/:id/edit">
        {() => <AdminLayout><LeadForm /></AdminLayout>}
      </Route>
      <Route path="/admin/projects">
        {() => <AdminLayout><Projects /></AdminLayout>}
      </Route>
      <Route path="/admin/projects/new">
        {() => <AdminLayout><ProjectForm /></AdminLayout>}
      </Route>
      <Route path="/admin/projects/:id/edit">
        {() => <AdminLayout><ProjectForm /></AdminLayout>}
      </Route>
      <Route path="/admin/invoices">
        {() => <AdminLayout><Invoices /></AdminLayout>}
      </Route>
      <Route path="/admin/invoices/new">
        {() => <AdminLayout><InvoiceForm /></AdminLayout>}
      </Route>
      <Route path="/admin/invoices/:id/edit">
        {() => <AdminLayout><InvoiceForm /></AdminLayout>}
      </Route>
      <Route path="/admin/contacts">
        {() => <AdminLayout><Contacts /></AdminLayout>}
      </Route>
      <Route path="/admin/testimonials">
        {() => <AdminLayout><Testimonials /></AdminLayout>}
      </Route>
      <Route path="/admin/testimonials/new">
        {() => <AdminLayout><TestimonialForm /></AdminLayout>}
      </Route>
      <Route path="/admin/testimonials/:id/edit">
        {() => <AdminLayout><TestimonialForm /></AdminLayout>}
      </Route>
      <Route path="/admin/team-members">
        {() => <AdminLayout><TeamMembers /></AdminLayout>}
      </Route>
      <Route path="/admin/team-members/new">
        {() => <AdminLayout><TeamMemberForm /></AdminLayout>}
      </Route>
      <Route path="/admin/team-members/:id/edit">
        {() => <AdminLayout><TeamMemberForm /></AdminLayout>}
      </Route>
      <Route path="/admin/analytics">
        {() => <AdminLayout><Analytics /></AdminLayout>}
      </Route>
      <Route path="/admin/customize">
        {() => <AdminLayout><Customize /></AdminLayout>}
      </Route>
      <Route path="/admin/settings">
        {() => <AdminLayout><Settings /></AdminLayout>}
      </Route>
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isAdminRoute ? (
          <>
            {/* Admin routes - no navbar/footer */}
            <Router />
          </>
        ) : (
          <>
            {/* Public routes - with navbar/footer */}
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1 pb-24 lg:pb-0">
                <Router />
              </div>
              <Footer />
            </div>
            <WhatsAppButton />
          </>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
