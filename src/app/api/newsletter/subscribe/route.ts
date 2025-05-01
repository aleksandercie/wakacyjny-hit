import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabaseClient';
import sgMail from '@sendgrid/mail';
import { ROUTES } from '@/lib/routes';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const { SUBSCRIBE, UNSUBSCRIBE } = ROUTES;

const schema = z.object({
  email: z.string().email()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { email } = parsed.data;
    const token = randomUUID();

    const { data: existing, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('is_confirmed')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing email:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existing?.is_confirmed) {
      return NextResponse.json({ success: true });
    }

    const { error: upsertError } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, token, is_confirmed: false });

    if (upsertError) {
      console.error('Upsert error:', upsertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${SUBSCRIBE}?token=${token}`;
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${UNSUBSCRIBE}?token=${token}`;

    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Potwierdź subskrypcję newslettera',
      html: `
        <p>Cześć!</p>
        <p>Dziękujemy za zapis do newslettera WakacyjnyHit.pl. Kliknij poniższy link, aby potwierdzić subskrypcję:</p>
        <p><a href="${confirmUrl}">Potwierdzam</a></p>
        <p>Jeśli nie zapisywałeś się, zignoruj tę wiadomość.</p>
        <p><a href=${unsubscribeUrl}>wypisz się</a></p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in POST:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
