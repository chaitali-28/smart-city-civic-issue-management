import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  verified: 'bg-blue-100 text-blue-800',
  assigned: 'bg-purple-100 text-purple-800',
  in_progress: 'bg-orange-100 text-orange-800',
  resolved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/my');
      setComplaints(res.data.complaints);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Complaints</h1>
          <Link
            to="/submit-complaint"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Submit Complaint
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">You haven't submitted any complaints yet.</p>
        ) : (
          <div className="grid gap-4">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{c.category}</p>
                    <p className="text-gray-600 text-sm mt-1">{c.description}</p>
                    {c.address && <p className="text-gray-400 text-xs mt-1">{c.address}</p>}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[c.status]}`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
                {c.image_url && (
                  <img src={c.image_url} alt="complaint" className="mt-3 rounded w-full max-w-xs" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}