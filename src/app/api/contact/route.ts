import { NextResponse } from 'next/server';
import { z } from 'zod';
import sgMail from '@sendgrid/mail';
import { verifyRecaptcha } from '@/lib/verifyRecaptcha';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(6),
  title: z.string().min(3),
  message: z.string().min(10),
  token: z.string()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { email, phone, title, message, token } = parsed.data;

    const recaptchaRes = await verifyRecaptcha(token);
    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return NextResponse.json(
        { error: 'Failed reCAPTCHA verification' },
        { status: 400 }
      );
    }

    await sgMail.send({
      to: process.env.SENDGRID_FROM_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Nowa wiadomość z formularza kontaktowego: ${title}`,
      html: `
        <p><strong>Od:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Temat:</strong> ${title}</p>
        <p><strong>Wiadomość:</strong><br/>${message.replace(
          /\n/g,
          '<br/>'
        )}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
