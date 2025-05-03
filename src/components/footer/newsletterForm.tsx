'use client';

import dynamic from 'next/dynamic';

import { Form } from './form';

const ReCaptchaProvider = dynamic(
  () =>
    import('next-recaptcha-v3').then((mod) => {
      return mod.ReCaptchaProvider;
    }),
  { ssr: false }
);

export const NewsletterForm = () => {
  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <Form />
    </ReCaptchaProvider>
  );
};
