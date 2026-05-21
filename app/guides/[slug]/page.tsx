import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleLayout } from '@/components/content/article-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MdxRenderer } from '@/components/content/mdx-renderer';
import { SchemaOrg } from '@/components/seo/schema-org';
import { articleSchema } from '@/lib/schema/article';
import { listCollectionSlugs, loadGuide } from '@/lib/content/loader';

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs('guides');
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const record = await loadGuide('guides', params.slug);
  if (!record) return {};
  return {
    title: record.meta.title,
    description: record.meta.description,
    alternates: { canonical: record.path },
    openGraph: {
      type: 'article',
      title: record.meta.title,
      description: record.meta.description,
      publishedTime: record.meta.datePublished,
      modifiedTime: record.meta.dateModified,
      authors: [record.meta.author],
      tags: record.meta.tags,
      images: record.meta.ogImage ? [{ url: record.meta.ogImage }] : undefined,
    },
    keywords: record.meta.tags,
  };
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const record = await loadGuide('guides', params.slug);
  if (!record) notFound();

  return (
    <main>
      <SchemaOrg
        schemas={[
          articleSchema({
            headline: record.meta.title,
            description: record.meta.description,
            path: record.path,
            datePublished: record.meta.datePublished,
            dateModified: record.meta.dateModified,
            author: { name: record.meta.author },
            keywords: record.meta.tags,
            image: record.meta.ogImage,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Guides', href: '/guides' },
          { name: record.meta.title, href: record.path },
        ]}
      />
      <ArticleLayout record={record} category={record.meta.category}>
        <MdxRenderer source={record.source} />
      </ArticleLayout>
    </main>
  );
}
