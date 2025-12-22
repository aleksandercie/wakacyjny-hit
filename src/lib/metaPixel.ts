// lib/metaPixel.ts
export type MetaCurrency = 'PLN';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const hasConsent = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === 'granted';
};

const canTrack = () => {
  return (
    typeof window !== 'undefined' &&
    hasConsent() &&
    typeof window.fbq === 'function'
  );
};

export const metaTrack = (eventName: string, params?: Record<string, any>) => {
  if (!canTrack()) return;
  window.fbq!('track', eventName, params ?? {});
};

// Optional: for custom events
export const metaTrackCustom = (
  eventName: string,
  params?: Record<string, any>,
) => {
  if (!canTrack()) return;
  window.fbq!('trackCustom', eventName, params ?? {});
};
