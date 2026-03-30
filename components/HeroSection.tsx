'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  name: string;
  workWithMe: string;
  instagramStat: string;
  tiktokStat: string;
}

export function HeroSection({
  name,
  workWithMe,
  instagramStat,
  tiktokStat,
}: HeroSectionProps) {
  const [offset, setOffset] = useState(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    const handleScroll = () => {
      if (isMobileRef.current) return;
      setOffset(window.scrollY * 0.35);
    };

    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Parallax image wrapper */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}
      >
        <Image
          src="/photos/kim-hero-back-dfyne.jpg"
          alt="Kimberly Vanessa — hero"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

      {/* Centered text with fade-in animation */}
      <div className="animate-hero-fade-in relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-4 leading-tight">
          {name}
        </h1>
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">
          @kim.montepeque
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <a
            href="https://www.instagram.com/kim.montepeque/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/15 bg-background/70 backdrop-blur-sm text-sm font-semibold uppercase tracking-wide text-text-primary/90 hover:border-accent/60 hover:text-accent transition-colors"
            aria-label="Instagram followers"
          >
            {instagramStat}
          </a>
          <a
            href="https://www.tiktok.com/@kim.montepeque"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/15 bg-background/70 backdrop-blur-sm text-sm font-semibold uppercase tracking-wide text-text-primary/90 hover:border-accent/60 hover:text-accent transition-colors"
            aria-label="TikTok followers"
          >
            {tiktokStat}
          </a>
        </div>
        <div className="flex justify-center">
          <Link
            href="/work-with-me"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-600 hover:border-accent hover:text-accent text-text-primary font-semibold rounded-lg transition-colors duration-200"
          >
            {workWithMe}
          </Link>
        </div>
      </div>
    </section>
  );
}
