import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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

    const { data: existing, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email')
      .eq('token', token)
      .eq('is_confirmed', true)
      .single();

    if (findError || !existing) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    const { error: deleteError } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    await sgMail.send({
      to: existing.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Zostałeś wypisany z newslettera WakacyjnyHit.pl',
      html: `
        <p>Cześć,</p>
        <p>Zgodnie z Twoją prośbą, usunęliśmy Twój adres e-mail z naszej listy subskrybentów.</p>
        <p>Jeśli to była pomyłka, możesz zawsze zapisać się ponownie na <a href="${process.env.NEXT_PUBLIC_SITE_URL}">naszej stronie</a>.</p>
        <p>Dziękujemy, że byłeś z nami!</p>
        <p><strong>Zespół WakacyjnyHit.pl</strong></p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
