import React from 'react';
import { Video } from '../video';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';

export const Banner = ({
  video,
  videoMobile,
  title,
  description
}: {
  video: string;
  videoMobile: string;
  title: string;
  description: string;
}) => {
  const { OFFERS } = ROUTES;

  return (
    <div className="w-full m-auto">
      <div className="relative">
        <div className="flex flex-col gap-3 sm:gap-6 absolute top-[90px] min-[500px]:top-3/5 min-[720px]:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[700px] z-1 w-full px-4">
          <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-6xl font-bold w-full mx-auto">
            {title}
          </h1>
          <p className="text-s xs:text-m sm:text-l lg:text-xl">{description}</p>
          <Link href={OFFERS}>
            <Button>Sprawdź</Button>
          </Link>
        </div>
        <div className="w-full h-[560px] min-[720px]:h-auto min-[720px]:max-h-[500px] rounded-md overflow-hidden">
          <Video videoSrc={video} videoSrcMobile={videoMobile} />
        </div>
      </div>
    </div>
  );
};
