import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.diet');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

export default async function DietPage() {
  const t = await getTranslations('diet');

  const breakfastItems = t.raw('breakfast.items') as string[];
  const lunchProtein = t.raw('lunch.protein') as string[];
  const lunchCarbs = t.raw('lunch.carbs') as string[];
  const dinnerProtein = t.raw('dinner.protein') as string[];
  const dinnerCarbs = t.raw('dinner.carbs') as string[];
  const principles = t.raw('principles.items') as string[];
  const recoveryPillars = t.raw('recovery.pillars') as Array<{ title: string; body: string }>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Nutrition</p>
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-4">
        {t('heading')}
      </h1>
      <p className="text-text-secondary text-lg mb-16 max-w-xl">{t('subheading')}</p>

      {/* Meal cards */}
      <ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {/* Breakfast */}
          <div className="bg-surface rounded-2xl p-6 border border-zinc-800/50">
            <div className="w-6 h-0.5 bg-accent mb-4" />
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">{t('breakfast.heading')}</h2>
            <p className="text-text-secondary text-sm mb-5">{t('breakfast.description')}</p>
            <ul className="space-y-2">
              {breakfastItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-text-primary text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lunch */}
          <div className="bg-surface rounded-2xl p-6 border border-zinc-800/50">
            <div className="w-6 h-0.5 bg-accent mb-4" />
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">{t('lunch.heading')}</h2>
            <p className="text-text-secondary text-sm mb-5">{t('lunch.description')}</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-1.5">Protein</p>
                <div className="flex flex-wrap gap-1.5">
                  {lunchProtein.map((p, i) => (
                    <span key={i} className="text-xs bg-background px-2 py-1 rounded text-text-secondary border border-zinc-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-1.5">Carbs</p>
                <div className="flex flex-wrap gap-1.5">
                  {lunchCarbs.map((c, i) => (
                    <span key={i} className="text-xs bg-background px-2 py-1 rounded text-text-secondary border border-zinc-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-text-muted text-xs italic">{t('lunch.note')}</p>
            </div>
          </div>

          {/* Dinner */}
          <div className="bg-surface rounded-2xl p-6 border border-zinc-800/50">
            <div className="w-6 h-0.5 bg-accent mb-4" />
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">{t('dinner.heading')}</h2>
            <p className="text-text-secondary text-sm mb-5">{t('dinner.description')}</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-1.5">Protein</p>
                <div className="flex flex-wrap gap-1.5">
                  {dinnerProtein.map((p, i) => (
                    <span key={i} className="text-xs bg-background px-2 py-1 rounded text-text-secondary border border-zinc-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-1.5">Carbs</p>
                <div className="flex flex-wrap gap-1.5">
                  {dinnerCarbs.map((c, i) => (
                    <span key={i} className="text-xs bg-background px-2 py-1 rounded text-text-secondary border border-zinc-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-text-muted text-xs italic">{t('dinner.note')}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Nutrition principles */}
      <ScrollReveal>
        <section className="mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Principles</p>
          <h2 className="font-serif text-3xl font-bold text-text-primary mb-8">{t('principles.heading')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {principles.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-zinc-800/50">
                <span className="text-accent font-bold text-lg leading-none pt-0.5">{i + 1}</span>
                <p className="text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Recovery callout */}
      <ScrollReveal>
        <section className="border-t border-zinc-800/50 pt-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Recovery</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-3">
            {t('recovery.heading')}
          </h2>
          <p className="text-text-secondary mb-10 max-w-xl">{t('recovery.subheading')}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {recoveryPillars.map((pillar, i) => (
              <div key={i} className="bg-surface-2 rounded-2xl p-6 border border-accent/10">
                <div className="w-6 h-0.5 bg-accent mb-4" />
                <h3 className="font-serif text-xl font-bold text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
