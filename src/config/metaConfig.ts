// src/config/metaConfig.ts

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export const metaConfig: Record<string, PageMeta> = {
  // Home page
  "/": {
    title: "Pranjal Digital | Digital Marketing Agency",
    description: "Grow your business with expert digital marketing services including SEO, PPC, social media, and content marketing. Get a free consultation today.",
    keywords: "digital marketing, SEO, PPC, social media marketing"
  },
  
  // Services page
  "/services": {
    title: "Our Services | Pranjal Digital",
    description: "Explore our comprehensive digital marketing services designed to help your business grow online. From SEO to social media, we've got you covered.",
    keywords: "digital marketing services, SEO services, PPC services"
  },
  
  // About page
  "/about": {
    title: "About Us | Pranjal Digital",
    description: "Learn about Pranjal Digital, our mission, and how we help businesses succeed online with data-driven marketing strategies.",
    keywords: "digital marketing agency, about us"
  },
  
  // Contact page
  "/contact": {
    title: "Contact Us | Pranjal Digital",
    description: "Get in touch with our digital marketing experts. Schedule a free consultation to discuss your business goals.",
    keywords: "contact digital marketing agency"
  },
  
  // AI Voice Agent Dentist page
  "/ai-voice-agent-dentist": {
    title: "Dental AI Agent | AI Receptionist for Dentists",
    description: "AI dental voice agent that answers patient calls, books appointments, and updates your CRM automatically. Our AI Agent saves thousands of dollars a month by answering missed call opportunities. Starts at $49.99/month with 7-day free trial.",
    keywords: "dental AI, voice agent, AI receptionist, dental practice"
  },
  
  // AI Products page
  "/ai-products": {
    title: "AI Products | Pranjal Digital",
    description: "Discover our suite of AI-powered marketing tools and products designed to boost your business performance.",
    keywords: "AI products, marketing tools"
  },
  
  // Case Studies page
  "/case-studies": {
    title: "Case Studies | Pranjal Digital",
    description: "See how we've helped businesses grow with our digital marketing strategies. Real results from real clients.",
    keywords: "case studies, marketing success stories"
  },
  
  // Terms of Service
  "/terms-of-service": {
    title: "Terms of Service | Pranjal Digital",
    description: "Read our terms of service and understand the legal agreements governing the use of our website and services.",
    keywords: "terms of service, legal"
  },
  
  // Privacy Policy
  "/privacy-policy": {
    title: "Privacy Policy | Pranjal Digital",
    description: "Learn about our privacy practices and how we protect your personal information when you use our services.",
    keywords: "privacy policy, data protection"
  },
  
  // Thank You page
  "/thank-you": {
    title: "Thank You | Pranjal Digital",
    description: "Thank you for contacting Pranjal Digital. We'll get back to you shortly.",
    keywords: "thank you"
  },
  
  // Free Google Ads Competitor Research
  "/ai-products/free-google-ads-competitor-research": {
    title: "Free Google Ads Competitor Research | Pranjal Digital",
    description: "Get free competitor research for your Google Ads campaigns. Analyze competitor strategies and improve your ad performance.",
    keywords: "Google Ads, competitor research, free tool"
  }
};

// Helper function to get meta for current path
export const getPageMeta = (pathname: string): PageMeta => {
  // Remove trailing slash for matching
  const cleanPath = pathname.replace(/\/$/, '');
  
  // Direct match
  if (metaConfig[cleanPath]) {
    return metaConfig[cleanPath];
  }
  
  // Default fallback
  return {
    title: "Pranjal Digital | Digital Marketing Agency",
    description: "Expert digital marketing services to help your business grow online. SEO, PPC, social media, and more."
  };
};
