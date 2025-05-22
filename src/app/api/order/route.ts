import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { verifyRecaptcha } from '@/lib/verifyRecaptcha';
import { checkRateLimit } from '@/lib/checkRateLimit';

type OrderRoomDetail = { adults: number; children: { dateOfBirth: string }[] };
type OrderItem = {
  orderId: string;
  price: number;
  rooms: number;
  roomsDetails: OrderRoomDetail[];
};

type OrderPayload = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  postalCode: string;
  phone: string;
  vatInvoice?: boolean;
  companyName?: string;
  taxId?: string;
  orders: OrderItem[];
  token: string;
  status?: string;
  stripe_payment_intent_id?: string;
};

const orderItemSchema = z.object({
  orderId: z.number(),
  price: z.number().min(0),
  rooms: z.number().int().min(1),
  roomsDetails: z.array(
    z.object({
      adults: z.string(),
      children: z
        .array(
          z.object({
            dateOfBirth: z.string().refine((d) => !isNaN(Date.parse(d)), {
              message: 'Nieprawidłowa data urodzenia dziecka'
            })
          })
        )
        .optional()
    })
  )
});

type OrderSchemaInput = Required<
  Omit<OrderPayload, 'status' | 'stripe_payment_intent_id'>
> & {
  status?: OrderPayload['status'];
  stripe_payment_intent_id?: string;
};

const orderSchema = z
  .object({
    email: z.string().email('Niepoprawny adres e-mail'),
    firstName: z.string().min(1, 'Imię jest wymagane'),
    lastName: z.string().min(1, 'Nazwisko jest wymagane'),
    country: z.string().min(1, 'Wybierz kraj'),
    address: z.string().min(1, 'Ulica jest wymagana'),
    postalCode: z
      .string()
      .min(3, 'Kod pocztowy jest za krótki')
      .max(12, 'Kod pocztowy jest za długi')
      .regex(/^[A-Za-z0-9 \-]+$/, 'Niepoprawny format kodu pocztowego'),
    phone: z
      .string()
      .regex(
        /^[+]\d{6,15}$/,
        'Podaj poprawny numer telefonu w formacie międzynarodowym (np. +48123456789)'
      ),
    vatInvoice: z.boolean().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
    orders: z.array(orderItemSchema).min(1, 'Brak produktów w zamówieniu'),
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
          message: 'NIP musi zawierać dokładnie 10 cyfr',
          path: ['taxId']
        });
      }
    }
  });

export async function POST(req: Request) {
  try {
    const rateLimitCheck = await checkRateLimit(req, 'order');
    if (rateLimitCheck !== true) return rateLimitCheck;
    const body = await req.json();
    const parsed = orderSchema.safeParse(body as OrderSchemaInput);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Błędne dane zamówienia', details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { token, orders, ...customerData } = parsed.data;

    const recaptchaRes = await verifyRecaptcha(token);
    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return NextResponse.json(
        { error: 'Nieudana weryfikacja reCAPTCHA' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([{ ...customerData, orders, status: 'new' }])
      .select('id, email, firstName, lastName')
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Błąd zapisu zamówienia' },
        { status: 500 }
      );
    }

    const orderId = data.id;

    return NextResponse.json({ id: orderId }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
