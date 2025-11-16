import {
  users,
  employees,
  contactSubmissions,
  testimonials,
  type User,
  type UpsertUser,
  type Employee,
  type InsertEmployee,
  type UpdateEmployee,
  type ContactSubmission,
  type InsertContactSubmission,
  type Testimonial,
  type InsertTestimonial,
  type UpdateTestimonial,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Employee operations
  getAllEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployeeByEmployeeId(employeeId: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: UpdateEmployee): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<void>;

  // Contact submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined>;

  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: UpdateTestimonial): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Employee operations
  async getAllEmployees(): Promise<Employee[]> {
    return db.select().from(employees).orderBy(employees.createdAt);
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee;
  }

  async getEmployeeByEmployeeId(employeeId: string): Promise<Employee | undefined> {
    const [employee] = await db.select().from(employees).where(eq(employees.employeeId, employeeId));
    return employee;
  }

  async createEmployee(employeeData: InsertEmployee): Promise<Employee> {
    const [employee] = await db
      .insert(employees)
      .values(employeeData)
      .returning();
    return employee;
  }

  async updateEmployee(id: string, employeeData: UpdateEmployee): Promise<Employee | undefined> {
    const [employee] = await db
      .update(employees)
      .set({
        ...employeeData,
        updatedAt: new Date(),
      })
      .where(eq(employees.id, id))
      .returning();
    return employee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }

  // Contact submission operations
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(submissionData)
      .returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined> {
    const [submission] = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission;
  }

  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(testimonials.createdAt);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isActive, "true")).orderBy(testimonials.createdAt);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(testimonialData)
      .returning();
    return testimonial;
  }

  async updateTestimonial(id: string, testimonialData: UpdateTestimonial): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set({
        ...testimonialData,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
}

export const storage = new DatabaseStorage();
