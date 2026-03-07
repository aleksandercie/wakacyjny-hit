import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[64vh] p-4 text-center">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-destructive">
          404 - Nie znaleziono
        </h1>
        <p className="text-muted mt-2">
          Przepraszamy, nie mogliśmy znaleźć tej strony.
        </p>
        <Link href="/" className="mt-6">
          <Button>Powrót do strony głównej</Button>
        </Link>
      </div>
    </main>
  );
}
