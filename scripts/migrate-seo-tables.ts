import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function migrateSeoTables() {
  try {
    console.log("Starting SEO tables migration...");

    // Drop existing seo_settings table to recreate with new schema
    console.log("Dropping existing seo_settings table...");
    await db.execute(sql`DROP TABLE IF EXISTS seo_settings`);

    // Create comprehensive seo_settings table
    console.log("Creating comprehensive seo_settings table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS seo_settings (
        id VARCHAR(255) PRIMARY KEY,
        page VARCHAR(100) NOT NULL UNIQUE,
        custom_slug VARCHAR(255),
        
        meta_title VARCHAR(255) NOT NULL,
        meta_description TEXT NOT NULL,
        meta_keywords TEXT,
        
        meta_robots VARCHAR(100) NOT NULL DEFAULT 'index, follow',
        canonical_url VARCHAR(512),
        
        og_title VARCHAR(255),
        og_description TEXT,
        og_image VARCHAR(512),
        og_type VARCHAR(50) DEFAULT 'website',
        og_url VARCHAR(512),
        
        twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
        twitter_title VARCHAR(255),
        twitter_description TEXT,
        twitter_image VARCHAR(512),
        
        structured_data JSON,
        hreflang_tags JSON,
        
        is_published BOOLEAN NOT NULL DEFAULT true,
        is_draft BOOLEAN NOT NULL DEFAULT false,
        scheduled_publish_at TIMESTAMP NULL,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create seo_redirects table
    console.log("Creating seo_redirects table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS seo_redirects (
        id VARCHAR(255) PRIMARY KEY,
        from_path VARCHAR(512) NOT NULL UNIQUE,
        to_path VARCHAR(512) NOT NULL,
        redirect_type VARCHAR(3) NOT NULL DEFAULT '301',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create seo_history table
    console.log("Creating seo_history table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS seo_history (
        id VARCHAR(255) PRIMARY KEY,
        seo_setting_id VARCHAR(255) NOT NULL,
        page VARCHAR(100) NOT NULL,
        changes JSON NOT NULL,
        changed_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create global_seo_settings table
    console.log("Creating global_seo_settings table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS global_seo_settings (
        id VARCHAR(255) PRIMARY KEY,
        \`key\` VARCHAR(100) NOT NULL UNIQUE,
        value TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ SEO tables migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateSeoTables();
