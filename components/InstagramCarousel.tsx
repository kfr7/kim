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

    let rafId = 0;
    let lastTs: number | null = null;
    let dir: 1 | -1 = 1;
    let hovering = false;
    let dragging = false;
    let dragResumeTimer: ReturnType<typeof setTimeout> | null = null;
    let running = false;

    /* ── Hover: pause while pointer is over the carousel ── */
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    /* ── Drag / touch: pause during active manipulation ── */
    const onDragStart = () => {
      dragging = true;
      if (dragResumeTimer) { clearTimeout(dragResumeTimer); dragResumeTimer = null; }
    };
    const onDragEnd = () => {
      if (dragResumeTimer) clearTimeout(dragResumeTimer);
      dragResumeTimer = setTimeout(() => { dragging = false; }, 900);
    };

    el.addEventListener('pointerenter', onEnter, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    el.addEventListener('pointerdown', onDragStart, { passive: true });
    el.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('pointerup', onDragEnd, { passive: true });
    el.addEventListener('touchend', onDragEnd, { passive: true });

    const step = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      if (!hovering && !dragging) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 1) {
          if (el.scrollLeft >= max - 1) dir = -1;
          if (el.scrollLeft <= 1) dir = 1;
          el.scrollLeft += dir * speedPxPerSecond * dt;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    /* ── Start the animation loop (only once) ── */
    const beginLoop = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };

    const inner = el.firstElementChild as HTMLElement | null;
    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const tryStart = () => {
      if (running) return;
      if (el.scrollWidth > el.clientWidth + 10) {
        beginLoop();
      } else {
        startTimer = setTimeout(tryStart, 200);
      }
    };

    const ro = new ResizeObserver(() => {
      if (!running && el.scrollWidth > el.clientWidth + 10) {
        if (startTimer) clearTimeout(startTimer);
        beginLoop();
      }
    });

    if (inner) ro.observe(inner);
    startTimer = setTimeout(tryStart, 600);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (startTimer) clearTimeout(startTimer);
      if (dragResumeTimer) clearTimeout(dragResumeTimer);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', onDragStart);
      el.removeEventListener('touchstart', onDragStart);
      window.removeEventListener('pointerup', onDragEnd);
      el.removeEventListener('touchend', onDragEnd);
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
