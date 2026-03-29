import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.workWithMe');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

export default async function WorkWithMePage() {
  const t = await getTranslations('workWithMe');
  const contentItems = t.raw('contentTypes.items') as Array<{ type: string; description: string }>;
  const whatIBringItems = t.raw('whatIBring.items') as Array<{ title: string; description: string }>;

  const stats = [
    { value: t('stats.followers'), label: t('stats.followersLabel') },
    { value: t('stats.tiktokFollowers'), label: t('stats.tiktokFollowersLabel') },
    { value: t('stats.niche'), label: t('stats.nicheLabel') },
    { value: t('stats.location'), label: t('stats.locationLabel') },
    { value: t('stats.audience'), label: t('stats.audienceLabel') },
  ];

  const inquiryStrings = {
    heading: t('inquiry.heading'),
    subheading: t('inquiry.subheading'),
    namePlaceholder: t('inquiry.namePlaceholder'),
    emailPlaceholder: t('inquiry.emailPlaceholder'),
    messagePlaceholder: t('inquiry.messagePlaceholder'),
    cta: t('inquiry.cta'),
    directEmail: t('inquiry.directEmail'),
    successMessage: t('inquiry.successMessage'),
    errorMessage: t('inquiry.errorMessage'),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Partnerships</p>
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-4">
        {t('heading')}
      </h1>
      <p className="text-text-secondary text-lg mb-16">{t('subheading')}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface rounded-2xl p-5 border border-zinc-800/50 text-center">
            <p className="font-serif text-2xl font-bold text-text-primary mb-1">{stat.value}</p>
            <p className="text-text-muted text-xs tracking-wider uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <section className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">About</p>
        <h2 className="font-serif text-3xl font-bold text-text-primary mb-4">{t('about.heading')}</h2>
        <p className="text-text-secondary leading-relaxed max-w-2xl">{t('about.body')}</p>
      </section>

      {/* What I Bring */}
      <section className="mb-20">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Value</p>
        <h2 className="font-serif text-3xl font-bold text-text-primary mb-8">{t('whatIBring.heading')}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {whatIBringItems.map((item, i) => (
            <div key={i} className="bg-surface-2 rounded-2xl p-6 border border-accent/15">
              <div className="w-6 h-0.5 bg-accent mb-4" />
              <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content types */}
      <section className="mb-20">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Content</p>
        <h2 className="font-serif text-3xl font-bold text-text-primary mb-8">{t('contentTypes.heading')}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {contentItems.map((item, i) => (
            <div key={i} className="bg-surface rounded-2xl p-6 border border-zinc-800/50">
              <div className="w-6 h-0.5 bg-accent mb-3" />
              <h3 className="font-semibold text-text-primary mb-1">{item.type}</h3>
              <p className="text-text-secondary text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <ContactForm {...inquiryStrings} />
    </div>
  );
}
