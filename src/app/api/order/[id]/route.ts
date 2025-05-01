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
        subject: 'Błąd zamówienia – WakacyjnyHit.pl',
        html: `
                <p>Cześć ${orderData.firstName},</p>
                <p>Wystąpił błąd podczas składania Twojego zamówienia.</p>
                <p>Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.</p>
                <p>Dziękujemy,<br/>Zespół WakacyjnyHit.pl</p>
              `
      });

      await sgMail.send({
        to: process.env.ORDER_NOTIFICATION_EMAIL!,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `❌ Błąd aktualizacji zamówienia #${id}`,
        html: `
          <p>Wystąpił błąd podczas aktualizacji zamówienia:</p>
          <p><strong>ID zamówienia:</strong> ${id}</p>
          <p><strong>Błąd:</strong> ${error?.message}</p>
        `
      });
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    await sgMail.send({
      to: orderData.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Zamówienie potwierdzone – WakacyjnyHit.pl',
      html: `
              <p>Dziękujemy za złożenie zamówienia!</p>
              <p>Numer zamówienia: #${orderData.id}</p>
              <p>Wkrótce otrzymasz szczegóły dotyczące Twojej rezerwacji.</p>
            `
    });

    await sgMail.send({
      to: process.env.ORDER_NOTIFICATION_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `✅ Nowe opłacone zamówienie #${orderData.id}`,
      html: `
              <p>id zamówienia: #${orderData.id}</p>
              <p><strong>Klient:</strong> 
                ${orderData.firstName} ${orderData.lastName}
              </p>
              <p><strong>Email:</strong> ${orderData.email}</p>
              <p><strong>Telefon:</strong> ${orderData.phone}</p>
              <pre>${JSON.stringify(orderData.orders, null, 2)}</pre>
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
