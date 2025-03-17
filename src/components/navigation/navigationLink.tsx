'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export const NavigationLink = ({
  name,
  link,
  onClick
}: {
  name: string;
  link: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname !== '/' && link.includes(pathname);

  return (
    <Link
      href={link}
      className={`font-bold text-black hover:text-primary focus:text-primary text-l ${
        isActive ? 'text-primary' : ''
      }`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};
