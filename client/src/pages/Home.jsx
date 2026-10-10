
import { Link } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';
import CivicServices from '../components/CivicServices';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-text">

      {/* {/* =========================================
    MODERN TRANSPARENT NAVBAR
========================================= */}
<nav className="absolute top-0 left-0 right-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4">

    <div className="flex items-center justify-between">

      {/* =====================================
          LOGO
      ===================================== */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
      >

        {/* Logo icon */}
        <div
          className="
            w-10 h-10
            rounded-xl
            bg-white/10
            border border-white/20
            backdrop-blur-md
            flex items-center justify-center
            shadow-lg
            transition
            group-hover:bg-white/20
          "
        >
          <span className="text-white text-lg">
            ◆
          </span>
        </div>

        {/* Logo text */}
        <div>

          <h1
            className="
              text-xl
              font-display
              font-bold
              text-white
              leading-none
              tracking-tight
            "
          >
            SmartCity
          </h1>

          <p
            className="
              text-[9px]
              text-white/60
              mt-1
              tracking-[0.2em]
              uppercase
            "
          >
            Civic Connect
          </p>

        </div>

      </Link>


      {/* =====================================
          CENTER NAVIGATION
      ===================================== */}
      <div
        className="
          hidden md:flex
          items-center
          gap-1
          px-2 py-1.5
          rounded-full
          bg-white/10
          border border-white/15
          backdrop-blur-md
        "
      >

        <a
          href="#home"
          className="
            px-4 py-2
            rounded-full
            text-sm
            font-medium
            text-white
            bg-white/15
            transition
          "
        >
          Home
        </a>

        <a
          href="#how-it-works"
          className="
            px-4 py-2
            rounded-full
            text-sm
            font-medium
            text-white/75
            hover:text-white
            hover:bg-white/10
            transition
          "
        >
          How It Works
        </a>

        <a
          href="#services"
          className="
            px-4 py-2
            rounded-full
            text-sm
            font-medium
            text-white/75
            hover:text-white
            hover:bg-white/10
            transition
          "
        >
          Services
        </a>

      </div>


      {/* =====================================
          RIGHT ACTIONS
      ===================================== */}
      <div className="flex items-center gap-3">

        {/* Login */}
        <Link
          to="/login"
          className="
            hidden sm:block
            px-4 py-2
            text-sm
            font-semibold
            text-white/90
            hover:text-white
            transition
          "
        >
          Login
        </Link>


        {/* Report Issue */}
        <Link
          to="/register"
          className="
            inline-flex
            items-center
            gap-2
            px-5 py-2.5
            rounded-xl
            bg-cyan-400
            text-slate-950
            text-sm
            font-bold
            shadow-lg
            shadow-cyan-900/20
            hover:bg-cyan-300
            hover:-translate-y-0.5
            transition
          "
        >
          Report Issue

          <span className="text-base">
            →
          </span>

        </Link>

      </div>

    </div>

  </div>
</nav>


      {/* =========================================================
          CINEMATIC HERO
      ========================================================= */}
      <section
        id="home"
        className="relative min-h-[680px] lg:min-h-[700px] overflow-hidden bg-slate-950"
      >

        {/* =====================================================
            CITY BACKGROUND
        ===================================================== */}

        <div
          className="absolute inset-0 bg-cover bg-center animate-city-pan"
          style={{
            backgroundImage: "url('/city-hero.jpg')",
            backgroundPosition: 'center center',
          }}
        />


        {/* =====================================================
            DARK OVERLAY
        ===================================================== */}

        {/* Overall darkening */}
        <div className="absolute inset-0 bg-slate-950/25" />


        {/* Left side darker for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-slate-950/5" />


        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />


        {/* =====================================================
            DIGITAL GRID
        ===================================================== */}

        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: '90px 90px',
            }}
          />

        </div>


        {/* =====================================================
            CONNECTION LINES
        ===================================================== */}

        <div className="absolute inset-0 pointer-events-none">

          <div
            className="
              absolute
              w-[360px]
              h-px
              bg-cyan-300/30
              top-[38%]
              left-[48%]
              rotate-[18deg]
              animate-civic-line
            "
          />

          <div
            className="
              absolute
              w-[280px]
              h-px
              bg-cyan-300/20
              top-[56%]
              left-[58%]
              rotate-[-22deg]
              animate-civic-line-delay
            "
          />

          <div
            className="
              absolute
              w-[220px]
              h-px
              bg-blue-300/20
              top-[68%]
              left-[43%]
              rotate-[12deg]
              animate-civic-line
            "
          />

        </div>


        {/* =====================================================
            LOCATION MARKER 1
        ===================================================== */}

        <div className="absolute top-[30%] left-[55%]">

          <div className="relative">

            <div className="absolute inset-[-10px] rounded-full bg-cyan-400/20 animate-marker-ring" />

            <div
              className="
                relative
                w-4
                h-4
                rounded-full
                bg-cyan-300
                border-2
                border-white
                shadow-[0_0_20px_rgba(103,232,249,0.8)]
              "
            />

          </div>

        </div>


        {/* =====================================================
            LOCATION MARKER 2
        ===================================================== */}

        <div className="absolute top-[48%] left-[72%]">

          <div className="relative">

            <div className="absolute inset-[-10px] rounded-full bg-red-400/20 animate-marker-ring-delay" />

            <div
              className="
                relative
                w-4
                h-4
                rounded-full
                bg-red-400
                border-2
                border-white
                shadow-[0_0_20px_rgba(248,113,113,0.7)]
              "
            />

          </div>

        </div>


        {/* =====================================================
            LOCATION MARKER 3
        ===================================================== */}

        <div className="absolute top-[66%] left-[62%]">

          <div className="relative">

            <div className="absolute inset-[-10px] rounded-full bg-emerald-400/20 animate-marker-ring" />

            <div
              className="
                relative
                w-4
                h-4
                rounded-full
                bg-emerald-400
                border-2
                border-white
                shadow-[0_0_20px_rgba(52,211,153,0.7)]
              "
            />

          </div>

        </div>


        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[680px] lg:min-h-[700px] flex items-center">

          <div className="max-w-2xl py-20 lg:py-24 animate-fade-up">

            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-3
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/20
                backdrop-blur-md
                text-white
                text-sm
                font-medium
              "
            >

              <span className="relative flex h-2.5 w-2.5">

                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-cyan-300
                    opacity-75
                    animate-ping
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    rounded-full
                    h-2.5
                    w-2.5
                    bg-cyan-300
                  "
                />

              </span>

              Building better communities together

            </div>


            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                font-display
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                text-white
                leading-[1.05]
                tracking-tight
                mt-7
              "
            >

              Your city.

              <span className="block">
                Your voice.
              </span>

              <span className="block text-cyan-300 mt-1">
                Better together.
              </span>

            </h1>


            {/* Description */}

            <p
              className="
                mt-6
                max-w-xl
                text-base
                md:text-lg
                text-slate-200
                leading-relaxed
              "
            >
              Report civic problems, track their progress, and help create
              cleaner, safer, and better-connected communities.
            </p>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  bg-cyan-400
                  text-slate-950
                  px-6
                  py-3.5
                  rounded-xl
                  font-semibold
                  hover:bg-cyan-300
                  transition
                  shadow-lg
                  shadow-cyan-900/30
                "
              >

                Report an Issue

                <span className="group-hover:translate-x-1 transition">
                  →
                </span>

              </Link>


              <a
                href="#how-it-works"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3.5
                  rounded-xl
                  border
                  border-white/30
                  bg-white/10
                  backdrop-blur-sm
                  text-white
                  font-semibold
                  hover:bg-white/20
                  transition
                "
              >

                Explore SmartCity

                <span>
                  ↓
                </span>

              </a>

            </div>

          </div>

        </div>



          

        {/* =====================================================
            FLOATING NEW REPORT CARD
        ===================================================== */}

        <div
          className="
            absolute
            right-[6%]
            top-[27%]
            hidden
            xl:block
          "
        >

          <div
            className="
              w-60
              bg-white/95
              backdrop-blur-md
              rounded-2xl
              shadow-2xl
              border
              border-white/30
              px-4
              py-4
              animate-floating-card
            "
          >

            <div className="flex items-start gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-red-50
                  flex
                  items-center
                  justify-center
                  text-lg
                "
              >
                📍
              </div>

              <div>

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-400
                    font-semibold
                  "
                >
                  New Report
                </p>

                <p className="text-sm font-bold text-slate-900 mt-1">
                  Road Damage
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Reported 2 min ago
                </p>

              </div>

            </div>


            <div className="mt-3 h-1 rounded-full bg-slate-100 overflow-hidden">

              <div className="h-full w-1/3 bg-red-400 rounded-full" />

            </div>

          </div>

        </div>


        {/* =====================================================
            RESOLVED CARD
        ===================================================== */}

        <div
          className="
            absolute
            right-[18%]
            bottom-[16%]
            hidden
            xl:block
          "
        >

          <div
            className="
              bg-slate-920/80
              backdrop-blur-md
              border
              border-white/15
              rounded-2xl
              px-4
              py-3
              shadow-xl
              animate-floating-card-delay
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-emerald-400/15
                  flex
                  items-center
                  justify-center
                "
              >

                <span className="text-emerald-300">
                  ✓
                </span>

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Resolved
                </p>

                <p className="text-sm font-semibold text-white">
                  Streetlight Fixed
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            SCROLL INDICATOR
        ===================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            hidden
            md:flex
            flex-col
            items-center
            gap-2
            text-white/50
          "
        >

          <span className="text-[10px] uppercase tracking-[0.25em]">
            Scroll to explore
          </span>

          <div className="w-px h-7 bg-gradient-to-b from-white/50 to-transparent" />

        </div>

      </section>


      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="bg-primary py-12">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>

              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                1,240+
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Issues Reported
              </p>

            </div>


            <div>

              <p className="font-display text-3xl md:text-4xl font-bold text-cyan-300">
                980+
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Issues Resolved
              </p>

            </div>


            <div>

              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                32
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Departments
              </p>

            </div>


            <div>

              <p className="font-display text-3xl md:text-4xl font-bold text-cyan-300">
                94%
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Resolution Rate
              </p>

            </div>

          </div>

        </div>

      </section>


            {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <HowItWorks />


            {/* SERVICES */}
      <CivicServices />

      
      

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-slate-950 text-white">

        <div className="max-w-6xl mx-auto px-6 py-12">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>

              <h3 className="font-display text-xl font-bold">
                SmartCity
              </h3>

              <p className="text-slate-400 text-sm mt-3 max-w-sm">
                A transparent platform connecting citizens
                and authorities to build better communities.
              </p>

            </div>


            <div className="flex gap-8 text-sm">

              <a
                href="#home"
                className="text-slate-400 hover:text-white transition"
              >
                Home
              </a>

              <a
                href="#how-it-works"
                className="text-slate-400 hover:text-white transition"
              >
                How It Works
              </a>

              <a
                href="#services"
                className="text-slate-400 hover:text-white transition"
              >
                Services
              </a>

            </div>

          </div>


          <div className="border-t border-slate-800 mt-10 pt-6 text-sm text-slate-500 text-center">
            © 2026 SmartCity. Built for better communities.
          </div>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   SERVICE CARD COMPONENT
========================================================= */

function ServiceCard({ icon, title }) {

  return (

    <div
      className="
        group
        bg-slate-50
        border
        border-slate-200
        rounded-2xl
        p-6
        hover:bg-white
        hover:border-blue-200
        hover:shadow-lg
        hover:-translate-y-1
        transition
        duration-300
      "
    >

      <div
        className="
          w-12
          h-12
          rounded-xl
          bg-white
          border
          border-slate-200
          flex
          items-center
          justify-center
          text-2xl
          group-hover:scale-110
          transition
        "
      >
        {icon}
      </div>

      <h3 className="font-display font-semibold text-primary mt-5">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        Report and track issues in this category.
      </p>

    </div>

  );
}






