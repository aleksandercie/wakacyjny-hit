'use client';

import { Nunito } from 'next/font/google';
import './globals.css';
import { CookieConsent, Footer, Navigation } from '@/components';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ReCaptchaProvider = dynamic(
  () => import('next-recaptcha-v3').then((mod) => mod.ReCaptchaProvider),
  { ssr: false }
);

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="pl">
      <body className={`${nunitoSans.variable} antialiased relative bg-white `}>
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
      </body>
    </html>
  );
}
