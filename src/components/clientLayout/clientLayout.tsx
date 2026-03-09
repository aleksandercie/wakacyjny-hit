'use client';

import { CartProvider } from '@/context/CartContext';
import { CookieConsent } from '@/components/cookies';
import { ThemeProvider } from '@/components/themeProvider';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

const ReCaptchaProvider = dynamic(
  () => import('next-recaptcha-v3').then((mod) => mod.ReCaptchaProvider),
  { ssr: false },
);

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        <CartProvider>
          {children}
          <Toaster position="top-right" />
        </CartProvider>
      </ReCaptchaProvider>
      <CookieConsent />
    </ThemeProvider>
  );
};
