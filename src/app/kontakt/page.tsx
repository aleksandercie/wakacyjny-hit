import { Contact, ContactForm, ImageBanner } from '@/components';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-16 p-2">
        <ImageBanner
          image="/banner.jpg"
          alt="Plaza"
          title="Skontaktuj się z nami!"
        />
        <div className="max-w-[1000px] flex flex-col md:flex-row gap-8 mx-auto w-full items-center px-4">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <Contact title="Skontaktuj się z nami" />
            <p className="text-base">
              Sprawdź naszą sekcję{' '}
              <Link
                href="/faq"
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
