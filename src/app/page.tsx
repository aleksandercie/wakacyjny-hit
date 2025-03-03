import { Banner } from '@/components';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-montserrat-sans)]">
      <main className="flex">
        <Banner
          image="/banner.jpg"
          title="Twój idealny urlop"
          description="Odkrywaj z nami najpiękniejsze zakątki świata, w których każda chwila staje się niezapomnianą przygodą. Twoje wymarzone wakacje czekają."
        />
      </main>
    </div>
  );
}
