




// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';

// const roles = [
//   {
//     id: 'citizen',
//     title: 'Citizen',
//     description: 'Report and track civic issues',
//     icon: '👤',
//   },
//   {
//     id: 'worker',
//     title: 'Worker',
//     description: 'Manage assigned complaints',
//     icon: '🛠️',
//   },
//   {
//     id: 'authority',
//     title: 'Authority',
//     description: 'Oversee civic operations',
//     icon: '🏛️',
//   },
// ];

// export default function Login() {
//   const [role, setRole] = useState('citizen');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await api.post('/auth/login', {
//         email: email.trim(),
//         password,
//       });

//       const user = res.data.user;
//       const userRole = String(user?.role || '').toLowerCase();

//       // Prevent users from entering through the wrong role.
//       if (userRole !== role) {
//         setError(
//           `This account is registered as ${
//             user?.role || 'another role'
//           }. Please select the correct login option.`
//         );
//         return;
//       }

//       login(res.data.token, user);

//       // Keep existing dashboard pages; only route by the user's role.
//       const dashboardRoutes = {
//         citizen: '/dashboard',
//         worker: '/worker-dashboard',
//         authority: '/authority-dashboard',
//       };

//       navigate(dashboardRoutes[userRole]);
//     } catch (err) {
//       setError(
//         err.response?.data?.error || 'Unable to log in. Please check your details.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-8 flex items-center justify-center">
//       <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

//         <div className="grid md:grid-cols-2">

//           {/* Left information panel */}
//           <section className="relative hidden md:flex flex-col justify-between overflow-hidden bg-slate-950 p-8 text-white">
//             <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/10" />
//             <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-blue-500/10" />

//             <Link to="/" className="relative flex items-center gap-3">
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 text-xl text-cyan-300">
//                 ◆
//               </span>
//               <span>
//                 <span className="block text-base font-semibold tracking-tight">
//                   SmartCity
//                 </span>
//                 <span className="block text-[10px] tracking-[0.18em] text-slate-400 uppercase">
//                   Civic Connect
//                 </span>
//               </span>
//             </Link>

//             <div className="relative my-10">
//               <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
//                 Better cities start here
//               </span>

//               <h1 className="mt-4 text-3xl font-semibold leading-snug tracking-tight">
//                 One city.
//                 <br />
//                 Many roles.
//                 <br />
//                 <span className="text-cyan-300">One better future.</span>
//               </h1>

//               <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
//                 A connected platform for citizens, field workers, and
//                 authorities to work together on civic issues.
//               </p>
//             </div>

//             <div className="relative border-t border-white/10 pt-4">
//               <p className="text-xs text-slate-400">
//                 Connecting people. Improving communities.
//               </p>
//             </div>
//           </section>

//           {/* Login form */}
//           <section className="p-5 sm:p-8 md:p-9">
//             <div className="mb-6 flex items-center justify-between">
//               <Link to="/" className="text-sm font-semibold text-slate-800 md:hidden">
//                 <span className="mr-2 text-cyan-600">◆</span>
//                 SmartCity
//               </Link>

//               <Link
//                 to="/"
//                 className="ml-auto text-xs font-medium text-slate-500 transition hover:text-cyan-700"
//               >
//                 ← Back to home
//               </Link>
//             </div>

//             <div className="mb-5">
//               <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
//                 Welcome back
//               </p>
//               <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
//                 Sign in to your account
//               </h2>
//               <p className="mt-1.5 text-sm text-slate-500">
//                 Select your role to continue.
//               </p>
//             </div>

//             {/* Role selection */}
//             <div className="mb-5 grid grid-cols-3 gap-2">
//               {roles.map((item) => {
//                 const selected = role === item.id;

//                 return (
//                   <button
//                     key={item.id}
//                     type="button"
//                     onClick={() => {
//                       setRole(item.id);
//                       setError('');
//                     }}
//                     aria-pressed={selected}
//                     className={`relative flex min-w-0 flex-col items-center rounded-xl border px-1.5 py-3 text-center transition duration-200 ${
//                       selected
//                         ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500/20'
//                         : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
//                     }`}
//                   >
//                     <span className="text-xl" aria-hidden="true">
//                       {item.icon}
//                     </span>

//                     <span className={`mt-1.5 text-xs font-semibold ${
//                       selected ? 'text-cyan-800' : 'text-slate-700'
//                     }`}>
//                       {item.title}
//                     </span>

//                     <span className="mt-1 hidden text-[10px] leading-4 text-slate-500 sm:block">
//                       {item.description}
//                     </span>

//                     {selected && (
//                       <span
//                         className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-bold text-white"
//                         aria-label="Selected"
//                       >
//                         ✓
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <div
//                   role="alert"
//                   className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700"
//                 >
//                   {error}
//                 </div>
//               )}

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-1.5 block text-xs font-semibold text-slate-700"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
//                   required
//                 />
//               </div>

