
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#050b18] text-white">

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Main footer area */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-10 md:py-16">

          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="SmartCity home"
              className="group inline-flex items-center gap-3"
            >
              {/* Diamond brand mark */}
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/[0.06]">
                <span className="h-4 w-4 rotate-45 rounded-[3px] border-2 border-cyan-300 transition-transform duration-300 group-hover:rotate-[135deg]" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_3px_rgba(103,232,249,0.4)]" />
              </span>

              <span className="font-display text-2xl font-extrabold tracking-tight">
                Smart<span className="text-cyan-300">City</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A transparent platform connecting citizens and authorities
              to report civic issues, improve accountability, and build
              better communities together.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span className="text-xs text-slate-300">
                Your city. Your voice. Your impact.
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-all duration-200 group-hover:w-3 group-hover:bg-cyan-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">
              Make a Difference
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Noticed a problem in your neighbourhood? Take the first step
              towards getting it resolved.
            </p>

            <Link
              to="/register"
              className="group mt-5 inline-flex items-center gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Report an Issue
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>

        {/* Decorative skyline */}
        <div
          aria-hidden="true"
          className="relative h-20 overflow-hidden border-b border-white/[0.07]"
        >
          <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-1 opacity-50">
            {[
              [18, 30],
              [26, 42],
              [16, 24],
              [34, 54],
              [22, 35],
              [40, 65],
              [24, 42],
              [16, 26],
              [30, 48],
              [20, 33],
              [38, 58],
              [24, 38],
              [16, 24],
              [32, 46],
              [22, 34],
              [40, 60],
              [18, 29],
              [28, 43],
              [20, 31],
            ].map(([width, height], index) => (
              <div
                key={index}
                className="relative shrink-0 rounded-t-sm border border-cyan-300/15 bg-gradient-to-t from-cyan-400/[0.02] to-cyan-300/[0.08]"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              >
                {/* Tiny city windows */}
                <div className="absolute inset-x-1 top-2 grid grid-cols-2 gap-1">
                  {Array.from({ length: 4 }).map((_, windowIndex) => (
                    <span
                      key={windowIndex}
                      className="h-1 w-1 rounded-[1px] bg-cyan-300/35"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-5 text-slate-500">
            © {new Date().getFullYear()} SmartCity. Built for better communities.
          </p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300"
          >
            Back to top
            <span className="transition-transform duration-200 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
