export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

/**
 * Generate SEO meta tags for a page
 */
export function generateMetaTags(
  title: string,
  description: string,
  imageUrl?: string,
  url?: string
): MetaTag[] {
  return [
    { name: 'description', content: description },
    { name: 'og:title', property: 'og:title', content: title },
    { name: 'og:description', property: 'og:description', content: description },
    { name: 'twitter:title', property: 'twitter:title', content: title },
    { name: 'twitter:description', property: 'twitter:description', content: description },
    ...(imageUrl ? [{ property: 'og:image', content: imageUrl }] : []),
    ...(url ? [{ property: 'og:url', content: url }] : []),
  ];
}

/**
 * Structured data for Organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EndoStart',
    url: 'https://endostart.com.br',
    logo: 'https://endostart.com.br/logo.png',
    sameAs: [
      'https://www.facebook.com/endostart',
      'https://www.instagram.com/endostart',
      'https://www.linkedin.com/company/endostart',
    ],
    contact: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'Customer Service',
    },
  };
}

/**
 * Structured data for Course
 */
export function getCourseSchema(
  courseName: string,
  description: string,
  duration: string,
  price: string = '51000'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'EndoStart',
    },
    duration: duration,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'BRL',
    },
  };
}
