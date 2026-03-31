'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
  photos: string[];
  href: string;
  speedPxPerSecond?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export function InstagramCarousel({
  photos,
  href,
  speedPxPerSecond = 22,
  cardWidth = 260,
  cardHeight = 325,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;
    let prev: number | null = null;
    let direction: 1 | -1 = 1;

    function tick(ts: number) {
      if (prev === null) prev = ts;
      const dt = Math.min((ts - prev) / 1000, 0.05);
      prev = ts;

      const max = el!.scrollWidth - el!.clientWidth;
      if (max > 1) {
        if (el!.scrollLeft >= max - 1) direction = -1;
        if (el!.scrollLeft <= 1) direction = 1;
        el!.scrollLeft += direction * speedPxPerSecond * dt;
      }

      rafId = requestAnimationFrame(tick);
    }

    // Simple polling: wait until images have loaded and the container is scrollable
    const pollId = setInterval(() => {
      if (el.scrollWidth > el.clientWidth + 10) {
        clearInterval(pollId);
        rafId = requestAnimationFrame(tick);
      }
    }, 100);

    return () => {
      clearInterval(pollId);
      cancelAnimationFrame(rafId);
    };
  }, [speedPxPerSecond]);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar overflow-x-auto pb-4 mb-8 -mx-4 px-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
      aria-label="Instagram photo carousel"
    >
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        {photos.map((src, i) => (
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
              alt={`Kimberly Vanessa Instagram post ${i + 1}`}
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
