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
    <div className="flex justify-between mb-12 items-end">
      <div className="flex flex-col size-[58%]">
        <h2 className="text-sm opacity-60">{title}</h2>
        <h3 className="text-xl font-bold mt-4">{subtitle}</h3>
      </div>
      <p className="opacity-60 size-[40%] text-sm">{description}</p>
    </div>
  );
};
