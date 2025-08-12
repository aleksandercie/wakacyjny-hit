'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationLink } from './navigationLink';
import { Logo } from '../logo';
import { NavigationBadge } from './navigationBadge';
import { ROUTES } from '@/lib/routes';

export const MobileNavigation = ({
  links
}: {
  links: { name: string; link: string }[];
}) => {
  const { CART } = ROUTES;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const cartButton = (displayName: boolean) => (
    <Button variant="link">
      <Link
        href={CART}
        className="flex gap-2 items-center font-bold text-black hover:text-primary focus:text-primary text-l relative"
        onClick={closeMenu}
      >
        {displayName ? 'Koszyk' : ''}
        <ShoppingCart size={20} />
        <NavigationBadge className="-top-[6px] -right-[10px]" />
      </Link>
    </Button>
  );

  return (
    <div className="w-full flex justify-between md:hidden">
      <Logo style="block" onClick={closeMenu} />
      <div className="flex gap-2 items-center">
        {menuOpen ? null : cartButton(false)}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-12 left-0 w-full bg-white p-8 md:hidden h-screen">
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
