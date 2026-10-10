import { useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🕳️',
    title: 'Roads & Potholes',
    text: 'Potholes, cracks, sinkholes and damaged road surfaces that put drivers and pedestrians at risk.',
    tags: ['Potholes', 'Cracks', 'Sinkholes'],
    dept: 'Roads Department',
    time: '~3 days',
    glow: 'from-cyan-400/25',
    accent: 'text-cyan-300',
    border: 'border-cyan-300/40',
  },
  {
    icon: '💡',
    title: 'Streetlights',
    text: 'Dark streets are unsafe streets. Report lights that flicker or stay off at night.',
    tags: ['Not working', 'Flickering'],
    dept: 'Electrical Department',
    time: '~2 days',
    glow: 'from-amber-400/25',
    accent: 'text-amber-300',
    border: 'border-amber-300/40',
  },
  {
    icon: '🗑️',
    title: 'Waste Management',
    text: 'Overflowing bins, illegal dumping and missed garbage pickups in your area.',
    tags: ['Overflowing bins', 'Dumping'],
    dept: 'Sanitation Department',
    time: '~1 day',
    glow: 'from-emerald-400/25',
    accent: 'text-emerald-300',
    border: 'border-emerald-300/40',
  },
  {
    icon: '💧',
    title: 'Water Issues',
    text: 'Leaking pipes, no supply or dirty water that needs quick attention.',
    tags: ['Leakage', 'No supply'],
    dept: 'Water Department',
    time: '~2 days',
    glow: 'from-sky-400/25',
    accent: 'text-sky-300',
    border: 'border-sky-300/40',
  },
  {
    icon: '🚦',
    title: 'Traffic & Signals',
    text: 'Broken signals, missing road signs and dangerous junctions.',
    tags: ['Signals', 'Road signs'],
    dept: 'Roads Department',
    time: '~4 days',
    glow: 'from-violet-400/25',
    accent: 'text-violet-300',
    border: 'border-violet-300/40',
  },
  {
    icon: '🌳',
    title: 'Public Spaces',
    text: 'Parks, benches, drains and shared spaces that need care.',
    tags: ['Parks', 'Drainage'],
    dept: 'Municipal Office',
    time: '~5 days',
    glow: 'from-rose-400/25',
    accent: 'text-rose-300',
    border: 'border-rose-300/40',
  },
];

export default function CivicServices() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-[#070f22] px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-cyan-300">
            CIVIC SERVICES
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            What can you <span className="text-cyan-300">report?</span>
          </h2>
          <p className="mt-4 text-white/60">
            Everyday problems, routed straight to the department that can fix
            them. Hover or tap a card to explore.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:h-[460px] md:flex-row">
          {services.map((item, i) => {
            const isActive = active === i;

            return (
              <div
                key={item.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border bg-white/[0.04] transition-all duration-500 ease-out ${
                  isActive
                    ? `h-96 md:h-auto md:flex-[4] ${item.border}`
                    : 'h-20 border-white/10 md:h-auto md:flex-[1]'
                }`}
              >
                {/* colored glow */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow} to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                />

                <div className="relative flex h-full flex-col p-5 md:p-6">
                  {/* header: icon + title */}
                  <div className="flex items-center gap-4 md:block">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                      {item.icon}
                    </div>

                    <h3 className="font-display text-lg font-bold text-white md:hidden">
                      {item.title}
                    </h3>

                    {!isActive && (
                      <p className="mt-6 hidden rotate-180 text-sm font-semibold tracking-wide text-white/70 [writing-mode:vertical-rl] md:block">
                        {item.title}
                      </p>
                    )}
                  </div>

                  {/* details: visible only on the active panel */}
                  <div
                    className={`mt-4 flex flex-1 flex-col transition-all duration-500 md:mt-8 md:min-w-[340px] ${
                      isActive
                        ? 'opacity-100 delay-150'
                        : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <h3 className="font-display hidden text-3xl font-bold text-white md:block">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                      {item.text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">
                          Handled by
                        </p>
                        <p className={`text-sm font-semibold ${item.accent}`}>
                          {item.dept}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          Typical fix: {item.time}
                        </p>
                      </div>

                      <Link
                        to="/register"
                        className={`text-sm font-semibold ${item.accent} hover:underline`}
                      >
                        Report →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          Something else?{' '}
          <Link to="/register" className="font-semibold text-cyan-300 hover:underline">
            Choose "Other" while reporting
          </Link>{' '}
          and we will send it to the right team.
        </p>
      </div>
    </section>
  );
}





