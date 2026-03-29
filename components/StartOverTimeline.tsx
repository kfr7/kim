interface Milestone {
  year: string;
  label: string;
}

interface StartOverTimelineProps {
  milestones: Milestone[];
  heading: string;
}

export function StartOverTimeline({ milestones, heading }: StartOverTimelineProps) {
  return (
    <div className="mb-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">{heading}</p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connector line */}
        <div className="absolute top-[18px] left-[calc(100%/12)] right-[calc(100%/12)] h-0.5 bg-accent/25" />
        <div className="flex justify-between">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative px-1">
              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent-hover z-10 mb-3 shrink-0" />
              {/* Card */}
              <div className="bg-surface-2 rounded-xl p-3 border border-accent/15 text-center w-full">
                <p className="text-accent font-bold text-xs mb-1 font-serif">{m.year}</p>
                <p className="text-text-secondary text-xs leading-tight">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-10">
        {/* Vertical line */}
        <div className="absolute top-1 bottom-1 left-[15px] w-0.5 bg-accent/25" />
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              {/* Dot */}
              <div className="absolute -left-[27px] top-2 w-3 h-3 rounded-full bg-accent border-2 border-accent-hover z-10" />
              <div className="bg-surface-2 rounded-xl p-4 border border-accent/15">
                <p className="text-accent font-bold text-sm mb-1 font-serif">{m.year}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
