import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { origin } = new URL(req.url);

  // Try to load Playfair Display Bold for premium typography
  let fontData: ArrayBuffer | null = null;
  try {
    const cssRes = await fetch(
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=block',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const css = await cssRes.text();
    const urlMatch = css.match(/src: url\(([^)]+)\) format\('woff2'\)/);
    if (urlMatch?.[1]) {
      fontData = await fetch(urlMatch[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // fallback to system serif
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0A0A0A',
          overflow: 'hidden',
        }}
      >
        {/* Hero photo background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${origin}/photos/new_hero.PNG`}
          alt=""
          style={{
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Dark gradient overlay — left-to-right so text is readable */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background:
              'linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.70) 55%, rgba(10,10,10,0.30) 100%)',
          }}
        />
        {/* Text content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 80px',
            maxWidth: '700px',
          }}
        >
          <p
            style={{
              color: '#7B2FBE',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'sans-serif',
            }}
          >
            @kim.montepeque
          </p>
          <h1
            style={{
              color: '#F5F5F5',
              fontSize: '76px',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: '18px',
              fontFamily: fontData ? 'Playfair Display' : 'Georgia, serif',
            }}
          >
            Kimberly Vanessa
          </h1>
          <p
            style={{
              color: '#A1A1AA',
              fontSize: '26px',
              fontStyle: 'italic',
              fontFamily: fontData ? 'Playfair Display' : 'Georgia, serif',
              lineHeight: 1.4,
            }}
          >
            Built different. Entrenada con propósito.
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [{ name: 'Playfair Display', data: fontData, weight: 700, style: 'normal' }]
        : undefined,
    }
  );
}
