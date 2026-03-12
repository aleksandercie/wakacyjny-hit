'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationLink } from './navigationLink';
import { Logo } from '../logo';
import { NavigationBadge } from './navigationBadge';
import { ThemeSwitcher } from './themeSwitcher';
import { ROUTES } from '@/lib/routes';

export const MobileNavigation = ({
  links,
}: {
  links: { name: string; link: string }[];
}) => {
  const { CART } = ROUTES;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.touchAction = 'none';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.touchAction = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.touchAction = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const cartButton = (displayName: boolean) => (
    <Button
      variant="link"
      aria-label="Koszyk - Przejdź do koszyka"
      className="px-2 md:px-4"
    >
      <Link
        href={CART}
        className="flex gap-2 items-center font-bold text-foreground hover:text-primary focus:text-primary text-l relative"
        onClick={closeMenu}
        aria-label="Koszyk - Przejdź do koszyka"
      >
        {displayName ? 'Koszyk' : ''}
        <ShoppingCart size={20} className="size-5" />
        <NavigationBadge className="-top-[6px] -right-[10px]" />
      </Link>
    </Button>
  );

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between bg-background py-4 px-4 md:hidden">
      <Logo style="block" onClick={closeMenu} />
      <div className="flex gap-2 items-center">
        <ThemeSwitcher />
        {cartButton(false)}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-12 left-0 w-full bg-background p-8 md:hidden h-screen overflow-y-auto overscroll-contain touch-pan-y">
          <ul className="flex flex-col gap-4 items-center">
            {links.map(({ name, link }) => (
              <li key={name}>
                <NavigationLink name={name} link={link} onClick={closeMenu} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 items-center mt-4">
            {cartButton(true)}
          </div>
        </div>
      )}
    </div>
  );
};
