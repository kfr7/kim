import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { WorkoutsTabs } from '@/components/WorkoutsTabs';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.workouts');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

export default async function WorkoutsPage() {
  const t = await getTranslations('workouts');

  const gluteExercises = t.raw('gluteDay.exercises') as Array<{ name: string; note: string }>;
  const pullExercises = t.raw('pullDay.exercises') as Array<{ name: string; note: string }>;
  const legsExercises = t.raw('legsGlutesDay.exercises') as Array<{ name: string; note: string }>;
  const pushExercises = t.raw('pushDay.exercises') as Array<{ name: string; note: string }>;
  const cardioOptions = t.raw('cardio.options') as Array<{ name: string; duration: string; note: string }>;

  const tabs = [
    {
      id: 'glutes',
      label: t('tabs.glutes'),
      title: t('gluteDay.title'),
      description: t('gluteDay.description'),
      exercises: gluteExercises,
    },
    {
      id: 'pull1',
      label: t('tabs.pull1'),
      title: t('pullDay.title'),
      description: t('pullDay.description'),
      exercises: pullExercises,
    },
    {
      id: 'legsGlutes',
      label: t('tabs.legsGlutes'),
      title: t('legsGlutesDay.title'),
      description: t('legsGlutesDay.description'),
      exercises: legsExercises,
    },
    {
      id: 'push',
      label: t('tabs.push'),
      title: t('pushDay.title'),
      description: t('pushDay.description'),
      exercises: pushExercises,
    },
    {
      id: 'pull2',
      label: t('tabs.pull2'),
      title: t('pullDay.title'),
      description: t('pullDay.description'),
      exercises: pullExercises,
    },
  ];

  const cardio = {
    heading: t('cardio.heading'),
    subheading: t('cardio.subheading'),
    options: cardioOptions,
    note: t('cardio.note'),
  };

  const overload = {
    heading: t('overloadNote.heading'),
    body: t('overloadNote.body'),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Training</p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-4">
          {t('heading')}
        </h1>
        <p className="text-text-secondary text-lg mb-12 max-w-xl">{t('subheading')}</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <WorkoutsTabs tabs={tabs} cardio={cardio} overload={overload} exerciseLabel={t('exerciseLabel')} />
      </ScrollReveal>
    </div>
  );
}
