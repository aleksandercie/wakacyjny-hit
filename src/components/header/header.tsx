import React from 'react';

export const Header = ({
  title,
  subtitle,
  description
}: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return (
    <div
      className={`flex justify-between  items-end ${
        description ? 'mb-12' : 'mb-2'
      }`}
    >
      <div
        className={`flex flex-col 
           'size-[58%]' 
        `}
      >
        <h2 className="text-lg opacity-60">{title}</h2>
        <h3 className="text-4xl font-bold mt-4">{subtitle}</h3>
      </div>
      <p className="opacity-60 size-[40%] text-base">{description}</p>
    </div>
  );
};
