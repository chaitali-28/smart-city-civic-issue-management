// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const services = [
//   {
//     icon: '🕳️',
//     title: 'Roads & Potholes',
//     text: 'Potholes, cracks, sinkholes and damaged road surfaces that put drivers and pedestrians at risk.',
//     tags: ['Potholes', 'Cracks', 'Sinkholes'],
//     dept: 'Roads Department',
//     time: '~3 days',
//     glow: 'from-cyan-400/25',
//     accent: 'text-cyan-300',
//     border: 'border-cyan-300/40',
//   },
//   {
//     icon: '💡',
//     title: 'Streetlights',
//     text: 'Dark streets are unsafe streets. Report lights that flicker or stay off at night.',
//     tags: ['Not working', 'Flickering'],
//     dept: 'Electrical Department',
//     time: '~2 days',
//     glow: 'from-amber-400/25',
//     accent: 'text-amber-300',
//     border: 'border-amber-300/40',
//   },
//   {
//     icon: '🗑️',
//     title: 'Waste Management',
//     text: 'Overflowing bins, illegal dumping and missed garbage pickups in your area.',
//     tags: ['Overflowing bins', 'Dumping'],
//     dept: 'Sanitation Department',
//     time: '~1 day',
//     glow: 'from-emerald-400/25',
//     accent: 'text-emerald-300',
//     border: 'border-emerald-300/40',
//   },
//   {
//     icon: '💧',
//     title: 'Water Issues',
//     text: 'Leaking pipes, no supply or dirty water that needs quick attention.',
//     tags: ['Leakage', 'No supply'],
//     dept: 'Water Department',
//     time: '~2 days',
//     glow: 'from-sky-400/25',
//     accent: 'text-sky-300',
//     border: 'border-sky-300/40',
//   },
//   {
//     icon: '🚦',
//     title: 'Traffic & Signals',
//     text: 'Broken signals, missing road signs and dangerous junctions.',
//     tags: ['Signals', 'Road signs'],
//     dept: 'Roads Department',
//     time: '~4 days',
//     glow: 'from-violet-400/25',
//     accent: 'text-violet-300',
//     border: 'border-violet-300/40',
//   },
//   {
//     icon: '🌳',
//     title: 'Public Spaces',
//     text: 'Parks, benches, drains and shared spaces that need care.',
//     tags: ['Parks', 'Drainage'],
//     dept: 'Municipal Office',
//     time: '~5 days',
//     glow: 'from-rose-400/25',
//     accent: 'text-rose-300',
//     border: 'border-rose-300/40',
//   },
// ];

// export default function CivicServices() {
//   const [active, setActive] = useState(0);

//   return (
//     <section
//       id="services"
//       className="relative overflow-hidden border-t border-white/5 bg-[#070f22] px-6 py-24 text-white"
//     >
//       <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

//       <div className="relative mx-auto max-w-6xl">
//         <div className="mx-auto mb-14 max-w-2xl text-center">
//           <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-cyan-300">
//             CIVIC SERVICES
//           </p>
//           <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
//             What can you <span className="text-cyan-300">report?</span>
//           </h2>
//           <p className="mt-4 text-white/60">
//             Everyday problems, routed straight to the department that can fix
//             them. Hover or tap a card to explore.
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 md:h-[460px] md:flex-row">
//           {services.map((item, i) => {
//             const isActive = active === i;

//             return (
//               <div
//                 key={item.title}
//                 tabIndex={0}
//                 onMouseEnter={() => setActive(i)}
//                 onFocus={() => setActive(i)}
//                 onClick={() => setActive(i)}
//                 className={`relative cursor-pointer overflow-hidden rounded-3xl border bg-white/[0.04] transition-all duration-500 ease-out ${
//                   isActive
//                     ? `h-96 md:h-auto md:flex-[4] ${item.border}`
//                     : 'h-20 border-white/10 md:h-auto md:flex-[1]'
//                 }`}
//               >
//                 {/* colored glow */}
//                 <div
//                   className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow} to-transparent transition-opacity duration-500 ${
//                     isActive ? 'opacity-100' : 'opacity-30'
//                   }`}
//                 />

//                 <div className="relative flex h-full flex-col p-5 md:p-6">
//                   {/* header: icon + title */}
//                   <div className="flex items-center gap-4 md:block">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
//                       {item.icon}
//                     </div>

