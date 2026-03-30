import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { EmailSignup } from '@/components/EmailSignup';
import { HeroSection } from '@/components/HeroSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.home');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og', width: 1200, height: 630, alt: 'Kimberly Vanessa' }],
    },
  };
}

const TIKTOK_VIDEO_ID = '7500278697501527338';

// All available photos for the Instagram horizontal strip
const INSTAGRAM_PHOTOS = [
  '/photos/kim-gym-mirror-red-shorts.jpg',
  '/photos/kim-back-tattoo-pulldown.jpg',
  '/photos/kim-planetfitness-white-leggings.jpg',
  '/photos/kim-locker-room-converse.jpg',
  '/photos/kim-bathroom-pink-leggings.jpg',
  '/photos/kim-locker-room-glutes-teal.jpg',
];

export default async function HomePage() {
  const tHero = await getTranslations('hero');
  const tStory = await getTranslations('story');
  const tNiche = await getTranslations('niche');
  const tIg = await getTranslations('instagram');
  const tTiktok = await getTranslations('tiktok');
  const tEmail = await getTranslations('emailSignup');

  const pillars = tNiche.raw('pillars') as Array<{ title: string; description: string }>;

  // JSON-LD structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kimberly Vanessa',
    url: 'https://kimberlyvanessa.com',
    sameAs: [
      'https://www.instagram.com/kim.montepeque/',
      'https://www.tiktok.com/@kim.montepeque',
    ],
    jobTitle: 'Fitness Creator',
    description:
      'LA-based Latina fitness creator. Glutes & legs specialist. Real training, real results.',
    image: 'https://kimberlyvanessa.com/photos/kim-hero-back-dfyne.jpg',
  };

  return (
    <>
      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ─── HERO (parallax + centered + fade-in) ─── */}
      <HeroSection
        name={tHero('name')}
        workWithMe={tHero('workWithMe')}
        instagramStat={tHero('instagramStat')}
        tiktokStat={tHero('tiktokStat')}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── MY STORY ─── */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-zinc-800/50" id="story">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                {tStory('label')}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                {tStory('heading')}
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>{tStory('body1')}</p>
                <p>{tStory('body2')}</p>
                <p>{tStory('body3')}</p>
              </div>
              <p className="mt-6 text-accent font-semibold font-serif italic">
                {tStory('cta')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* ─── WHAT I DO ─── */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-zinc-800/50" id="what-i-do">
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
        </ScrollReveal>

        {/* ─── INSTAGRAM — horizontal scrollable strip ─── */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-zinc-800/50" id="instagram">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              {tIg('label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-2">
              {tIg('heading')}
            </h2>
            <p className="text-text-secondary mb-10">{tIg('followerCount')}</p>

            {/* Auto-scrolling infinite carousel */}
            <div className="overflow-hidden mb-8">
              <div className="flex gap-3 animate-scroll">
                {[...INSTAGRAM_PHOTOS, ...INSTAGRAM_PHOTOS].map((src, i) => (
                  <a
                    key={i}
                    href="https://www.instagram.com/kim.montepeque/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative shrink-0 rounded-xl overflow-hidden group"
                    style={{ width: '260px', height: '325px' }}
                  >
                    <Image
                      src={src}
                      alt={`Kimberly Vanessa Instagram post ${(i % INSTAGRAM_PHOTOS.length) + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="260px"
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
                  </a>
                ))}
              </div>
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
        </ScrollReveal>

        {/* ─── TIKTOK ─── */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-zinc-800/50" id="tiktok">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              {tTiktok('label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-2">
              {tTiktok('heading')}
            </h2>
            <p className="text-text-secondary mb-2">{tTiktok('subheading')}</p>
            <p className="text-accent font-semibold text-sm mb-10">{tTiktok('followerCount')}</p>

            <div className="flex justify-center">
              <iframe
                src={`https://www.tiktok.com/embed/v2/${TIKTOK_VIDEO_ID}`}
                className="w-full max-w-sm rounded-2xl"
                style={{ height: '750px' }}
                allowFullScreen
                allow="encrypted-media"
                title="Kimberly Vanessa TikTok"
              />
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
        </ScrollReveal>

        {/* ─── EMAIL SIGNUP ─── */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-zinc-800/50" id="signup">
            <EmailSignup
              label={tEmail('label')}
              heading={tEmail('heading')}
              subheading={tEmail('subheading')}
              namePlaceholder={tEmail('namePlaceholder')}
              placeholder={tEmail('placeholder')}
              cta={tEmail('cta')}
              successMessage={tEmail('successMessage')}
              errorMessage={tEmail('errorMessage')}
            />
          </section>
        </ScrollReveal>

      </div>
    </>
  );
}
