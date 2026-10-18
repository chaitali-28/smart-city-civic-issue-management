
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    value: 1240,
    suffix: '+',
    label: 'Issues Reported',
    icon: 'report',
    color: '#FFFFFF',
  },
  {
    value: 980,
    suffix: '+',
    label: 'Issues Resolved',
    icon: 'resolved',
    color: '#67E8F9',
  },
  {
    value: 32,
    suffix: '',
    label: 'Departments',
    icon: 'departments',
    color: '#FFFFFF',
  },
  {
    value: 94,
    suffix: '%',
    label: 'Resolution Rate',
    icon: 'rate',
    color: '#67E8F9',
  },
];

function StatIcon({ type }) {
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
      className="h-6 w-6"
      aria-hidden="true"
      {...common}
    >
      {type === 'report' && (
        <>
          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </>
      )}

      {type === 'resolved' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m7.5 12 3 3 6-6" />
        </>
      )}

      {type === 'departments' && (
        <>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4" />
        </>
      )}

      {type === 'rate' && (
        <>
          <path d="M4 19V5M4 19h16" />
          <path d="m7 15 4-4 3 2 5-6" />
          <path d="M15 7h4v4" />
        </>
      )}
    </svg>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateMotion = () => {
      setReducedMotion(media.matches);
    };

    updateMotion();
    media.addEventListener?.('change', updateMotion);

    const section = sectionRef.current;

    if (!section) {
      return () => {
        media.removeEventListener?.('change', updateMotion);
      };
    }

    if (
      media.matches ||
      !('IntersectionObserver' in window)
    ) {
      setVisible(true);

      return () => {
        media.removeEventListener?.('change', updateMotion);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      media.removeEventListener?.('change', updateMotion);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="civic-impact-heading"
      className="relative overflow-hidden bg-[#071426] px-5 py-14 text-white sm:px-8 md:py-16"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.025] via-transparent to-blue-400/[0.04]"
      />

      <div className="relative mx-auto max-w-6xl">

        
{/* Section heading */}
<div className="mb-10 text-center">
  <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

    <span className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
      OUR CIVIC IMPACT
    </span>
  </div>

  <h2
    id="civic-impact-heading"
    className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
  >
    Small actions.{' '}
    <span className="text-cyan-300">Real change.</span>
  </h2>

  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
    Every reported issue is a step towards a cleaner, safer,
    and better-connected city.
  </p>
</div>


        {/* Statistics grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.045] motion-reduce:transform-none motion-reduce:transition-none sm:p-6 ${
                visible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-3 opacity-0'
              }`}
              style={{
                transitionDelay: visible ? `${index * 90}ms` : '0ms',
              }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]"
                style={{ color: stat.color }}
              >
                <StatIcon type={stat.icon} />
              </div>

              <p
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ color: stat.color }}
                aria-label={`${stat.value.toLocaleString('en-IN')}${stat.suffix} ${stat.label}`}
              >
                {visible && !reducedMotion ? (
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={index * 100}
                    reducedMotion={reducedMotion}
                  />
                ) : (
                  `${stat.value.toLocaleString('en-IN')}${stat.suffix}`
                )}
              </p>

              <p className="mt-2 text-xs leading-5 text-blue-200/65 sm:text-sm">
                {stat.label}
              </p>

              <div className="mt-5 h-px w-full bg-white/[0.07]">
                <div
                  className="h-px bg-cyan-300/60 transition-all duration-700 motion-reduce:transition-none"
                  style={{
                    width: visible ? '100%' : '0%',
                    transitionDelay: `${index * 90}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value, suffix, delay, reducedMotion }) {
  const [count, setCount] = useState(
    reducedMotion ? value : 0
  );

  useEffect(() => {
    if (reducedMotion) {
      setCount(value);
      return;
    }

    let frame;
    let startTime;

    const duration = 900;

    const animate = (time) => {
      if (startTime === undefined) {
        startTime = time;
      }

      const elapsed = Math.max(0, time - startTime - delay);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [value, delay, reducedMotion]);

  return (
    <>
      {count.toLocaleString('en-IN')}
      {suffix}
    </>
  );
}
