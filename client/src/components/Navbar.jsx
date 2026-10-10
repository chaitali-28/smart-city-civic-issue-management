// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
//       <Link to="/dashboard" className="text-xl font-bold text-blue-600">SmartCity</Link>
//       <div className="flex items-center gap-4">
//         <span className="text-gray-600 text-sm">Hi, {user?.name || 'Citizen'}</span>
//         <button
//           onClick={handleLogout}
//           className="text-sm text-red-600 hover:text-red-800"
          
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 group"
        >
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:bg-primary-light transition">
            <span className="text-white text-lg">◆</span>
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-xl font-display font-bold text-primary leading-none">
              SmartCity
            </h1>

            <p className="text-[10px] text-slate-500 mt-1 tracking-widest uppercase">
              Civic Connect
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-primary transition"
          >
            Dashboard
          </Link>

          <Link
            to="/reports"
            className="text-sm font-medium text-slate-600 hover:text-primary transition"
          >
            My Reports
          </Link>

          <Link
            to="/services"
            className="text-sm font-medium text-slate-600 hover:text-primary transition"
          >
            Services
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* User */}
          <div className="hidden sm:flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user?.name?.charAt(0)?.toUpperCase() || 'C'}
              </span>
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || 'Citizen'}
              </p>

              <p className="text-xs text-slate-500">
                Citizen
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}