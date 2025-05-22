import { NextResponse } from 'next/server';
import { z } from 'zod';
import sgMail from '@sendgrid/mail';
import { verifyRecaptcha } from '@/lib/verifyRecaptcha';
import { safeHtml } from '@/lib/safeHtml';
import { checkRateLimit } from '@/lib/checkRateLimit';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const schema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{6,15}$/, 'Invalid phone number'),
  title: z.string().min(3),
  message: z.string().min(10),
  token: z.string()
});

export async function POST(req: Request) {
  try {
    const rateLimitCheck = await checkRateLimit(req, 'contact-form');
    if (rateLimitCheck !== true) return rateLimitCheck;

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
      subject: `Nowa wiadomość z formularza kontaktowego: ${safeHtml(title)}`,
      html: `
        <p><strong>Od:</strong> ${safeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${safeHtml(phone)}</p>
        <p><strong>Temat:</strong> ${safeHtml(title)}</p>
        <p><strong>Wiadomość:</strong><br/>${safeHtml(message).replace(
          /\n/g,
          '<br/>'
        )}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
