import { Contact, ContactForm, ImageBanner } from '@/components';
import { ROUTES } from '@/lib/routes';
import { createMetadata } from '@/lib/seo';
import Link from 'next/link';

export const generateMetadata = () =>
  createMetadata({
    title: 'Kontakt – Skontaktuj się z nami | Wakacyjny Hit',
    description:
      'Masz pytania? Skontaktuj się z naszym zespołem, aby uzyskać pomoc dotyczącą ofert wakacyjnych i rezerwacji.',
    ogTitle: 'Kontakt – Skontaktuj się z nami | Wakacyjny Hit',
    ogDescription:
      'Chcesz dowiedzieć się więcej? Napisz do nas i otrzymaj odpowiedzi na wszystkie pytania dotyczące wakacji!',
    ogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/kontakt`,
    ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/kontakt`,
    noIndex: false
  });

export default function ContactPage() {
  const { FAQ } = ROUTES;

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner
          image="/banner.jpg"
          alt="Plaza"
          title="Skontaktuj się z nami!"
        />
        <div className="max-w-[1000px] flex flex-col md:flex-row gap-8 mx-auto w-full items-start px-4">
          <div className="w-full md:w-1/2 flex flex-col gap-8 md:py-8">
            <Contact title="Skontaktuj się z nami" />
            <p className="text-base">
              Sprawdź naszą sekcję{' '}
              <Link
                href={FAQ}
                className="font-semibold text-primary hover:font-bold"
              >
                FAQ
              </Link>
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
