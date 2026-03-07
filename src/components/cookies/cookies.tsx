'use client';

import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

const { PRIVACY_POLICY } = ROUTES;

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'granted');
    setVisible(false);
    loadAnalytics();
    loadMetaPixel();
    trackPageView();
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setVisible(false);
  };

  const loadMetaPixel = () => {
    if (document.getElementById('meta-pixel')) return;

    const script = document.createElement('script');
    script.id = 'meta-pixel';
    script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
    document.head.appendChild(script);
  };

  const loadAnalytics = () => {
    if (document.getElementById('gtm-script')) return;

    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
    `;
    document.head.appendChild(script);
  };

  const trackPageView = useCallback(() => {
    // Meta Pixel SPA pageview
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    // Optional: if you want GTM to react to route changes in SPA
    // if (typeof window !== 'undefined') {
    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({
    //     event: 'pageview',
    //     page_path: window.location.pathname + window.location.search,
    //   });
    // }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'granted') {
      loadAnalytics();
      loadMetaPixel();
      trackPageView();
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-background shadow-md p-4 z-50">
      <div className="flex flex-col gap-4 items-end mx-auto max-w-[1000px]">
        <p className="text-sm">
          Ta strona wykorzystuje pliki cookies do poprawnego działania, analizy
          ruchu oraz opcjonalnie - do celów marketingowych. Klikając
          „Akceptuję”, wyrażasz zgodę na ich użycie. Możesz też odmówić,
          klikając „Odrzucam”. Więcej informacji znajdziesz w naszej{' '}
          <Link href={PRIVACY_POLICY} className="underline">
            Polityce prywatności
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button onClick={rejectCookies} variant="secondary">
            Odrzucam
          </Button>
          <Button onClick={acceptCookies}>Akceptuję</Button>
        </div>
      </div>
    </div>
  );
};
