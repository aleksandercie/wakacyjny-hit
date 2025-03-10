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
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12">
      <div className="flex flex-col w-full md:w-3/5">
        <h2 className="text-base sm:text-lg opacity-60">{title}</h2>
        <h3 className="text-2xl sm:text-4xl font-bold mt-4">{subtitle}</h3>
      </div>
      <p className="opacity-60 w-full md:w-2/5 text-sm mt-6 sm:mt-0 max-w-[360px] md:max-w-[100%] ">
        {description}
      </p>
    </div>
  );
};
