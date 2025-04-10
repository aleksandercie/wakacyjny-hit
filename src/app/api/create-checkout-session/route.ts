import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
});

export async function POST(req: Request) {
  try {
    const { email, orderId, amount } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['p24'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: `Zamówienie #${orderId}`
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      payment_method_options: {
        p24: {
          // optional: add custom p24 options here
        }
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('[STRIPE ERROR]', err);
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
