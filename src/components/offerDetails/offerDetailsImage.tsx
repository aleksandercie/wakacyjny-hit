import { dynamicBlurDataUrl } from '@/lib/blurImage';
import Image from 'next/image';

export const OfferDetailsImage = async ({
  image,
  title
}: {
  image: string;
  title: string;
}) => {
  const blurImage = await dynamicBlurDataUrl(image, 1080);

  return (
    <Image
      src={image}
      alt={title}
      width={1080}
      height={720}
      placeholder="blur"
      blurDataURL={blurImage}
      className="rounded-md max-h-[500px]"
    />
  );
};
