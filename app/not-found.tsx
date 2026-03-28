'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('kim_lang='));
    if (cookie) {
      const val = cookie.split('=')[1];
      if (val === 'es') setLocale('es');
    }
  }, []);

  const copy = {
    en: {
      heading: "Looks like this page skipped leg day.",
      sub: "The page you're looking for doesn't exist.",
      cta: "Back to Home",
    },
    es: {
      heading: "Parece que esta página se saltó el día de piernas.",
      sub: "La página que buscas no existe.",
      cta: "Volver al Inicio",
    },
  };

  const c = locale === 'es' ? copy.es : copy.en;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Animated dumbbell emoji */}
      <div className="text-6xl mb-8 select-none" style={{ animation: 'dumbbell-roll 2.5s ease-in-out infinite' }}>
        🏋️
      </div>

      <style>{`
        @keyframes dumbbell-roll {
          0% { transform: translateX(-20px) rotate(-10deg); opacity: 1; }
          40% { transform: translateX(20px) rotate(10deg); opacity: 1; }
          70% { transform: translateX(60px) rotate(25deg); opacity: 0.5; }
          71% { transform: translateX(-60px) rotate(-25deg); opacity: 0; }
          72% { transform: translateX(-60px) rotate(-25deg); opacity: 0.5; }
          100% { transform: translateX(-20px) rotate(-10deg); opacity: 1; }
        }
      `}</style>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4 max-w-md">
        {c.heading}
      </h1>
      <p className="text-text-secondary mb-8">{c.sub}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors duration-200"
      >
        {c.cta}
      </Link>
    </div>
  );
}
