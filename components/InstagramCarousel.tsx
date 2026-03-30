'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const interactingRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  // Duplicate for seamless looping
  const items = useMemo(() => [...photos, ...photos], [photos]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const markInteracting = () => {
      interactingRef.current = true;
    };

    let interactionTimeout: ReturnType<typeof setTimeout> | null = null;
    const unmarkSoon = () => {
      // Let momentum scrolling finish before resuming
      if (interactionTimeout) clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        interactingRef.current = false;
      }, 900);
    };

    const onScroll = () => {
      // infinite loop reset
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      // user is scrolling
      markInteracting();
      unmarkSoon();
    };

    const onPointerDown = () => {
      markInteracting();
    };
    const onPointerUp = () => {
      unmarkSoon();
    };

    const onTouchStart = () => {
      markInteracting();
    };
    const onTouchEnd = () => {
      unmarkSoon();
    };

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
      if (interactionTimeout) clearTimeout(interactionTimeout);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const shouldAutoScroll = !isHovering && !interactingRef.current;
      if (shouldAutoScroll) {
        el.scrollLeft += speedPxPerSecond * dt;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
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
  }, [isHovering, speedPxPerSecond]);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar overflow-x-auto pb-4 mb-8 -mx-4 px-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
