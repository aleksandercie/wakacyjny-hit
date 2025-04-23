import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
  style?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ style, onClick }) => {
  const { HOME } = ROUTES;

  return (
    <Link
      href={HOME}
      className={`font-bold text-black text-xl ${style}`}
      onClick={onClick}
    >
      Wakacyjny<span className="text-primary">Hit</span>
    </Link>
  );
};
