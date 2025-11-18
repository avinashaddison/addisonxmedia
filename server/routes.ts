import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ObjectStorageService, parseObjectPath, signObjectURL } from "./objectStorage";
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
  insertTeamMemberSchema,
  updateTeamMemberSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

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

  app.post("/api/seo", isAuthenticated, async (req, res) => {
    try {
      const parseResult = insertSeoSettingSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data", errors: parseResult.error.errors });
      }

      const seoSetting = await storage.upsertSeoSetting(parseResult.data);
      res.status(201).json(seoSetting);
    } catch (error) {
      console.error("Error upserting SEO setting:", error);
      res.status(500).json({ message: "Failed to upsert SEO setting" });
    }
  });

  app.delete("/api/seo/:page", isAuthenticated, async (req, res) => {
    try {
      const { page } = req.params;
      await storage.deleteSeoSetting(page);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting SEO setting:", error);
      res.status(500).json({ message: "Failed to delete SEO setting" });
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
  return httpServer;
}
