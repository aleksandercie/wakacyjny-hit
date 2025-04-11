import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const orderSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    country: z.string().min(1),
    address: z.string().min(1),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, ''),
    phone: z
      .string()
      .regex(/^\+48\d{9}$/, 'Numer telefonu musi zawierać +48 i 9 cyfr'),
    vatInvoice: z.boolean().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
    orders: z.array(z.any()),
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

    const validData = {
      ...parsed.data,
      status: parsed.data.status ?? 'new'
    };

    // 👇 This is the important change
    const { data, error } = await supabase
      .from('orders')
      .insert([validData])
      .select('id') // return the ID of the inserted row
      .single(); // because we're inserting a single row

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 200 }); // 👈 send the ID back
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
