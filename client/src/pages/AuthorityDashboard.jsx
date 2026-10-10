

// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import '../authority-dashboard.css';

// const menuItems = [
//   'Dashboard',
//   'Complaints',
//   'Civic Issues',
//   'Workers',
//   'Analytics',
//   'Settings',
// ];

// const statusLabels = {
//   pending: 'Pending',
//   verified: 'Verified',
//   assigned: 'Assigned',
//   in_progress: 'In Progress',
//   resolved: 'Resolved',
//   rejected: 'Rejected',
// };

// const formatStatus = (status) =>
//   statusLabels[status] || status || 'Pending';

// const formatPriority = (priority) => {
//   const value = (priority || 'low').toLowerCase();
//   return value.charAt(0).toUpperCase() + value.slice(1);
// };

// const formatDate = (date) => {
//   if (!date) return '—';

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) return '—';

//   return parsedDate.toLocaleString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// export default function AuthorityDashboard() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const [activeSection, setActiveSection] = useState('Dashboard');
//   const [complaints, setComplaints] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [priorityFilter, setPriorityFilter] = useState('all');
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const fetchComplaints = useCallback(async (isInitial = false) => {
//     if (isInitial) {
//       setLoading(true);
//     } else {
//       setRefreshing(true);
//     }

//     try {
//       const response = await api.get('/complaints/admin/all');

//       setComplaints(response.data.complaints || []);
//       setStats(response.data.stats || {});
//       setLastUpdated(new Date());
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch complaints:', err);

//       setError(
//         err.response?.data?.error ||
//           'Could not load complaints. Please check your connection and login.'
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   // Load real complaints when the dashboard opens.
//   useEffect(() => {
//     fetchComplaints(true);
//   }, [fetchComplaints]);

//   // Refresh the complaint list every 20 seconds.
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       fetchComplaints(false);
//     }, 20000);

//     return () => clearInterval(intervalId);
//   }, [fetchComplaints]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login', { replace: true });
//   };

//   const normalizedSearch = search.trim().toLowerCase();

//   const filteredComplaints = complaints.filter((complaint) => {
//     const searchableText = [
//       complaint.id,
//       complaint.citizen_name,
//       complaint.citizen_email,
//       complaint.category,
//       complaint.description,
//       complaint.address,
//     ]
//       .filter(Boolean)
//       .join(' ')
//       .toLowerCase();

//     const matchesSearch = searchableText.includes(normalizedSearch);

//     const matchesStatus =
//       statusFilter === 'all' ||
//       complaint.status === statusFilter;

//     const matchesPriority =
//       priorityFilter === 'all' ||
//       (complaint.priority || 'low') === priorityFilter;

//     return matchesSearch && matchesStatus && matchesPriority;
//   });

//   const highPriorityCount = complaints.filter((complaint) =>
//     ['high', 'critical'].includes(
//       (complaint.priority || '').toLowerCase()
//     )
//   ).length;

//   // Calculate category totals using the actual complaint records.
//   const categoryCounts = complaints.reduce((result, complaint) => {
//     const category = complaint.category || 'Other';
//     result[category] = (result[category] || 0) + 1;
//     return result;
//   }, {});

//   const topCategories = Object.entries(categoryCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5);

//   const maxCategoryCount = Math.max(
//     1,
//     ...topCategories.map(([, count]) => count)
//   );

//   const renderComplaintsTable = (items) => {
//     if (loading) {
//       return (
//         <div className="authority-feedback" role="status">
//           <div className="authority-loader" />
//           <p>Loading complaints from the database...</p>
//         </div>
//       );
//     }

//     if (error && complaints.length === 0) {
//       return (
//         <div className="authority-feedback authority-error">
//           <h3>Unable to load complaints</h3>
//           <p>{error}</p>
//           <button
//             type="button"
//             className="authority-action-button"
//             onClick={() => fetchComplaints(true)}
//           >
//             Try again
//           </button>
//         </div>
//       );
//     }

//     if (items.length === 0) {
//       return (
//         <div className="authority-feedback">
//           <h3>No complaints found</h3>
//           <p>
//             {complaints.length === 0
//               ? 'Complaints submitted by citizens will appear here.'
//               : 'Try changing your search or filters.'}
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="authority-table-scroll">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Issue</th>
//               <th>Citizen</th>
//               <th>Location</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Reported On</th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.map((complaint) => {
//               const priority = (
//                 complaint.priority || 'low'
//               ).toLowerCase();

//               const status = (
//                 complaint.status || 'pending'
//               ).toLowerCase();

//               return (
//                 <tr key={complaint.id}>
//                   <td>#{complaint.id}</td>

//                   <td>
//                     <strong>
//                       {complaint.category || 'Other'}
//                     </strong>
//                     <p className="authority-description">
//                       {complaint.description || 'No description'}
//                     </p>
//                   </td>

//                   <td>
//                     <strong>
//                       {complaint.citizen_name || 'Unknown citizen'}
//                     </strong>
//                     <p className="authority-description">
//                       {complaint.citizen_email || ''}
//                     </p>
//                   </td>

//                   <td>{complaint.address || 'Not provided'}</td>

//                   <td>
//                     <span
//                       className={`authority-priority ${priority}`}
//                     >
//                       {formatPriority(priority)}
//                     </span>
//                   </td>

//                   <td>
//                     <span
//                       className={`authority-status ${
//                         status.replace('_', '-')
//                       }`}
//                     >
//                       {formatStatus(status)}
//                     </span>
//                   </td>

//                   <td>{formatDate(complaint.created_at)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderComplaintFilters = () => (
//     <div className="authority-filters">
//       <input
//         type="search"
//         value={search}
//         onChange={(event) => setSearch(event.target.value)}
//         placeholder="Search ID, citizen, category, location..."
//         aria-label="Search complaints"
//       />

//       <select
//         value={statusFilter}
//         onChange={(event) => setStatusFilter(event.target.value)}
//         aria-label="Filter by status"
//       >
//         <option value="all">All statuses</option>
//         <option value="pending">Pending</option>
//         <option value="verified">Verified</option>
//         <option value="assigned">Assigned</option>
//         <option value="in_progress">In Progress</option>
//         <option value="resolved">Resolved</option>
//         <option value="rejected">Rejected</option>
//       </select>

//       <select
//         value={priorityFilter}
//         onChange={(event) => setPriorityFilter(event.target.value)}
//         aria-label="Filter by priority"
//       >
//         <option value="all">All priorities</option>
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//         <option value="critical">Critical</option>
//       </select>
//     </div>
//   );

//   return (
//     <div className="authority-dashboard">
//       <aside className="authority-sidebar">
//         <h2>SmartCity</h2>

//         <nav
//           className="authority-navigation"
//           aria-label="Authority navigation"
//         >
//           {menuItems.map((item) => (
//             <button
//               key={item}
//               type="button"
//               className={`authority-menu ${
//                 activeSection === item ? 'active' : ''
//               }`}
//               onClick={() => setActiveSection(item)}
//               aria-current={
//                 activeSection === item ? 'page' : undefined
//               }
//             >
//               {item}
//             </button>
//           ))}
//         </nav>

//         <div className="authority-sidebar-bottom">
//           <p>{user?.name || 'Authority'}</p>
//           <button type="button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </aside>

//       <main className="authority-main">
//         <header className="authority-header">
//           <div>
//             <h1>
//               {activeSection === 'Dashboard'
//                 ? 'Civic Issue Dashboard'
//                 : activeSection}
//             </h1>

//             <p>
//               {activeSection === 'Dashboard'
//                 ? 'Monitor and manage city complaints'
//                 : `View and manage ${activeSection.toLowerCase()}`}
//             </p>
//           </div>

//           <div className="authority-header-actions">
//             <span className="authority-role">Authority</span>

//             <button
//               type="button"
//               className="authority-action-button"
//               onClick={() => fetchComplaints(false)}
//               disabled={refreshing}
//             >
//               {refreshing ? 'Refreshing...' : '↻ Refresh'}
//             </button>
//           </div>
//         </header>

//         {error && complaints.length > 0 && (
//           <div className="authority-inline-error" role="alert">
//             {error}
//           </div>
//         )}

//         {lastUpdated && (
//           <p className="authority-last-updated">
//             Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
//             {' · '}Auto-refreshes every 20 seconds
//           </p>
//         )}

//         {activeSection === 'Dashboard' && (
//           <>
//             <section className="authority-cards">
//               <div className="authority-card">
//                 <h3>Total Complaints</h3>
//                 <h2>{stats.total ?? 0}</h2>
//                 <p>All reported issues</p>
//               </div>

//               <div className="authority-card">
//                 <h3>Pending</h3>
//                 <h2>{stats.pending ?? 0}</h2>
//                 <p>Awaiting action</p>
//               </div>

//               <div className="authority-card">
//                 <h3>Resolved</h3>
//                 <h2>{stats.resolved ?? 0}</h2>
//                 <p>Successfully resolved</p>
//               </div>

//               <div className="authority-card">
//                 <h3>High / Critical Priority</h3>
//                 <h2>{highPriorityCount}</h2>
//                 <p>Need closer attention</p>
//               </div>
//             </section>

//             <section className="authority-charts">
//               <div className="authority-chart-box">
//                 <h2>Complaints by Category</h2>

//                 {topCategories.length === 0 ? (
//                   <p>No category data available yet.</p>
//                 ) : (
//                   <div className="authority-bars">
//                     {topCategories.map(([label, count]) => (
//                       <div key={label}>
//                         <div className="authority-bar-label">
//                           <span>{label}</span>
//                           <strong>{count}</strong>
//                         </div>

//                         <div className="authority-bar">
//                           <span
//                             style={{
//                               width: `${
//                                 (count / maxCategoryCount) * 100
//                               }%`,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="authority-chart-box">
//                 <h2>Complaint Status</h2>

//                 <div className="authority-status-summary">
//                   <p>
//                     <span className="legend-pending" />
//                     Pending: <strong>{stats.pending ?? 0}</strong>
//                   </p>

//                   <p>
//                     <span className="legend-progress" />
//                     In Progress: <strong>{stats.in_progress ?? 0}</strong>
//                   </p>

//                   <p>
//                     <span className="legend-resolved" />
//                     Resolved: <strong>{stats.resolved ?? 0}</strong>
//                   </p>

//                   <p>
//                     <span className="legend-verified" />
//                     Verified: <strong>{stats.verified ?? 0}</strong>
//                   </p>

//                   <p>
//                     <span className="legend-assigned" />
//                     Assigned: <strong>{stats.assigned ?? 0}</strong>
//                   </p>

//                   <p>
//                     <span className="legend-rejected" />
//                     Rejected: <strong>{stats.rejected ?? 0}</strong>
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section className="authority-complaints">
//               <div className="authority-table-heading">
//                 <div>
//                   <h2>Recent Complaints</h2>
//                   <p>Latest issues reported by citizens</p>
//                 </div>

//                 <button
//                   type="button"
//                   className="authority-view-all"
//                   onClick={() => setActiveSection('Complaints')}
//                 >
//                   View all →
//                 </button>
//               </div>

//               {renderComplaintsTable(complaints.slice(0, 5))}
//             </section>
//           </>
//         )}

//         {activeSection === 'Complaints' && (
//           <section className="authority-complaints">
//             <div className="authority-table-heading">
//               <div>
//                 <h2>All Complaints</h2>
//                 <p>
//                   {complaints.length} complaint record(s) from the database
//                 </p>
//               </div>
//             </div>

//             {renderComplaintFilters()}
//             {renderComplaintsTable(filteredComplaints)}
//           </section>
//         )}

//         {activeSection === 'Civic Issues' && (
//           <section className="authority-complaints">
//             <div className="authority-table-heading">
//               <div>
//                 <h2>Civic Issues</h2>
//                 <p>Browse and search reported civic problems.</p>
//               </div>
//             </div>

//             {renderComplaintFilters()}
//             {renderComplaintsTable(filteredComplaints)}
//           </section>
//         )}

//         {activeSection === 'Workers' && (
//           <section className="authority-complaints">
//             <h2>Workers</h2>
//             <p>
//               Worker records and complaint assignment controls can be
//               connected in a later step.
//             </p>
//           </section>
//         )}

//         {activeSection === 'Analytics' && (
//           <section className="authority-complaints">
//             <h2>Complaint Analytics</h2>

//             <section className="authority-cards">
//               <div className="authority-card">
//                 <h3>Total</h3>
//                 <h2>{stats.total ?? 0}</h2>
//               </div>

//               <div className="authority-card">
//                 <h3>Assigned</h3>
//                 <h2>{stats.assigned ?? 0}</h2>
//               </div>

//               <div className="authority-card">
//                 <h3>In Progress</h3>
//                 <h2>{stats.in_progress ?? 0}</h2>
//               </div>

//               <div className="authority-card">
//                 <h3>Rejected</h3>
//                 <h2>{stats.rejected ?? 0}</h2>
//               </div>
//             </section>

//             <h3>Category breakdown</h3>

//             {topCategories.length === 0 ? (
//               <p>No analytics data available yet.</p>
//             ) : (
//               <ul>
//                 {topCategories.map(([category, count]) => (
//                   <li key={category}>
//                     {category}: {count} complaint(s)
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//         )}

//         {activeSection === 'Settings' && (
//           <section className="authority-complaints">
//             <h2>Settings</h2>
//             <p>Account information</p>

//             <div className="authority-settings">
//               <p>
//                 <strong>Name:</strong> {user?.name || 'Authority'}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user?.email || 'Not available'}
//               </p>
//               <p>
//                 <strong>Role:</strong> {user?.role || 'admin'}
//               </p>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }







import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../authority-dashboard.css';

const menuItems = [
  'Dashboard',
  'Complaints',
  'Workers',
  'Analytics',
  'Settings',
];

const statusLabels = {
  pending: 'Pending',
  verified: 'Verified',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  rejected: 'Rejected',
};

const formatStatus = (status) =>
  statusLabels[status] || status || 'Pending';

const formatDate = (date) => {
  if (!date) return '—';

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? '—'
    : parsed.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
};

// Supports absolute URLs and relative upload paths.
// Relative paths are resolved against the API server's base URL.
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const baseURL = api.defaults?.baseURL || window.location.origin;
  const serverURL = baseURL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  const cleanPath = imagePath.replace(/\\/g, '/').replace(/^\/+/, '');

  return `${serverURL}/${cleanPath}`;
};

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState('Dashboard');
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchComplaints = useCallback(async (initial = false) => {
    if (initial) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await api.get('/complaints/admin/all');

      setComplaints(response.data.complaints || []);
      setStats(response.data.stats || {});
      setLastUpdated(new Date());
      setError('');
    } catch (err) {
      console.error('Failed to fetch authority complaints:', err);

      setError(
        err.response?.data?.error ||
          'Unable to load complaints. Please check your connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints(true);
  }, [fetchComplaints]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchComplaints(false);
    }, 20000);

    return () => clearInterval(timer);
  }, [fetchComplaints]);

  // Close the image viewer or complaint details with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
        setSelectedComplaint(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredComplaints = complaints.filter((complaint) => {
    const searchable = [
      complaint.id,
      complaint.citizen_name,
      complaint.citizen_email,
      complaint.category,
      complaint.description,
      complaint.address,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = searchable.includes(normalizedSearch);
    const matchesStatus =
      statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' ||
      (complaint.priority || 'low') === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const highPriorityCount = complaints.filter((complaint) =>
    ['high', 'critical'].includes(
      (complaint.priority || '').toLowerCase()
    )
  ).length;

  const categoryCounts = complaints.reduce((result, complaint) => {
    const category = complaint.category || 'Other';
    result[category] = (result[category] || 0) + 1;
    return result;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCategoryCount = Math.max(
    1,
    ...topCategories.map(([, count]) => count)
  );

  const renderFilters = () => (
    <div className="authority-filters">
      <input
        type="search"
        placeholder="Search ID, citizen, category, location..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search complaints"
      />

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="assigned">Assigned</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(event) => setPriorityFilter(event.target.value)}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button
        type="button"
        className="authority-action-button"
        onClick={() => {
          setSearch('');
          setStatusFilter('all');
          setPriorityFilter('all');
        }}
      >
        Clear filters
      </button>
    </div>
  );

  const renderComplaintsTable = (items) => {
    if (loading) {
      return (
        <div className="authority-feedback" role="status">
          <div className="authority-loader" />
          <p>Loading complaints from MySQL...</p>
        </div>
      );
    }

    if (error && complaints.length === 0) {
      return (
        <div className="authority-feedback authority-error">
          <h3>Could not load complaints</h3>
          <p>{error}</p>
          <button
            type="button"
            className="authority-action-button"
            onClick={() => fetchComplaints(true)}
          >
            Try again
          </button>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="authority-feedback">
          <h3>No complaints found</h3>
          <p>
            {complaints.length === 0
              ? 'Citizen complaints will appear here after they are submitted.'
              : 'Try changing your search or filters.'}
          </p>
        </div>
      );
    }

    return (
      <div className="authority-table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Issue</th>
              <th>Citizen</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reported On</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {items.map((complaint) => {
              const priority = (
                complaint.priority || 'low'
              ).toLowerCase();

              const status = (
                complaint.status || 'pending'
              ).toLowerCase();

              const imageUrl = getImageUrl(complaint.image_url);

              return (
                <tr key={complaint.id}>
                  <td>#{complaint.id}</td>

                  <td>
                    {imageUrl ? (
                      <button
                        type="button"
                        className="authority-photo-button"
                        onClick={() => setSelectedImage({
                          url: imageUrl,
                          title: `Complaint #${complaint.id}`,
                        })}
                        aria-label={`View photo for complaint ${complaint.id}`}
                      >
                        <img
                          className="authority-complaint-thumbnail"
                          src={imageUrl}
                          alt={`Evidence for complaint ${complaint.id}`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                        />
                        <span>View photo</span>
                      </button>
                    ) : (
                      <span className="authority-no-photo">
                        No photo
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>{complaint.category || 'Other'}</strong>
                    <p className="authority-description">
                      {complaint.description || 'No description'}
                    </p>
                  </td>

                  <td>
                    <strong>
                      {complaint.citizen_name || 'Unknown citizen'}
                    </strong>
                    <p className="authority-description">
                      {complaint.citizen_email || ''}
                    </p>
                  </td>

                  <td>{complaint.address || 'Not provided'}</td>

                  <td>
                    <span className={`authority-priority ${priority}`}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`authority-status ${status.replace(/_/g, '-')}`}
                    >
                      {formatStatus(status)}
                    </span>
                  </td>

                  <td>{formatDate(complaint.created_at)}</td>

                  <td>
                    <button
                      type="button"
                      className="authority-view-all"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="authority-dashboard">
      <aside className="authority-sidebar">
        <h2>SmartCity</h2>

        <nav className="authority-navigation" aria-label="Authority navigation">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`authority-menu ${activeSection === item ? 'active' : ''}`}
              onClick={() => setActiveSection(item)}
              aria-current={activeSection === item ? 'page' : undefined}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="authority-sidebar-bottom">
          <p>{user?.name || 'Authority'}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="authority-main">
        <header className="authority-header">
          <div>
            <h1>
              {activeSection === 'Dashboard'
                ? 'Civic Issue Dashboard'
                : activeSection}
            </h1>
            <p>
              {activeSection === 'Dashboard'
                ? 'Monitor and manage city complaints'
                : `Manage ${activeSection.toLowerCase()} for your city`}
            </p>
          </div>

          <div className="authority-header-actions">
            <span className="authority-role">Authority</span>
            <button
              type="button"
              className="authority-action-button"
              onClick={() => fetchComplaints(false)}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : '↻ Refresh'}
            </button>
          </div>
        </header>

        {lastUpdated && (
          <p className="authority-last-updated">
            Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
            {' · '}Auto-refresh every 20 seconds
          </p>
        )}

        {error && complaints.length > 0 && (
          <div className="authority-inline-error" role="alert">
            {error}
          </div>
        )}

        {activeSection === 'Dashboard' && (
          <>
            <section className="authority-cards">
              <div className="authority-card">
                <h3>Total Complaints</h3>
                <h2>{stats.total ?? complaints.length}</h2>
                <p>All citizen reports</p>
              </div>
              <div className="authority-card">
                <h3>Pending</h3>
                <h2>{stats.pending ?? 0}</h2>
                <p>Awaiting action</p>
              </div>
              <div className="authority-card">
                <h3>Resolved</h3>
                <h2>{stats.resolved ?? 0}</h2>
                <p>Successfully resolved</p>
              </div>
              <div className="authority-card">
                <h3>High / Critical</h3>
                <h2>{highPriorityCount}</h2>
                <p>Priority reports</p>
              </div>
            </section>

            <section className="authority-charts">
              <div className="authority-chart-box">
                <h2>Complaints by Category</h2>

                {topCategories.length === 0 ? (
                  <p>No category data available yet.</p>
                ) : (
                  <div className="authority-bars">
                    {topCategories.map(([category, count]) => (
                      <div key={category}>
                        <div className="authority-bar-label">
                          <span>{category}</span>
                          <strong>{count}</strong>
                        </div>
                        <div className="authority-bar">
                          <span
                            style={{
                              width: `${(count / maxCategoryCount) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="authority-chart-box">
                <h2>Complaint Status</h2>
                <div className="authority-status-summary">
                  {[
                    ['pending', 'Pending', 'legend-pending'],
                    ['verified', 'Verified', 'legend-verified'],
                    ['assigned', 'Assigned', 'legend-assigned'],
                    ['in_progress', 'In Progress', 'legend-progress'],
                    ['resolved', 'Resolved', 'legend-resolved'],
                    ['rejected', 'Rejected', 'legend-rejected'],
                  ].map(([key, label, className]) => (
                    <p key={key}>
                      <span className={className} />
                      {label}: <strong>{stats[key] ?? 0}</strong>
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="authority-complaints">
              <div className="authority-table-heading">
                <div>
                  <h2>Recent Complaints</h2>
                  <p>Latest reports, including citizen-submitted photos</p>
                </div>
                <button
                  type="button"
                  className="authority-view-all"
                  onClick={() => setActiveSection('Complaints')}
                >
                  View all →
                </button>
              </div>
              {renderComplaintsTable(complaints.slice(0, 5))}
            </section>
          </>
        )}

        {activeSection === 'Complaints' && (
          <section className="authority-complaints">
            <div className="authority-table-heading">
              <div>
                <h2>All Citizen Complaints</h2>
                <p>
                  {complaints.length} database record(s). Select a photo or
                  view details to inspect a report.
                </p>
              </div>
            </div>
            {renderFilters()}
            {renderComplaintsTable(filteredComplaints)}
          </section>
        )}

        {activeSection === 'Workers' && (
          <section className="authority-complaints">
            <h2>Worker Management</h2>
            <p>
              This section is reserved for viewing registered workers,
              assigning complaints, and monitoring their workload.
            </p>
            <p>
              Worker records and assignment controls are not connected yet.
            </p>
          </section>
        )}

        {activeSection === 'Analytics' && (
          <section className="authority-complaints">
            <h2>Complaint Analytics</h2>
            <p>Current statistics from the complaint database.</p>

            <section className="authority-cards">
              {[
                ['Total', stats.total ?? complaints.length],
                ['Verified', stats.verified ?? 0],
                ['Assigned', stats.assigned ?? 0],
                ['In Progress', stats.in_progress ?? 0],
                ['Resolved', stats.resolved ?? 0],
                ['Rejected', stats.rejected ?? 0],
              ].map(([label, value]) => (
                <div className="authority-card" key={label}>
                  <h3>{label}</h3>
                  <h2>{value}</h2>
                </div>
              ))}
            </section>
          </section>
        )}

        {activeSection === 'Settings' && (
          <section className="authority-complaints">
            <h2>Account Settings</h2>
            <div className="authority-settings">
              <p><strong>Name:</strong> {user?.name || 'Authority'}</p>
              <p><strong>Email:</strong> {user?.email || 'Not available'}</p>
              <p><strong>Role:</strong> {user?.role || 'admin'}</p>
            </div>
          </section>
        )}
      </main>

      {selectedComplaint && (
        <div
          className="authority-modal-backdrop"
          onClick={() => setSelectedComplaint(null)}
        >
          <section
            className="authority-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="complaint-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="authority-modal-close"
              onClick={() => setSelectedComplaint(null)}
              aria-label="Close complaint details"
            >
              ×
            </button>

            <h2 id="complaint-detail-title">
              Complaint #{selectedComplaint.id}
            </h2>

            <p>
              <strong>Category:</strong> {selectedComplaint.category || 'Other'}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {selectedComplaint.description || 'No description'}
            </p>
            <p>
              <strong>Citizen:</strong>{' '}
              {selectedComplaint.citizen_name || 'Unknown'}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {selectedComplaint.citizen_email || 'Not available'}
            </p>
            <p>
              <strong>Location:</strong>{' '}
              {selectedComplaint.address || 'Not provided'}
            </p>
            <p>
              <strong>Priority:</strong>{' '}
              {selectedComplaint.priority || 'low'}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {formatStatus(selectedComplaint.status)}
            </p>
            <p>
              <strong>Reported:</strong>{' '}
              {formatDate(selectedComplaint.created_at)}
            </p>

            {selectedComplaint.image_url && (
              <button
                type="button"
                className="authority-photo-button"
                onClick={() =>
                  setSelectedImage({
                    url: getImageUrl(selectedComplaint.image_url),
                    title: `Complaint #${selectedComplaint.id}`,
                  })
                }
              >
                <img
                  className="authority-detail-image"
                  src={getImageUrl(selectedComplaint.image_url)}
                  alt={`Citizen evidence for complaint ${selectedComplaint.id}`}
                />
                <span>Enlarge photo</span>
              </button>
            )}

            <button
              type="button"
              className="authority-action-button"
              onClick={() => setSelectedComplaint(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}

      {selectedImage && (
        <div
          className="authority-image-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <section
            className="authority-image-viewer"
            role="dialog"
            aria-modal="true"
            aria-label="Complaint evidence photo"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="authority-modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close photo"
            >
              ×
            </button>
            <h2>{selectedImage.title}</h2>
            <img src={selectedImage.url} alt="Full-size complaint evidence" />
          </section>
        </div>
      )}
    </div>
  );
}

