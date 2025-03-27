'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationLink } from './navigationLink';
import { Logo } from '../logo';
import { Badge } from '../badge';

export const MobileNavigation = ({
  links
}: {
  links: { name: string; link: string }[];
}) => {
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

  return (
    <div className="w-full flex justify-between md:hidden">
      <Logo style="block" onClick={closeMenu} />
      <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
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
            <Button variant="link">
              <Link
                href="/koszyk"
                className="flex gap-2 items-center font-bold text-black hover:text-primary focus:text-primary text-l relative"
                onClick={closeMenu}
              >
                Koszyk
                <ShoppingCart size={20} />
                <Badge quantity={1} className="-top-[6px] -right-[10px]" />
              </Link>
            </Button>
            <Button onClick={closeMenu}>Zaloguj się</Button>
          </div>
        </div>
      )}
    </div>
  );
};
