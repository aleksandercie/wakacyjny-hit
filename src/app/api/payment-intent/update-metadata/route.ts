import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
});

const schema = z.object({
  paymentIntentId: z.string().min(10),
  metadata: z.object({ orderId: z.number() })
});

export async function PATCH(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { paymentIntentId, metadata } = parsed.data;

  try {
    await stripe.paymentIntents.update(paymentIntentId, { metadata });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Metadata update failed' },
      { status: 500 }
    );
  }
}
