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
    <div className="w-full bg-primary flex flex-col text-white gap-12 p-8 mt-12">
      <div className="flex gap-12 justify-between mb-8">
        {sections.map(({ title, links }) => (
          <div key={title} className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">{title}</h4>
            <ul className="flex flex-col gap-2">
              {links.map(({ name, link }) => (
                <li key={name}>
                  <Link
                    href={link}
                    className="text-sm opacity-60 hover:text-accent focus:text-accent"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Contact title="Kontakt" />
        <div className="flex flex-col max-w-[520px] gap-4">
          <h4 className="text-lg font-bold">Newsletter</h4>
          <p className="text-sm opacity-60">
            Dołącz do naszego newslettera i bądź na bieżąco! Otrzymuj
            ekskluzywne oferty, nowości i inspiracje prosto na swoją skrzynkę.
            Zapisz się już teraz!
          </p>
          <div className="flex w-full max-w-sm items-center space-x-4">
            <Input type="email" placeholder="Email" className="rounded-md" />
            <Button type="submit" variant="submit">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <p className="text-center text-sm opacity-60">© WakacyjnyHit.pl 2025</p>
    </div>
  );
};
