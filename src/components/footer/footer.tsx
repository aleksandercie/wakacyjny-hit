import Link from 'next/link';
import React from 'react';
import { Contact } from '../contact';
import { NewsletterForm } from './newsletterForm';

export const Footer = () => {
  const sections = [
    {
      title: 'Informacje',
      links: [
        { name: 'Oferty', link: '/oferty' },
        { name: 'O nas', link: '/o-nas' },
      ],
    },
    {
      title: 'Pomoc',
      links: [
        { name: 'Polityka prywatności', link: '/polityka-prywatnosci' },
        { name: 'Regulamin', link: '/regulamin' },
        { name: 'FAQ', link: '/faq' },
      ],
    },
  ];

  return (
    <div className="w-full bg-black flex flex-col text-white gap-12 p-8">
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
                      className="text-base text-gray-500 hover:text-primary focus:text-primary"
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
      <p className="text-center text-base text-gray-500">
        © WakacyjnyHit.pl 2026
      </p>
    </div>
  );
};
