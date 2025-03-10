import { Faq, ImageBanner } from '@/components';

export default function FaqPage() {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-16 p-2">
        <ImageBanner image="/banner.jpg" alt="Plaza" title="Masz pytania?" />
        <Faq />
      </main>
    </div>
  );
}
