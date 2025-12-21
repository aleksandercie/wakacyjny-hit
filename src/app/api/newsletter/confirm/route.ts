import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseServer';
import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';
import { ROUTES } from '@/lib/routes';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
sgClient.setApiKey(process.env.SENDGRID_API_KEY!);

const { UNSUBSCRIBE } = ROUTES;

const schema = z.object({
  token: z.string().min(10),
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
        { status: 400 },
      );
    }

    const subscriber = data[0];

    try {
      await sgClient.request({
        method: 'PUT',
        url: '/v3/marketing/contacts',
        body: {
          contacts: [
            {
              email: subscriber.email,
            },
          ],
        },
      });
    } catch {}

    const unsubscribeUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL
    }${UNSUBSCRIBE}?token=${encodeURIComponent(token)}`;

    await sgMail.send({
      to: subscriber.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      templateId: 'd-f794793e712d4417875cf4102e1398bb',
      dynamicTemplateData: {
        unsubscribe_url: unsubscribeUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
