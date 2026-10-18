import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialComplaints = [
  {
    id: 'SC001',
    title: 'Road Damage & Pothole Repair',
    location: 'Main Road, Pachora',
    coordinates: '20.6727,75.3522',
    date: '2026-10-08',
    description: 'A damaged section of road requires immediate inspection and cold-mix asphalt repair.',
    priority: 'High',
    status: 'pending',
    assignedByAuthority: 'Pachora Municipal Authority (Zone 2)',
    assignedWorkerName: 'Rajesh Worker',
    assignedWorkerId: 'WRK-1042',
    progressPhoto: null,
    completedPhoto: null,
    completionPercentage: 0,
  },
  {
    id: 'SC002',
    title: 'Streetlight Maintenance',
    location: 'Market Area, Pachora',
    coordinates: '20.6750,75.3560',
    date: '2026-10-07',
    description: 'A commercial area streetlight grid is flickering and needs transformer check.',
    priority: 'Medium',
    status: 'progress',
    assignedByAuthority: 'Electrical Division Officer',
    assignedWorkerName: 'Rajesh Worker',
    assignedWorkerId: 'WRK-1042',
    progressPhoto: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=400&q=80',
    completedPhoto: null,
    completionPercentage: 50,
  },
  {
    id: 'SC003',
    title: 'Sanitation & Waste Collection',
    location: 'Residential Area, Pachora',
    coordinates: '20.6690,75.3480',
    date: '2026-10-05',
    description: 'Overflowing public bins cleared and area sanitized with bleaching spray.',
    priority: 'Low',
    status: 'completed',
    assignedByAuthority: 'Sanitation Dept Supervisor',
    assignedWorkerName: 'Rajesh Worker',
    assignedWorkerId: 'WRK-1042',
    progressPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    completedPhoto: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80',
    completionPercentage: 100,
  },
];

const statusLabels = {
  pending: 'Pending',
  accepted: 'Accepted',
  progress: 'In Progress',
  completed: 'Completed',
};

