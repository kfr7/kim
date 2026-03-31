'use client';

import { useEffect, useRef, useState } from 'react';

const MESSAGE = `Hola, mi amor de mi vida. Feliz aniversario de los 7 meses más increíbles que he tenido en mi vida. Eres mi bebé, eres mi niña y eres mi supermujer, que admiro con toda mi alma. Quiero que sepas, y quiero siempre mostrarlo, que te admiro profundamente, que te amo muchísimo, y que siempre te voy a soportar, cuidar y proteger. Te amo infinitamente, mi amor, y voy a estar aquí en cada paso de tu camino.

P.D. Puse el nombre del website kimberlyvanessa, y no incluí tu apellido porque eso va a cambiar, y esta marca tuya va a ser para toda la vida y más allá.

P.D. (además) ¿Ves? ¡Te dije que podía escribir en cursiva jeje`;

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#7B2FBE', '#A855F7', '#6B21A8', '#C084FC', '#F5F5F5', '#D8B4FE'];

    interface Particle {
      x: number; y: number; w: number; h: number;
      color: string; rotation: number; rotSpeed: number;
      vx: number; vy: number; opacity: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1.5,
        w: 4 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.2 + Math.random() * 2.5,
        opacity: 0.7 + Math.random() * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

export function AnniversaryModal() {
  const [open, setOpen] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!open) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayedText(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) {
        clearInterval(id);
        setTimeout(() => setShowButton(true), 400);
      }
    }, 32);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Confetti />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ zIndex: 9998, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      >
        <div
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-purple-500/30 shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #1A1A2E 0%, #0A0A0A 100%)',
            boxShadow: '0 0 60px rgba(123, 47, 190, 0.25), 0 0 120px rgba(123, 47, 190, 0.1)',
          }}
        >
          {/* Top decorative line */}
          <div
            className="h-1 w-full rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, #6B21A8, #A855F7, #6B21A8)' }}
          />

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Title */}
            <h2
              className="text-center mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                fontStyle: 'italic',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #C084FC, #A855F7, #7B2FBE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Feliz Aniversario
            </h2>

            {/* Heart divider */}
            <div className="text-center mb-6 text-purple-400 text-lg tracking-widest">
              &#10084;&#10084;&#10084;
            </div>

            {/* Handwritten letter */}
            <div
              className="leading-relaxed text-purple-100/90"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                lineHeight: 1.85,
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayedText}
              <span
                className="inline-block w-[2px] h-[1.1em] bg-purple-400 align-middle ml-[2px]"
                style={{
                  animation: 'blink 0.8s step-end infinite',
                }}
              />
            </div>

            {/* Close button */}
            {showButton && (
              <div
                className="mt-8 text-center"
                style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}
              >
                <p
                  className="text-purple-300/80 text-sm mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
                >
                  Para cerrar esto, primero tienes que darme un beso 💋
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #6B21A8, #A855F7)',
                    boxShadow: '0 4px 20px rgba(123, 47, 190, 0.4)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                  }}
                >
                  Ya te di tu beso 💜
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
