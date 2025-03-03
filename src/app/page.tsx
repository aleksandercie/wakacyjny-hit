import { Banner } from '@/components';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-montserrat-sans)]">
      <main className="flex">
        <Banner
          video="/video.mp4"
          title="Podróżujmy razem po świecie"
          description="Odkrywaj z nami najpiękniejsze zakątki świata, w których każda chwila staje się niezapomnianą przygodą. Twoje wymarzone wakacje czekają."
        />
      </main>
    </div>
  );
}
