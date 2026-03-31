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
    let lastTs: number | null = null;
    let dir: 1 | -1 = 1;
    let interacting = false;
    let interactionTimer: ReturnType<typeof setTimeout> | null = null;
    let started = false;

    const markInteracting = () => {
      interacting = true;
      if (interactionTimer) { clearTimeout(interactionTimer); interactionTimer = null; }
    };
    const unmarkSoon = () => {
      if (interactionTimer) clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => { interacting = false; }, 900);
    };

    el.addEventListener('pointerdown', markInteracting, { passive: true });
    el.addEventListener('touchstart', markInteracting, { passive: true });
    window.addEventListener('pointerup', unmarkSoon, { passive: true });
    el.addEventListener('touchend', unmarkSoon, { passive: true });

    const step = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05); // cap dt to avoid jumps
      lastTs = ts;

      if (!interacting) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 1) {
          started = true;
          if (el.scrollLeft >= max - 1) dir = -1;
          if (el.scrollLeft <= 1) dir = 1;
          el.scrollLeft += dir * speedPxPerSecond * dt;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    // Wait for images to load and layout to settle before starting
    // Use ResizeObserver as the trigger — once the inner row has real width, start.
    const inner = el.firstElementChild as HTMLElement | null;
    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const tryStart = () => {
      if (started) return;
      if (el.scrollWidth > el.clientWidth + 10) {
        rafId = requestAnimationFrame(step);
      } else {
        // retry — layout not ready yet
        startTimer = setTimeout(tryStart, 200);
      }
    };

    const ro = new ResizeObserver(() => {
      if (!started && el.scrollWidth > el.clientWidth + 10) {
        clearTimeout(startTimer!);
        rafId = requestAnimationFrame(step);
      }
    });

    if (inner) ro.observe(inner);

    // Also just try after 600ms as a fallback (covers mobile slow paint)
    startTimer = setTimeout(tryStart, 600);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (startTimer) clearTimeout(startTimer);
      if (interactionTimer) clearTimeout(interactionTimer);
      el.removeEventListener('pointerdown', markInteracting);
      el.removeEventListener('touchstart', markInteracting);
      window.removeEventListener('pointerup', unmarkSoon);
      el.removeEventListener('touchend', unmarkSoon);
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
