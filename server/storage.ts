import {
  users,
  employees,
  contactSubmissions,
  testimonials,
  verificationLogs,
  clients,
  leads,
  projects,
  invoices,
  settings,
  homepageCustomization,
  seoSettings,
  seoRedirects,
  seoHistory,
  globalSeoSettings,
  serviceBanners,
  teamMembers,
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
  type VerificationLog,
  type InsertVerificationLog,
  type Client,
  type InsertClient,
  type UpdateClient,
  type Lead,
  type InsertLead,
  type UpdateLead,
  type Project,
  type InsertProject,
  type UpdateProject,
  type Invoice,
  type InsertInvoice,
  type UpdateInvoice,
  type Setting,
  type InsertSetting,
  type UpdateSetting,
  type HomepageCustomization,
  type InsertHomepageCustomization,
  type UpdateHomepageCustomization,
  type SeoSetting,
  type InsertSeoSetting,
  type UpdateSeoSetting,
  type SeoRedirect,
  type InsertSeoRedirect,
  type UpdateSeoRedirect,
  type SeoHistory,
  type InsertSeoHistory,
  type GlobalSeoSetting,
  type InsertGlobalSeoSetting,
  type UpdateGlobalSeoSetting,
  type ServiceBanner,
  type InsertServiceBanner,
  type UpdateServiceBanner,
  type TeamMember,
  type InsertTeamMember,
  type UpdateTeamMember,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql as sqlQuery } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

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
  getUnreadContactCount(): Promise<number>;
  markContactSubmissionAsRead(id: string): Promise<ContactSubmission | undefined>;

  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: UpdateTestimonial): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;

  // Verification log operations (for analytics)
  logVerification(log: InsertVerificationLog): Promise<VerificationLog>;
  getVerificationStats(): Promise<{
    totalSearches: number;
    successfulSearches: number;
    failedSearches: number;
    recentLogs: VerificationLog[];
  }>;

  // Client operations
  getAllClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: UpdateClient): Promise<Client | undefined>;
  deleteClient(id: string): Promise<void>;

  // Lead operations
  getAllLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: UpdateLead): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<void>;

  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: UpdateProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // Invoice operations
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, invoice: UpdateInvoice): Promise<Invoice | undefined>;
  deleteInvoice(id: string): Promise<void>;

  // Settings operations
  getAllSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  upsertSetting(setting: InsertSetting): Promise<Setting>;
  deleteSetting(key: string): Promise<void>;

  // Homepage Customization operations
  getAllHomepageCustomizations(): Promise<HomepageCustomization[]>;
  getHomepageCustomization(section: string): Promise<HomepageCustomization | undefined>;
  upsertHomepageCustomization(customization: InsertHomepageCustomization): Promise<HomepageCustomization>;
  deleteHomepageCustomization(section: string): Promise<void>;

  // SEO Settings operations
  getAllSeoSettings(): Promise<SeoSetting[]>;
  getSeoSetting(page: string): Promise<SeoSetting | undefined>;
  upsertSeoSetting(seoSetting: InsertSeoSetting): Promise<SeoSetting>;
  deleteSeoSetting(page: string): Promise<void>;

  // SEO Redirects operations
  getAllSeoRedirects(): Promise<SeoRedirect[]>;
  getActiveSeoRedirects(): Promise<SeoRedirect[]>;
  getSeoRedirect(id: string): Promise<SeoRedirect | undefined>;
  getSeoRedirectByPath(fromPath: string): Promise<SeoRedirect | undefined>;
  createSeoRedirect(redirect: InsertSeoRedirect): Promise<SeoRedirect>;
  updateSeoRedirect(id: string, redirect: UpdateSeoRedirect): Promise<SeoRedirect | undefined>;
  deleteSeoRedirect(id: string): Promise<void>;

  // SEO History operations
  getAllSeoHistory(): Promise<SeoHistory[]>;
  getSeoHistoryByPage(page: string): Promise<SeoHistory[]>;
  createSeoHistory(history: InsertSeoHistory): Promise<SeoHistory>;

  // Global SEO Settings operations
  getAllGlobalSeoSettings(): Promise<GlobalSeoSetting[]>;
  getGlobalSeoSetting(key: string): Promise<GlobalSeoSetting | undefined>;
  upsertGlobalSeoSetting(setting: InsertGlobalSeoSetting): Promise<GlobalSeoSetting>;
  deleteGlobalSeoSetting(key: string): Promise<void>;

  // Service Banner operations
  getAllServiceBanners(): Promise<ServiceBanner[]>;
  getServiceBanner(serviceSlug: string): Promise<ServiceBanner | undefined>;
  upsertServiceBanner(banner: InsertServiceBanner): Promise<ServiceBanner>;
  deleteServiceBanner(serviceSlug: string): Promise<void>;

  // Team Member operations
  getAllTeamMembers(): Promise<TeamMember[]>;
  getActiveTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, teamMember: UpdateTeamMember): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || uuidv4();
    
    // Check if user with this ID already exists
    const existingById = await db.select().from(users).where(eq(users.id, id)).limit(1);
    
    if (existingById.length > 0) {
      // User ID exists - update the existing record without changing the ID
      await db
        .update(users)
        .set({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id));
      const [updatedUser] = await db.select().from(users).where(eq(users.id, id));
      return updatedUser!;
    }
    
    // User ID doesn't exist - insert new record
    await db.insert(users).values({ ...userData, id });
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user!;
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
    const id = uuidv4();
    await db.insert(employees).values({ ...employeeData, id });
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee!;
  }

  async updateEmployee(id: string, employeeData: UpdateEmployee): Promise<Employee | undefined> {
    await db
      .update(employees)
      .set({
        ...employeeData,
        updatedAt: new Date(),
      })
      .where(eq(employees.id, id));
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }

  // Contact submission operations
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const id = uuidv4();
    await db.insert(contactSubmissions).values({ ...submissionData, id });
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission!;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined> {
    await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id));
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async getUnreadContactCount(): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.isRead, false));
    return result[0]?.count || 0;
  }

  async markContactSubmissionAsRead(id: string): Promise<ContactSubmission | undefined> {
    await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(testimonials.createdAt);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.createdAt);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const id = uuidv4();
    await db.insert(testimonials).values({ ...testimonialData, id });
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial!;
  }

  async updateTestimonial(id: string, testimonialData: UpdateTestimonial): Promise<Testimonial | undefined> {
    await db
      .update(testimonials)
      .set({
        ...testimonialData,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id));
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Verification log operations
  async logVerification(logData: InsertVerificationLog): Promise<VerificationLog> {
    const id = uuidv4();
    await db.insert(verificationLogs).values({ ...logData, id });
    const [log] = await db.select().from(verificationLogs).where(eq(verificationLogs.id, id));
    return log!;
  }

  async getVerificationStats(): Promise<{
    totalSearches: number;
    successfulSearches: number;
    failedSearches: number;
    recentLogs: VerificationLog[];
  }> {
    const totalSearchesResult = await db
      .select({ count: count() })
      .from(verificationLogs);
    
    const successfulSearchesResult = await db
      .select({ count: count() })
      .from(verificationLogs)
      .where(eq(verificationLogs.found, "true"));
    
    const failedSearchesResult = await db
      .select({ count: count() })
      .from(verificationLogs)
      .where(eq(verificationLogs.found, "false"));
    
    const recentLogs = await db
      .select()
      .from(verificationLogs)
      .orderBy(desc(verificationLogs.searchDate))
      .limit(100);

    return {
      totalSearches: totalSearchesResult[0]?.count || 0,
      successfulSearches: successfulSearchesResult[0]?.count || 0,
      failedSearches: failedSearchesResult[0]?.count || 0,
      recentLogs,
    };
  }

  // Client operations
  async getAllClients(): Promise<Client[]> {
    return db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async createClient(clientData: InsertClient): Promise<Client> {
    const id = uuidv4();
    await db.insert(clients).values({ ...clientData, id });
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client!;
  }

  async updateClient(id: string, clientData: UpdateClient): Promise<Client | undefined> {
    await db
      .update(clients)
      .set({
        ...clientData,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, id));
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // Lead operations
  async getAllLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async createLead(leadData: InsertLead): Promise<Lead> {
    const id = uuidv4();
    await db.insert(leads).values({ ...leadData, id });
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead!;
  }

  async updateLead(id: string, leadData: UpdateLead): Promise<Lead | undefined> {
    await db
      .update(leads)
      .set({
        ...leadData,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, id));
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async deleteLead(id: string): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const id = uuidv4();
    await db.insert(projects).values({ ...projectData, id });
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project!;
  }

  async updateProject(id: string, projectData: UpdateProject): Promise<Project | undefined> {
    await db
      .update(projects)
      .set({
        ...projectData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Invoice operations
  async getAllInvoices(): Promise<Invoice[]> {
    return db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice;
  }

  async createInvoice(invoiceData: InsertInvoice): Promise<Invoice> {
    const id = uuidv4();
    await db.insert(invoices).values({ ...invoiceData, id });
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice!;
  }

  async updateInvoice(id: string, invoiceData: UpdateInvoice): Promise<Invoice | undefined> {
    await db
      .update(invoices)
      .set({
        ...invoiceData,
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, id));
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice;
  }

  async deleteInvoice(id: string): Promise<void> {
    await db.delete(invoices).where(eq(invoices.id, id));
  }

  // Settings operations
  async getAllSettings(): Promise<Setting[]> {
    return db.select().from(settings).orderBy(settings.category, settings.key);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async upsertSetting(settingData: InsertSetting): Promise<Setting> {
    const id = uuidv4();
    await db
      .insert(settings)
      .values({ ...settingData, id })
      .onDuplicateKeyUpdate({
        set: {
          value: sqlQuery`values(${settings.value})`,
          category: sqlQuery`values(${settings.category})`,
          updatedAt: new Date(),
        },
      });
    const [setting] = await db.select().from(settings).where(eq(settings.key, settingData.key));
    return setting!;
  }

  async deleteSetting(key: string): Promise<void> {
    await db.delete(settings).where(eq(settings.key, key));
  }

  // Homepage Customization operations
  async getAllHomepageCustomizations(): Promise<HomepageCustomization[]> {
    return db.select().from(homepageCustomization).orderBy(homepageCustomization.section);
  }

  async getHomepageCustomization(section: string): Promise<HomepageCustomization | undefined> {
    const [customization] = await db
      .select()
      .from(homepageCustomization)
      .where(eq(homepageCustomization.section, section));
    return customization;
  }

  async upsertHomepageCustomization(customizationData: InsertHomepageCustomization): Promise<HomepageCustomization> {
    const id = uuidv4();
    await db
      .insert(homepageCustomization)
      .values({ ...customizationData, id })
      .onDuplicateKeyUpdate({
        set: {
          content: sqlQuery`values(${homepageCustomization.content})`,
          isActive: sqlQuery`values(${homepageCustomization.isActive})`,
          updatedAt: new Date(),
        },
      });
    const [customization] = await db.select().from(homepageCustomization).where(eq(homepageCustomization.section, customizationData.section));
    return customization!;
  }

  async deleteHomepageCustomization(section: string): Promise<void> {
    await db.delete(homepageCustomization).where(eq(homepageCustomization.section, section));
  }

  // SEO Settings operations
  async getAllSeoSettings(): Promise<SeoSetting[]> {
    return db.select().from(seoSettings).orderBy(seoSettings.page);
  }

  async getSeoSetting(page: string): Promise<SeoSetting | undefined> {
    const [seoSetting] = await db
      .select()
      .from(seoSettings)
      .where(eq(seoSettings.page, page));
    return seoSetting;
  }

  async upsertSeoSetting(seoSettingData: InsertSeoSetting): Promise<SeoSetting> {
    const id = uuidv4();
    await db
      .insert(seoSettings)
      .values({ ...seoSettingData, id })
      .onDuplicateKeyUpdate({
        set: {
          customSlug: sqlQuery`values(${seoSettings.customSlug})`,
          metaTitle: sqlQuery`values(${seoSettings.metaTitle})`,
          metaDescription: sqlQuery`values(${seoSettings.metaDescription})`,
          metaKeywords: sqlQuery`values(${seoSettings.metaKeywords})`,
          metaRobots: sqlQuery`values(${seoSettings.metaRobots})`,
          canonicalUrl: sqlQuery`values(${seoSettings.canonicalUrl})`,
          ogTitle: sqlQuery`values(${seoSettings.ogTitle})`,
          ogDescription: sqlQuery`values(${seoSettings.ogDescription})`,
          ogImage: sqlQuery`values(${seoSettings.ogImage})`,
          ogType: sqlQuery`values(${seoSettings.ogType})`,
          ogUrl: sqlQuery`values(${seoSettings.ogUrl})`,
          twitterCard: sqlQuery`values(${seoSettings.twitterCard})`,
          twitterTitle: sqlQuery`values(${seoSettings.twitterTitle})`,
          twitterDescription: sqlQuery`values(${seoSettings.twitterDescription})`,
          twitterImage: sqlQuery`values(${seoSettings.twitterImage})`,
          structuredData: sqlQuery`values(${seoSettings.structuredData})`,
          hreflangTags: sqlQuery`values(${seoSettings.hreflangTags})`,
          isPublished: sqlQuery`values(${seoSettings.isPublished})`,
          isDraft: sqlQuery`values(${seoSettings.isDraft})`,
          scheduledPublishAt: sqlQuery`values(${seoSettings.scheduledPublishAt})`,
          updatedAt: new Date(),
        },
      });
    const [seoSetting] = await db.select().from(seoSettings).where(eq(seoSettings.page, seoSettingData.page));
    return seoSetting!;
  }

  async deleteSeoSetting(page: string): Promise<void> {
    await db.delete(seoSettings).where(eq(seoSettings.page, page));
  }

  // SEO Redirects operations
  async getAllSeoRedirects(): Promise<SeoRedirect[]> {
    return db.select().from(seoRedirects).orderBy(desc(seoRedirects.createdAt));
  }

  async getActiveSeoRedirects(): Promise<SeoRedirect[]> {
    return db.select().from(seoRedirects).where(eq(seoRedirects.isActive, true));
  }

  async getSeoRedirect(id: string): Promise<SeoRedirect | undefined> {
    const [redirect] = await db
      .select()
      .from(seoRedirects)
      .where(eq(seoRedirects.id, id));
    return redirect;
  }

  async getSeoRedirectByPath(fromPath: string): Promise<SeoRedirect | undefined> {
    const [redirect] = await db
      .select()
      .from(seoRedirects)
      .where(eq(seoRedirects.fromPath, fromPath));
    return redirect;
  }

  async createSeoRedirect(redirectData: InsertSeoRedirect): Promise<SeoRedirect> {
    const id = uuidv4();
    await db.insert(seoRedirects).values({ ...redirectData, id });
    const [redirect] = await db.select().from(seoRedirects).where(eq(seoRedirects.id, id));
    return redirect!;
  }

  async updateSeoRedirect(id: string, redirectData: UpdateSeoRedirect): Promise<SeoRedirect | undefined> {
    await db
      .update(seoRedirects)
      .set({ ...redirectData, updatedAt: new Date() })
      .where(eq(seoRedirects.id, id));
    const [redirect] = await db.select().from(seoRedirects).where(eq(seoRedirects.id, id));
    return redirect;
  }

  async deleteSeoRedirect(id: string): Promise<void> {
    await db.delete(seoRedirects).where(eq(seoRedirects.id, id));
  }

  // SEO History operations
  async getAllSeoHistory(): Promise<SeoHistory[]> {
    return db.select().from(seoHistory).orderBy(desc(seoHistory.createdAt));
  }

  async getSeoHistoryByPage(page: string): Promise<SeoHistory[]> {
    return db
      .select()
      .from(seoHistory)
      .where(eq(seoHistory.page, page))
      .orderBy(desc(seoHistory.createdAt));
  }

  async createSeoHistory(historyData: InsertSeoHistory): Promise<SeoHistory> {
    const id = uuidv4();
    await db.insert(seoHistory).values({ ...historyData, id });
    const [history] = await db.select().from(seoHistory).where(eq(seoHistory.id, id));
    return history!;
  }

  // Global SEO Settings operations
  async getAllGlobalSeoSettings(): Promise<GlobalSeoSetting[]> {
    return db.select().from(globalSeoSettings).orderBy(globalSeoSettings.key);
  }

  async getGlobalSeoSetting(key: string): Promise<GlobalSeoSetting | undefined> {
    const [setting] = await db
      .select()
      .from(globalSeoSettings)
      .where(eq(globalSeoSettings.key, key));
    return setting;
  }

  async upsertGlobalSeoSetting(settingData: InsertGlobalSeoSetting): Promise<GlobalSeoSetting> {
    const id = uuidv4();
    await db
      .insert(globalSeoSettings)
      .values({ ...settingData, id })
      .onDuplicateKeyUpdate({
        set: {
          value: sqlQuery`values(${globalSeoSettings.value})`,
          isActive: sqlQuery`values(${globalSeoSettings.isActive})`,
          updatedAt: new Date(),
        },
      });
    const [setting] = await db.select().from(globalSeoSettings).where(eq(globalSeoSettings.key, settingData.key));
    return setting!;
  }

  async deleteGlobalSeoSetting(key: string): Promise<void> {
    await db.delete(globalSeoSettings).where(eq(globalSeoSettings.key, key));
  }

  // Service Banner operations
  async getAllServiceBanners(): Promise<ServiceBanner[]> {
    return db.select().from(serviceBanners).orderBy(serviceBanners.serviceSlug);
  }

  async getServiceBanner(serviceSlug: string): Promise<ServiceBanner | undefined> {
    const [banner] = await db
      .select()
      .from(serviceBanners)
      .where(eq(serviceBanners.serviceSlug, serviceSlug));
    return banner;
  }

  async upsertServiceBanner(bannerData: InsertServiceBanner): Promise<ServiceBanner> {
    const id = uuidv4();
    await db
      .insert(serviceBanners)
      .values({ ...bannerData, id })
      .onDuplicateKeyUpdate({
        set: {
          bannerUrl: sqlQuery`values(${serviceBanners.bannerUrl})`,
          isActive: sqlQuery`values(${serviceBanners.isActive})`,
          updatedAt: new Date(),
        },
      });
    const [banner] = await db.select().from(serviceBanners).where(eq(serviceBanners.serviceSlug, bannerData.serviceSlug));
    return banner!;
  }

  async deleteServiceBanner(serviceSlug: string): Promise<void> {
    await db.delete(serviceBanners).where(eq(serviceBanners.serviceSlug, serviceSlug));
  }

  // Team Member operations
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(teamMembers.displayOrder, teamMembers.createdAt);
  }

  async getActiveTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(teamMembers.displayOrder, teamMembers.createdAt);
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [teamMember] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return teamMember;
  }

  async createTeamMember(teamMemberData: InsertTeamMember): Promise<TeamMember> {
    const id = uuidv4();
    await db.insert(teamMembers).values({
      ...teamMemberData,
      id,
    });
    const [teamMember] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return teamMember!;
  }

  async updateTeamMember(id: string, teamMemberData: UpdateTeamMember): Promise<TeamMember | undefined> {
    await db.update(teamMembers)
      .set({
        ...teamMemberData,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, id));
    const [teamMember] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return teamMember;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }
}

export const storage = new DatabaseStorage();
