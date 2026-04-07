import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseServer';
import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';

sgClient.setApiKey(process.env.SENDGRID_API_KEY!);
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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

    const { data: existing, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email')
      .eq('token', token)
      .eq('is_confirmed', true)
      .single();

    if (findError || !existing) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 },
      );
    }

    const { error: deleteError } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 },
      );
    }

    await sgMail.send({
      to: existing.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: 'Wakacyjny Hit',
      },
      templateId: 'd-b20ffa4a81cc42999aea67405f81cb00',
    });

    try {
      const [searchRes] = await sgClient.request({
        method: 'POST',
        url: '/v3/marketing/contacts/search/emails',
        body: { emails: [existing.email] },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contactData = (searchRes.body as any)?.result?.[existing.email]
        ?.contact;

      if (contactData?.id) {
        await sgClient.request({
          method: 'DELETE',
          url: '/v3/marketing/contacts',
          qs: {
            ids: contactData.id,
          },
        });
      } else {
        console.warn(`Nie znaleziono kontaktu w SendGrid: ${existing.email}`);
      }
    } catch {}

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