//                     <h3 className="font-display text-lg font-bold text-white md:hidden">
//                       {item.title}
//                     </h3>

//                     {!isActive && (
//                       <p className="mt-6 hidden rotate-180 text-sm font-semibold tracking-wide text-white/70 [writing-mode:vertical-rl] md:block">
//                         {item.title}
//                       </p>
//                     )}
//                   </div>

//                   {/* details: visible only on the active panel */}
//                   <div
//                     className={`mt-4 flex flex-1 flex-col transition-all duration-500 md:mt-8 md:min-w-[340px] ${
//                       isActive
//                         ? 'opacity-100 delay-150'
//                         : 'pointer-events-none opacity-0'
//                     }`}
//                   >
//                     <h3 className="font-display hidden text-3xl font-bold text-white md:block">
//                       {item.title}
//                     </h3>

//                     <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
//                       {item.text}
//                     </p>

//                     <div className="mt-4 flex flex-wrap gap-2">
//                       {item.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="mt-auto flex items-end justify-between gap-3 pt-6">
//                       <div>
//                         <p className="text-[10px] uppercase tracking-widest text-white/40">
//                           Handled by
//                         </p>
//                         <p className={`text-sm font-semibold ${item.accent}`}>
//                           {item.dept}
//                         </p>
//                         <p className="mt-1 text-xs text-white/40">
//                           Typical fix: {item.time}
//                         </p>
//                       </div>

//                       <Link
//                         to="/register"
//                         className={`text-sm font-semibold ${item.accent} hover:underline`}
//                       >
//                         Report →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <p className="mt-10 text-center text-sm text-white/50">
//           Something else?{' '}
//           <Link to="/register" className="font-semibold text-cyan-300 hover:underline">
//             Choose "Other" while reporting
//           </Link>{' '}
//           and we will send it to the right team.
//         </p>
//       </div>
//     </section>
//   );
// }






import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🕳️',
    title: 'Roads & Potholes',
    text: 'Potholes, cracks, sinkholes and damaged road surfaces that put drivers and pedestrians at risk.',
    tags: ['Potholes', 'Cracks', 'Sinkholes'],
    dept: 'Roads Department',
    time: '~3 days',
    accent: 'cyan',
  },
  {
    icon: '💡',
    title: 'Streetlights',
    text: 'Dark streets are unsafe streets. Report lights that flicker or stay off at night.',
    tags: ['Not working', 'Flickering'],
    dept: 'Electrical Department',
    time: '~2 days',
    accent: 'amber',
  },
  {
    icon: '🗑️',
    title: 'Waste Management',
    text: 'Overflowing bins, illegal dumping and missed garbage pickups in your area.',
    tags: ['Overflowing bins', 'Dumping'],
    dept: 'Sanitation Department',
    time: '~1 day',
    accent: 'emerald',
  },
  {
    icon: '💧',
    title: 'Water Issues',
    text: 'Leaking pipes, no supply or dirty water that needs quick attention.',
    tags: ['Leakage', 'No supply'],
    dept: 'Water Department',
    time: '~2 days',
    accent: 'sky',
  },
  {
    icon: '🚦',
    title: 'Traffic & Signals',
    text: 'Broken signals, missing road signs and dangerous junctions.',
    tags: ['Signals', 'Road signs'],
    dept: 'Roads Department',
    time: '~4 days',
    accent: 'violet',
  },
  {
    icon: '🌳',
    title: 'Public Spaces',
    text: 'Parks, benches, drains and shared spaces that need care.',
    tags: ['Parks', 'Drainage'],
    dept: 'Municipal Office',
    time: '~5 days',
    accent: 'rose',
  },
];

