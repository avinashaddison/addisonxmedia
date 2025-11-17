import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for admin authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("admin"), // admin, manager, editor, hr
  isActive: varchar("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Employee storage table
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().unique(),
  fullName: varchar("full_name").notNull(),
  mobile: varchar("mobile").notNull(),
  address: text("address").notNull(),
  position: varchar("position").notNull(),
  photoUrl: varchar("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateEmployeeSchema = insertEmployeeSchema.partial();

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("new"), // new, contacted, closed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientName: varchar("client_name").notNull(),
  clientPosition: varchar("client_position"),
  companyName: varchar("company_name"),
  testimonialText: text("testimonial_text").notNull(),
  rating: varchar("rating").notNull().default("5"),
  photoUrl: varchar("photo_url"),
  isActive: varchar("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  isActive: z.enum(["true", "false"]).default("true"),
  rating: z.enum(["3", "4", "5"]).default("5"),
});

export const updateTestimonialSchema = insertTestimonialSchema.partial();

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type UpdateTestimonial = z.infer<typeof updateTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Verification logs table for analytics
export const verificationLogs = pgTable("verification_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  found: varchar("found").notNull().default("false"),
  searchDate: timestamp("search_date").defaultNow(),
}, (table) => [
  index("IDX_verification_employee_id").on(table.employeeId),
  index("IDX_verification_search_date").on(table.searchDate),
]);

export const insertVerificationLogSchema = createInsertSchema(verificationLogs).omit({
  id: true,
  searchDate: true,
});

export type InsertVerificationLog = z.infer<typeof insertVerificationLogSchema>;
export type VerificationLog = typeof verificationLogs.$inferSelect;

// Clients table
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  address: text("address"),
  status: varchar("status").notNull().default("active"), // active, inactive, pending
  assignedTo: varchar("assigned_to"), // employee ID
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateClientSchema = insertClientSchema.partial();

export type InsertClient = z.infer<typeof insertClientSchema>;
export type UpdateClient = z.infer<typeof updateClientSchema>;
export type Client = typeof clients.$inferSelect;

// Leads table
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  source: varchar("source").notNull().default("website"), // website, referral, social, ad
  status: varchar("status").notNull().default("new"), // new, contacted, qualified, converted, lost
  assignedTo: varchar("assigned_to"), // employee ID
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLeadSchema = insertLeadSchema.partial();

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type UpdateLead = z.infer<typeof updateLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  clientId: varchar("client_id"),
  description: text("description"),
  status: varchar("status").notNull().default("planning"), // planning, in-progress, review, completed, cancelled
  priority: varchar("priority").notNull().default("medium"), // low, medium, high
  assignedTo: varchar("assigned_to"), // employee ID
  startDate: timestamp("start_date"),
  deadline: timestamp("deadline"),
  budget: varchar("budget"),
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, partial, paid
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = insertProjectSchema.partial();

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Invoices table
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: varchar("invoice_number").notNull().unique(),
  clientId: varchar("client_id"),
  projectId: varchar("project_id"),
  amount: varchar("amount").notNull(),
  tax: varchar("tax").notNull().default("0"),
  total: varchar("total").notNull(),
  status: varchar("status").notNull().default("pending"), // pending, paid, overdue, cancelled
  dueDate: timestamp("due_date"),
  paidDate: timestamp("paid_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInvoiceSchema = insertInvoiceSchema.partial();

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type UpdateInvoice = z.infer<typeof updateInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// Settings table
export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").notNull().unique(),
  value: text("value"),
  category: varchar("category").notNull().default("general"), // general, company, email, payment, api
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export const updateSettingSchema = insertSettingSchema.partial();

export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type UpdateSetting = z.infer<typeof updateSettingSchema>;
export type Setting = typeof settings.$inferSelect;

// Homepage Customization table
export const homepageCustomization = pgTable("homepage_customization", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section").notNull().unique(), // hero, services, banners, slider
  content: jsonb("content").notNull(), // Store all section data as JSON
  isActive: varchar("is_active").notNull().default("true"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHomepageCustomizationSchema = createInsertSchema(homepageCustomization).omit({
  id: true,
  updatedAt: true,
});

export const updateHomepageCustomizationSchema = insertHomepageCustomizationSchema.partial();

export type InsertHomepageCustomization = z.infer<typeof insertHomepageCustomizationSchema>;
export type UpdateHomepageCustomization = z.infer<typeof updateHomepageCustomizationSchema>;
export type HomepageCustomization = typeof homepageCustomization.$inferSelect;

// SEO Settings table
export const seoSettings = pgTable("seo_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  page: varchar("page").notNull().unique(), // home, about, services, contact, etc.
  metaTitle: varchar("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  metaKeywords: text("meta_keywords"),
  ogTitle: varchar("og_title"),
  ogDescription: text("og_description"),
  ogImage: varchar("og_image"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSeoSettingSchema = createInsertSchema(seoSettings).omit({
  id: true,
  updatedAt: true,
});

export const updateSeoSettingSchema = insertSeoSettingSchema.partial();

export type InsertSeoSetting = z.infer<typeof insertSeoSettingSchema>;
export type UpdateSeoSetting = z.infer<typeof updateSeoSettingSchema>;
export type SeoSetting = typeof seoSettings.$inferSelect;
