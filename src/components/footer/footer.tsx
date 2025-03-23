import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Contact } from '../contact';

export const Footer = () => {
  const sections = [
    {
      title: 'Informacje',
      links: [
        { name: 'Oferty', link: '/oferty' },
        { name: 'O nas', link: '/o-nas' }
      ]
    },
    {
      title: 'Pomoc',
      links: [
        { name: 'Polityka prywatności', link: '/polityka-prywatnosci' },
        { name: 'Regulamin', link: '/regulamin' },
        { name: 'FAQ', link: '/faq' }
      ]
    }
  ];

  return (
    <div className="w-full bg-black flex flex-col text-white gap-12 p-8 mt-12">
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
                      className="text-base text-gray-400 hover:text-primary focus:text-primary"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Contact title="Kontakt" />
        </div>
        <div className="flex flex-col max-w-[520px] gap-4 md:mx-auto">
          <h4 className="text-xl font-bold">Newsletter</h4>
          <p className="text-base text-gray-400">
            Dołącz do naszego newslettera i bądź na bieżąco! Otrzymuj
            ekskluzywne oferty, nowości i inspiracje prosto na swoją skrzynkę.
            Zapisz się już teraz!
          </p>
          <div className="flex w-full max-w-sm space-x-4 mt-4 flex-col gap-4 sm:flex-row sm:items-center">
            <Input type="email" placeholder="Email" />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <p className="text-center text-base text-gray-400">
        © WakacyjnyHit.pl 2025
      </p>
    </div>
  );
};
