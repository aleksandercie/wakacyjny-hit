'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Adres e-mail jest wymagany' })
    .email({ message: 'Niepoprawny adres e-mail' }),

  phone: z
    .string()
    .nonempty({ message: 'Numer telefonu jest wymagany' })
    .regex(/^(\+48)?\d{9}$/, {
      message: 'Podaj poprawny numer telefonu (9 cyfr lub +48)'
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    toast('Sukces!', {
      description: 'Dziękujemy! Twoja wiadomość została wysłana.'
    });

    // toast('Błąd!', {
    //   description: 'Coś poszło nie tak. Spróbuj ponownie.'
    // });

    reset();
  };

  return (
    <div className="w-full flex flex-col gap-8 rounded-md md:p-8">
      <h2 className="text-xl font-bold">Formularz kontaktowy</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="email" className="text-gray-400 text-base">
            Adres e-mail
          </Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-red-600 text-base">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="phone" className="text-gray-400 text-base">
            Numer telefonu
          </Label>
          <Input id="phone" type="text" {...register('phone')} />
          {errors.phone && (
            <p className="text-red-600 text-base">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-gray-400 text-base">
            Tytuł
          </Label>
          <Input id="title" type="text" {...register('title')} />
          {errors.title && (
            <p className="text-red-600 text-base">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="message" className="text-gray-400 text-base">
            Wiadomość
          </Label>
          <Textarea id="message" {...register('message')} />
          {errors.message && (
            <p className="text-red-600 text-base">{errors.message.message}</p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox id="terms" {...register('terms')} />
          <Label htmlFor="terms" className="text-gray-400 text-base">
            Akceptuję{' '}
            <Link
              href=""
              className="text-primary font-semibold text-base hover:font-bold"
            >
              regulamin
            </Link>
          </Label>
        </div>
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
