import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StartOverTimeline } from '@/components/StartOverTimeline';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.startOver');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

export default async function StartOverPage() {
  const t = await getTranslations('startOver');
  const sections = t.raw('sections') as Array<{ heading: string; body: string }>;
  const priorities = t.raw('priorities.items') as string[];
  const timeline = t.raw('timeline') as Array<{ year: string; label: string }>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Advice</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-12 leading-tight">
        {t('heading')}
      </h1>

      {/* ─── Progress Timeline ─── */}
      <ScrollReveal>
        <StartOverTimeline
          milestones={timeline}
          heading={t('timelineHeading')}
        />
      </ScrollReveal>

      {/* 2018 beginning photo */}
      <ScrollReveal>
        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden mb-12">
          <Image
            src="/photos/kim-2018-beginning.jpg"
            alt="Kimberly Vanessa — 2018 beginning"
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 384px"
          />
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold tracking-wider uppercase text-accent">
              2018 — The Beginning
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-text-secondary text-lg leading-relaxed mb-12 border-l-2 border-accent pl-5 italic">
          {t('intro')}
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">
                {section.heading}
              </h2>
              <p className="text-text-secondary leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Priorities callout */}
      <ScrollReveal>
        <div className="mt-16 bg-surface-2 rounded-2xl p-8 border border-accent/20">
          <div className="w-8 h-0.5 bg-accent mb-5" />
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-6">
            {t('priorities.heading')}
          </h2>
          <ol className="space-y-3">
            {priorities.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent font-bold font-serif text-lg leading-none pt-0.5 w-5 shrink-0">
                  {i + 1}
                </span>
                <span className="text-text-primary">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>
    </div>
  );
}
