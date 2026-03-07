import React from 'react';
import { NavigationLink } from './navigationLink';
import { MobileNavigation } from './mobileNavigation';
import { Logo } from '../logo';
import { CartPopover } from './cartPopover';
import { ThemeSwitcher } from './themeSwitcher';
import { ROUTES } from '@/lib/routes';

export const Navigation = () => {
  const { OFFERS, ABOUT_US, FAQ, CONTACT } = ROUTES;
  const links = [
    { name: 'Oferty', link: OFFERS },
    { name: 'O nas', link: ABOUT_US },
    { name: 'FAQ', link: FAQ },
    { name: 'Kontakt', link: CONTACT },
  ];

  return (
    <div className="w-full flex sticky top-0 z-100 py-4 px-4 md:px-8 justify-between bg-background items-center relative border-b border-border">
      <Logo style="hidden md:block" />
      <div className="hidden md:flex items-center gap-8 md:gap-12">
        <ul className="flex gap-8">
          {links.map(({ name, link }) => (
            <li key={name} className="text-foreground">
              <NavigationLink name={name} link={link} />
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <ThemeSwitcher />
          <CartPopover />
        </div>
      </div>
      <MobileNavigation links={links} />
    </div>
  );
};
