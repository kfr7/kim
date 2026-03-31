'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

interface Props {
  photos: string[];
  href: string;
  cardWidth?: number;
  cardHeight?: number;
}

export function InstagramCarousel({
  photos,
  href,
  cardWidth = 260,
  cardHeight = 325,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Duplicate for seamless infinite scroll
  const items = useMemo(() => [...photos, ...photos], [photos]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar overflow-x-auto pb-4 mb-8 -mx-4 px-4"
      aria-label="Instagram photo carousel"
    >
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        {items.map((src, i) => (
          <a
            key={`${src}-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 rounded-xl overflow-hidden group"
            style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
          >
            <Image
              src={src}
              alt={`Kimberly Vanessa Instagram post ${(i % photos.length) + 1}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes={`${cardWidth}px`}
            />
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
}
