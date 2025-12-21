import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseServer';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (
    event.type === 'payment_intent.succeeded' ||
    event.type === 'payment_intent.payment_failed'
  ) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const status =
      event.type === 'payment_intent.succeeded' ? 'paid' : 'failed';

    const orderId = paymentIntent.metadata.orderId;

    const { data: orderData, error } = await supabase
      .from('orders')
      .update({
        status,
        stripe_payment_intent_id: paymentIntent.id,
      })
      .eq('id', orderId)
      .select('*')
      .single();

    if (error || !orderData) {
      await sgMail.send({
        to: orderData.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        templateId: 'd-ea11531847554e6c8e504621d6753c65',
        dynamicTemplateData: {
          firstName: orderData.firstName,
        },
      });

      await sgMail.send({
        to: process.env.SENDGRID_FROM_EMAIL!,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `❌ Błąd aktualizacji zamówienia #${orderId}`,
        html: `
            <p>❗ Wystąpił błąd podczas aktualizacji zamówienia:</p>
            <p><strong>ID zamówienia:</strong> ${orderId}</p>
            <p><strong>Błąd:</strong> ${error?.message}</p>
            <p><strong>🧑 Klient:</strong> ${orderData?.firstName} ${orderData?.lastName}</p>
            <p><strong>📧 Email:</strong> ${orderData?.email}</p>
            <p><strong>📞 Telefon:</strong> ${orderData?.phone}</p>
          `,
      });
      return NextResponse.json({ received: true });
    }

    if (status === 'paid') {
      await sgMail.send({
        to: orderData.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        templateId: 'd-121fc47d1e9046bdb7e114871366005c',
        dynamicTemplateData: {
          firstName: orderData.firstName,
          id: orderData.id,
        },
      });

      const ordersHtml = orderData.orders
        .map(
          (order: {
            orderId: unknown;
            price: unknown;
            rooms: unknown;
            roomsDetails: { adults: unknown; children?: unknown }[];
          }) => `
            <div style="margin-bottom: 20px;">
              <p><strong>ID oferty:</strong> ${order?.orderId}</p>
              <p><strong>Cena:</strong> ${order?.price} zł</p>
              <p><strong>Liczba pokoi:</strong> ${order?.rooms}</p>
              <p><strong>Szczegóły pokoi:</strong></p>
              <ul>
                ${order.roomsDetails
                  .map((room, i) => {
                    const childrenList = Array.isArray(room.children)
                      ? room.children
                          .map(
                            (child, cIdx) =>
                              `dziecko ${cIdx + 1}: ${new Date(
                                child.dateOfBirth,
                              )
                                .toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: '2-digit',
                                })
                                .replace(/ /g, '-')}`,
                          )
                          .join(', ')
                      : '';

                    return `
                        <li>
                          Pokój ${i + 1} -  dorosłych: ${room.adults}
                          ${childrenList ? `, ${childrenList}` : ''}
                        </li>
                      `;
                  })
                  .join('')}
              </ul>
            </div>
          `,
        )
        .join('');

      await sgMail.send({
        to: process.env.SENDGRID_FROM_EMAIL!,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `✅ Nowe opłacone zamówienie #${orderData.id}`,
        html: `
                    <p>id zamówienia: #${orderData.id}</p>
                    <p>🧑 <strong>Klient:</strong> 
                      ${orderData.firstName} ${orderData.lastName}
                    </p>
                    <p><strong>📧  Email:</strong> ${orderData.email}</p>
                    <p><strong>📞 Telefon:</strong> ${orderData.phone}</p>
                    <p><strong>🛒 Zamówione oferty:</strong></p>
                    ${ordersHtml}
                  `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
