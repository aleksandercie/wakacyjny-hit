import { Banner, Gallery, HowItWorks, Offers } from '@/components';
import { getTrips } from '@/lib/api/getTrips';

export default async function Home() {
  const trips = await getTrips();

  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <Banner
          videoMobile="/video-mobile.mp4"
          video="/video-v2.mp4"
          title="Planujesz wymarzone wakacje?"
          description="Znajdź najlepsze oferty wyjazdów w najniższych cenach! Wiele destynacji na całym świecie – idealne miejsca na relaks, przygody i niezapomniane wspomnienia."
        />
        <Offers trips={trips} />
        <Gallery />
        <HowItWorks />
      </main>
    </div>
  );
}
