import { Metadata } from 'next';

interface HeadComponentProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  canonicalUrl,
  noIndex = true
}: HeadComponentProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: ogUrl,
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website'
    },
    alternates: {
      canonical: canonicalUrl || undefined
    },
    robots: {
      index: !noIndex,
      follow: !noIndex
    }
  };
}
