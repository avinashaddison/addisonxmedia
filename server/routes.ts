import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ObjectStorageService } from "./objectStorage";
import { insertEmployeeSchema, updateEmployeeSchema } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}
