

import { useEffect, useState } from 'react';

const steps = [
  {
    label: 'Report',
    status: 'Pending',
    icon: 'report',
    pill: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    accent: '#FBBF24',
    title: 'Spot it. Snap it. Send it.',
    text: 'Choose a category, add a photo and the location, and submit in under a minute. Your complaint gets a tracking ID instantly.',
    detail: 'A citizen reports road damage with a photo and location.',
  },
  {
    label: 'Verify',
    status: 'Verified',
    icon: 'verify',
    pill: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
    accent: '#22D3EE',
    title: 'Checked and prioritized.',
    text: 'Authorities review your report, confirm it is genuine, and mark how urgent it is so serious problems are handled first.',
    detail: 'The municipal team checks the complaint and confirms the issue.',
  },
  {
    label: 'Assign',
    status: 'Assigned',
    icon: 'assign',
    pill: 'border-violet-400/20 bg-violet-400/10 text-violet-300',
    accent: '#A78BFA',
    title: 'Sent to the right team.',
    text: 'The complaint is routed to the correct department and a field worker is assigned to visit the location.',
    detail: 'The road maintenance team receives the verified complaint.',
  },
  {
    label: 'Resolve',
    status: 'Resolved',
    icon: 'resolve',
    pill: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    accent: '#34D399',
    title: 'Fixed, proven, and rated.',
    text: 'The worker uploads before and after photos. You see the result and rate the work, so every fix stays accountable.',
    detail: 'The repair is completed and the result is available to the citizen.',
  },
];

function StepIcon({ type, className = 'h-6 w-6' }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...common}
    >
      {type === 'report' && (
        <>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3l2 2h6A2.5 2.5 0 0 1 20 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z" />
          <circle cx="12" cy="13" r="3" />
          <path d="M17 10h.01" />
        </>
      )}

      {type === 'verify' && (
        <>
          <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z" />
          <path d="m8.5 12 2.3 2.3 4.8-5" />
        </>
      )}

      {type === 'assign' && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19z" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14h.5a3 3 0 0 1 3 3v2" />
        </>
      )}

      {type === 'resolve' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m7.5 12 3 3 6-6" />
        </>
      )}
    </svg>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [paused]);

  const current = steps[active];
  const progress = (active / (steps.length - 1)) * 100;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#050d1c] px-5 py-20 text-white sm:px-8 md:py-24"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
              HOW IT WORKS
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
            Every report moves the city{' '}
            <span className="text-cyan-300">forward.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            From the first report to a verified solution, follow every stage
            of your complaint's journey.
          </p>
        </div>

        {/* Horizontal journey */}
        <div className="rounded-3xl border border-white/[0.09] bg-white/[0.025] p-4 sm:p-7 md:p-9">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">
                Your complaint journey
              </p>
              <p className="mt-1 text-xs text-white/40">
                Four stages. One better city.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Resume stage animation' : 'Pause stage animation'}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/65 transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {paused ? (
                <>
                  <span aria-hidden="true">▶</span>
                  Play
                </>
              ) : (
                <>
                  <span aria-hidden="true">Ⅱ</span>
                  Pause
                </>
              )}
            </button>
          </div>

          {/* Scroll horizontally on very small screens */}
          <div className="overflow-x-auto pb-2">
            <div className="relative min-w-[520px] px-2 sm:min-w-0">
              {/* Connecting track */}
              <div
                aria-hidden="true"
                className="absolute left-[12.5%] right-[12.5%] top-7 h-px bg-white/10"
              />

              {/* Animated progress */}
              <div
                aria-hidden="true"
                className="absolute left-[12.5%] right-[12.5%] top-7"
              >
                <div
                  className="relative h-px transition-[width] duration-700 ease-in-out motion-reduce:transition-none"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: current.accent,
                    boxShadow: `0 0 10px ${current.accent}55`,
                  }}
                >
                  <span
                    className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full"
                    style={{
                      backgroundColor: current.accent,
                      boxShadow: `0 0 10px ${current.accent}`,
                    }}
                  />
                </div>
              </div>

              <div className="relative grid grid-cols-4 gap-2">
                {steps.map((step, index) => {
                  const isActive = active === index;
                  const isComplete = index < active;

                  return (
                    <button
                      key={step.label}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className="group flex min-w-0 flex-col items-center rounded-2xl px-1 pb-3 pt-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <span
                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 motion-reduce:transition-none ${
                          isActive
                            ? 'scale-105'
                            : 'border-white/10 bg-[#0b1627] text-white/40 group-hover:border-white/25 group-hover:text-white/80'
                        }`}
                        style={
                          isActive
                            ? {
                                color: step.accent,
                                borderColor: `${step.accent}88`,
                                backgroundColor: `${step.accent}12`,
                                boxShadow: `0 0 24px ${step.accent}15`,
                              }
                            : isComplete
                              ? {
                                  color: step.accent,
                                  borderColor: `${step.accent}40`,
                                }
                              : undefined
                        }
                      >
                        <StepIcon type={step.icon} />

                        {isComplete && (
                          <span
                            aria-hidden="true"
                            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-[#050d1c]"
                          >
                            ✓
                          </span>
                        )}
                      </span>

                      <span
                        className={`mt-3 text-[10px] font-semibold tracking-[0.15em] sm:text-xs ${
                          isActive ? 'text-white/45' : 'text-white/30'
                        }`}
                      >
                        STEP 0{index + 1}
                      </span>

                      <span
                        className={`mt-1 text-sm font-semibold transition-colors sm:text-base ${
                          isActive
                            ? 'text-white'
                            : 'text-white/45 group-hover:text-white/80'
                        }`}
                      >
                        {step.label}
                      </span>

                      <span
                        className={`mt-2 h-1 w-5 rounded-full transition-all duration-300 ${
                          isActive ? 'w-8' : 'w-0'
                        }`}
                        style={{
                          backgroundColor: isActive ? step.accent : 'transparent',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-2 text-center text-[11px] text-white/30 sm:hidden">
            Swipe horizontally to explore all stages
          </p>

          {/* Selected stage details */}
          <div
            key={active}
            className="mt-5 grid gap-6 rounded-2xl border border-white/[0.08] bg-[#091424] p-5 animate-[civicEnter_450ms_ease-out_both] sm:p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 motion-reduce:animate-none"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.18em]"
                  style={{ color: current.accent }}
                >
                  STEP 0{active + 1}
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${current.pill}`}
                >
                  {current.status}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold sm:text-2xl">
                {current.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                {current.text}
              </p>
            </div>

            {/* Complaint preview */}
            <div className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 md:max-w-[255px]">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${current.accent}12`,
                    color: current.accent,
                  }}
                >
                  <StepIcon type={current.icon} className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">Road Damage</p>
                  <p className="mt-1 text-xs text-white/40">
                    Main Market Road
                  </p>
                </div>
              </div>

              <div className="my-4 h-px bg-white/[0.08]" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-white/40">
                  COMPLAINT #SC-2041
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: current.accent }}
                >
                  {current.status}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/55">
                {current.detail}
              </p>

              <div
                className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.08]"
                role="progressbar"
                aria-label="Illustrative complaint journey progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(((active + 1) / steps.length) * 100)}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-in-out motion-reduce:transition-none"
                  style={{
                    width: `${((active + 1) / steps.length) * 100}%`,
                    backgroundColor: current.accent,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Journey footer */}
          <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-white/40">
              Clear updates. Responsible teams. Better communities.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActive((value) => (value - 1 + steps.length) % steps.length)
                }
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/65 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setActive((value) => (value + 1) % steps.length)
                }
                className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Next stage →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
