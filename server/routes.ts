import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ObjectStorageService, parseObjectPath, signObjectURL } from "./objectStorage";
import { setupWebSocket, broadcastToAdmins } from "./websocket";
import { 
  insertEmployeeSchema, 
  updateEmployeeSchema, 
  insertContactSubmissionSchema, 
  insertTestimonialSchema, 
  updateTestimonialSchema,
  insertClientSchema,
  updateClientSchema,
  insertLeadSchema,
  updateLeadSchema,
  insertProjectSchema,
  updateProjectSchema,
  insertInvoiceSchema,
  updateInvoiceSchema,
  insertSettingSchema,
  insertHomepageCustomizationSchema,
  updateHomepageCustomizationSchema,
  insertSeoSettingSchema,
  updateSeoSettingSchema,
  insertSeoRedirectSchema,
  updateSeoRedirectSchema,
  insertGlobalSeoSettingSchema,
  updateGlobalSeoSettingSchema,
  insertServiceBannerSchema,
  updateServiceBannerSchema,
  insertTeamMemberSchema,
  updateTeamMemberSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Sitemap.xml route (public)
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const now = new Date().toISOString();
      
      // Define all public pages with their priorities and change frequencies
      const pages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/service', priority: '0.9', changefreq: 'weekly' },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' },
        { url: '/verify-employee', priority: '0.7', changefreq: 'yearly' },
        // Service detail pages
        { url: '/service/web-development', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/ecommerce-development', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/brand-promotion', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/local-seo', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/ads-management', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/graphic-designing', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/whatsapp-marketing', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/social-media-marketing', priority: '0.9', changefreq: 'weekly' },
        { url: '/service/custom-development', priority: '0.9', changefreq: 'weekly' },
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // robots.txt route (public)
  app.get('/robots.txt', async (req, res) => {
    try {
      const robotsSetting = await storage.getGlobalSeoSetting('robots_txt');
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      const robotsTxt = robotsSetting?.value || `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

      res.header('Content-Type', 'text/plain');
      res.send(robotsTxt);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      // Fallback robots.txt
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      res.header('Content-Type', 'text/plain');
      res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
    }
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Helper function to convert employee photo URLs
  const convertEmployeePhotoUrl = (photoUrl: string | null): string | null => {
    if (!photoUrl) return null;
    
    // Extract filename from the path
    const parts = photoUrl.split('/');
    const filename = parts[parts.length - 1];
    
    // Return the API endpoint URL
    return `/api/employee-photo/${filename}`;
  };

  // Employee verification route (public)
  app.get("/api/employees/verify/:employeeId", async (req, res) => {
    try {
      const { employeeId } = req.params;
      const employee = await storage.getEmployeeByEmployeeId(employeeId);
      
      // Log the verification attempt for analytics
      await storage.logVerification({
        employeeId,
        found: employee ? "true" : "false",
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Convert photo URL to API endpoint
      res.json({
        ...employee,
        photoUrl: convertEmployeePhotoUrl(employee.photoUrl)
      });
    } catch (error) {
      console.error("Error verifying employee:", error);
      res.status(500).json({ message: "Failed to verify employee" });
    }
  });

  // Protected employee routes (admin only)
  app.get("/api/employees", isAuthenticated, async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.get("/api/employees/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await storage.getEmployee(id);
      
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json(employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  app.post("/api/employees/upload-photo", isAuthenticated, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  app.post("/api/employees", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertEmployeeSchema.parse(req.body);
      
      // Check if employee ID already exists
      const existing = await storage.getEmployeeByEmployeeId(validatedData.employeeId);
      if (existing) {
        return res.status(400).json({ message: "Employee ID already exists" });
      }

      const objectStorageService = new ObjectStorageService();
      const photoUrl = validatedData.photoUrl
        ? objectStorageService.normalizeObjectPath(validatedData.photoUrl)
        : undefined;

      const employee = await storage.createEmployee({
        ...validatedData,
        photoUrl,
      });
      
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  app.put("/api/employees/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateEmployeeSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const validatedData = parseResult.data;
      
      // If updating employee ID, check if it's already in use by another employee
      if (validatedData.employeeId) {
        const existing = await storage.getEmployeeByEmployeeId(validatedData.employeeId);
        if (existing && existing.id !== id) {
          return res.status(400).json({ message: "Employee ID already exists" });
        }
      }

      const objectStorageService = new ObjectStorageService();
      const photoUrl = validatedData.photoUrl
        ? objectStorageService.normalizeObjectPath(validatedData.photoUrl)
        : undefined;

      const employee = await storage.updateEmployee(id, {
        ...validatedData,
        photoUrl,
      });
      
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json(employee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  app.delete("/api/employees/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEmployee(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Failed to delete employee" });
    }
  });

  // Contact submission routes
  app.post("/api/contact", async (req, res) => {
    try {
      const parseResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const submission = await storage.createContactSubmission(parseResult.data);
      
      // Broadcast new contact submission to all connected admin clients
      broadcastToAdmins('new_contact_submission', {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        message: submission.message,
        createdAt: submission.createdAt
      });
      
      // Email notification setup:
      // To enable email notifications, integrate an email service (e.g., Resend, SendGrid, Mailgun)
      // 1. Install email provider SDK
      // 2. Add API key to environment variables
      // 3. Send notification email here after successful submission
      // Example: await sendEmail({ to: 'info@addisonxmedia.com', subject: `New Contact: ${submission.name}`, ... })
      
      res.status(201).json({ 
        message: "Thank you for contacting us! We'll get back to you soon.",
        submission 
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get("/api/contact", isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.patch("/api/contact/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !["new", "contacted", "closed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const submission = await storage.updateContactSubmissionStatus(id, status);
      
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      res.json(submission);
    } catch (error) {
      console.error("Error updating submission status:", error);
      res.status(500).json({ message: "Failed to update submission status" });
    }
  });

  app.get("/api/contact/unread-count", isAuthenticated, async (req, res) => {
    try {
      const count = await storage.getUnreadContactCount();
      res.json({ count });
    } catch (error) {
      console.error("Error getting unread count:", error);
      res.status(500).json({ message: "Failed to get unread count" });
    }
  });

  app.patch("/api/contact/:id/mark-read", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await storage.markContactSubmissionAsRead(id);
      
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      res.json(submission);
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to mark submission as read" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials/active", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching active testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials", isAuthenticated, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.getTestimonial(id);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });

  app.post("/api/testimonials/upload-photo", isAuthenticated, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  app.post("/api/testimonials", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertTestimonialSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const objectStorageService = new ObjectStorageService();
      const photoUrl = parseResult.data.photoUrl
        ? objectStorageService.normalizeObjectPath(parseResult.data.photoUrl)
        : undefined;

      const testimonial = await storage.createTestimonial({
        ...parseResult.data,
        photoUrl,
      });
      
      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateTestimonialSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const objectStorageService = new ObjectStorageService();
      const photoUrl = parseResult.data.photoUrl
        ? objectStorageService.normalizeObjectPath(parseResult.data.photoUrl)
        : undefined;

      const testimonial = await storage.updateTestimonial(id, {
        ...parseResult.data,
        photoUrl,
      });
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Analytics routes (admin only)
  app.get("/api/analytics/verification-stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getVerificationStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching verification stats:", error);
      res.status(500).json({ message: "Failed to fetch verification stats" });
    }
  });

  // Client routes (admin only)
  app.get("/api/clients", isAuthenticated, async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const client = await storage.getClient(id);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertClientSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const client = await storage.createClient(parseResult.data);
      res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ message: "Failed to create client" });
    }
  });

  app.put("/api/clients/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateClientSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const client = await storage.updateClient(id, parseResult.data);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  app.delete("/api/clients/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteClient(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Lead routes (admin only)
  app.get("/api/leads", isAuthenticated, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const lead = await storage.getLead(id);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertLeadSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const lead = await storage.createLead(parseResult.data);
      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  app.put("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateLeadSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const lead = await storage.updateLead(id, parseResult.data);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.json(lead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteLead(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  // Project routes (admin only)
  app.get("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertProjectSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const project = await storage.createProject(parseResult.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateProjectSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const project = await storage.updateProject(id, parseResult.data);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Invoice routes (admin only)
  app.get("/api/invoices", isAuthenticated, async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.get("/api/invoices/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      res.json(invoice);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });

  app.post("/api/invoices", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertInvoiceSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const invoice = await storage.createInvoice(parseResult.data);
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.put("/api/invoices/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateInvoiceSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const invoice = await storage.updateInvoice(id, parseResult.data);
      
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });

  app.delete("/api/invoices/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteInvoice(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Failed to delete invoice" });
    }
  });

  // Settings routes (admin only)
  app.get("/api/settings", isAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertSettingSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const setting = await storage.upsertSetting(parseResult.data);
      res.status(201).json(setting);
    } catch (error) {
      console.error("Error upserting setting:", error);
      res.status(500).json({ message: "Failed to upsert setting" });
    }
  });

  app.delete("/api/settings/:key", isAuthenticated, async (req, res) => {
    try {
      const { key } = req.params;
      await storage.deleteSetting(key);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting setting:", error);
      res.status(500).json({ message: "Failed to delete setting" });
    }
  });

  // Homepage Customization routes (admin only)
  app.get("/api/customization", isAuthenticated, async (req, res) => {
    try {
      const customizations = await storage.getAllHomepageCustomizations();
      res.json(customizations);
    } catch (error) {
      console.error("Error fetching customizations:", error);
      res.status(500).json({ message: "Failed to fetch customizations" });
    }
  });

  app.get("/api/customization/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const customization = await storage.getHomepageCustomization(section);
      
      if (!customization) {
        return res.status(404).json({ message: "Customization not found" });
      }

      res.json(customization);
    } catch (error) {
      console.error("Error fetching customization:", error);
      res.status(500).json({ message: "Failed to fetch customization" });
    }
  });

  app.post("/api/customization", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertHomepageCustomizationSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const customization = await storage.upsertHomepageCustomization(parseResult.data);
      res.status(201).json(customization);
    } catch (error) {
      console.error("Error upserting customization:", error);
      res.status(500).json({ message: "Failed to upsert customization" });
    }
  });

  app.delete("/api/customization/:section", isAuthenticated, async (req, res) => {
    try {
      const { section } = req.params;
      await storage.deleteHomepageCustomization(section);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting customization:", error);
      res.status(500).json({ message: "Failed to delete customization" });
    }
  });

  // Hero Banner Upload endpoint with validation
  app.post("/api/customization/upload-banner", isAuthenticated, async (req, res) => {
    try {
      const { contentType, fileSize } = req.body;

      // Validate MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!contentType || !allowedMimeTypes.includes(contentType.toLowerCase())) {
        return res.status(400).json({ 
          message: "Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed." 
        });
      }

      // Validate file size (max 5MB)
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (!fileSize || fileSize > maxFileSize) {
        return res.status(400).json({ 
          message: "File size exceeds maximum limit of 5MB." 
        });
      }

      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getHeroBannerUploadURL();
      const normalizedPath = objectStorageService.normalizeObjectPath(uploadURL);
      res.json({ uploadURL, normalizedPath });
    } catch (error) {
      console.error("Error getting upload URL for hero banner:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  // SEO Settings routes (admin only)
  app.get("/api/seo", isAuthenticated, async (req, res) => {
    try {
      const seoSettings = await storage.getAllSeoSettings();
      res.json(seoSettings);
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
      res.status(500).json({ message: "Failed to fetch SEO settings" });
    }
  });

  app.get("/api/seo/:page", async (req, res) => {
    try {
      const { page } = req.params;
      const seoSetting = await storage.getSeoSetting(page);
      
      if (!seoSetting) {
        return res.status(404).json({ message: "SEO setting not found" });
      }

      res.json(seoSetting);
    } catch (error) {
      console.error("Error fetching SEO setting:", error);
      res.status(500).json({ message: "Failed to fetch SEO setting" });
    }
  });

  app.post("/api/seo", isAuthenticated, async (req: any, res) => {
    try {
      const parseResult = insertSeoSettingSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      // Get the current user ID for history tracking
      const userId = req.user?.claims?.sub || 'system';

      // Get existing SEO setting to check if it's an update
      const existingSetting = await storage.getSeoSetting(parseResult.data.page);

      // Upsert the SEO setting
      const seoSetting = await storage.upsertSeoSetting(parseResult.data);

      // Create history entry for versioning
      if (seoSetting) {
        await storage.createSeoHistory({
          seoSettingId: seoSetting.id,
          page: seoSetting.page,
          changes: seoSetting as any, // Store complete snapshot
          changedBy: userId,
        });
      }

      res.status(201).json(seoSetting);
    } catch (error) {
      console.error("Error upserting SEO setting:", error);
      res.status(500).json({ message: "Failed to upsert SEO setting" });
    }
  });

  app.delete("/api/seo/:page", isAuthenticated, async (req, res) => {
    try {
      const { page} = req.params;
      await storage.deleteSeoSetting(page);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting SEO setting:", error);
      res.status(500).json({ message: "Failed to delete SEO setting" });
    }
  });

  // Favicon routes
  app.get("/api/favicon", async (req, res) => {
    try {
      const faviconSetting = await storage.getGlobalSeoSetting('site_favicon');
      res.json({ faviconUrl: faviconSetting?.value || null });
    } catch (error) {
      console.error("Error fetching favicon:", error);
      res.status(500).json({ message: "Failed to fetch favicon" });
    }
  });

  app.post("/api/favicon", isAuthenticated, async (req: any, res) => {
    try {
      const { faviconUrl } = req.body;
      
      if (!faviconUrl) {
        return res.status(400).json({ message: "Favicon URL is required" });
      }

      // Upsert the favicon setting
      const faviconSetting = await storage.upsertGlobalSeoSetting({
        key: 'site_favicon',
        value: faviconUrl,
        isActive: true,
      });

      res.json({ faviconUrl: faviconSetting.value });
    } catch (error) {
      console.error("Error updating favicon:", error);
      res.status(500).json({ message: "Failed to update favicon" });
    }
  });

  // Get upload URL for favicon
  app.post("/api/favicon/upload-url", isAuthenticated, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting favicon upload URL:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  // Serve favicon.ico
  app.get("/favicon.ico", async (req, res) => {
    try {
      const faviconSetting = await storage.getGlobalSeoSetting('site_favicon');
      
      if (faviconSetting?.value) {
        // Redirect to the actual favicon URL
        res.redirect(302, faviconSetting.value);
      } else {
        // No favicon set, return 404
        res.status(404).send();
      }
    } catch (error) {
      console.error("Error serving favicon:", error);
      res.status(404).send();
    }
  });

  // SEO Redirects routes
  app.get("/api/seo-redirects", isAuthenticated, async (req, res) => {
    try {
      const redirects = await storage.getAllSeoRedirects();
      res.json(redirects);
    } catch (error) {
      console.error("Error fetching SEO redirects:", error);
      res.status(500).json({ message: "Failed to fetch SEO redirects" });
    }
  });

  app.get("/api/seo-redirects/active", async (req, res) => {
    try {
      const redirects = await storage.getActiveSeoRedirects();
      res.json(redirects);
    } catch (error) {
      console.error("Error fetching active SEO redirects:", error);
      res.status(500).json({ message: "Failed to fetch active SEO redirects" });
    }
  });

  app.get("/api/seo-redirects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const redirect = await storage.getSeoRedirect(id);
      
      if (!redirect) {
        return res.status(404).json({ message: "SEO redirect not found" });
      }

      res.json(redirect);
    } catch (error) {
      console.error("Error fetching SEO redirect:", error);
      res.status(500).json({ message: "Failed to fetch SEO redirect" });
    }
  });

  app.post("/api/seo-redirects", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertSeoRedirectSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const redirect = await storage.createSeoRedirect(parseResult.data);
      res.status(201).json(redirect);
    } catch (error) {
      console.error("Error creating SEO redirect:", error);
      res.status(500).json({ message: "Failed to create SEO redirect" });
    }
  });

  app.patch("/api/seo-redirects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const parseResult = updateSeoRedirectSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const redirect = await storage.updateSeoRedirect(id, parseResult.data);
      
      if (!redirect) {
        return res.status(404).json({ message: "SEO redirect not found" });
      }

      res.json(redirect);
    } catch (error) {
      console.error("Error updating SEO redirect:", error);
      res.status(500).json({ message: "Failed to update SEO redirect" });
    }
  });

  app.delete("/api/seo-redirects/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSeoRedirect(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting SEO redirect:", error);
      res.status(500).json({ message: "Failed to delete SEO redirect" });
    }
  });

  // SEO History routes
  app.get("/api/seo-history", isAuthenticated, async (req, res) => {
    try {
      const history = await storage.getAllSeoHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching SEO history:", error);
      res.status(500).json({ message: "Failed to fetch SEO history" });
    }
  });

  app.get("/api/seo-history/:page", isAuthenticated, async (req, res) => {
    try {
      const { page } = req.params;
      const history = await storage.getSeoHistoryByPage(page);
      res.json(history);
    } catch (error) {
      console.error("Error fetching SEO history for page:", error);
      res.status(500).json({ message: "Failed to fetch SEO history" });
    }
  });

  // Global SEO Settings routes (robots.txt, sitemap config, meta templates)
  app.get("/api/global-seo", isAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getAllGlobalSeoSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching global SEO settings:", error);
      res.status(500).json({ message: "Failed to fetch global SEO settings" });
    }
  });

  app.get("/api/global-seo/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const setting = await storage.getGlobalSeoSetting(key);
      
      if (!setting) {
        return res.status(404).json({ message: "Global SEO setting not found" });
      }

      res.json(setting);
    } catch (error) {
      console.error("Error fetching global SEO setting:", error);
      res.status(500).json({ message: "Failed to fetch global SEO setting" });
    }
  });

  app.post("/api/global-seo", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertGlobalSeoSettingSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const setting = await storage.upsertGlobalSeoSetting(parseResult.data);
      res.status(201).json(setting);
    } catch (error) {
      console.error("Error upserting global SEO setting:", error);
      res.status(500).json({ message: "Failed to upsert global SEO setting" });
    }
  });

  app.delete("/api/global-seo/:key", isAuthenticated, async (req, res) => {
    try {
      const { key } = req.params;
      await storage.deleteGlobalSeoSetting(key);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting global SEO setting:", error);
      res.status(500).json({ message: "Failed to delete global SEO setting" });
    }
  });

  // Sitemap.xml generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const seoSettings = await storage.getAllSeoSettings();
      const publishedPages = seoSettings.filter(s => s.isPublished && !s.isDraft);
      
      const baseUrl = process.env.REPL_URL || "https://your-domain.com";
      
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      publishedPages.forEach(page => {
        const url = page.customSlug || `/${page.page}`;
        sitemap += '  <url>\n';
        sitemap += `    <loc>${baseUrl}${url}</loc>\n`;
        sitemap += `    <lastmod>${new Date(page.updatedAt!).toISOString().split('T')[0]}</lastmod>\n`;
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.8</priority>\n';
        sitemap += '  </url>\n';
      });
      
      sitemap += '</urlset>';
      
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // robots.txt serving
  app.get("/robots.txt", async (req, res) => {
    try {
      const robotsSetting = await storage.getGlobalSeoSetting('robots_txt');
      
      if (robotsSetting && robotsSetting.isActive) {
        res.header('Content-Type', 'text/plain');
        res.send(robotsSetting.value);
      } else {
        // Default robots.txt
        const baseUrl = process.env.REPL_URL || "https://your-domain.com";
        const defaultRobots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
        res.header('Content-Type', 'text/plain');
        res.send(defaultRobots);
      }
    } catch (error) {
      console.error("Error serving robots.txt:", error);
      res.status(500).send('Error serving robots.txt');
    }
  });

  // Service Banner routes
  app.get("/api/service-banners", async (req, res) => {
    try {
      const banners = await storage.getAllServiceBanners();
      res.json(banners);
    } catch (error) {
      console.error("Error fetching service banners:", error);
      res.status(500).json({ message: "Failed to fetch service banners" });
    }
  });

  app.get("/api/service-banners/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const banner = await storage.getServiceBanner(slug);
      
      if (!banner) {
        return res.status(404).json({ message: "Service banner not found" });
      }

      res.json(banner);
    } catch (error) {
      console.error("Error fetching service banner:", error);
      res.status(500).json({ message: "Failed to fetch service banner" });
    }
  });

  app.post("/api/service-banners", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertServiceBannerSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const banner = await storage.upsertServiceBanner(parseResult.data);
      res.status(201).json(banner);
    } catch (error) {
      console.error("Error upserting service banner:", error);
      res.status(500).json({ message: "Failed to upsert service banner" });
    }
  });

  app.delete("/api/service-banners/:slug", isAuthenticated, async (req, res) => {
    try {
      const { slug } = req.params;
      await storage.deleteServiceBanner(slug);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service banner:", error);
      res.status(500).json({ message: "Failed to delete service banner" });
    }
  });

  app.post("/api/service-banners/upload", isAuthenticated, async (req, res) => {
    try {
      const { contentType, fileSize } = req.body;

      // Validate MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!contentType || !allowedMimeTypes.includes(contentType.toLowerCase())) {
        return res.status(400).json({ 
          message: "Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed." 
        });
      }

      // Validate file size (max 5MB)
      const maxFileSize = 5 * 1024 * 1024;
      if (!fileSize || fileSize > maxFileSize) {
        return res.status(400).json({ 
          message: "File size exceeds maximum limit of 5MB." 
        });
      }

      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getServiceBannerUploadURL();
      const normalizedPath = objectStorageService.normalizeObjectPath(uploadURL);
      res.json({ uploadURL, normalizedPath });
    } catch (error) {
      console.error("Error getting upload URL for service banner:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  // Employee photo serving route
  app.get("/api/employee-photo/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const objectStorageService = new ObjectStorageService();
      const publicDir = objectStorageService.getPublicObjectDir();
      
      if (!publicDir) {
        return res.status(500).json({ message: "Object storage not configured" });
      }

      const fullPath = `${publicDir}/team-photos/${filename}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);

      const signedUrl = await signObjectURL({
        bucketName,
        objectName,
        method: "GET",
        ttlSec: 3600,
      });

      res.redirect(signedUrl);
    } catch (error) {
      console.error("Error serving employee photo:", error);
      res.status(500).json({ message: "Failed to serve photo" });
    }
  });

  // Team member photo serving route
  app.get("/api/team-member-photo/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const objectStorageService = new ObjectStorageService();
      const publicDir = objectStorageService.getPublicObjectDir();
      
      if (!publicDir) {
        return res.status(500).json({ message: "Object storage not configured" });
      }

      const fullPath = `${publicDir}/team-photos/${filename}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);

      const signedUrl = await signObjectURL({
        bucketName,
        objectName,
        method: "GET",
        ttlSec: 3600,
      });

      res.redirect(signedUrl);
    } catch (error) {
      console.error("Error serving team member photo:", error);
      res.status(500).json({ message: "Failed to serve photo" });
    }
  });

  // Hero banner serving route
  app.get("/api/hero-banner", async (req, res) => {
    try {
      const { path } = req.query;
      
      if (!path || typeof path !== 'string') {
        return res.status(400).json({ message: "Path parameter is required" });
      }

      // Decode the URL-encoded path
      const decodedPath = decodeURIComponent(path);

      // Parse the full object storage path
      const { bucketName, objectName } = parseObjectPath(decodedPath);

      // Security: Validate that the object belongs to the homepage-banners directory
      // Note: objectName doesn't have leading slash, e.g. "public/homepage-banners/uuid"
      if (!objectName.includes('public/homepage-banners/')) {
        console.warn(`Rejected unauthorized hero banner access attempt: ${objectName}`);
        return res.status(403).json({ message: "Access denied: Invalid banner path" });
      }

      const signedUrl = await signObjectURL({
        bucketName,
        objectName,
        method: "GET",
        ttlSec: 3600,
      });

      res.redirect(signedUrl);
    } catch (error) {
      console.error("Error serving hero banner:", error);
      res.status(500).json({ message: "Failed to serve hero banner" });
    }
  });

  // Service banner serving route
  app.get("/api/service-banner", async (req, res) => {
    try {
      const { path } = req.query;
      
      if (!path || typeof path !== 'string') {
        return res.status(400).json({ message: "Path parameter is required" });
      }

      // Decode the URL-encoded path
      const decodedPath = decodeURIComponent(path);

      // Parse the full object storage path
      const { bucketName, objectName } = parseObjectPath(decodedPath);

      // Security: Validate that the object belongs to the service-banners directory
      if (!objectName.includes('public/service-banners/')) {
        console.warn(`Rejected unauthorized service banner access attempt: ${objectName}`);
        return res.status(403).json({ message: "Access denied: Invalid banner path" });
      }

      const signedUrl = await signObjectURL({
        bucketName,
        objectName,
        method: "GET",
        ttlSec: 3600,
      });

      res.redirect(signedUrl);
    } catch (error) {
      console.error("Error serving service banner:", error);
      res.status(500).json({ message: "Failed to serve service banner" });
    }
  });

  // Helper function to convert photo URLs
  const convertPhotoUrl = (photoUrl: string | null): string | null => {
    if (!photoUrl) return null;
    
    // Extract filename from the path
    const parts = photoUrl.split('/');
    const filename = parts[parts.length - 1];
    
    // Return the API endpoint URL
    return `/api/team-member-photo/${filename}`;
  };

  // Team Members routes
  app.get("/api/team-members/active", async (req, res) => {
    try {
      const teamMembers = await storage.getActiveTeamMembers();
      const teamMembersWithUrls = teamMembers.map(member => ({
        ...member,
        photoUrl: convertPhotoUrl(member.photoUrl)
      }));
      res.json(teamMembersWithUrls);
    } catch (error) {
      console.error("Error fetching active team members:", error);
      res.status(500).json({ message: "Failed to fetch active team members" });
    }
  });

  app.get("/api/team-members", isAuthenticated, async (req, res) => {
    try {
      const teamMembers = await storage.getAllTeamMembers();
      const teamMembersWithUrls = teamMembers.map(member => ({
        ...member,
        photoUrl: convertPhotoUrl(member.photoUrl)
      }));
      res.json(teamMembersWithUrls);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.get("/api/team-members/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const teamMember = await storage.getTeamMember(id);
      
      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }

      res.json({
        ...teamMember,
        photoUrl: convertPhotoUrl(teamMember.photoUrl)
      });
    } catch (error) {
      console.error("Error fetching team member:", error);
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });

  app.post("/api/team-members/upload-photo", isAuthenticated, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  app.post("/api/team-members", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);

      const objectStorageService = new ObjectStorageService();
      const photoUrl = validatedData.photoUrl
        ? objectStorageService.normalizeObjectPath(validatedData.photoUrl)
        : undefined;

      const teamMember = await storage.createTeamMember({
        ...validatedData,
        photoUrl,
      });
      
      res.status(201).json(teamMember);
    } catch (error: any) {
      console.error("Error creating team member:", error);
      if (error.name === 'ZodError') {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create team member" });
      }
    }
  });

  app.patch("/api/team-members/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateTeamMemberSchema.parse(req.body);

      const objectStorageService = new ObjectStorageService();
      const photoUrl = validatedData.photoUrl
        ? objectStorageService.normalizeObjectPath(validatedData.photoUrl)
        : undefined;

      const teamMember = await storage.updateTeamMember(id, {
        ...validatedData,
        ...(photoUrl !== undefined && { photoUrl }),
      });

      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }

      res.json(teamMember);
    } catch (error: any) {
      console.error("Error updating team member:", error);
      if (error.name === 'ZodError') {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update team member" });
      }
    }
  });

  app.delete("/api/team-members/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTeamMember(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  const httpServer = createServer(app);
  
  // Set up WebSocket for real-time notifications
  setupWebSocket(httpServer);
  
  return httpServer;
}
