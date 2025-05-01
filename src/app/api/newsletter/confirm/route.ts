import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';
import sgMail from '@sendgrid/mail';
import { ROUTES } from '@/lib/routes';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const { UNSUBSCRIBE } = ROUTES;

const schema = z.object({
  token: z.string().min(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { token } = parsed.data;

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_confirmed: true, confirmed_at: new Date().toISOString() })
      .eq('token', token)
      .eq('is_confirmed', false)
      .select();

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    const subscriber = data[0];
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${UNSUBSCRIBE}?token=${token}`;

    await sgMail.send({
      to: subscriber.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Witaj w newsletterze WakacyjnyHit.pl!',
      html: `
        <h2>Dziękujemy za potwierdzenie subskrypcji!</h2>
        <p>Od teraz będziesz otrzymywać nasze najlepsze oferty wakacyjne, inspiracje i ekskluzywne promocje.</p>
        <p>Miłego dnia! ☀️</p>
        <p><strong>Zespół WakacyjnyHit.pl</strong></p>
        <p><a href=${unsubscribeUrl}>wypisz się</a></p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter confirm error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
