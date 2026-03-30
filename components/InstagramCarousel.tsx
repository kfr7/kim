'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

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
  speedPxPerSecond = 18,
  cardWidth = 260,
  cardHeight = 325,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Only pause when the user is actively dragging/touching/scrolling.
  const userInteractingRef = useRef(false);
  let interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ping-pong direction: 1 = right, -1 = left
  const dirRef = useRef<1 | -1>(1);

  const items = useMemo(() => photos, [photos]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const markInteracting = () => {
      userInteractingRef.current = true;
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    };

    const unmarkSoon = () => {
      // Let momentum scrolling finish before resuming
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false;
      }, 900);
    };

    const onScroll = () => {
      markInteracting();
      unmarkSoon();
    };

    const onPointerDown = () => markInteracting();
    const onPointerUp = () => unmarkSoon();

    const onTouchStart = () => markInteracting();
    const onTouchEnd = () => unmarkSoon();

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!userInteractingRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          // reverse at ends (with a tiny epsilon)
          if (el.scrollLeft >= max - 1) dirRef.current = -1;
          if (el.scrollLeft <= 0 + 1) dirRef.current = 1;
          el.scrollLeft += dirRef.current * speedPxPerSecond * dt;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [speedPxPerSecond]);

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
