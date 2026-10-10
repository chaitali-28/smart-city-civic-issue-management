

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { user, loading } = useAuth();

//   // Wait until authentication status is checked
//   if (loading) {
//     return (
//       <div className="p-4 text-center">
//         Loading...
//       </div>
//     );
//   }

//   // If the user is not logged in, send them to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If the user's role is not allowed, redirect them
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     switch (user.role) {
//       case 'citizen':
//         return <Navigate to="/dashboard" replace />;

//       case 'worker':
//         return <Navigate to="/worker-dashboard" replace />;

//       case 'authority':
//         return <Navigate to="/authority-dashboard" replace />;

//       default:
//         return <Navigate to="/login" replace />;
//     }
//   }

//   // Allow access if the user is authenticated and authorized
//   return children;
// }


import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const dashboardRoutes = {
  citizen: '/dashboard',
  worker: '/worker-dashboard',
  admin: '/authority-dashboard',
};

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Wait until authentication is restored.
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // Not logged in: go to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user.role || '').toLowerCase();

  // Redirect authenticated users to their own dashboard
  // if they attempt to access a route for another role.
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const destination = dashboardRoutes[userRole] || '/login';

    return <Navigate to={destination} replace />;
  }

  // Authenticated user has permission to access this page.
  return children;
}
