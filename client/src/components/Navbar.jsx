








import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircleHelp, Home } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDashboard = location.pathname === '/dashboard';
  const isMyReports =
    isDashboard && location.hash === '#my-reports';
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';
  const isHelpCenter = location.pathname === '/help';

  const citizenName =
    user?.name?.trim() ||
    user?.fullName?.trim() ||
    user?.username?.trim() ||
    'Citizen';

  const profileInitial = citizenName.charAt(0).toUpperCase();

  const handleMyReportsClick = (event) => {
    setMenuOpen(false);

    if (location.pathname === '/dashboard') {
      event.preventDefault();

      if (location.hash !== '#my-reports') {
        navigate('/dashboard#my-reports');
      }

      requestAnimationFrame(() => {
        document.getElementById('my-reports')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const navItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      active: isDashboard && !isMyReports,
    },
    {
      label: 'My Reports',
      to: '/dashboard#my-reports',
      active: isMyReports,
    },
    {
      label: 'Home',
      to: '/',
      active: isHome,
      icon: true,
    },
  ];

  const linkStyle = (active) =>
    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-cyan-400/15 text-cyan-300'
        : 'text-slate-300 hover:bg-white/10 hover:text-cyan-300'
    }`;

  const helpButtonStyle = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
    isHelpCenter
      ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-200'
      : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-cyan-200'
  }`;

  const profileButtonStyle = `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
    isProfile
      ? 'border-cyan-300 bg-cyan-400/25 text-cyan-200 ring-2 ring-cyan-400/20'
      : 'border-cyan-300/40 bg-cyan-400/10 text-cyan-300 hover:border-cyan-300/70 hover:bg-cyan-400/20 hover:text-cyan-200'
  }`;

  const closeMenu = () => setMenuOpen(false);

  const handleHelpClick = () => {
    closeMenu();
    navigate('/help');
  };

  return (
    <nav className="relative z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">

        {/* SmartCity brand */}
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 transition group-hover:bg-cyan-400/20">
            <span className="text-xl text-cyan-300">◆</span>
          </div>

          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
              SmartCity
            </h1>
            <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-slate-400">
              Civic Connect
            </p>
          </div>
        </Link>

        {/* Center navigation: Dashboard, My Reports, Home */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={
                item.label === 'My Reports'
                  ? handleMyReportsClick
                  : closeMenu
              }
              className={linkStyle(item.active)}
            >
              
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side: Help Center and profile avatar */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={handleHelpClick}
            className={helpButtonStyle}
          >
            <CircleHelp size={17} />
            <span>Help Center</span>
          </button>

          {/* Profile avatar at the far right */}
          <Link
            to="/profile"
            onClick={closeMenu}
            aria-label="Open My Profile"
            title="My Profile"
            className={profileButtonStyle}
          >
            {profileInitial}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-lg text-white sm:hidden"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-full rounded-2xl border border-white/10 bg-[#0b1727]/95 p-3 shadow-xl backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-1">

            {/* Dashboard, My Reports, Home */}
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={
                  item.label === 'My Reports'
                    ? handleMyReportsClick
                    : closeMenu
                }
                className={linkStyle(item.active)}
              >
                {item.icon && <Home size={16} />}
                {item.label}
              </Link>
            ))}

            <div className="my-2 border-t border-white/10" />

            {/* Help Center */}
            <button
              type="button"
              onClick={handleHelpClick}
              className={`${helpButtonStyle} w-full`}
            >
              <CircleHelp size={17} />
              <span>Help Center</span>
            </button>

            {/* Profile avatar */}
            <Link
              to="/profile"
              onClick={closeMenu}
              className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
            >
              <span className={profileButtonStyle}>
                {profileInitial}
              </span>
              <span className="text-sm font-medium text-slate-200">
                My Profile
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
