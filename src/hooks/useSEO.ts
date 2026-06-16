import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: Record<string, any>;
  ogImage?: string;
  ogType?: string;
}

export function useSEO({ title, description, schema, ogImage, ogType = 'website' }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = `${title} | Bee's Bakery`;

    // 2. Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update OG tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    updateOGTag('og:title', `${title} | Bee's Bakery`);
    updateOGTag('og:description', description);
    updateOGTag('og:type', ogType);
    updateOGTag('og:url', window.location.href);
    if (ogImage) {
      updateOGTag('og:image', ogImage);
    }

    // 4. Update JSON-LD Schema
    const scriptId = 'json-ld-schema-script';
    let schemaScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = scriptId;
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up schema script on unmount
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [title, description, schema, ogImage, ogType]);
}

// Pre-defined schemas
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  '@id': 'https://beesbakery.com/#bakery',
  'name': "Bee's Bakery",
  'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAObVstasyWD0qBH294Y_jrLsIxcwdyvLgU-un34YYOzJaCY0MB9de-_PQfq7EQUZ9IUzGnpaAnXb5cIUSNxUBdqRvH7kRn8Oz5kWiv5nNb-TCKjswtQDnnaEejpjIYxlId-qIc3g1nLIdIp1QB18ghuEuG2qDKE2RNINf7BerngenEnCswJmJ35gZHxydCOWbebLIehOw0c2tWKcW0F22Azq4N5mT_AaZnoSHbWlcQHi-Q0VTXnfRxT7Zu8M16pPedbCMaoOk8Lyk',
  'url': 'https://beesbakery.com',
  'telephone': '+1-212-555-0198',
  'priceRange': '$$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '124 Artisanal Way',
    'addressLocality': 'New York',
    'addressRegion': 'NY',
    'postalCode': '10012',
    'addressCountry': 'US'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 40.7259,
    'longitude': -73.9967
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    'opens': '09:00',
    'closes': '18:00'
  },
  'sameAs': [
    'https://www.facebook.com/beesbakery',
    'https://www.instagram.com/beesbakery'
  ]
};
