import { Banner, Gallery, Offers } from '@/components';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-12 p-2">
        <Banner
          video="/video.mp4"
          title="Podróżujmy razem po świecie"
          description="Odkrywaj z nami najpiękniejsze zakątki świata, w których każda chwila staje się niezapomnianą przygodą. Twoje wymarzone wakacje czekają."
        />
        <Offers />
        <Gallery />
      </main>
    </div>
  );
}
