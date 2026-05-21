# SEO Technical Implementation

## Overview

Every technical SEO decision must be implemented in code. This document specifies exactly how.

## Server-Side Rendering

**Rule:** All content pages must render HTML on the server. No client-side rendering for content.

```typescript
// app/guides/[slug]/page.tsx — Server Component (default)
export default async function GuidePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug); // Server-side data fetch
  
  return (
    <>
      <SchemaOrg type="Article" data={article} />
      <article>{/* content */}</article>
    </>
  );
}
```

**When to use SSR vs SSG:**

| Page Type | Method | Revalidation |
|---|---|---|
| Articles (MDX) | `generateStaticParams` + SSG | `revalidate: 604800` (7 days) + on-demand |
| Software pages | `generateStaticParams` + SSG | `revalidate: 86400` (1 day) |
| Comparison pages | `generateStaticParams` + SSG | `revalidate: 86400` (1 day) |
| Local pages | SSR (dynamic data) | No revalidation needed (SSR) |
| Directory profiles | SSR (dynamic data) | No revalidation needed (SSR) |
| Hub/listing pages | SSG | `revalidate: 86400` (1 day) |

## Metadata API

```typescript
// app/guides/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: `${article.title} | CleanP`,
    description: article.excerpt || article.bluf,
    keywords: article.tags?.join(', '),
    authors: article.author ? [{ name: article.author.name }] : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: article.author?.name,
      tags: article.tags,
      images: article.ogImage ? [{ url: article.ogImage }] : [{ url: '/images/og-default.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.ogImage ? [article.ogImage] : ['/images/og-default.jpg'],
    },
    alternates: {
      canonical: `/guides/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}
```

## OpenGraph Image

```typescript
// app/guides/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const alt = 'CleanP — Média du nettoyage professionnel';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0C4A6E',
        padding: 60,
      }}>
        <div style={{ color: '#E0F2FE', fontSize: 24, marginBottom: 20 }}>CleanP</div>
        <div style={{ color: 'white', fontSize: 56, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>
          {article.title}
        </div>
        <div style={{ marginTop: 'auto', color: '#E0F2FE', fontSize: 20 }}>
          {article.author?.name} · {article.readingTime}
        </div>
      </div>
    ),
    { ...size }
  );
}
```

## Structured Data (Schema.org)

### Implementation Pattern

```typescript
// components/seo/schema-org.tsx
interface SchemaProps {
  type: 'Article' | 'FAQPage' | 'LocalBusiness' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'ItemList' | 'SoftwareApplication' | 'Dataset';
  data: Record<string, unknown>;
}

export function SchemaOrg({ type, data }: SchemaProps) {
  const schema = generateSchema(type, data);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Schema: Article (for all guides, comparisons, studies)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Grille salariale propreté 2025 : le guide complet",
  "description": "Le salaire minimum d'un agent de nettoyage en 2025 est de 11,83 €/heure...",
  "image": "https://cleanp.fr/images/og-grille-salaire.jpg",
  "author": {
    "@type": "Organization",
    "name": "CleanP"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CleanP",
    "logo": { "@type": "ImageObject", "url": "https://cleanp.fr/logo.png" }
  },
  "datePublished": "2025-01-15T08:00:00+01:00",
  "dateModified": "2025-03-20T14:30:00+01:00",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cleanp.fr/guides/grille-salaire-proprete-2025" }
}
```

### Schema: FAQPage (for all pillar pages)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le salaire minimum d'un agent de nettoyage en 2025 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En 2025, le salaire minimum d'un agent de nettoyage en France est de 11,83 € brut/heure pour un débutant, selon la convention collective IDCC 3043."
      }
    }
  ]
}
```

**Rule:** Every pillar page must have ≥5 FAQ items. Every guide article must have ≥3 FAQ items.

