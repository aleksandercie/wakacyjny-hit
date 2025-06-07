'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { useReCaptcha } from 'next-recaptcha-v3';

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Adres e-mail jest wymagany' })
    .email({ message: 'Niepoprawny adres e-mail' }),

  phone: z
    .string()
    .nonempty({ message: 'Numer telefonu jest wymagany' })
    .regex(/^(?:\+|00)\d{6,15}$/, {
      message:
        'Podaj poprawny numer telefonu w formacie międzynarodowym (np. +48123456789) lub 0048123456789'
    }),

  title: z
    .string()
    .nonempty({ message: 'Tytuł jest wymagany' })
    .min(3, { message: 'Tytuł musi mieć co najmniej 3 znaki' }),

  message: z
    .string()
    .nonempty({ message: 'Wiadomość jest wymagana' })
    .min(10, { message: 'Wiadomość musi mieć co najmniej 10 znaków' }),

  terms: z
    .boolean({ message: 'Akceptacja regulaminu jest wymagana' })
    .refine((val) => val === true, {
      message: 'Akceptacja regulaminu jest wymagana'
    })
});

type FormData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const { TERMS } = ROUTES;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const { executeRecaptcha, loaded } = useReCaptcha();

  const onSubmit = async (data: FormData) => {
    if (!loaded || !executeRecaptcha) {
      toast.error('reCAPTCHA nie jest jeszcze gotowe. Spróbuj za chwilę.');
      return;
    }

    const token = await executeRecaptcha('contact_form');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...data, token }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        toast.success('Sukces!', {
          description:
            'Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.',
          icon: <CircleCheck className="text-green-500" size={16} />,
          dismissible: true,
          duration: 2000
        });
        reset({
          email: '',
          phone: '',
          title: '',
          message: '',
          terms: false
        });
      } else {
        toast('Błąd!', {
          description:
            'Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
        });
      }
    } catch {
      toast('Błąd!', {
        description: 'Coś poszło nie tak. Spróbuj ponownie.'
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 rounded-md md:p-8">
      <h2 className="text-xl font-bold">Formularz kontaktowy</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="email" className="text-gray-500 text-base">
            Adres e-mail
          </Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-red-600 text-base">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="phone" className="text-gray-500 text-base">
            Numer telefonu
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            onInput={(e) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/[^\d+]/g, '').slice(0, 16);
            }}
          />
          {errors.phone && (
            <p className="text-red-600 text-base">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-gray-500 text-base">
            Tytuł
          </Label>
          <Input id="title" type="text" {...register('title')} />
          {errors.title && (
            <p className="text-red-600 text-base">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="message" className="text-gray-500 text-base">
            Wiadomość
          </Label>
          <Textarea id="message" {...register('message')} />
          {errors.message && (
            <p className="text-red-600 text-base">{errors.message.message}</p>
          )}
        </div>
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="terms" className="text-gray-500 text-base">
                Akceptuję{' '}
                <Link
                  href={TERMS}
                  className="text-primary font-semibold text-base hover:font-bold"
                >
                  regulamin
                </Link>
              </Label>
            </div>
          )}
        />
        {errors.terms && (
          <p className="text-red-600 text-base">{errors.terms.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
        </Button>
      </form>
    </div>
  );
};
