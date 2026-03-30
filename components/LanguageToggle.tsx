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
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {isPending ? '...' : label}
    </button>
  );
}
