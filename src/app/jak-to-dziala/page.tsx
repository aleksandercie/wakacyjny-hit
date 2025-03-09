import { Faq, HowItWorks, ImageBanner } from '@/components';

export default function HowItWorksPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-16 p-2">
        <ImageBanner image="/banner.jpg" alt="Plaza" />
        <HowItWorks />
        <Faq />
      </main>
    </div>
  );
}
