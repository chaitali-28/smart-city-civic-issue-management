import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">SmartCity</span>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Report Civic Issues. Track Resolutions. Build a Better City.
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          SmartCity connects citizens and local authorities to report, track, and resolve
          everyday civic problems, from potholes to broken streetlights, quickly and transparently.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Report an Issue
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-20">
        <div className="text-center">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-semibold text-gray-800 mb-1">Report</h3>
          <p className="text-gray-500 text-sm">
            Submit a complaint with a photo, description, and location in seconds.
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-semibold text-gray-800 mb-1">Track</h3>
          <p className="text-gray-500 text-sm">
            Follow your complaint's status from submission to resolution.
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-semibold text-gray-800 mb-1">Resolve</h3>
          <p className="text-gray-500 text-sm">
            Authorities verify, assign, and resolve issues, with full transparency.
          </p>
        </div>
      </section>
    </div>
  );
}