import { Switch, Route } from "wouter";
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
import Dashboard from "@/pages/admin/Dashboard";
import EmployeeForm from "@/pages/admin/EmployeeForm";
import Testimonials from "@/pages/admin/Testimonials";
import TestimonialForm from "@/pages/admin/TestimonialForm";
import Analytics from "@/pages/admin/Analytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/verify-employee" component={VerifyEmployee} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/employees/new" component={EmployeeForm} />
      <Route path="/admin/employees/:id/edit" component={EmployeeForm} />
      <Route path="/admin/testimonials" component={Testimonials} />
      <Route path="/admin/testimonials/new" component={TestimonialForm} />
      <Route path="/admin/testimonials/:id/edit" component={TestimonialForm} />
      <Route path="/admin/analytics" component={Analytics} />
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Route path="/admin">
            {() => null}
          </Route>
          <Route path="/admin/:rest*">
            {() => null}
          </Route>
          <Route>
            {(params) => !params.path?.startsWith('/admin') && <Navbar />}
          </Route>
          
          <div className="flex-1 pb-20 lg:pb-0">
            <Router />
          </div>
          
          <Route>
            {(params) => !params.path?.startsWith('/admin') && <Footer />}
          </Route>
        </div>
        
        {/* WhatsApp Floating Button - Only on public pages */}
        <Route>
          {(params) => !params.path?.startsWith('/admin') && <WhatsAppButton />}
        </Route>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
