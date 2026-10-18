
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardHat, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';


const roles = [
  {
    id: 'citizen',
    title: 'Citizen',
    description: 'Report civic issues',
    icon: '◎',
  },
  {
    id: 'worker',
    title: 'Worker',
    description: 'Resolve issues',
    icon: '⌁',
  },
  {
    id: 'admin',
    title: 'Authority',
    description: 'Manage operations',
    icon: '◇',
  },
];

const dashboardRoutes = {
  citizen: '/dashboard',
  worker: '/worker-dashboard',
  admin: '/authority-dashboard',
};

export default function Login() {
  const [role, setRole] = useState('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data || {};
      const userRole = String(user?.role || '').toLowerCase();

      if (!token || !user || !dashboardRoutes[userRole]) {
        setError('Unable to verify your account. Please try again.');
        return;
      }

      if (userRole !== role) {
        const actualRole =
          roles.find((item) => item.id === userRole)?.title || userRole;

        setError(
          `This account belongs to ${actualRole}. Select the correct role.`
        );
        return;
      }

      login(token, user);
      navigate(dashboardRoutes[userRole], { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Sign-in failed. Check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-[#07111F] font-display text-white">

      {/* Full-screen city photograph */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/smartcity-login-bg.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlays keep the text readable */}
      <div
        className="absolute inset-0 bg-[#06101D]/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#06101D]/75 via-[#06101D]/35 to-[#06101D]/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#06101D]/60 via-transparent to-[#06101D]/35"
        aria-hidden="true"
      />

      {/* Compact header */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg text-cyan-300 backdrop-blur-md">
            ◆
          </span>

          <span>
            <span className="block text-sm font-semibold tracking-tight">
              SmartCity
            </span>
            <span className="block text-[9px] tracking-[0.16em] text-white/65">
              CIVIC CONNECT
            </span>
          </span>
        </Link>

        <Link
          to="/"
          className="rounded-full border border-white/20 bg-black/10 px-3.5 py-2 text-xs text-white/85 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
        >
          ← Home
        </Link>
      </header>

      {/* Main content fills the remaining screen */}
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-7xl flex-1 grid-cols-1 items-center gap-4 overflow-hidden px-4 py-3 sm:px-8 lg:grid-cols-[1fr_410px] lg:gap-10 lg:px-12 lg:py-5">

        {/* Left-side message: hidden on smaller screens */}
        <section className="hidden max-w-xl lg:block">
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
            <span className="h-px w-7 bg-cyan-300" />
            A better city starts with us
          </p>

          <h1 className="text-4xl font-medium leading-tight tracking-tight xl:text-5xl">
          
            Every street has a story.
            <br />
            <span className="text-cyan-300">
              Help make it better.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
            One connected space for citizens, field workers, and
            authorities to turn civic concerns into meaningful action.
          </p>

          <div className="mt-7 flex items-center gap-3 text-xs text-white/75">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cyan-200">
              ✓
            </span>
            <span>Report · Connect · Improve</span>
          </div>
        </section>

        {/* Transparent login panel */}
        <section className="login-scrollbar-hidden mx-auto max-h-full min-h-0 w-full max-w-[410px] overflow-y-auto overscroll-contain">
         <div className="rounded-2xl border border-white/25 bg-[#0A1423]/55 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">

            <div className="mb-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.19em] text-cyan-200">
                Welcome back
              </p>

              <h2 className="mt-1.5 text-2xl font-medium tracking-tight">
                Sign in to SmartCity
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-white/65">
                Choose your access and continue.
              </p>
            </div>

            {/* Role selection */}
            <div className="mb-5">
              <p className="mb-2.5 text-xs text-white/80">
                I am signing in as
              </p>

              <div className="grid grid-cols-3 gap-2">
                {roles.map((item) => {
                  const selected = role === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setRole(item.id);
                        setError('');
                      }}
                      className={`min-w-0 rounded-xl border px-1.5 py-2.5 text-center transition ${
                        selected
                          ? 'border-cyan-200/65 bg-cyan-300/15'
                          : 'border-white/15 bg-white/[0.035] hover:bg-white/[0.09]'
                      }`}
                    >
                      <span
                        className={`block text-lg ${
                          selected ? 'text-cyan-200' : 'text-white/75'
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span className="mt-1 block text-[11px] font-medium">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-300/30 bg-red-950/40 px-3 py-2.5 text-xs leading-5 text-red-100"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs text-white/85"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/15 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-200/75 focus:ring-2 focus:ring-cyan-200/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs text-white/85"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-white/20 bg-black/15 px-3.5 py-2.5 pr-16 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-200/75 focus:ring-2 focus:ring-cyan-200/15"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute inset-y-0 right-3 text-[11px] text-white/65 hover:text-cyan-200"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-[#07111F] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#0A1423] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Signing in...'
                  : `Continue as ${roles.find((item) => item.id === role)?.title}`}
                {!loading && <span>→</span>}
              </button>
            </form>

            
<div className="mt-4">
  {role === 'citizen' && (
    <p className="text-center text-xs text-white/65">
      New to SmartCity?{' '}
      <Link
        to="/register"
        className="font-medium text-cyan-200 hover:text-white"
      >
        Create an account
      </Link>
    </p>
  )}

  {role === 'worker' && (
    <div className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.05] p-3">
      <HardHat
        size={19}
        className="mt-0.5 shrink-0 text-cyan-200"
      />
      <div>
        <p className="text-xs font-medium text-white/90">
          Worker Access Only
        </p>
        <p className="mt-1 text-[11px] leading-5 text-white/60">
          Worker accounts are provided by the concerned department.
          Please contact your supervisor for login credentials.
        </p>
      </div>
    </div>
  )}

  {role === 'admin' && (
    <div className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.05] p-3">
      <ShieldCheck
        size={19}
        className="mt-0.5 shrink-0 text-cyan-200"
      />
      <div>
        <p className="text-xs font-medium text-white/90">
          Authorized Personnel Only
        </p>
        <p className="mt-1 text-[11px] leading-5 text-white/60">
          Authority accounts are created through an authorized
          process. Please contact the system administrator for access.
        </p>
      </div>
    </div>
  )}
</div>


            <div className="mt-4 border-t border-white/15 pt-3 text-center text-[10px] text-white/50">
              Connecting people. Improving communities.
            </div>
          </div>
        </section>
      </div>

      {/* Small footer only on desktop */}
      <footer className="relative z-10 hidden h-8 shrink-0 items-center justify-between px-8 text-[10px] text-white/55 lg:flex lg:px-12">
        <span>© {new Date().getFullYear()} SmartCity · Civic Connect</span>
        <span>Built for better cities.</span>
      </footer>
    </main>
  );
}



