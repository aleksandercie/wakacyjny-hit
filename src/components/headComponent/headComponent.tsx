import Head from 'next/head';

interface HeadComponentProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const HeadComponent = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  canonicalUrl
}: HeadComponentProps) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Robots */}
      <meta name="robots" content="noindex, nofollow" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