### Schema: LocalBusiness (for each directory profile)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CleanPro Lyon",
  "image": "https://cleanp.fr/images/companies/cleanpro-lyon.jpg",
  "@id": "https://cleanp.fr/annuaire/cleanpro-lyon-45678900012",
  "url": "https://cleanp.fr/annuaire/cleanpro-lyon-45678900012",
  "telephone": "+33472XXXXXX",
  "email": "contact@cleanpro-lyon.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 rue de la République",
    "addressLocality": "Lyon",
    "postalCode": "69002",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.7640,
    "longitude": 4.8357
  },
  "priceRange": "€€",
  "openingHoursSpecification": [ ... ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.2",
    "reviewCount": "15"
  }
}
```

### Schema: BreadcrumbList (all pages except homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://cleanp.fr/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Guides",
      "item": "https://cleanp.fr/guides"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Grille salariale propreté 2025",
      "item": "https://cleanp.fr/guides/grille-salaire-proprete-2025"
    }
  ]
}
```

### Schema: ItemList (for comparison/ranking pages)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Proprely",
      "url": "https://cleanp.fr/logiciels/proprely"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Progiclean",
      "url": "https://cleanp.fr/logiciels/progiclean"
    }
  ]
}
```

### Schema: Organization (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CleanP",
  "alternateName": "Propreté Business",
  "url": "https://cleanp.fr",
  "logo": "https://cleanp.fr/logo.png",
  "description": "Le média de référence du nettoyage professionnel en France — guides, données, comparatifs et outils.",
  "sameAs": [
    "https://www.linkedin.com/company/cleanp",
    "https://twitter.com/cleanp_fr"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Proprely"
  }
}
```

### Schema: WebSite (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CleanP",
  "url": "https://cleanp.fr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://cleanp.fr/recherche?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

