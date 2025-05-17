'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CircleCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useReCaptcha } from 'next-recaptcha-v3';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha, loaded } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      'reCAPTCHA site key:',
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    );

    if (!loaded || !executeRecaptcha) {
      toast.error('reCAPTCHA is not ready yet. Please try again shortly.');
      return;
    }

    try {
      const token = await executeRecaptcha('newsletter_submit');

      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, token }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Super!', {
          description: `Potwierdzenie wysłane na ${email}`,
          icon: <CircleCheck className="text-green-500" size={16} />,
          dismissible: true,
          duration: 2500
        });
      } else {
        toast.error('Błąd', {
          description: 'Wystąpił problem. Spróbuj ponownie.'
        });
      }
    } catch {
      toast.error('Nie udało się zweryfikować reCAPTCHA.');
    }
  };

  return (
    <div className="flex flex-col max-w-[520px] gap-4 md:mx-auto">
      <h4 className="text-xl font-bold">Newsletter</h4>
      {submitted && (
        <div className="w-full  rounded-md h-fit flex gap-2 items-center">
          <p className="text-base text-gray-500">
            Potwierdzenie wysłane na:{' '}
            <span className="font-semibold break-all block mt-2 text-green-500">
              {email}
            </span>
          </p>
        </div>
      )}
      <p
        className={`text-base text-gray-500 ${
          submitted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Dołącz do naszego newslettera i bądź na bieżąco! Otrzymuj ekskluzywne
        oferty, nowości i inspiracje prosto na swoją skrzynkę. Zapisz się już
        teraz!
      </p>
      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm space-x-4 mt-4 flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="tertiary" disabled={!loaded}>
            {!loaded ? 'Ładowanie...' : 'Zapisz mnie'}
          </Button>
        </form>
      )}
    </div>
  );
};
