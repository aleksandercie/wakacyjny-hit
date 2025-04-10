import React from 'react';
import { NavigationLink } from './navigationLink';
import { MobileNavigation } from './mobileNavigation';
import { Logo } from '../logo';
import { CartPopover } from './cartPopover';

export const Navigation = () => {
  const links = [
    { name: 'Oferty', link: '/oferty' },
    { name: 'O nas', link: '/o-nas' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Kontakt', link: '/kontakt' }
  ];

  return (
    <div className="w-full flex sticky top-0 z-100 py-4 px-4 md:px-8 justify-between bg-white items-center rounded-b-lg">
      <Logo style="hidden md:block" />
      <div className="hidden md:flex items-center gap-8 md:gap-16">
        <ul className="flex gap-8">
          {links.map(({ name, link }) => (
            <li key={name} className="text-black">
              <NavigationLink name={name} link={link} />
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <CartPopover />
          {/* <Button variant="link">
            <User size={20} />
            Zaloguj się
          </Button> */}
        </div>
      </div>
      <MobileNavigation links={links} />
    </div>
  );
};
