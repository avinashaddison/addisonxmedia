import { sql } from 'drizzle-orm';
import {
  index,
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  boolean,
  json,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = mysqlTable(
  "sessions",
  {
    sid: varchar("sid", { length: 255 }).primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for admin authentication
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 512 }),
  role: varchar("role", { length: 50 }).notNull().default("admin"), // admin, manager, editor, hr
  isActive: varchar("is_active", { length: 10 }).notNull().default("true"),
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
export const employees = mysqlTable("employees", {
  id: varchar("id", { length: 255 }).primaryKey(),
  employeeId: varchar("employee_id", { length: 100 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  mobile: varchar("mobile", { length: 20 }).notNull(),
  address: text("address").notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  photoUrl: varchar("photo_url", { length: 512 }),
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
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"), // new, contacted, closed
  isRead: boolean("is_read").notNull().default(false),
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
export const testimonials = mysqlTable("testimonials", {
  id: varchar("id", { length: 255 }).primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientPosition: varchar("client_position", { length: 255 }),
  companyName: varchar("company_name", { length: 255 }),
  testimonialText: text("testimonial_text").notNull(),
  rating: varchar("rating", { length: 2 }).notNull().default("5"),
  photoUrl: varchar("photo_url", { length: 512 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  rating: z.enum(["3", "4", "5"]).default("5"),
});

export const updateTestimonialSchema = insertTestimonialSchema.partial();

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type UpdateTestimonial = z.infer<typeof updateTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Verification logs table for analytics
export const verificationLogs = mysqlTable("verification_logs", {
  id: varchar("id", { length: 255 }).primaryKey(),
  employeeId: varchar("employee_id", { length: 100 }).notNull(),
  found: varchar("found", { length: 10 }).notNull().default("false"),
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
export const clients = mysqlTable("clients", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  address: text("address"),
  status: varchar("status", { length: 50 }).notNull().default("active"), // active, inactive, pending
  assignedTo: varchar("assigned_to", { length: 255 }), // employee ID
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
export const leads = mysqlTable("leads", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  source: varchar("source", { length: 50 }).notNull().default("website"), // website, referral, social, ad
  status: varchar("status", { length: 50 }).notNull().default("new"), // new, contacted, qualified, converted, lost
  assignedTo: varchar("assigned_to", { length: 255 }), // employee ID
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
export const projects = mysqlTable("projects", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  clientId: varchar("client_id", { length: 255 }),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("planning"), // planning, in-progress, review, completed, cancelled
  priority: varchar("priority", { length: 50 }).notNull().default("medium"), // low, medium, high
  assignedTo: varchar("assigned_to", { length: 255 }), // employee ID
  startDate: timestamp("start_date"),
  deadline: timestamp("deadline"),
  budget: varchar("budget", { length: 100 }),
  paymentStatus: varchar("payment_status", { length: 50 }).notNull().default("pending"), // pending, partial, paid
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
export const invoices = mysqlTable("invoices", {
  id: varchar("id", { length: 255 }).primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 100 }).notNull().unique(),
  clientId: varchar("client_id", { length: 255 }),
  projectId: varchar("project_id", { length: 255 }),
  amount: varchar("amount", { length: 50 }).notNull(),
  tax: varchar("tax", { length: 50 }).notNull().default("0"),
  total: varchar("total", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, paid, overdue, cancelled
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
export const settings = mysqlTable("settings", {
  id: varchar("id", { length: 255 }).primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  category: varchar("category", { length: 50 }).notNull().default("general"), // general, company, email, payment, api
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
export const homepageCustomization = mysqlTable("homepage_customization", {
  id: varchar("id", { length: 255 }).primaryKey(),
  section: varchar("section", { length: 100 }).notNull().unique(), // hero, services, banners, slider
  content: json("content").notNull(), // Store all section data as JSON
  isActive: varchar("is_active", { length: 10 }).notNull().default("true"),
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
export const seoSettings = mysqlTable("seo_settings", {
  id: varchar("id", { length: 255 }).primaryKey(),
  page: varchar("page", { length: 100 }).notNull().unique(), // home, about, services, contact, etc.
  metaTitle: varchar("meta_title", { length: 255 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  metaKeywords: text("meta_keywords"),
  ogTitle: varchar("og_title", { length: 255 }),
  ogDescription: text("og_description"),
  ogImage: varchar("og_image", { length: 512 }),
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

// Service Banners table for individual service page hero images
export const serviceBanners = mysqlTable("service_banners", {
  id: varchar("id", { length: 255 }).primaryKey(),
  serviceSlug: varchar("service_slug", { length: 100 }).notNull().unique(), // web-development, ecommerce-development, etc.
  bannerUrl: varchar("banner_url", { length: 512 }), // Object storage path for banner image
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertServiceBannerSchema = createInsertSchema(serviceBanners).omit({
  id: true,
  updatedAt: true,
});

export const updateServiceBannerSchema = insertServiceBannerSchema.partial();

export type InsertServiceBanner = z.infer<typeof insertServiceBannerSchema>;
export type UpdateServiceBanner = z.infer<typeof updateServiceBannerSchema>;
export type ServiceBanner = typeof serviceBanners.$inferSelect;

// Team Members table
export const teamMembers = mysqlTable("team_members", {
  id: varchar("id", { length: 255 }).primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  photoUrl: varchar("photo_url", { length: 512 }),
  employeeId: varchar("employee_id", { length: 100 }), // Optional link to employee verification
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTeamMemberSchema = insertTeamMemberSchema.partial();

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
