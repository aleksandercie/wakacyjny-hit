import React from 'react';
import { Video } from '../video';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';
import { boxShadow, textShadow } from '@/lib/styles';
import { Skeleton } from '../ui/skeleton';

export const Banner = ({
  video,
  videoMobile,
  title,
  description,
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
        <div className="flex flex-col gap-3 sm:gap-6 absolute top-[64%] 2xs:top-[68%] min-[720px]:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white text-center max-w-[700px] z-1 w-full px-4 z-[2]">
          <h1
            className="text-xl 2xs:text-2xl sm:text-4xl lg:text-6xl font-bold w-full mx-auto"
            style={{ textShadow }}
          >
            {title}
          </h1>
          <p
            className="text-sm xs:text-m sm:text-l lg:text-xl"
            style={{ textShadow }}
          >
            {description}
          </p>
          <Link href={OFFERS}>
            <Button style={{ boxShadow }}>Sprawdź</Button>
          </Link>
        </div>
        <div className="w-full h-[480px] min-[720px]:h-auto min-[720px]:max-h-[500px] rounded-md overflow-hidden relative">
          <Video videoSrc={video} videoSrcMobile={videoMobile} />
          <Skeleton className="w-full h-full absolute top-0 left-0 z-[0]" />
        </div>
      </div>
    </div>
  );
};
