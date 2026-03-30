import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { ClientLayout } from '@/components/clientLayout';

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
  fallback: ['Arial', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f85808',
};

export const metadata: Metadata = {
  title: {
    default: 'Wakacyjny Hit - Najlepsze oferty wakacji',
    template: '%s | Wakacyjny Hit',
  },
  description:
    'Znajdź wymarzone wakacje w najlepszych cenach! Sprawdź nasze oferty podróży do najpiękniejszych miejsc świata.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wakacyjnyhit.com',
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link
          rel="dns-prefetch"
          href="https://trfyanyvdyozqndwmiyr.supabase.co"
        />
        <link
          rel="preconnect"
          href="https://trfyanyvdyozqndwmiyr.supabase.co"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${nunitoSans.variable} antialiased bg-background`}>
        <ClientLayout>
          <Navigation />
          <div className="relative [overflow-x:clip]">
            <div className="container mx-auto max-w-[1920px]">{children}</div>
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
