import { Faq, ImageBanner } from '@/components';

export default function FaqPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-8 md:gap-12 p-2 mb-12">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Masz pytania?" />
        <Faq />
      </main>
    </div>
  );
}
