import { ImageBanner } from '@/components';

export default function OffersPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col 6 p-2">
        <ImageBanner
          image="/banner.jpg"
          alt="Plaza"
          title="Twoje wymarzone wakacje czekają!"
        />
      </main>
    </div>
  );
}
