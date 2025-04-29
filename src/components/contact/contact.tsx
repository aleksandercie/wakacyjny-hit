import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export const Contact = ({
  title,
  footer
}: {
  title: string;
  footer?: boolean;
}) => {
  const contact = [
    { link: 'facebook', icon: <Facebook />, name: 'Facebook' },
    { link: 'instagram', icon: <Instagram />, name: 'Intagram' },
    { link: 'mail', icon: <Mail />, name: 'Mail' }
  ];

  const isFooter = footer === true;

  return (
    <div className="flex flex-col gap-4">
      {isFooter ? (
        <h4 className="text-xl font-bold">{title}</h4>
      ) : (
        <h2 className="text-xl font-bold">{title}</h2>
      )}
      <p className="text-base text-gray-500">+48 800 800 800</p>
      <p className="text-base text-gray-500">info@wakacyjnyhit.pl</p>
      <div className="flex gap-4">
        {contact.map(({ link, icon, name }) => (
          <Link
            key={link}
            href={link}
            className="text-sm hover:text-primary focus:text-primary"
            target="_blank"
            aria-label={name}
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