const accents = {
  cyan: {
    icon: 'bg-cyan-400/10 text-cyan-300',
    border: 'hover:border-cyan-300/40',
    line: 'bg-cyan-300',
    text: 'text-cyan-300',
    button: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200 hover:bg-cyan-300/20',
    glow: 'group-hover:opacity-100',
  },
  amber: {
    icon: 'bg-amber-400/10 text-amber-300',
    border: 'hover:border-amber-300/40',
    line: 'bg-amber-300',
    text: 'text-amber-300',
    button: 'border-amber-300/25 bg-amber-300/10 text-amber-200 hover:bg-amber-300/20',
    glow: 'group-hover:opacity-100',
  },
  emerald: {
    icon: 'bg-emerald-400/10 text-emerald-300',
    border: 'hover:border-emerald-300/40',
    line: 'bg-emerald-300',
    text: 'text-emerald-300',
    button: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200 hover:bg-emerald-300/20',
    glow: 'group-hover:opacity-100',
  },
  sky: {
    icon: 'bg-sky-400/10 text-sky-300',
    border: 'hover:border-sky-300/40',
    line: 'bg-sky-300',
    text: 'text-sky-300',
    button: 'border-sky-300/25 bg-sky-300/10 text-sky-200 hover:bg-sky-300/20',
    glow: 'group-hover:opacity-100',
  },
  violet: {
    icon: 'bg-violet-400/10 text-violet-300',
    border: 'hover:border-violet-300/40',
    line: 'bg-violet-300',
    text: 'text-violet-300',
    button: 'border-violet-300/25 bg-violet-300/10 text-violet-200 hover:bg-violet-300/20',
    glow: 'group-hover:opacity-100',
  },
  rose: {
    icon: 'bg-rose-400/10 text-rose-300',
    border: 'hover:border-rose-300/40',
    line: 'bg-rose-300',
    text: 'text-rose-300',
    button: 'border-rose-300/25 bg-rose-300/10 text-rose-200 hover:bg-rose-300/20',
    glow: 'group-hover:opacity-100',
  },
};

export default function CivicServices() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const toggleService = (index) => {
    setActive((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#070f22] px-5 py-20 text-white sm:px-8 md:py-24"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="text-xs font-semibold tracking-[0.22em] text-cyan-300">
              CIVIC SERVICES
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
            What can you{' '}
            <span className="text-cyan-300">report?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            From damaged roads to overflowing bins, report local issues
            and help make your city safer, cleaner, and better.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => {
            const isActive = active === index;
            const color = accents[item.accent];
            const detailsId = `service-details-${index}`;

            return (
              <article
                key={item.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#0b1627] transition-[transform,border-color,background-color,opacity] duration-300 ease-out motion-reduce:transition-none ${
                  color.border
                } ${
                  isActive
                    ? 'border-white/20 bg-[#0d1b2e]'
                    : 'border-white/[0.08] hover:-translate-y-1'
                } ${
                  visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: visible ? `${index * 70}ms` : '0ms',
                }}
              >
                {/* Top accent line */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[2px] origin-left transition-transform duration-500 ${
                    color.line
                  } ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />

                {/* Soft hover highlight */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 ${color.glow}`}
                  style={{
                    backgroundColor: item.accent === 'cyan'
                      ? '#22d3ee'
                      : item.accent === 'amber'
                        ? '#fbbf24'
                        : item.accent === 'emerald'
                          ? '#34d399'
                          : item.accent === 'sky'
                            ? '#38bdf8'
                            : item.accent === 'violet'
                              ? '#a78bfa'
                              : '#fb7185',
                  }}
                />

                <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                  {/* Icon and category */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none ${color.icon}`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                    </div>

                    <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] font-medium text-white/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title and description */}
                  <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-white/50">
                    {item.text}
                  </p>

                  {/* Issue tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[11px] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand details */}
                  <div
                    id={detailsId}
                    aria-hidden={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-5 border-t border-white/[0.08] pt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                          Responsible department
                        </p>

                        <p className={`mt-1 text-sm font-semibold ${color.text}`}>
                          {item.dept}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
                          <span aria-hidden="true">◷</span>
                          <span>
                            Estimated handling time: {item.time}
                          </span>
                        </div>

                        <Link
                          to="/register"
                          tabIndex={isActive ? 0 : -1}
                          className={`mt-4 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${color.button}`}
                        >
                          Report this issue
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expand / collapse control */}
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={detailsId}
                    onClick={() => toggleService(index)}
                    className={`mt-5 flex w-full items-center justify-between border-t border-white/[0.08] pt-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1627] ${
                      isActive
                        ? color.text
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    <span>
                      {isActive ? 'Show less' : 'Explore service'}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 ${
                        isActive
                          ? 'rotate-180 border-white/20'
                          : 'group-hover:translate-x-0.5'
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m7 10 5 5 5-5" />
                      </svg>
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Other issues */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-5 text-center sm:flex-row sm:px-7 sm:text-left">
          <div>
            <p className="font-semibold text-white">
              Can't find your issue?
            </p>
            <p className="mt-1 text-sm text-white/45">
              Choose the Other category when submitting your complaint.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Report another issue
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
