'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { use } from 'react';

const mountedPromise =
  typeof window !== 'undefined'
    ? Promise.resolve(true)
    : new Promise<boolean>(() => {});

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = use(mountedPromise);

  if (!mounted) {
    return <div className="w-5 h-5" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Zmień motyw"
      className="text-foreground hover:text-primary transition-colors cursor-pointer"
    >
      {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