### Schema: Dataset (for data/study pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "État du marché du nettoyage professionnel en France 2025",
  "description": "Données chiffrées sur le marché français du nettoyage professionnel...",
  "creator": { "@type": "Organization", "name": "CleanP" },
  "datePublished": "2025-01-15",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "CSV",
    "contentUrl": "https://cleanp.fr/etudes/etat-marche-2025.csv"
  }
}
```

## XML Sitemap

### Dynamic Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllArticles, getAllSoftware, getAllCompanies, getAllCities } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleanp.fr';
  
  // Static pages
  const staticPages = [
    '', '/guides', '/reglementation', '/logiciels', '/outils',
    '/annuaire', '/etudes', '/villes', '/newsletter',
    '/a-propos', '/contact', '/mentions-legales',
    '/politique-confidentialite', '/plan-du-site',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.7,
  }));
  
  // Dynamic content
  const articles = await getAllArticles();
  const articleUrls = articles.map(a => ({
    url: `${baseUrl}/guides/${a.slug}`,
    lastModified: a.dateModified || a.datePublished,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  const softwares = await getAllSoftware();
  const softwareUrls = softwares.map(s => ({
    url: `${baseUrl}/logiciels/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  const companies = await getAllCompanies();
  const companyUrls = companies.map(c => ({
    url: `${baseUrl}/annuaire/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  const cities = await getAllCities();
  const cityUrls = cities.map(c => ({
    url: `${baseUrl}/${c.slug}/societes-nettoyage`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...articleUrls, ...softwareUrls, ...companyUrls, ...cityUrls];
}
```

### Sitemap Index (if >50,000 URLs)

When scaling beyond 50,000 URLs:

```typescript
// app/sitemap-index.xml/route.ts
// Split into: sitemap-pages.xml, sitemap-articles.xml, sitemap-companies.xml, sitemap-cities.xml
```

## robots.txt

```
# robots.txt — CleanP
User-agent: *
Allow: /

# Disallow low-value pages
Disallow: /api/
Disallow: /admin/
Disallow: /*?*

# Sitemap
Sitemap: https://cleanp.fr/sitemap.xml

# Crawl rate (polite)
Crawl-delay: 1
```

## On-Demand Revalidation

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  const { path, tag } = await request.json();
  
  try {
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }
    return NextResponse.json({ error: 'No path or tag provided' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
```

**Usage after content publish:**
```bash
curl -X POST https://cleanp.fr/api/revalidate \
  -H "x-revalidate-secret: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"path": "/guides/grille-salaire-proprete-2025"}'
```

## Canonical URLs

```typescript
// lib/utils/seo.ts
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cleanp.fr';
  // Remove trailing slash, ensure leading slash
  const cleanPath = path.replace(/\/$/, '').replace(/^\//, '') || '/';
  return `${baseUrl}/${cleanPath}`.replace(/\/+$/, '/');
}

// Usage in every page
<link rel="canonical" href={getCanonicalUrl('/guides/grille-salaire-proprete-2025')} />
```

## Pagination (for hub/listing pages)

```
/guides?page=2
/annuaire?page=2
```

**SEO requirements:**
- `rel="prev"` and `rel="next"` in `<head>`
- Page 1 = canonical (no `?page=1`)
- Noindex for pages > 10 (prevent crawl budget waste)

```typescript
// For page 2:
<link rel="prev" href="https://cleanp.fr/guides" />
<link rel="next" href="https://cleanp.fr/guides?page=3" />
<link rel="canonical" href="https://cleanp.fr/guides?page=2" />

// For page > 10:
<meta name="robots" content="noindex, follow" />
```

## Image SEO

```typescript
// Always use next/image
import Image from 'next/image';

<Image
  src="/images/guides/grille-salaire.jpg"
  alt="Grille salariale propreté 2025 — tableau des salaires par échelon"
  width={800}
  height={600}
  priority={false}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**Rules:**
- Every image has descriptive `alt` text (French)
- Hero/priority images use `priority={true}`
- All other images lazy-loaded by default
- Images served as WebP/AVIF via next/image
- Structured data `ImageObject` for article featured images

## Core Web Vitals Targets

| Metric | Target | How |
|---|---|---|
| **LCP** | < 2.5s | next/image, font preloading, critical CSS |
| **INP** | < 200ms | Minimal client JS, no heavy computations on main thread |
| **CLS** | < 0.1 | next/image sizes, no layout shifts |
| **TTFB** | < 1.5s | Edge functions, optimized queries, connection pooling |
| **FCP** | < 1.8s | Static HTML, inline critical CSS |

## hreflang

Not needed — French only. But if expanding:

```html
<link rel="alternate" hreflang="fr-fr" href="https://cleanp.fr/page" />
<link rel="alternate" hreflang="x-default" href="https://cleanp.fr/page" />
```

## Security Headers (next.config.js)

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 404 and Error Pages

### 404 Page

- Custom design with search box
- Links to popular content
- Soft CTA: "Rechercher un guide" or "Consulter l'annuaire"
- Returns proper HTTP 404 status

### 500 Page

- Friendly error message
- Link to homepage
- No technical details exposed

## URL Normalization

```typescript
// middleware.ts — URL normalization
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;
  
  // Remove trailing slash (except root)
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    changed = true;
  }
  
  // Redirect uppercase to lowercase
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    changed = true;
  }
  
  // Remove multiple slashes
  if (url.pathname.includes('//')) {
    url.pathname = url.pathname.replace(/\/+/g, '/');
    changed = true;
  }
  
  if (changed) {
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon.ico).*)'],
};
```

## Monitoring SEO Health

| Check | Tool | Frequency |
|---|---|---|
| Index status | Google Search Console | Daily |
| Ranking changes | Ahrefs / SEMrush | Weekly |
| Structured data validity | GSC + Schema.org validator | Weekly |
| Core Web Vitals | GSC + Lighthouse CI | Every deploy |
| Broken links | Screaming Frog / Ahrefs | Weekly |
| Sitemap freshness | Custom check | Daily |
| robots.txt validity | GSC | Weekly |
| Duplicate content | Siteliner | Monthly |
