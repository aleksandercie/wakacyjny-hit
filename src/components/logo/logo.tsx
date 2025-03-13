import Link from 'next/link';
import React from 'react';

interface LogoProps {
  style?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ style, onClick }) => {
  return (
    <Link
      href="/"
      className={`font-bold text-secondary text-xl ${style}`}
      onClick={onClick}
    >
      Wakacyjny<span className="text-primary">Hit</span>
    </Link>
  );
};
