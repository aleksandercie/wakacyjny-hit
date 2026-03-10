import Link from 'next/link';
import React from 'react';
import { Contact } from '../contact';
import { NewsletterForm } from './newsletterForm';
import { ROUTES } from '@/lib/routes';

const { OFFERS, ABOUT_US, PRIVACY_POLICY, TERMS, FAQ, HOW_IT_WORKS } = ROUTES;

export const Footer = () => {
  const sections = [
    {
      title: 'Informacje',
      links: [
        { name: 'Oferty', link: OFFERS },
        { name: 'O nas', link: ABOUT_US },
        { name: 'Jak to działa?', link: HOW_IT_WORKS },
      ],
    },
    {
      title: 'Pomoc',
      links: [
        { name: 'Polityka prywatności', link: PRIVACY_POLICY },
        { name: 'Regulamin', link: TERMS },
        { name: 'FAQ', link: FAQ },
      ],
    },
  ];

  return (
    <div className="w-full bg-foreground dark:bg-background flex flex-col text-background dark:text-foreground gap-12 p-8 border-t border-border">
      <div className="flex flex-col lg:flex-row gap-12 justify-between mb-8">
        <div className="flex flex-col md:flex-row gap-12 md:mx-auto">
          {sections.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ name, link }) => (
                  <li key={name}>
                    <Link
                      href={link}
                      className="text-base text-muted hover:text-primary focus:text-primary"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Contact title="Kontakt" footer />
        </div>
        <NewsletterForm />
      </div>
      <p className="text-center text-base text-muted">
        © WakacyjnyHit.com 2026
      </p>
    </div>
  );
};
