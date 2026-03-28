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
      images: [{ url: '/photos/kim-hero-back-dfyne.jpg', width: 1200, height: 630, alt: 'Kim Montepeque' }],
    },
  };
}

export default async function HomePage() {
  const tHero = await getTranslations('hero');
  const tStory = await getTranslations('story');
  const tNiche = await getTranslations('niche');
  const tIg = await getTranslations('instagram');
  const tEmail = await getTranslations('emailSignup');

  const pillars = tNiche.raw('pillars') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <Image
          src="/photos/kim-hero-back-dfyne.jpg"
          alt="Kim Montepeque — hero"
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

        {/* ─── HER STORY ─── */}
        <section className="py-24" id="story">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {tStory('label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-12 max-w-2xl">
            {tStory('heading')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 2018 photo */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/photos/kim-2018-beginning.jpg"
                alt="Kim Montepeque — 2018 beginning"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <p className="text-xs font-semibold tracking-wider uppercase text-accent">
                  {tStory('beginningLabel')}
                </p>
              </div>
            </div>

            {/* Recent photo */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/photos/kim-locker-room-glutes-teal.jpg"
                alt="Kim Montepeque — now"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <p className="text-xs font-semibold tracking-wider uppercase text-accent">
                  {tStory('nowLabel')}
                </p>
              </div>
            </div>
          </div>

          {/* Story text */}
          <div className="max-w-2xl space-y-4">
            <p className="text-text-primary text-lg leading-relaxed">{tStory('body1')}</p>
            <p className="text-text-secondary leading-relaxed">{tStory('body2')}</p>
            <p className="text-text-secondary leading-relaxed">{tStory('body3')}</p>
            <p className="text-accent font-semibold font-serif italic text-lg">{tStory('cta')}</p>
          </div>
        </section>

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
                  alt={`Kim Montepeque Instagram post ${i + 1}`}
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
