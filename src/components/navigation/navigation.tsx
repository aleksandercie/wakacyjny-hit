import Link from 'next/link';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const navItems = [
    { name: 'Oferty', link: './oferty' },
    { name: 'O nas', link: './o-nas' },
    { name: 'FAQ', link: './faq' },
    { name: 'Kontakt', link: './kontakt' }
  ];

  return (
    <div className="w-full flex sticky top-0 z-10 py-4 px-8 justify-between bg-white items-center rounded-b-lg">
      <Link href="/" className="font-bold text-secondary">
        Wakacyjny<span className="text-primary">Hit</span>
      </Link>
      <div className="flex items-center gap-16">
        <ul className="flex gap-8">
          {navItems.map(({ name, link }) => (
            <li key={name}>
              <Link
                href={link}
                className="font-semibold text-dark hover:text-accent focus:text-accent"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <Button variant="link">
            <ShoppingCart />
          </Button>
          <Button>Zaloguj się</Button>
        </div>
      </div>
    </div>
  );
};
