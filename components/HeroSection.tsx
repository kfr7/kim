'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  name: string;
  tagline: string;
  followInstagram: string;
  workWithMe: string;
}

export function HeroSection({ name, tagline, followInstagram, workWithMe }: HeroSectionProps) {
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
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

      {/* Centered text with fade-in animation */}
      <div className="animate-hero-fade-in relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
          @kim.montepeque
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-4 leading-tight">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary font-serif italic mb-8 max-w-xl mx-auto">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/kim.montepeque/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {followInstagram}
          </a>
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
