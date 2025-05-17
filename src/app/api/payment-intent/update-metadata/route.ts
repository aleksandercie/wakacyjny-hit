import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
});

export async function PATCH(req: Request) {
  const { paymentIntentId, metadata } = await req.json();
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
