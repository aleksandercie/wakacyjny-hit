import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { status, stripe_payment_intent_id } = body;

    const { data: orderData, error } = await supabase
      .from('orders')
      .update({
        status,
        stripe_payment_intent_id: stripe_payment_intent_id
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !orderData) {
      console.error('Supabase update error:', error?.message);

      await sgMail.send({
        to: orderData.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        templateId: 'd-ea11531847554e6c8e504621d6753c65',
        dynamicTemplateData: {
          firstName: orderData.firstName
        }
      });

      await sgMail.send({
        to: process.env.SENDGRID_FROM_EMAIL!,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `❌ Błąd aktualizacji zamówienia #${id}`,
        html: `
          <p>❗ Wystąpił błąd podczas aktualizacji zamówienia:</p>
          <p><strong>ID zamówienia:</strong> ${id}</p>
          <p><strong>Błąd:</strong> ${error?.message}</p>
          <p><strong>🧑 Klient:</strong> ${orderData?.firstName} ${orderData?.lastName}</p>
          <p><strong>📧 Email:</strong> ${orderData?.email}</p>
          <p><strong>📞 Telefon:</strong> ${orderData?.phone}</p>
        `
      });
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    await sgMail.send({
      to: orderData.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      templateId: 'd-121fc47d1e9046bdb7e114871366005c',
      dynamicTemplateData: {
        firstName: orderData.firstName,
        id: orderData.id
      }
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
            .map(
              (room, i) => `
              <li>
                Pokój ${i + 1}: ${room.adults} dorosłych ${
                room.children
                  ? `, Dzieci: ${JSON.stringify(room.children)}.`
                  : '.'
              } 
              </li>`
            )
            .join('')}
        </ul>
      </div>
    `
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
            `
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error in PATCH:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
