import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SeoSetting } from "@shared/schema";

interface SeoHeadProps {
  page: string;
  fallback?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
  };
}

export function SeoHead({ page, fallback = {} }: SeoHeadProps) {
  const { data: seoSettings } = useQuery<SeoSetting>({
    queryKey: ["/api/seo", page],
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    const dataAttr = `data-seo-${page}`;
    const originalTitle = document.title;

    // Remove all existing SEO elements for this page first
    const existingElements = document.querySelectorAll(`[${dataAttr}]`);
    existingElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    // Update document title
    if (seoSettings?.metaTitle) {
      document.title = seoSettings.metaTitle;
    } else if (fallback.title) {
      document.title = fallback.title;
    }

    // Helper function to create and add meta tag
    const setMetaTag = (property: string, content: string | null | undefined, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? "property" : "name";
      const element = document.createElement("meta");
      element.setAttribute(attribute, property);
      element.setAttribute(dataAttr, "true");
      element.content = content;
      document.head.appendChild(element);
    };

    // Helper function to create and add link tag
    const setLinkTag = (rel: string, href: string | null | undefined) => {
      if (!href) return;

      const element = document.createElement("link");
      element.rel = rel;
      element.setAttribute(dataAttr, "true");
      element.href = href;
      document.head.appendChild(element);
    };

    // Basic Meta Tags
    setMetaTag("description", seoSettings?.metaDescription || fallback.description);
    setMetaTag("keywords", seoSettings?.metaKeywords || fallback.keywords);
    setMetaTag("robots", seoSettings?.metaRobots || "index,follow");

    // Canonical URL
    if (seoSettings?.canonicalUrl) {
      setLinkTag("canonical", seoSettings.canonicalUrl);
    }

    // Open Graph Tags
    if (seoSettings?.ogTitle || seoSettings?.metaTitle || fallback.title) {
      setMetaTag("og:title", seoSettings?.ogTitle || seoSettings?.metaTitle || fallback.title, true);
    }
    if (seoSettings?.ogDescription || seoSettings?.metaDescription || fallback.description) {
      setMetaTag("og:description", seoSettings?.ogDescription || seoSettings?.metaDescription || fallback.description, true);
    }
    if (seoSettings?.ogImage || fallback.ogImage) {
      setMetaTag("og:image", seoSettings?.ogImage || fallback.ogImage, true);
    }
    setMetaTag("og:type", seoSettings?.ogType || "website", true);
    if (seoSettings?.ogUrl) {
      setMetaTag("og:url", seoSettings.ogUrl, true);
    }

    // Twitter Card Tags
    setMetaTag("twitter:card", seoSettings?.twitterCard || "summary_large_image");
    if (seoSettings?.twitterTitle || seoSettings?.metaTitle || fallback.title) {
      setMetaTag("twitter:title", seoSettings?.twitterTitle || seoSettings?.metaTitle || fallback.title);
    }
    if (seoSettings?.twitterDescription || seoSettings?.metaDescription || fallback.description) {
      setMetaTag("twitter:description", seoSettings?.twitterDescription || seoSettings?.metaDescription || fallback.description);
    }
    if (seoSettings?.twitterImage || seoSettings?.ogImage || fallback.ogImage) {
      setMetaTag("twitter:image", seoSettings?.twitterImage || seoSettings?.ogImage || fallback.ogImage);
    }

    // Structured Data (JSON-LD)
    if (seoSettings?.structuredData) {
      const scriptElement = document.createElement("script");
      scriptElement.type = "application/ld+json";
      scriptElement.setAttribute(dataAttr, "true");
      scriptElement.textContent = JSON.stringify(seoSettings.structuredData);
      document.head.appendChild(scriptElement);
    }

    // Hreflang Tags
    if (seoSettings?.hreflangTags && typeof seoSettings.hreflangTags === 'object') {
      Object.entries(seoSettings.hreflangTags).forEach(([lang, url]) => {
        const element = document.createElement("link");
        element.rel = "alternate";
        element.hreflang = lang;
        element.setAttribute(dataAttr, "true");
        element.href = url as string;
        document.head.appendChild(element);
      });
    }

    // Cleanup function
    return () => {
      // Restore original title
      document.title = originalTitle;
      
      // Remove all SEO elements for this page
      const elementsToRemove = document.querySelectorAll(`[${dataAttr}]`);
      elementsToRemove.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [seoSettings, fallback, page]);

  return null; // This component doesn't render anything
}

// Default SEO fallbacks for each page
export const DEFAULT_SEO = {
  home: {
    title: "AddisonX Media - Professional Digital Marketing Agency",
    description: "Leading digital marketing agency offering web development, SEO, social media marketing, ecommerce solutions, brand promotion, and graphic design services.",
    keywords: "digital marketing, web development, SEO, social media marketing, ecommerce, brand promotion, graphic design",
    ogImage: "https://addisonxmedia.com/og-image.jpg",
  },
  about: {
    title: "About Us - AddisonX Media",
    description: "Learn about AddisonX Media, our mission, values, and the team of experts dedicated to delivering exceptional digital marketing solutions.",
    keywords: "about us, digital marketing team, agency profile, company mission",
    ogImage: "https://addisonxmedia.com/og-about.jpg",
  },
  services: {
    title: "Our Services - AddisonX Media",
    description: "Explore our comprehensive digital marketing services including web development, SEO, social media marketing, ecommerce, brand promotion, and graphic design.",
    keywords: "digital marketing services, web development, SEO services, social media marketing, ecommerce solutions",
    ogImage: "https://addisonxmedia.com/og-services.jpg",
  },
  contact: {
    title: "Contact Us - AddisonX Media",
    description: "Get in touch with AddisonX Media. Contact us for professional digital marketing services and solutions for your business.",
    keywords: "contact, get in touch, digital marketing contact, consultation",
    ogImage: "https://addisonxmedia.com/og-contact.jpg",
  },
  "verify-employee": {
    title: "Employee Verification - AddisonX Media",
    description: "Verify AddisonX Media employee credentials and authenticity. Secure employee verification system.",
    keywords: "employee verification, credential check, staff verification",
  },
  "web-development": {
    title: "Web Development Services - AddisonX Media",
    description: "Professional web development services. Custom websites, web applications, and responsive design solutions for your business.",
    keywords: "web development, custom websites, web applications, responsive design",
    ogImage: "https://addisonxmedia.com/og-web-dev.jpg",
  },
  "ecommerce": {
    title: "Ecommerce Solutions - AddisonX Media",
    description: "Comprehensive ecommerce development services. Build powerful online stores with secure payment integration and inventory management.",
    keywords: "ecommerce, online store, ecommerce development, shopping cart",
    ogImage: "https://addisonxmedia.com/og-ecommerce.jpg",
  },
  "seo": {
    title: "SEO Services - AddisonX Media",
    description: "Expert SEO services to improve your search engine rankings. On-page SEO, technical SEO, and link building strategies.",
    keywords: "SEO, search engine optimization, SEO services, rankings",
    ogImage: "https://addisonxmedia.com/og-seo.jpg",
  },
  "social-media": {
    title: "Social Media Marketing - AddisonX Media",
    description: "Strategic social media marketing services. Grow your brand presence on Facebook, Instagram, Twitter, and LinkedIn.",
    keywords: "social media marketing, social media management, brand awareness",
    ogImage: "https://addisonxmedia.com/og-social.jpg",
  },
  "brand-promotion": {
    title: "Brand Promotion Services - AddisonX Media",
    description: "Build and promote your brand with our comprehensive brand promotion services. Increase brand awareness and recognition.",
    keywords: "brand promotion, branding, brand awareness, marketing campaigns",
    ogImage: "https://addisonxmedia.com/og-brand.jpg",
  },
  "graphic-design": {
    title: "Graphic Design Services - AddisonX Media",
    description: "Professional graphic design services. Logos, branding materials, marketing collateral, and visual identity design.",
    keywords: "graphic design, logo design, branding, visual identity",
    ogImage: "https://addisonxmedia.com/og-design.jpg",
  },
};
