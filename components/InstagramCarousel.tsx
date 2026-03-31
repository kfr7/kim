'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
  photos: string[];
  href: string;
  /** pixels per second when auto-scrolling */
  speedPxPerSecond?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export function InstagramCarousel({
  photos,
  href,
  speedPxPerSecond = 20,
  cardWidth = 260,
  cardHeight = 325,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;
    let lastTs: number | null = null;
    let dir: 1 | -1 = 1;
    let interacting = false;
    let interactionTimer: ReturnType<typeof setTimeout> | null = null;

    const markInteracting = () => {
      interacting = true;
      if (interactionTimer) clearTimeout(interactionTimer);
      interactionTimer = null;
    };

    const unmarkSoon = () => {
      if (interactionTimer) clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        interacting = false;
      }, 900);
    };

    const onScroll = () => { markInteracting(); unmarkSoon(); };
    const onPointerDown = () => markInteracting();
    const onPointerUp = () => unmarkSoon();
    const onTouchStart = () => markInteracting();
    const onTouchEnd = () => unmarkSoon();

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    const step = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!interacting) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          if (el.scrollLeft >= max - 2) dir = -1;
          if (el.scrollLeft <= 2) dir = 1;
          el.scrollLeft += dir * speedPxPerSecond * dt;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    // Small delay so layout is fully painted before we start scrolling
    const startTimer = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      if (interactionTimer) clearTimeout(interactionTimer);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [speedPxPerSecond]);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar overflow-x-auto pb-4 mb-8 -mx-4 px-4"
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
