import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([
    {
      id: 'SC001',
      title: 'Road Damage & Pothole Repair',
      location: 'Main Road, Pachora',
      priority: 'High',
      status: 'pending',
      assignedWorker: 'Rajesh Worker',
    },
    {
      id: 'SC002',
      title: 'Streetlight Not Working',
      location: 'Station Road, Pachora',
      priority: 'Medium',
      status: 'In Progress',
      assignedWorker: 'Rajesh Worker',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setComplaints(
      complaints.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Authority Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage civic issues, assign workers, and track real-time resolutions across Pachora.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition"
          >
            Logout ↪
          </button>
        </div>

        {/* COMPLAINTS TABLE SECTION */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">All Reported Complaints</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-cyan-300 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assigned Worker</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-white/5 transition">
                    <td className="p-3 font-mono text-cyan-300 font-bold">{complaint.id}</td>
                    <td className="p-3 font-semibold text-white">{complaint.title}</td>
                    <td className="p-3 text-slate-300">{complaint.location}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        complaint.priority === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-300">{complaint.status}</td>
                    <td className="p-3 text-cyan-400 font-semibold">{complaint.assignedWorker}</td>
                    <td className="p-3">
                      <select
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}