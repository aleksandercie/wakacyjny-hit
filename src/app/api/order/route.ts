import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import sgMail from '@sendgrid/mail';
import { verifyRecaptcha } from '@/lib/verifyRecaptcha';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const orderSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    country: z.string().min(1),
    address: z.string().min(1),
    postalCode: z
      .string()
      .min(3, { message: 'Kod pocztowy jest za krótki' })
      .max(12, { message: 'Kod pocztowy jest za długi' })
      .regex(/^[A-Za-z0-9 \-]+$/, {
        message: 'Niepoprawny format kodu pocztowego'
      }),
    phone: z.string().regex(/^\+\d{6,15}$/, {
      message:
        'Numer telefonu musi być w formacie międzynarodowym, np. +48123456789'
    }),
    vatInvoice: z.boolean().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
    orders: z.array(z.any()),
    token: z.string(),
    status: z
      .enum(['new', 'pending', 'processing', 'paid', 'cancelled', 'failed'])
      .optional(),
    stripe_payment_intent_id: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.vatInvoice) {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nazwa firmy jest wymagana',
          path: ['companyName']
        });
      }

      if (!data.taxId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP jest wymagany',
          path: ['taxId']
        });
      } else if (!/^\d{10}$/.test(data.taxId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP musi zawierać dokładnie 10 cyfr',
          path: ['taxId']
        });
      }
    }
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid order data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { token, ...rest } = parsed.data;

    const recaptchaRes = await verifyRecaptcha(token);
    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return NextResponse.json(
        { error: 'Failed reCAPTCHA verification' },
        { status: 400 }
      );
    }

    const validData = {
      ...rest,
      status: parsed.data.status ?? 'new'
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([validData])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error.message);

      await sgMail.send({
        to: parsed.data.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        templateId: 'd-ea11531847554e6c8e504621d6753c65',
        dynamicTemplateData: {
          firstName: parsed.data.firstName
        }
      });

      await sgMail.send({
        to: process.env.SENDGRID_FROM_EMAIL!,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `❌ Błąd: Nie udało się zapisać zamówienia – ${parsed.data.email}`,
        html: `
                <p>Nie udało się zapisać zamówienia w Supabase.</p>
                <p><strong>🧑 Klient:</strong> 
                  ${parsed.data.firstName} ${parsed.data.lastName}
                </p>
                <p><strong>📧 Email:</strong> ${parsed.data.email}</p>
                <p><strong>📞 Telefon:</strong> ${parsed.data.phone}</p>
                <p><strong>🛒 Produkty:</strong></p>
                <pre>${JSON.stringify(parsed.data.orders, null, 2)}</pre>
                <p><strong>❗ Błąd Supabase:</strong> ${error.message}</p>
                <p><strong>🕒 Data:</strong> ${new Date().toISOString()}</p>
              `
      });

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
