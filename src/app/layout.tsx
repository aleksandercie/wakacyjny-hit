'use client';

import { Nunito } from 'next/font/google';
import './globals.css';
import { CookieConsent, Footer, Navigation, ThemeProvider } from '@/components';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Metadata, Viewport } from 'next';

const ReCaptchaProvider = dynamic(
  () => import('next-recaptcha-v3').then((mod) => mod.ReCaptchaProvider),
  { ssr: false },
);

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} antialiased relative bg-background `}
      >
        <ThemeProvider>
          <ReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          >
            <CartProvider>
              <Navigation />
              <div className="container mx-auto max-w-[1920px]">{children}</div>
              <Footer />
              <Toaster position="top-right" />
            </CartProvider>
          </ReCaptchaProvider>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
