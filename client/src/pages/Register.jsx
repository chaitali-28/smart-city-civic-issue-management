// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError('Password must contain at least 8 characters.');
//       return;
//     }

//     try {
//       setLoading(true);

//       await api.post('/auth/register', {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         role: 'citizen',
//       });

//       setSuccess('Account created successfully! Redirecting to login...');

//       setTimeout(() => {
//         navigate('/login');
//       }, 1500);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         'Registration failed. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#071426] px-4 py-10 text-white">
//       <div className="w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-9">

//         <Link
//           to="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-white"
//         >
//           <ArrowLeft size={17} />
//           Back to Home
//         </Link>

//         <div className="mb-7 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
//             <UserPlus size={28} />
//           </div>

//           <h1 className="text-3xl font-bold tracking-tight">
//             Create Your Account
//           </h1>

//           <p className="mt-2 text-sm text-slate-400">
//             Join SmartCity and help build a better community.
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-4 rounded-xl border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-300">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               required
//               autoComplete="name"
//               className="w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//               autoComplete="email"
//               className="w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter your phone number"
//               required
//               autoComplete="tel"
//               className="w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 required
//                 minLength={8}
//                 autoComplete="new-password"
//                 className="w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
//               >
//                 {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm your password"
//                 required
//                 autoComplete="new-password"
//                 className="w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 aria-label={
//                   showConfirmPassword
//                     ? 'Hide confirm password'
//                     : 'Show confirm password'
//                 }
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
//               >
//                 {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#071426] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-slate-400">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="font-semibold text-cyan-300 hover:text-white"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }







import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    if (!/^[a-zA-Z0-9_]{3,50}$/.test(username)) {
      setError(
        'Username must be 3–50 characters and contain only letters, numbers, or underscores.'
      );
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address or leave it empty.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      await api.post('/auth/register', {
        name: formData.name.trim(),
        username,
        email: email || null,
        phone: phone || null,
        password: formData.password,
      });

      setSuccess('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-[#0b1b30] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10';

  const labelClass = 'mb-2 block text-sm text-slate-300';

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071426] px-4 py-6 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <UserPlus size={28} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Join SmartCity and help build a better community.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-4 rounded-xl border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-300"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a unique username"
              autoComplete="username"
              minLength={3}
              maxLength={50}
              pattern="[a-zA-Z0-9_]+"
              title="Use letters, numbers, and underscores only."
              className={inputClass}
              required
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Use this username to sign in if you don't have an email.
            </p>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-slate-500">(Optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-slate-500">(Optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#071426] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create Citizen Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-cyan-300 hover:text-white"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}