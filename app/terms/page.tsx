import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms');
  return { title: t('pageTitle') };
}

export default async function TermsPage() {
  const t = await getTranslations('terms');
  const sections = t.raw('sections') as Array<{ heading: string; body: string }>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-primary mb-2">{t('heading')}</h1>
      <p className="text-text-secondary text-sm mb-10">{t('lastUpdated')}</p>
      <div className="space-y-6 text-text-secondary leading-relaxed">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-serif text-xl font-bold text-text-primary mb-2">{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
