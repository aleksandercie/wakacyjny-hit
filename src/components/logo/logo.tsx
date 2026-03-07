import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  style?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ style, onClick }) => {
  const { HOME } = ROUTES;

  return (
    <Link
      href={HOME}
      className={`font-bold text-foreground text-xl ${style}`}
      onClick={onClick}
    >
      <Image
        src="/logo.png"
        alt={''}
        width={202}
        height={70}
        className="absolute top-[10px] left-[4px] sm:top-[2px] sm:left-[4px] md:left-[12px] w-[160px] h-[54px] sm:w-[202px] sm:h-[68px] z-1"
      />
    </Link>
  );
};
