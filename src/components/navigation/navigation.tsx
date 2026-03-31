import React from 'react';
import { NavigationLink } from './navigationLink';
import { MobileNavigation } from './mobileNavigation';
import { Logo } from '../logo';
import { CartPopover } from './cartPopover';
import { ThemeSwitcher } from './themeSwitcher';
import { ROUTES } from '@/lib/routes';

export const Navigation = () => {
  const { OFFERS, ABOUT_US, FAQ, CONTACT, HOW_IT_WORKS } = ROUTES;
  const links = [
    { name: 'Oferty', link: OFFERS },
    { name: 'O nas', link: ABOUT_US },
    { name: 'Jak to działa?', link: HOW_IT_WORKS },
    { name: 'FAQ', link: FAQ },
    { name: 'Kontakt', link: CONTACT },
  ];

  return (
    <div className="w-full flex fixed top-0 z-100 justify-between bg-background items-center">
      <div className="w-full flex items-center justify-between max-w-[1920px] mx-auto relative py-4 px-4 md:px-2 ">
        <Logo style="hidden md:block" />
        <div className="hidden md:flex items-center gap-6 lg:gap-12">
          <ul className="flex gap-4 lg:gap-8">
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
        <div className="w-full h-[36px] md:hidden" />
      </div>
    </div>
  );
};
