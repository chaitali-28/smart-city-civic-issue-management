
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../worker-dashboard.css';

const initialComplaints = [
  {
    id: 'SC001',
    title: 'Road Damage',
    location: 'Main Road, Pachora',
    date: '2026-10-08',
    description:
      'A damaged section of road requires inspection and repair.',
    priority: 'High',
    status: 'pending',
    photo: '',
  },
  {
    id: 'SC002',
    title: 'Streetlight Not Working',
    location: 'Market Area, Pachora',
    date: '2026-10-07',
    description:
      'A streetlight is not working and needs maintenance.',
    priority: 'Medium',
    status: 'pending',
    photo: '',
  },
  {
    id: 'SC003',
    title: 'Waste Collection',
    location: 'Residential Area, Pachora',
    date: '2026-10-05',
    description:
      'Waste collection is required in the reported area.',
    priority: 'Low',
    status: 'completed',
    photo: '',
  },
];

const statusLabels = {
  pending: 'Pending',
  accepted: 'Accepted',
  progress: 'In Progress',
  completed: 'Completed',
};

function getInitials(name = 'Worker') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

function formatDate(date) {
  if (!date) return 'Not available';

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );
}

export default function WorkerDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState('dashboard');

  const [complaints, setComplaints] =
    useState(initialComplaints);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [progressPhoto, setProgressPhoto] = useState(null);
  const [completedPhoto, setCompletedPhoto] = useState(null);
  const [message, setMessage] = useState('');

  // Temporary demo profile.
  // Later, replace this with the authenticated user from AuthContext.
  const worker = {
    name: 'Rajesh Worker',
    id: 'WRK-1042',
    department: 'Public Maintenance',
    area: 'Pachora',
    role: 'Municipal Field Worker',
  };

  const initials = getInitials(worker.name);

  const pendingCount = complaints.filter(
    (item) => item.status === 'pending'
  ).length;

  const progressCount = complaints.filter(
    (item) => item.status === 'progress'
  ).length;

  const completedCount = complaints.filter(
    (item) => item.status === 'completed'
  ).length;

  const filteredComplaints = complaints.filter((item) => {
    const searchText =
      `${item.id} ${item.title} ${item.location}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase().trim()
    );

    const matchesStatus =
      statusFilter === 'all' ||
      item.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'all' ||
      item.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const openSection = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setProgressPhoto(null);
    setCompletedPhoto(null);
    setMessage('');
  };

  const updateComplaint = (id, changes) => {
    setComplaints((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );

    setSelectedComplaint((previous) =>
      previous?.id === id
        ? { ...previous, ...changes }
        : previous
    );
  };

  const handleAccept = () => {
    if (!selectedComplaint) return;

    updateComplaint(selectedComplaint.id, {
      status: 'accepted',
    });

    setMessage('Complaint accepted. You can now start work.');
  };

  const handleStartWork = () => {
    if (!selectedComplaint) return;

    updateComplaint(selectedComplaint.id, {
      status: 'progress',
    });

    setMessage('Work started successfully.');
  };

  const handleCompleteWork = () => {
    if (!selectedComplaint) return;

    if (!progressPhoto || !completedPhoto) {
      setMessage(
        'Please upload both progress and completed-work photos.'
      );
      return;
    }

    updateComplaint(selectedComplaint.id, {
      status: 'completed',
    });

    setMessage(
      'Work marked completed in this demo. Photos are not yet uploaded to the server.'
    );
  };

  const handleLogout = () => {
    // This navigates to login only.
    // Connect your AuthContext logout function here later.
    navigate('/login');
  };

  const handlePhotoChange = (event, type) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size must be 5 MB or less.');
      event.target.value = '';
      return;
    }

    if (type === 'progress') {
      setProgressPhoto(file);
    } else {
      setCompletedPhoto(file);
    }

    setMessage('');
  };

  const renderComplaintCard = (complaint) => (
    <article className="worker-complaint-card" key={complaint.id}>
      <div className="worker-card-top">
        <span className="worker-complaint-id">
          {complaint.id}
        </span>

        <span
          className={`worker-priority priority-${complaint.priority.toLowerCase()}`}
        >
          {complaint.priority}
        </span>
      </div>

      <h3>{complaint.title}</h3>

      <p className="worker-card-location">
        <span aria-hidden="true">⌖</span>
        {complaint.location}
      </p>

      <div className="worker-card-bottom">
        <span
          className={`worker-status status-${complaint.status}`}
        >
          {statusLabels[complaint.status]}
        </span>

        <button
          className="worker-text-button"
          type="button"
          onClick={() => openComplaint(complaint)}
        >
          View details →
        </button>
      </div>
    </article>
  );

  const renderEmptyState = (title, description) => (
    <div className="worker-empty-state">
      <div className="worker-empty-icon">⌕</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <div className="worker-app">
      {sidebarOpen && (
        <button
          className="worker-sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`worker-sidebar ${
          sidebarOpen ? 'worker-sidebar-open' : ''
        }`}
      >
        <button
          type="button"
          className="worker-brand"
          onClick={() => openSection('dashboard')}
        >
          <span className="worker-brand-icon">SC</span>

          <span className="worker-brand-copy">
            <strong>SmartCity</strong>
            <small>WORKER PORTAL</small>
          </span>
        </button>

        <div className="worker-mini-profile">
          <div className="worker-avatar">{initials}</div>

          <div>
            <strong>{worker.name}</strong>
            <span>
              <i className="worker-online-dot" />
              Field Worker
            </span>
          </div>
        </div>

        <p className="worker-nav-label">WORKSPACE</p>

        <nav className="worker-sidebar-nav">
          {[
            { id: 'dashboard', icon: '▦', label: 'Dashboard' },
            {
              id: 'complaints',
              icon: '▤',
              label: 'Assigned Complaints',
            },
            {
              id: 'completed',
              icon: '✓',
              label: 'Completed Work',
            },
            { id: 'profile', icon: '♙', label: 'My Profile' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`worker-nav-link ${
                activeSection === item.id ? 'active' : ''
              }`}
              onClick={() => openSection(item.id)}
            >
              <span className="worker-nav-icon">
                {item.icon}
              </span>

              {item.label}

              {item.id === 'complaints' &&
                pendingCount > 0 && (
                  <span className="worker-nav-count">
                    {pendingCount}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <div className="worker-sidebar-bottom">
          <div className="worker-help-card">
            <span className="worker-help-icon">?</span>
            <strong>Need assistance?</strong>
            <p>
              Contact your supervisor for help with assigned work.
            </p>
          </div>

          <button
            className="worker-nav-link worker-logout"
            type="button"
            onClick={handleLogout}
          >
            <span className="worker-nav-icon">↪</span>
            Back to Login
          </button>
        </div>
      </aside>

      <main className="worker-main">
        <header className="worker-topbar">
          <button
            type="button"
            className="worker-menu-toggle"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="worker-breadcrumb">
            Workspace <span>/</span>
            <strong>
              {activeSection === 'dashboard'
                ? 'Dashboard'
                : activeSection === 'complaints'
                  ? 'Assigned Complaints'
                  : activeSection === 'completed'
                    ? 'Completed Work'
                    : 'My Profile'}
            </strong>
          </div>

          <div className="worker-topbar-right">
            <span className="worker-date-chip">
              Worker portal
            </span>
            <div className="worker-top-avatar">{initials}</div>
          </div>
        </header>

        {/* DASHBOARD */}
        {activeSection === 'dashboard' && (
          <section className="worker-content-section">
            <div className="worker-page-header">
              <div>
                <p className="worker-eyebrow">
                  WORKSPACE OVERVIEW
                </p>
                <h1>Worker Dashboard</h1>
                <p className="worker-page-subtitle">
                  Welcome back, {worker.name}. Here is your work
                  activity at a glance.
                </p>
              </div>

              <button
                className="worker-button worker-button-primary"
                type="button"
                onClick={() => openSection('complaints')}
              >
                View assigned work →
              </button>
            </div>

            <div className="worker-stats-grid">
              {[
                {
                  label: 'Total Assigned',
                  number: complaints.length,
                  foot: 'Complaints assigned to you',
                  icon: '▤',
                  color: 'blue',
                },
                {
                  label: 'Pending',
                  number: pendingCount,
                  foot: 'Awaiting action',
                  icon: '◷',
                  color: 'amber',
                },
                {
                  label: 'In Progress',
                  number: progressCount,
                  foot: 'Work currently being handled',
                  icon: '⚙',
                  color: 'purple',
                },
                {
                  label: 'Completed',
                  number: completedCount,
                  foot: 'Work marked complete',
                  icon: '✓',
                  color: 'green',
                },
              ].map((stat) => (
                <article className="worker-stat-card" key={stat.label}>
                  <div className="worker-stat-top">
                    <span className="worker-stat-label">
                      {stat.label}
                    </span>
                    <span
                      className={`worker-stat-icon icon-${stat.color}`}
                    >
                      {stat.icon}
                    </span>
                  </div>

                  <div className="worker-stat-number">
                    {stat.number}
                  </div>

                  <p className="worker-stat-foot">{stat.foot}</p>
                </article>
              ))}
            </div>

            <div className="worker-section-heading">
              <div>
                <h2>Recent assigned complaints</h2>
                <p>Review the latest work assigned to you.</p>
              </div>

              <button
                className="worker-text-button"
                type="button"
                onClick={() => openSection('complaints')}
              >
                View all complaints →
              </button>
            </div>

            <div className="worker-complaints-grid">
              {complaints.slice(0, 3).map(renderComplaintCard)}
            </div>

            <div className="worker-notice-card">
              <span className="worker-notice-icon">i</span>
              <div>
                <strong>Remember to document your work</strong>
                <p>
                  Upload progress and completion photos before
                  marking a complaint as completed.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ASSIGNED COMPLAINTS */}
        {activeSection === 'complaints' && (
          <section className="worker-content-section">
            <div className="worker-page-header">
              <div>
                <p className="worker-eyebrow">FIELD OPERATIONS</p>
                <h1>Assigned Complaints</h1>
                <p className="worker-page-subtitle">
                  Search, filter, and update your assigned work.
                </p>
              </div>
            </div>

            <div className="worker-filter-panel">
              <label className="worker-search-field">
                <span>⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search ID, title or location..."
                />
              </label>

              <label className="worker-filter-field">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>

              <label className="worker-filter-field">
                <span>Priority</span>
                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                >
                  <option value="all">All priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>

              <button
                className="worker-button worker-button-secondary"
                type="button"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
              >
                Reset
              </button>
            </div>

            <div className="worker-complaints-grid">
              {filteredComplaints.map(renderComplaintCard)}
            </div>

            {filteredComplaints.length === 0 &&
              renderEmptyState(
                'No complaints found',
                'Try changing your search or filters.'
              )}
          </section>
        )}

        {/* COMPLETED WORK */}
        {activeSection === 'completed' && (
          <section className="worker-content-section">
            <div className="worker-page-header">
              <div>
                <p className="worker-eyebrow">WORK HISTORY</p>
                <h1>Completed Work</h1>
                <p className="worker-page-subtitle">
                  View complaints marked as completed.
                </p>
              </div>
            </div>

            <div className="worker-summary-strip">
              <span className="worker-summary-check">✓</span>
              <strong>
                {completedCount}{' '}
                {completedCount === 1
                  ? 'complaint completed'
                  : 'complaints completed'}
              </strong>
              <span>Keep your work documented.</span>
            </div>

            <div className="worker-complaints-grid">
              {complaints
                .filter((item) => item.status === 'completed')
                .map(renderComplaintCard)}
            </div>

            {completedCount === 0 &&
              renderEmptyState(
                'No completed work yet',
                'Completed complaints will appear here.'
              )}
          </section>
        )}

        {/* PROFILE */}
        {activeSection === 'profile' && (
          <section className="worker-content-section">
            <div className="worker-page-header">
              <div>
                <p className="worker-eyebrow">YOUR ACCOUNT</p>
                <h1>My Profile</h1>
                <p className="worker-page-subtitle">
                  Worker information and activity summary.
                </p>
              </div>
            </div>

            <div className="worker-profile-layout">
              <article className="worker-profile-card">
                <div className="worker-profile-cover" />

                <div className="worker-profile-card-body">
                  <div className="worker-profile-main-avatar">
                    {initials}
                  </div>

                  <h2>{worker.name}</h2>
                  <p className="worker-profile-role">{worker.role}</p>

                  <span className="worker-status status-accepted">
                    Active worker
                  </span>

                  <div className="worker-profile-divider" />

                  {[
                    ['Worker ID', worker.id],
                    ['Department', worker.department],
                    ['Service area', worker.area],
                    ['Account type', 'Demo profile'],
                  ].map(([label, value]) => (
                    <div className="worker-profile-detail" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </article>

              <article className="worker-profile-info-card">
                <h2>Work summary</h2>
                <p>Your complaint activity updates automatically.</p>

                <div className="worker-profile-stats">
                  {[
                    ['Assigned', complaints.length],
                    ['Pending', pendingCount],
                    ['In Progress', progressCount],
                    ['Completed', completedCount],
                  ].map(([label, number]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{number}</strong>
                    </div>
                  ))}
                </div>

                <div className="worker-profile-note">
                  <strong>Demo environment</strong>
                  <p>
                    These are sample complaints. Real worker details
                    and assignments must come from your backend API.
                  </p>
                </div>
              </article>
            </div>
          </section>
        )}

        <footer className="worker-page-footer">
          SmartCity Worker Portal <span>•</span> Demo data
        </footer>
      </main>

      {/* COMPLAINT DETAILS MODAL */}
      {selectedComplaint && (
        <div
          className="worker-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedComplaint(null);
            }
          }}
        >
          <section
            className="worker-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="worker-modal-title"
          >
            <header className="worker-modal-header">
              <div>
                <span className="worker-modal-id">
                  {selectedComplaint.id}
                </span>
                <h2 id="worker-modal-title">
                  {selectedComplaint.title}
                </h2>
              </div>

              <button
                className="worker-modal-close"
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedComplaint(null)}
              >
                ×
              </button>
            </header>

            <div className="worker-modal-body">
              <div className="worker-modal-status-row">
                <span
                  className={`worker-status status-${selectedComplaint.status}`}
                >
                  {statusLabels[selectedComplaint.status]}
                </span>

                <span
                  className={`worker-priority priority-${selectedComplaint.priority.toLowerCase()}`}
                >
                  {selectedComplaint.priority}
                </span>
              </div>

              <div className="worker-detail-grid">
                <div>
                  <span>Location</span>
                  <strong>{selectedComplaint.location}</strong>
                </div>

                <div>
                  <span>Reported on</span>
                  <strong>{formatDate(selectedComplaint.date)}</strong>
                </div>
              </div>

              <div className="worker-detail-description">
                <h3>Issue description</h3>
                <p>{selectedComplaint.description}</p>
              </div>

              <div className="worker-location-row">
                <div>
                  <span>Map location</span>
                  <p>{selectedComplaint.location}</p>
                </div>

                <a
                  className="worker-button worker-button-secondary"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedComplaint.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Maps ↗
                </a>
              </div>

              <div className="worker-work-actions">
                <h3>Update work status</h3>
                <p>Follow each step in order.</p>

                <div className="worker-action-buttons">
                  {selectedComplaint.status === 'pending' && (
                    <button
                      className="worker-button worker-button-primary"
                      type="button"
                      onClick={handleAccept}
                    >
                      Accept Complaint
                    </button>
                  )}

                  {selectedComplaint.status === 'accepted' && (
                    <button
                      className="worker-button worker-button-primary"
                      type="button"
                      onClick={handleStartWork}
                    >
                      Start Work
                    </button>
                  )}
                </div>

                {(selectedComplaint.status === 'progress' ||
                  selectedComplaint.status === 'completed') && (
                  <div className="worker-upload-grid">
                    <label className="worker-upload-box">
                      <span className="worker-upload-symbol">↑</span>
                      <strong>Progress photo</strong>
                      <span>Choose an image (max 5 MB)</span>

                      <input
                        type="file"
                        accept="image/*"
                        disabled={selectedComplaint.status === 'completed'}
                        onChange={(event) =>
                          handlePhotoChange(event, 'progress')
                        }
                      />

                      <span className="worker-file-name">
                        {progressPhoto?.name || 'No file selected'}
                      </span>
                    </label>

                    <label className="worker-upload-box">
                      <span className="worker-upload-symbol">✓</span>
                      <strong>Completed-work photo</strong>
                      <span>Choose an image (max 5 MB)</span>

                      <input
                        type="file"
                        accept="image/*"
                        disabled={selectedComplaint.status === 'completed'}
                        onChange={(event) =>
                          handlePhotoChange(event, 'completed')
                        }
                      />

                      <span className="worker-file-name">
                        {completedPhoto?.name || 'No file selected'}
                      </span>
                    </label>
                  </div>
                )}

                {selectedComplaint.status === 'progress' && (
                  <button
                    className="worker-button worker-button-success worker-button-full"
                    type="button"
                    onClick={handleCompleteWork}
                  >
                    Mark Work Completed
                  </button>
                )}

                {selectedComplaint.status === 'completed' && (
                  <p className="worker-success-message">
                    This complaint is marked completed in the demo.
                  </p>
                )}

                {message && (
                  <p className="worker-modal-message" role="status">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
