import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { EmailSignup } from '@/components/EmailSignup';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.home');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{ url: '/photos/kim-hero-back-dfyne.jpg', width: 1200, height: 630, alt: 'Kimberly Vanessa' }],
    },
  };
}

const TIKTOK_VIDEO_ID = '7500278697501527338';

export default async function HomePage() {
  const tHero = await getTranslations('hero');
  const tNiche = await getTranslations('niche');
  const tIg = await getTranslations('instagram');
  const tTiktok = await getTranslations('tiktok');
  const tEmail = await getTranslations('emailSignup');

  const pillars = tNiche.raw('pillars') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <Image
          src="/photos/kim-hero-back-dfyne.jpg"
          alt="Kimberly Vanessa — hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            @kim.montepeque
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-4 leading-tight">
            {tHero('name')}
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-serif italic mb-8 max-w-xl">
            {tHero('tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.instagram.com/kim.montepeque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {tHero('followInstagram')}
            </a>
            <Link
              href="/work-with-me"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-600 hover:border-accent hover:text-accent text-text-primary font-semibold rounded-lg transition-colors duration-200"
            >
              {tHero('workWithMe')}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── WHAT SHE DOES ─── */}
        <section className="py-24 border-t border-zinc-800/50" id="what-she-does">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {tNiche('label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {tNiche('heading')}
          </h2>

          {/* Pillars grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-surface rounded-2xl p-6 border border-zinc-800/50">
                <div className="w-8 h-0.5 bg-accent mb-4" />
                <h3 className="font-serif text-xl font-bold text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Philosophy + For Who */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-2 rounded-2xl p-8 border border-zinc-800/30">
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                {tNiche('philosophy.heading')}
              </h3>
              <p className="text-text-secondary leading-relaxed">{tNiche('philosophy.body')}</p>
            </div>
            <div className="bg-surface-2 rounded-2xl p-8 border border-zinc-800/30">
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                {tNiche('forWho.heading')}
              </h3>
              <p className="text-text-secondary leading-relaxed">{tNiche('forWho.body')}</p>
            </div>
          </div>
        </section>

        {/* ─── INSTAGRAM ─── */}
        <section className="py-24 border-t border-zinc-800/50" id="instagram">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {tIg('label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-2">
            {tIg('heading')}
          </h2>
          <p className="text-text-secondary mb-10">{tIg('followerCount')}</p>

          {/* Photo grid teaser */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              '/photos/kim-gym-mirror-red-shorts.jpg',
              '/photos/kim-back-tattoo-pulldown.jpg',
              '/photos/kim-planetfitness-white-leggings.jpg',
              '/photos/kim-locker-room-converse.jpg',
            ].map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/kim.montepeque/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Kimberly Vanessa Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/kim.montepeque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-zinc-600 hover:border-accent hover:text-accent text-text-primary font-semibold rounded-lg transition-colors duration-200"
            >
              {tIg('cta')} — {tIg('subheading')}
            </a>
          </div>
        </section>

        {/* ─── TIKTOK ─── */}
        <section className="py-24 border-t border-zinc-800/50" id="tiktok">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {tTiktok('label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-2">
            {tTiktok('heading')}
          </h2>
          <p className="text-text-secondary mb-2">{tTiktok('subheading')}</p>
          <p className="text-accent font-semibold text-sm mb-10">{tTiktok('followerCount')}</p>

          <div className="flex justify-center">
            <div className="relative w-full max-w-sm" style={{ paddingBottom: '177.78%' }}>
              <iframe
                src={`https://www.tiktok.com/embed/v2/${TIKTOK_VIDEO_ID}`}
                className="absolute inset-0 w-full h-full rounded-2xl"
                allowFullScreen
                allow="encrypted-media"
                title="Kimberly Vanessa TikTok"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.tiktok.com/@kim.montepeque"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-zinc-600 hover:border-accent hover:text-accent text-text-primary font-semibold rounded-lg transition-colors duration-200"
            >
              {tTiktok('cta')} — @kim.montepeque
            </a>
          </div>
        </section>

        {/* ─── EMAIL SIGNUP ─── */}
        <section className="py-24 border-t border-zinc-800/50" id="signup">
          <EmailSignup
            heading={tEmail('heading')}
            subheading={tEmail('subheading')}
            placeholder={tEmail('placeholder')}
            cta={tEmail('cta')}
            successMessage={tEmail('successMessage')}
            errorMessage={tEmail('errorMessage')}
          />
        </section>

      </div>
    </>
  );
}
