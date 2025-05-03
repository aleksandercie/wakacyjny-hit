import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import sgMail from '@sendgrid/mail';
import { ROUTES } from '@/lib/routes';
import { verifyRecaptcha } from '@/lib/verifyRecaptcha';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const { SUBSCRIBE, UNSUBSCRIBE } = ROUTES;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Missing reCAPTCHA token' },
        { status: 400 }
      );
    }

    const recaptchaRes = await verifyRecaptcha(token);
    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return NextResponse.json(
        { error: 'Failed reCAPTCHA verification' },
        { status: 400 }
      );
    }

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