//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label
//                     htmlFor="password"
//                     className="block text-xs font-semibold text-slate-700"
//                   >
//                     Password
//                   </label>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-900/10 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? 'Signing in...' : `Sign in as ${roles.find((item) => item.id === role)?.title}`}

//                 {!loading && (
//                   <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base leading-none text-white transition group-hover:translate-x-0.5">
//                     →
//                   </span>
//                 )}
//               </button>
//             </form>

//             <p className="mt-5 text-center text-xs text-slate-500">
//               New to SmartCity?{' '}
//               <Link
//                 to="/register"
//                 className="font-semibold text-cyan-700 transition hover:text-cyan-900"
//               >
//                 Create a citizen account
//               </Link>
//             </p>

//             <p className="mt-5 border-t border-slate-100 pt-4 text-center text-[10px] leading-5 text-slate-400">
//               Secure access for a more connected community.
//             </p>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }





import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const roles = [
  {
    id: 'citizen',
    title: 'Citizen',
    description: 'Report and track civic issues',
    icon: '👤',
  },
  {
    id: 'worker',
    title: 'Worker',
    description: 'Manage assigned complaints',
    icon: '🛠️',
  },
  {
    id: 'admin',
    title: 'Authority',
    description: 'Oversee civic operations',
    icon: '🏛️',
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
      // Authenticate the user through the backend.
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data || {};
      const userRole = String(user?.role || '').toLowerCase();

      // Verify the backend response.
      if (!token || !user || !dashboardRoutes[userRole]) {
        setError(
          'Invalid login response. Please check your backend configuration.'
        );
        return;
      }

      // Ensure the selected role matches the MySQL account role.
      if (userRole !== role) {
        const actualRole =
          roles.find((item) => item.id === userRole)?.title || userRole;

        setError(
          `This account belongs to ${actualRole}. Please select the correct login option.`
        );
        return;
      }

      // Save the token and authenticated user.
      login(token, user);

      // Redirect according to the authenticated database role.
      navigate(dashboardRoutes[userRole], { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.error ||
          'Unable to sign in. Check your email, password, and backend connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        <div className="grid md:grid-cols-2">
          {/* Left information panel */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-8 text-white md:flex">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-blue-500/10" />

            <Link to="/" className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 text-xl text-cyan-300">
                ◆
              </span>

              <span>
                <span className="block text-base font-semibold tracking-tight">
                  SmartCity
                </span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Civic Connect
                </span>
              </span>
            </Link>

            <div className="relative my-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Better cities start here
              </p>

              <h1 className="mt-4 text-3xl font-semibold leading-snug tracking-tight">
                One city.
                <br />
                Many roles.
                <br />
                <span className="text-cyan-300">One better future.</span>
              </h1>

              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                A connected platform for citizens, field workers, and
                authorities to work together on civic issues.
              </p>
            </div>

            <div className="relative border-t border-white/10 pt-4">
              <p className="text-xs text-slate-400">
                Connecting people. Improving communities.
              </p>
            </div>
          </section>

          {/* Login form */}
          <section className="p-5 sm:p-8 md:p-9">
            <div className="mb-6 flex items-center justify-between">
              <Link
                to="/"
                className="text-sm font-semibold text-slate-800 md:hidden"
              >
                <span className="mr-2 text-cyan-600">◆</span>
                SmartCity
              </Link>

              <Link
                to="/"
                className="ml-auto text-xs font-medium text-slate-500 transition hover:text-cyan-700"
              >
                ← Back to home
              </Link>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                Welcome back
              </p>

              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-1.5 text-sm text-slate-500">
                Select your role to continue.
              </p>
            </div>

            {/* Role selection */}
            <div className="mb-5 grid grid-cols-3 gap-2">
              {roles.map((item) => {
                const selected = role === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item.id);
                      setError('');
                    }}
                    aria-pressed={selected}
                    className={`relative flex min-w-0 flex-col items-center rounded-xl border px-1.5 py-3 text-center transition duration-200 ${
                      selected
                        ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {item.icon}
                    </span>

                    <span
                      className={`mt-1.5 text-xs font-semibold ${
                        selected ? 'text-cyan-800' : 'text-slate-700'
                      }`}
                    >
                      {item.title}
                    </span>

                    <span className="mt-1 hidden text-[10px] leading-4 text-slate-500 sm:block">
                      {item.description}
                    </span>

                    {selected && (
                      <span
                        className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-bold leading-none text-white"
                        aria-label="Selected"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
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
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-900/10 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Signing in...'
                  : `Sign in as ${roles.find((item) => item.id === role)?.title}`}

                {!loading && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base leading-none text-white transition group-hover:translate-x-0.5">
                    →
                  </span>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              New to SmartCity?{' '}
              <Link
                to="/register"
                className="font-semibold text-cyan-700 transition hover:text-cyan-900"
              >
                Create a citizen account
              </Link>
            </p>

            <p className="mt-5 border-t border-slate-100 pt-4 text-center text-[10px] leading-5 text-slate-400">
              Secure access for a more connected community.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}



