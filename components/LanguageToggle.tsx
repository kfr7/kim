'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/actions/setLocale';

interface Props {
  currentLocale: string;
  label: string;
}

export function LanguageToggle({ currentLocale, label }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    const next = currentLocale === 'en' ? 'es' : 'en';
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 border border-zinc-700 rounded hover:border-accent hover:text-accent transition-colors duration-200 disabled:opacity-50 inline-flex items-center gap-2"
      aria-label="Toggle language"
    >
      <span className="text-sm">🌐</span>
      {isPending ? '...' : label}
    </button>
  );
}
