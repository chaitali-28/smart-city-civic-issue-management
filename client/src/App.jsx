




import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import WorkerDashboard from './pages/WorkerDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Citizen complaint submission */}
      <Route
        path="/submit-complaint"
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <SubmitComplaint />
          </ProtectedRoute>
        }
      />

      {/* Worker dashboard */}
      <Route
        path="/worker-dashboard"
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Authority dashboard */}
      <Route
        path="/authority-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AuthorityDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
