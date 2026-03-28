'use client';

import { useState } from 'react';

interface Exercise {
  name: string;
  note: string;
}

interface Tab {
  id: string;
  label: string;
  title: string;
  description: string;
  exercises: Exercise[];
}

interface CardioOption {
  name: string;
  duration: string;
  note: string;
}

interface Props {
  tabs: Tab[];
  cardio: { heading: string; subheading: string; options: CardioOption[]; note: string };
  overload: { heading: string; body: string };
  exerciseLabel: string;
}

export function WorkoutsTabs({ tabs, cardio, overload, exerciseLabel }: Props) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-1 flex-wrap mb-10 border-b border-zinc-800">
        {tabs.map((tab, i) => (
          <button
            key={tab.id + i}
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px ${
              active === i
                ? 'border-accent text-text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-text-primary mb-3">{current.title}</h2>
        <p className="text-text-secondary mb-8 max-w-2xl">{current.description}</p>

        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">{exerciseLabel}</p>
        <div className="space-y-3">
          {current.exercises.map((ex, i) => (
            <div key={i} className="flex gap-4 bg-surface rounded-xl p-4 border border-zinc-800/50">
              <span className="text-accent font-bold font-serif text-lg w-7 shrink-0 pt-0.5">{i + 1}</span>
              <div>
                <p className="font-semibold text-text-primary">{ex.name}</p>
                <p className="text-text-secondary text-sm mt-0.5">{ex.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cardio section */}
      <section className="border-t border-zinc-800/50 pt-12 mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Cardio</p>
        <h2 className="font-serif text-3xl font-bold text-text-primary mb-2">{cardio.heading}</h2>
        <p className="text-text-secondary mb-8">{cardio.subheading}</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {cardio.options.map((opt, i) => (
            <div key={i} className="bg-surface rounded-xl p-5 border border-zinc-800/50">
              <div className="w-6 h-0.5 bg-accent mb-3" />
              <p className="font-semibold text-text-primary">{opt.name}</p>
              <p className="text-accent text-sm font-medium mb-1">{opt.duration}</p>
              <p className="text-text-secondary text-sm">{opt.note}</p>
            </div>
          ))}
        </div>

        <p className="text-text-muted text-sm italic">{cardio.note}</p>
      </section>

      {/* Progressive overload note */}
      <section className="bg-surface-2 rounded-2xl p-8 border border-accent/20">
        <div className="w-8 h-0.5 bg-accent mb-4" />
        <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">{overload.heading}</h3>
        <p className="text-text-secondary leading-relaxed">{overload.body}</p>
      </section>
    </>
  );
}
