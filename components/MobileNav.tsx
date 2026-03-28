'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${
            open ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${
            open ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-zinc-800/50 z-40">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 py-3 border-b border-zinc-800/30 last:border-0"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
