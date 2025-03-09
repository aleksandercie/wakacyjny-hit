import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export const Contact = ({ title }: { title: string }) => {
  const contact = [
    { link: 'facebook', icon: <Facebook /> },
    { link: 'instagram', icon: <Instagram /> },
    { link: 'mail', icon: <Mail /> }
  ];

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-base opacity-60">+48 800 800 800 900</p>
      <p className="text-base opacity-60">info@wakacyjnyhit.pl</p>
      <div className="flex gap-4">
        {contact.map(({ link, icon }) => (
          <Link
            key={link}
            href={link}
            className="text-sm hover:text-accent focus:text-accent"
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
