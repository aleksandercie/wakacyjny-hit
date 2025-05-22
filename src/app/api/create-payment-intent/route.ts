import { getQuantityOptions } from '@/lib/api/getQuantityOptions';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const schema = z.object({
  orderItems: z.array(
    z.object({ quantityId: z.number(), orderId: z.number() })
  ),
  currency: z.string().length(3)
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { orderItems, currency } = parsed.data;
    const options = await getQuantityOptions();
    let amount = 0;
    for (const { quantityId } of orderItems) {
      const opt = options.find((o) => o.id === quantityId);
      if (!opt) {
        return NextResponse.json(
          { error: `Nieznana opcja ilości: ${quantityId}` },
          { status: 400 }
        );
      }

      const priceCents = Math.round(parseFloat(opt.value) * 100);
      const salePriceCents = Math.round(parseFloat(opt.salePrice) * 100);
      amount += salePriceCents > 0 ? salePriceCents : priceCents;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch {
    return NextResponse.json(
      { error: 'Błąd tworzenia płatności' },
      { status: 500 }
    );
  }
}
