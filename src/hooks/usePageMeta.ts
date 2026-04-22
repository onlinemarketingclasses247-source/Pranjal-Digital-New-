// src/hooks/usePageMeta.ts
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getPageMeta } from '@/config/metaConfig';

export function usePageMeta() {
  const [location] = useLocation();
  
  useEffect(() => {
    const meta = getPageMeta(location);
    
    // Update document title
    document.title = meta.title;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = meta.description;
      document.head.appendChild(metaTag);
    }
    
    // Update keywords if provided
    if (meta.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', meta.keywords);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.name = 'keywords';
        metaTag.content = meta.keywords;
        document.head.appendChild(metaTag);
      }
    }
    
    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    } else {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', 'og:title');
      metaTag.content = meta.title;
      document.head.appendChild(metaTag);
    }
    
    // Update OG description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    } else {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', 'og:description');
      metaTag.content = meta.description;
      document.head.appendChild(metaTag);
    }
    
    // Update OG image if provided
    if (meta.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', meta.ogImage);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:image');
        metaTag.content = meta.ogImage;
        document.head.appendChild(metaTag);
      }
    }
  }, [location]);
}
