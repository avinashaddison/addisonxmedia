import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ObjectStorageService } from "./objectStorage";
import { insertEmployeeSchema, updateEmployeeSchema, insertContactSubmissionSchema, insertTestimonialSchema, updateTestimonialSchema } from "@shared/schema";
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

      res.json(employee);
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

  const httpServer = createServer(app);
  return httpServer;
}
