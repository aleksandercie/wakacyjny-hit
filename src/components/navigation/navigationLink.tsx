'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export const NavigationLink = ({
  name,
  link
}: {
  name: string;
  link: string;
}) => {
  const pathname = usePathname();
  const isActive = link.includes(pathname);

  return (
    <Link
      href={link}
      className={`font-bold text-dark hover:text-accent focus:text-accent ${
        isActive ? 'text-accent' : ''
      }`}
    >
      {name}
    </Link>
  );
};
