import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    label: 'Report',
    status: 'Pending',
    pill: 'bg-amber-400/15 text-amber-300',
    title: 'Spot it. Snap it. Send it.',
    text: 'Choose a category, add a photo and the location, and submit in under a minute. Your complaint gets a tracking ID instantly.',
  },
  {
    label: 'Verify',
    status: 'Verified',
    pill: 'bg-cyan-400/15 text-cyan-300',
    title: 'Checked and prioritized.',
    text: 'Authorities review your report, confirm it is genuine, and mark how urgent it is so serious problems are handled first.',
  },
  {
    label: 'Assign',
    status: 'Assigned',
    pill: 'bg-violet-400/15 text-violet-300',
    title: 'Sent to the right team.',
    text: 'The complaint is routed to the correct department and a field worker is assigned to visit the location.',
  },
  {
    label: 'Resolve',
    status: 'Resolved',
    pill: 'bg-emerald-400/15 text-emerald-300',
    title: 'Fixed, proven, and rated.',
    text: 'The worker uploads before and after photos. You see the result and rate the work, so every fix stays accountable.',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = steps[active];
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#050d1c] px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-cyan-300">
            HOW IT WORKS
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Follow your complaint,{' '}
            <span className="text-cyan-300">step by step.</span>
          </h2>
          <p className="mt-4 text-white/60">
            Every report moves through a clear journey, and you can see exactly
            where yours stands at any moment.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT: live ticket */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-white/50">
                  COMPLAINT #SC-2041
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-500 ${current.pill}`}
                >
                  {current.status}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold">Road Damage</h3>
              <p className="mt-1 text-sm text-white/50">Main Market Road</p>

              <div className="mt-6 h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ul className="mt-6 space-y-3">
                {steps.map((step, i) => {
                  const done = i <= active;
                  return (
                    <li key={step.label} className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-all duration-500 ${
                          done
                            ? 'bg-cyan-400 text-[#050d1c]'
                            : 'border border-white/20 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className={done ? 'text-white' : 'text-white/40'}>
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT: steps on a glowing line */}
          <div className="relative border-l border-white/10 pl-8">
            {steps.map((step, i) => (
              <div
                key={step.label}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className={`relative pb-14 transition-opacity duration-500 lg:min-h-[50vh] lg:pb-0 ${
                  active === i ? 'opacity-100' : 'lg:opacity-35'
                }`}
              >
                <span
                  className={`absolute -left-[39px] top-1.5 h-3 w-3 rounded-full border-2 transition-all duration-500 ${
                    active === i
                      ? 'border-cyan-300 bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                      : 'border-white/30 bg-[#050d1c]'
                  }`}
                />

                <p className="text-xs font-semibold tracking-[0.25em] text-cyan-300">
                  STEP 0{i + 1} · {step.label.toUpperCase()}
                </p>
                <h3 className="mt-2 text-2xl font-bold md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-md text-white/60">{step.text}</p>

                <span
                  className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold lg:hidden ${step.pill}`}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}