export default function WorkerDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [progressPhoto, setProgressPhoto] = useState(null);
  const [completedPhoto, setCompletedPhoto] = useState(null);
  const [progressPhotoPreview, setProgressPhotoPreview] = useState(null);
  const [completedPhotoPreview, setCompletedPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');

  const worker = {
    name: 'Rajesh Worker',
    id: 'WRK-1042',
    department: 'Public Infrastructure & Maintenance',
    area: 'Pachora Municipal Sector',
    role: 'Field Maintenance Specialist',
  };

  const pendingComplaints = complaints.filter((item) => item.status === 'pending');
  const progressComplaints = complaints.filter((item) => item.status === 'progress' || item.status === 'accepted');
  const completedComplaints = complaints.filter((item) => item.status === 'completed');

  const filteredComplaints = complaints.filter((item) => {
    const searchText = `${item.id} ${item.title} ${item.location} ${item.assignedByAuthority}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase().trim());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setProgressPhoto(null);
    setCompletedPhoto(null);
    setProgressPhotoPreview(complaint.progressPhoto || null);
    setCompletedPhotoPreview(complaint.completedPhoto || null);
    setMessage('');
  };

  const updateComplaint = (id, changes) => {
    setComplaints((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
    setSelectedComplaint((previous) =>
      previous?.id === id ? { ...previous, ...changes } : previous
    );
  };

  const handleAccept = () => {
    if (!selectedComplaint) return;
    updateComplaint(selectedComplaint.id, { status: 'accepted', completionPercentage: 25 });
    setMessage('Complaint accepted. Assigned authority notified.');
  };

  const handleStartWork = () => {
    if (!selectedComplaint) return;
    updateComplaint(selectedComplaint.id, { status: 'progress', completionPercentage: 50 });
    setMessage('Work started. Upload photos to update authority on progress.');
  };

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please upload a valid image file.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === 'progress') {
      setProgressPhoto(file);
      setProgressPhotoPreview(previewUrl);
      updateComplaint(selectedComplaint.id, {
        progressPhoto: previewUrl,
        completionPercentage: selectedComplaint.status === 'completed' ? 100 : 75,
      });
      setMessage('Before/Progress photo updated and ready for authority inspection!');
    } else {
      setCompletedPhoto(file);
      setCompletedPhotoPreview(previewUrl);
      updateComplaint(selectedComplaint.id, {
        completedPhoto: previewUrl,
      });
      setMessage('After/Completion photo uploaded successfully!');
    }
  };

  const handleCompleteWork = () => {
    if (!selectedComplaint) return;

    if (!progressPhotoPreview || !completedPhotoPreview) {
      setMessage('⚠️ Both Before/Progress photo and Completed photo are required for Authority verification.');
      return;
    }

    updateComplaint(selectedComplaint.id, {
      status: 'completed',
      completionPercentage: 100,
    });

    setMessage('✅ Work marked 100% completed! Photos sent to Authority Dashboard.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-bold shadow-lg shadow-cyan-900/20">
              ◆
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">SmartCity</h1>
              <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">Worker Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              ● Active Duty ({worker.id})
            </span>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition"
            >
              Logout ↪
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* TOP HERO & SIMULATION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
              Live Civic Task Management
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Welcome back, <span className="text-cyan-300">{worker.name}</span>
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-xl leading-relaxed">
              Track assigned tasks, navigate via live GPS location, upload photo proof, and sync task completion directly with Municipal Authorities.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { id: 'dashboard', label: '📊 Overview' },
                { id: 'pending', label: `⏳ Pending (${pendingComplaints.length})` },
                { id: 'progress', label: `⚙️ In Progress (${progressComplaints.length})` },
                { id: 'completed', label: `✅ Completed (${completedComplaints.length})` },
                { id: 'authority', label: '🏛️ Authority Assignments' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                    activeSection === tab.id
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-950/50'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SIMULATION CARD LIKE HOME PAGE */}
          <div className="bg-slate-900/90 border border-cyan-400/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                ⚡ Active Work Simulation
              </span>
              <span className="text-xs text-slate-400">Real-Time Sync</span>
            </div>

            <div className="py-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Active Location Task</p>
                  <p className="text-sm font-bold text-white mt-0.5">{complaints[0]?.title}</p>
                  <p className="text-xs text-cyan-300 mt-1">{complaints[0]?.location}</p>
                </div>
              </div>

              <div className="mt-4 bg-slate-950 rounded-xl p-3 border border-white/10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Authority Sync Status</span>
                  <span className="text-cyan-300 font-bold">{complaints[0]?.completionPercentage}% Completed</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${complaints[0]?.completionPercentage || 25}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => openComplaint(complaints[0])}
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition text-center shadow-lg shadow-cyan-900/30"
            >
              Simulate & View Task Details →
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
          <input
            type="search"
            placeholder="🔍 Search complaint ID, title, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[240px] px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* ================= SECTIONS & CARDS ================= */}
        {activeSection === 'authority' ? (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">🏛️ Authority Assignment Roster</h3>
            <p className="text-xs text-slate-400 mb-6">
              Full transparency record showing assigning municipal officers, designated field workers, and real-time status.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-cyan-300 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">Complaint ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Assigning Authority</th>
                    <th className="p-3">Assigned Worker</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {complaints.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition">
                      <td className="p-3 font-mono text-cyan-300 font-bold">{item.id}</td>
                      <td className="p-3 font-semibold text-white">{item.title}</td>
                      <td className="p-3 text-slate-300">{item.assignedByAuthority}</td>
                      <td className="p-3 text-cyan-400">{item.assignedWorkerName} ({item.assignedWorkerId})</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          item.status === 'progress' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {statusLabels[item.status]}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => openComplaint(item)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 font-bold hover:bg-cyan-400 hover:text-slate-950 transition"
                        >
                          View Work →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints
              .filter((item) => {
                if (activeSection === 'pending') return item.status === 'pending';
                if (activeSection === 'progress') return item.status === 'progress' || item.status === 'accepted';
                if (activeSection === 'completed') return item.status === 'completed';
                return true;
              })
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/50 transition duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-1 rounded-lg">
                        {item.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.priority === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        item.priority === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                      <span className="text-cyan-400">📍</span> {item.location}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4">{item.description}</p>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5 text-[11px] text-slate-400 mb-4">
                      <span className="block text-slate-500 font-semibold">Assigned By:</span>
                      <span className="text-cyan-300 font-medium">{item.assignedByAuthority}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-3 mb-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                        item.status === 'progress' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        {statusLabels[item.status]}
                      </span>
                      <span className="text-xs text-slate-400">Completion: {item.completionPercentage}%</span>
                    </div>

                    <button
                      onClick={() => openComplaint(item)}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-white text-xs font-bold transition text-center border border-white/15"
                    >
                      Open Task & Upload Photos →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>

      {/* ================= MODAL DETAILED WORK WINDOW ================= */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/15 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="bg-slate-950 p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800">
                  {selectedComplaint.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{selectedComplaint.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Assigned Authority: {selectedComplaint.assignedByAuthority}</p>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* GPS TRACKING SECTION */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold block">
                    🌐 GPS Location & Direct Route Navigation
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedComplaint.location}</p>
                  <p className="text-xs text-slate-400">Coordinates: {selectedComplaint.coordinates}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedComplaint.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition shadow-md"
                >
                  🗺️ Navigate on Google Maps ↗
                </a>
              </div>

              {/* ACTION PROGRESS UPDATE */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  1. Update Work Status
                </span>
                <div className="flex flex-wrap gap-3">
                  {selectedComplaint.status === 'pending' && (
                    <button
                      onClick={handleAccept}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition"
                    >
                      Accept Task & Inform Authority
                    </button>
                  )}
                  {selectedComplaint.status === 'accepted' && (
                    <button
                      onClick={handleStartWork}
                      className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition"
                    >
                      Start Work Operations
                    </button>
                  )}
                </div>
              </div>

              {/* PHOTO UPLOAD & AUTHORITY PREVIEW SECTION */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  2. Photo Proof & Completion Documentation for Authority
                </span>
                <p className="text-xs text-slate-400 mb-4">
                  Upload before/progress and completion photos so municipal authorities can verify your completed work live.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* BEFORE / PROGRESS PHOTO */}
                  <div className="border border-dashed border-white/20 rounded-xl p-3 text-center bg-slate-900/50">
                    <span className="text-xs font-bold text-white block mb-2">📷 Before / In-Progress Photo</span>
                    {progressPhotoPreview ? (
                      <img
                        src={progressPhotoPreview}
                        alt="Progress Preview"
                        className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10"
                      />
                    ) : (
                      <div className="h-32 rounded-lg bg-slate-950 border border-white/5 flex items-center justify-center text-xs text-slate-500 mb-2">
                        No photo uploaded
                      </div>
                    )}
                    <label className="inline-block px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-cyan-300 font-bold cursor-pointer transition">
                      Upload Progress Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'progress')}
                      />
                    </label>
                  </div>

                  {/* AFTER / COMPLETED PHOTO */}
                  <div className="border border-dashed border-white/20 rounded-xl p-3 text-center bg-slate-900/50">
                    <span className="text-xs font-bold text-white block mb-2">✅ After / Completion Photo</span>
                    {completedPhotoPreview ? (
                      <img
                        src={completedPhotoPreview}
                        alt="Completed Preview"
                        className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10"
                      />
                    ) : (
                      <div className="h-32 rounded-lg bg-slate-950 border border-white/5 flex items-center justify-center text-xs text-slate-500 mb-2">
                        No photo uploaded
                      </div>
                    )}
                    <label className="inline-block px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-cyan-300 font-bold cursor-pointer transition">
                      Upload Completion Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'completed')}
                      />
                    </label>
                  </div>
                </div>

                {selectedComplaint.status !== 'completed' && (
                  <button
                    onClick={handleCompleteWork}
                    className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition shadow-lg shadow-emerald-950/50"
                  >
                    Mark Work 100% Completed & Submit to Authority
                  </button>
                )}
              </div>

              {message && (
                <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-xs text-cyan-300 font-medium">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}