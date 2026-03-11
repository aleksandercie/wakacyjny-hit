import React from 'react';
import { NavigationLink } from './navigationLink';
import { Logo } from '../logo';
import { ROUTES } from '@/lib/routes';
import dynamic from 'next/dynamic';

const MobileNavigation = dynamic(() =>
  import('./mobileNavigation').then((mod) => mod.MobileNavigation),
);

const CartPopover = dynamic(() =>
  import('./cartPopover').then((mod) => mod.CartPopover),
);

const ThemeSwitcher = dynamic(
  () => import('./themeSwitcher').then((mod) => mod.ThemeSwitcher),
  { loading: () => <div className="w-5 h-5" /> },
);

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
    <div className="w-full flex sticky top-0 z-100 py-4 px-4 lg:px-8 justify-between bg-background items-center relative">
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
    </div>
  );
};
