import Link from 'next/link';

interface MobileHubProps {
  labels: {
    instagram: string;
    tiktok: string;
    workouts: string;
    workWithMe: string;
  };
}

export function MobileHub({ labels }: MobileHubProps) {
  return (
    <div className="md:hidden flex flex-wrap gap-2 justify-center px-4 py-5 border-b border-zinc-800/40">
      <a
        href="https://www.instagram.com/kim.montepeque/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-text-secondary border border-zinc-700/60 hover:border-accent hover:text-accent transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
        {labels.instagram}
      </a>
      <a
        href="https://www.tiktok.com/@kim.montepeque"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-text-secondary border border-zinc-700/60 hover:border-accent hover:text-accent transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z"/>
        </svg>
        {labels.tiktok}
      </a>
      <Link
        href="/workouts"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-text-secondary border border-zinc-700/60 hover:border-accent hover:text-accent transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 6.5h11"/>
          <path d="M6.5 17.5h11"/>
          <path d="M3 6.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/>
          <path d="M18 6.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/>
          <path d="M3 17.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/>
          <path d="M18 17.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/>
        </svg>
        {labels.workouts}
      </Link>
      <Link
        href="/work-with-me"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-text-secondary border border-zinc-700/60 hover:border-accent hover:text-accent transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        {labels.workWithMe}
      </Link>
    </div>
  );
}
