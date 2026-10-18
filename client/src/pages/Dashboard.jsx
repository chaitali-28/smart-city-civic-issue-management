



// import { useEffect, useMemo, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   motion,
//   AnimatePresence,
//   animate,
//   useMotionValue,
//   useTransform,
//   useReducedMotion,
// } from 'motion/react';

// import {
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   CircleAlert,
//   ClipboardList,
//   Clock3,
//   FileText,
//   MapPin,
//   Plus,
//   RefreshCw,
//   Search,
//   Sparkles,
//   X,
//   TrendingUp,
//   Activity,
// } from 'lucide-react';

// import api from '../services/api';
// import Navbar from '../components/Navbar';
// import { useAuth } from '../context/AuthContext';
// import './Dashboard.css';

// const statusConfig = {
//   pending: {
//     label: 'Pending',
//     color: 'pending',
//     icon: Clock3,
//     step: 0,
//   },
//   verified: {
//     label: 'Verified',
//     color: 'verified',
//     icon: CheckCircle2,
//     step: 1,
//   },
//   assigned: {
//     label: 'Assigned',
//     color: 'assigned',
//     icon: ClipboardList,
//     step: 2,
//   },
//   in_progress: {
//     label: 'In Progress',
//     color: 'progress',
//     icon: RefreshCw,
//     step: 3,
//   },
//   resolved: {
//     label: 'Resolved',
//     color: 'resolved',
//     icon: CheckCircle2,
//     step: 4,
//   },
//   rejected: {
//     label: 'Rejected',
//     color: 'rejected',
//     icon: CircleAlert,
//     step: -1,
//   },
// };

// const journeySteps = [
//   { label: 'Submitted', description: 'Report received' },
//   { label: 'Verified', description: 'Issue reviewed' },
//   { label: 'Assigned', description: 'Team assigned' },
//   { label: 'In progress', description: 'Work underway' },
//   { label: 'Resolved', description: 'Issue completed' },
// ];

// const filters = [
//   { label: 'All issues', value: 'all' },
//   { label: 'Pending', value: 'pending' },
//   { label: 'In progress', value: 'in_progress' },
//   { label: 'Resolved', value: 'resolved' },
// ];

// function AnimatedNumber({ value }) {
//   const reduceMotion = useReducedMotion();
//   const count = useMotionValue(0);

//   const rounded = useTransform(count, (latest) =>
//     Math.round(latest)
//   );

//   useEffect(() => {
//     const controls = animate(count, value, {
//       duration: reduceMotion ? 0 : 0.8,
//       ease: 'easeOut',
//     });

//     return () => controls.stop();
//   }, [count, value, reduceMotion]);

//   return <motion.span>{rounded}</motion.span>;
// }

// function Reveal({ children, delay = 0, className = '' }) {
//   const reduceMotion = useReducedMotion();

//   return (
//     <motion.div
//       className={className}
//       initial={reduceMotion ? false : { opacity: 0, y: 18 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: reduceMotion ? 0 : 0.45,
//         delay: reduceMotion ? 0 : delay,
//         ease: 'easeOut',
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function StatCard({ title, value, icon: Icon, color, delay }) {
//   const reduceMotion = useReducedMotion();

//   return (
//     <Reveal delay={delay}>
//       <motion.article
//         className="citizen-stat-card"
//         whileHover={reduceMotion ? undefined : { y: -4 }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className={`citizen-stat-icon ${color}`}>
//           <Icon size={21} />
//         </div>

//         <p className="citizen-stat-label">{title}</p>

//         <p className="citizen-stat-value">
//           <AnimatedNumber value={value} />
//         </p>
//       </motion.article>
//     </Reveal>
//   );
// }

// function StatusBadge({ status }) {
//   const config = statusConfig[status] || {
//     label: String(status || 'Unknown').replaceAll('_', ' '),
//     color: 'unknown',
//     icon: CircleAlert,
//   };

//   const Icon = config.icon;

//   return (
//     <span className={`citizen-status ${config.color}`}>
//       <Icon size={13} />
//       {config.label}
//     </span>
//   );
// }

// function ComplaintJourney({ status }) {
//   const reduceMotion = useReducedMotion();
//   const config = statusConfig[status];
//   const currentStep = config?.step ?? -1;

//   if (currentStep === -1) {
//     return (
//       <div className="journey-rejected">
//         <CircleAlert size={16} />
//         <div>
//           <p className="journey-rejected-title">
//             This report was rejected
//           </p>
//           <p className="journey-rejected-description">
//             Check the report details or contact the responsible
//             department if you need clarification.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const progress =
//     currentStep === 4
//       ? 100
//       : (currentStep / (journeySteps.length - 1)) * 100;

//   return (
//     <div className="journey-wrap">
//       <div className="journey-heading">
//         <span>REPORT JOURNEY</span>
//         <span className="journey-step-count">
//           Step {currentStep + 1} of {journeySteps.length}
//         </span>
//       </div>

//       <div className="journey-track">
//         <div className="journey-track-background" />

//         <motion.div
//           className="journey-track-fill"
//           initial={{ width: reduceMotion ? `${progress}%` : '0%' }}
//           animate={{ width: `${progress}%` }}
//           transition={{
//             duration: reduceMotion ? 0 : 0.8,
//             ease: 'easeInOut',
//           }}
//         />

//         {journeySteps.map((step, index) => {
//           const completed = index < currentStep;
//           const current = index === currentStep;
//           const Icon = completed ? Check : null;

//           return (
//             <div className="journey-step" key={step.label}>
//               <motion.div
//                 className={[
//                   'journey-node',
//                   completed ? 'completed' : '',
//                   current ? 'current' : '',
//                 ].join(' ')}
//                 initial={
//                   reduceMotion
//                     ? false
//                     : { scale: 0.8, opacity: 0.6 }
//                 }
//                 animate={{
//                   scale: current ? 1.08 : 1,
//                   opacity: 1,
//                 }}
//                 transition={{
//                   duration: reduceMotion ? 0 : 0.3,
//                   delay: reduceMotion ? 0 : index * 0.07,
//                 }}
//               >
//                 {Icon ? (
//                   <Icon size={13} />
//                 ) : (
//                   <span>{index + 1}</span>
//                 )}
//               </motion.div>

//               <span
//                 className={[
//                   'journey-step-label',
//                   completed || current ? 'highlighted' : '',
//                 ].join(' ')}
//               >
//                 {step.label}
//               </span>

//               <span className="journey-step-description">
//                 {step.description}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ImpactPanel({ stats }) {
//   const reduceMotion = useReducedMotion();

//   const resolutionRate =
//     stats.total > 0
//       ? Math.round((stats.resolved / stats.total) * 100)
//       : 0;

//   return (
//     <Reveal>
//       <section className="citizen-impact">
//         <div className="impact-copy">
//           <div className="impact-eyebrow">
//             <Sparkles size={14} />
//             YOUR CIVIC IMPACT
//           </div>

//           <h2>Your voice is making a difference.</h2>

//           <p>
//             Every report helps bring attention to the issues
//             that matter in your neighbourhood.
//           </p>

//           <div className="impact-mini-stats">
//             <div>
//               <span className="impact-mini-value">
//                 {stats.total}
//               </span>
//               <span className="impact-mini-label">
//                 Reports submitted
//               </span>
//             </div>

//             <div>
//               <span className="impact-mini-value">
//                 {stats.resolved}
//               </span>
//               <span className="impact-mini-label">
//                 Issues resolved
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="impact-ring-area">
//           <div className="impact-ring">
//             <svg
//               viewBox="0 0 120 120"
//               aria-label={`${resolutionRate}% of reports resolved`}
//             >
//               <circle
//                 className="impact-ring-track"
//                 cx="60"
//                 cy="60"
//                 r="48"
//               />

//               <motion.circle
//                 className="impact-ring-progress"
//                 cx="60"
//                 cy="60"
//                 r="48"
//                 initial={{
//                   pathLength: reduceMotion ? resolutionRate / 100 : 0,
//                 }}
//                 animate={{
//                   pathLength: resolutionRate / 100,
//                 }}
//                 transition={{
//                   duration: reduceMotion ? 0 : 1,
//                   ease: 'easeOut',
//                 }}
//               />
//             </svg>

//             <div className="impact-ring-content">
//               <span className="impact-percentage">
//                 {resolutionRate}%
//               </span>
//               <span className="impact-ring-caption">
//                 Resolution rate
//               </span>
//             </div>
//           </div>

//           <span className="impact-ring-note">
//             Based on your reports
//           </span>
//         </div>
//       </section>
//     </Reveal>
//   );
// }

// function ComplaintCard({ complaint, index }) {
//   const reduceMotion = useReducedMotion();

//   return (
//     <motion.article
//       layout
//       className="citizen-complaint-card"
//       initial={reduceMotion ? false : { opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
//       transition={{
//         duration: reduceMotion ? 0 : 0.3,
//         delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.2),
//         layout: { duration: 0.22 },
//       }}
//     >
//       <div className="complaint-card-top">
//         <div className="complaint-card-title">
//           <div className="citizen-category-icon">
//             <ClipboardList size={18} />
//           </div>

//           <div className="complaint-title-copy">
//             <h3>{complaint.category || 'Civic issue'}</h3>
//             <span className="complaint-reference">
//               Report #{complaint.id}
//             </span>
//           </div>
//         </div>

//         <StatusBadge status={complaint.status} />
//       </div>

//       <p className="complaint-description">
//         {complaint.description || 'No description provided.'}
//       </p>

//       {complaint.address && (
//         <p className="complaint-address">
//           <MapPin size={15} />
//           <span>{complaint.address}</span>
//         </p>
//       )}

//       {complaint.image_url && (
//         <img
//           src={complaint.image_url}
//           alt={`Photo of ${complaint.category || 'reported civic issue'}`}
//           loading="lazy"
//           className="citizen-complaint-image"
//         />
//       )}

//       <ComplaintJourney status={complaint.status} />

//       <div className="complaint-card-footer">
//         <span>
//           <Activity size={14} />
//           Tracked by SmartCity
//         </span>

//         {complaint.status === 'resolved' && (
//           <span className="resolved-note">
//             <CheckCircle2 size={14} />
//             Issue resolved
//           </span>
//         )}
//       </div>
//     </motion.article>
//   );
// }

// export default function Dashboard() {
//   const location = useLocation();

//   // Get the logged-in citizen from the authentication context.
//   const { user } = useAuth();

//   // Use the registered name supplied by your authentication context.
//   const citizenName =
//     user?.name?.trim() ||
//     user?.fullName?.trim() ||
//     user?.username?.trim() ||
//     'Citizen';

//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const fetchComplaints = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const res = await api.get('/complaints/my');
//       const data = res.data?.complaints;

//       setComplaints(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Failed to fetch complaints:', err);
//       setError(
//         'We could not load your complaints. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Scroll to My Reports when the navbar link is clicked.
//   useEffect(() => {
//     if (
//       location.pathname === '/dashboard' &&
//       location.hash === '#my-reports'
//     ) {
//       const timer = window.setTimeout(() => {
//         document.getElementById('my-reports')?.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         });
//       }, 100);

//       return () => window.clearTimeout(timer);
//     }
//   }, [location.pathname, location.hash]);

//   const stats = useMemo(
//     () => ({
//       total: complaints.length,

//       pending: complaints.filter((c) =>
//         ['pending', 'verified', 'assigned'].includes(c.status)
//       ).length,

//       progress: complaints.filter(
//         (c) => c.status === 'in_progress'
//       ).length,

//       resolved: complaints.filter(
//         (c) => c.status === 'resolved'
//       ).length,
//     }),
//     [complaints]
//   );

//   const filteredComplaints = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     return complaints.filter((complaint) => {
//       const matchesStatus =
//         activeFilter === 'all' ||
//         complaint.status === activeFilter;

//       const matchesSearch =
//         !query ||
//         [
//           complaint.category,
//           complaint.description,
//           complaint.address,
//           complaint.status,
//           complaint.id,
//         ].some((value) =>
//           String(value ?? '').toLowerCase().includes(query)
//         );

//       return matchesStatus && matchesSearch;
//     });
//   }, [complaints, activeFilter, searchQuery]);

//   return (
//     <div className="citizen-dashboard min-h-screen">
//       <Navbar />

//       <main className="citizen-main mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

//         {/* Welcome hero */}
//         <Reveal>
//           <section className="citizen-welcome">
//             <div className="welcome-grid-pattern" />

//             <div className="welcome-content">
//               <div className="citizen-eyebrow">
//                 <Sparkles size={14} />
//                 YOUR CIVIC SPACE
//               </div>

//               <h1>
//                 Welcome, <span>{citizenName} 👋</span>
//               </h1>

//               <p>
//                 Every report brings your community one step closer
//                 to a better place to live. Track your reports and
//                 see the difference you make.
//               </p>

//               <Link
//                 to="/submit-complaint"
//                 className="citizen-primary-button"
//               >
//                 <Plus size={18} />
//                 Report an issue
//                 <ArrowRight size={16} />
//               </Link>
//             </div>

//             <div className="welcome-visual" aria-hidden="true">
//               <motion.div
//                 className="welcome-orbit orbit-large"
//                 animate={{ rotate: 360 }}
//                 transition={{
//                   duration: 32,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//               />

//               <motion.div
//                 className="welcome-orbit orbit-small"
//                 animate={{ rotate: -360 }}
//                 transition={{
//                   duration: 22,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//               />

//               <motion.div
//                 className="welcome-pin"
//                 animate={{ y: [0, -7, 0] }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                 }}
//               >
//                 <MapPin size={34} />
//               </motion.div>

//               <span className="welcome-orbit-dot dot-one" />
//               <span className="welcome-orbit-dot dot-two" />
//               <span className="welcome-orbit-dot dot-three" />
//             </div>
//           </section>
//         </Reveal>

//         {/* Overview statistics */}
//         <section className="citizen-overview">
//           <div className="citizen-section-heading">
//             <div>
//               <h2>Your overview</h2>
//               <p>A clear picture of your reported issues.</p>
//             </div>

//             <button
//               type="button"
//               onClick={fetchComplaints}
//               disabled={loading}
//               className="citizen-refresh-button"
//             >
//               <RefreshCw
//                 size={16}
//                 className={loading ? 'animate-spin' : ''}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>

//           <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
//             <StatCard
//               title="Total reports"
//               value={loading ? 0 : stats.total}
//               icon={ClipboardList}
//               color="stat-blue"
//               delay={0}
//             />

//             <StatCard
//               title="Awaiting resolution"
//               value={loading ? 0 : stats.pending}
//               icon={Clock3}
//               color="stat-amber"
//               delay={0.07}
//             />

//             <StatCard
//               title="In progress"
//               value={loading ? 0 : stats.progress}
//               icon={RefreshCw}
//               color="stat-violet"
//               delay={0.14}
//             />

//             <StatCard
//               title="Resolved"
//               value={loading ? 0 : stats.resolved}
//               icon={CheckCircle2}
//               color="stat-green"
//               delay={0.21}
//             />
//           </div>
//         </section>

//         {/* Personal civic impact */}
//         {!loading && !error && complaints.length > 0 && (
//           <section className="citizen-impact-section">
//             <ImpactPanel stats={stats} />
//           </section>
//         )}

//         {/* My Reports */}
//         <section
//           id="my-reports"
//           className="citizen-reports-section scroll-mt-6"
//         >
//           <div className="citizen-section-heading reports-heading">
//             <div>
//               <h2>My reports</h2>
//               <p>
//                 Follow every step from submission to resolution.
//               </p>
//             </div>

//             <Link
//               to="/submit-complaint"
//               className="citizen-secondary-button"
//             >
//               <Plus size={16} />
//               New report
//             </Link>
//           </div>

//           {/* Search */}
//           <div className="citizen-search-wrap">
//             <Search size={18} />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search reports, locations or categories..."
//               aria-label="Search complaints"
//             />

//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => setSearchQuery('')}
//                 aria-label="Clear search"
//                 className="citizen-clear-search"
//               >
//                 <X size={17} />
//               </button>
//             )}
//           </div>

//           {/* Filters */}
//           <div className="citizen-filter-row">
//             {filters.map((filter) => (
//               <button
//                 key={filter.value}
//                 type="button"
//                 onClick={() => setActiveFilter(filter.value)}
//                 className={`citizen-filter ${
//                   activeFilter === filter.value ? 'active' : ''
//                 }`}
//               >
//                 {filter.label}

//                 {filter.value === 'all' && !loading && (
//                   <span className="citizen-filter-count">
//                     {complaints.length}
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Loading */}
//           {loading && (
//             <div className="citizen-loading-list">
//               {[1, 2, 3].map((item) => (
//                 <div className="citizen-skeleton-card" key={item}>
//                   <div className="citizen-skeleton skeleton-title" />
//                   <div className="citizen-skeleton skeleton-line" />
//                   <div className="citizen-skeleton skeleton-short" />
//                   <div className="citizen-skeleton skeleton-journey" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Error */}
//           {!loading && error && (
//             <div className="citizen-empty-state">
//               <div className="empty-state-icon error-icon">
//                 <CircleAlert size={27} />
//               </div>

//               <h3>Unable to load reports</h3>
//               <p>{error}</p>

//               <button
//                 type="button"
//                 onClick={fetchComplaints}
//                 className="citizen-secondary-button"
//               >
//                 <RefreshCw size={16} />
//                 Try again
//               </button>
//             </div>
//           )}

//           {/* No complaints */}
//           {!loading && !error && complaints.length === 0 && (
//             <div className="citizen-empty-state">
//               <motion.div
//                 className="empty-state-icon"
//                 animate={{ y: [0, -5, 0] }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                 }}
//               >
//                 <FileText size={29} />
//               </motion.div>

//               <h3>Your civic journey starts here</h3>

//               <p>
//                 Report a road problem, damaged streetlight or
//                 another issue in your community.
//               </p>

//               <Link
//                 to="/submit-complaint"
//                 className="citizen-primary-button"
//               >
//                 <Plus size={17} />
//                 Submit your first report
//               </Link>
//             </div>
//           )}

//           {/* No matching reports */}
//           {!loading &&
//             !error &&
//             complaints.length > 0 &&
//             filteredComplaints.length === 0 && (
//               <div className="citizen-empty-state">
//                 <div className="empty-state-icon">
//                   <Search size={27} />
//                 </div>

//                 <h3>No matching reports</h3>

//                 <p>
//                   Try a different keyword or choose another status.
//                 </p>

//                 <button
//                   type="button"
//                   className="citizen-text-button"
//                   onClick={() => {
//                     setSearchQuery('');
//                     setActiveFilter('all');
//                   }}
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}

//           {/* Animated complaint cards */}
//           {!loading && !error && filteredComplaints.length > 0 && (
//             <motion.div layout className="citizen-complaint-list">
//               <AnimatePresence mode="popLayout">
//                 {filteredComplaints.map((complaint, index) => (
//                   <ComplaintCard
//                     key={complaint.id}
//                     complaint={complaint}
//                     index={index}
//                   />
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </section>

//         {/* Bottom call to action */}
//         {!loading && complaints.length > 0 && (
//           <Reveal>
//             <section className="citizen-bottom-banner">
//               <div className="bottom-banner-icon">
//                 <TrendingUp size={22} />
//               </div>

//               <div className="bottom-banner-copy">
//                 <h3>Let's make your neighbourhood better.</h3>
//                 <p>
//                   See another issue? Report it and help your
//                   community move forward.
//                 </p>
//               </div>

//               <Link
//                 to="/submit-complaint"
//                 className="citizen-secondary-button"
//               >
//                 Report an issue
//                 <ArrowRight size={16} />
//               </Link>
//             </section>
//           </Reveal>
//         )}
//       </main>
//     </div>
//   );
// }









import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'motion/react';

import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Clock3,
  FileText,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  X,
  TrendingUp,
  Activity,
  Trash2,
} from 'lucide-react';

import api from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'pending',
    icon: Clock3,
    step: 0,
  },
  verified: {
    label: 'Verified',
    color: 'verified',
    icon: CheckCircle2,
    step: 1,
  },
  assigned: {
    label: 'Assigned',
    color: 'assigned',
    icon: ClipboardList,
    step: 2,
  },
  in_progress: {
    label: 'In Progress',
    color: 'progress',
    icon: RefreshCw,
    step: 3,
  },
  resolved: {
    label: 'Resolved',
    color: 'resolved',
    icon: CheckCircle2,
    step: 4,
  },
  rejected: {
    label: 'Rejected',
    color: 'rejected',
    icon: CircleAlert,
    step: -1,
  },
};

const journeySteps = [
  { label: 'Submitted', description: 'Report received' },
  { label: 'Verified', description: 'Issue reviewed' },
  { label: 'Assigned', description: 'Team assigned' },
  { label: 'In progress', description: 'Work underway' },
  { label: 'Resolved', description: 'Issue completed' },
];

const filters = [
  { label: 'All issues', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
];

function AnimatedNumber({ value }) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: reduceMotion ? 0 : 0.8,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [count, value, reduceMotion]);

  return <motion.span>{rounded}</motion.span>;
}

function Reveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal delay={delay}>
      <motion.article
        className="citizen-stat-card"
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`citizen-stat-icon ${color}`}>
          <Icon size={21} />
        </div>

        <p className="citizen-stat-label">{title}</p>

        <p className="citizen-stat-value">
          <AnimatedNumber value={value} />
        </p>
      </motion.article>
    </Reveal>
  );
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: String(status || 'Unknown').replaceAll('_', ' '),
    color: 'unknown',
    icon: CircleAlert,
  };

  const Icon = config.icon;

  return (
    <span className={`citizen-status ${config.color}`}>
      <Icon size={13} />
      {config.label}
    </span>
  );
}

function ComplaintJourney({ status }) {
  const reduceMotion = useReducedMotion();
  const config = statusConfig[status];
  const currentStep = config?.step ?? -1;

  if (currentStep === -1) {
    return (
      <div className="journey-rejected">
        <CircleAlert size={16} />

        <div>
          <p className="journey-rejected-title">
            This report was rejected
          </p>

          <p className="journey-rejected-description">
            Check the report details or contact the responsible
            department if you need clarification.
          </p>
        </div>
      </div>
    );
  }

  const progress =
    currentStep === 4
      ? 100
      : (currentStep / (journeySteps.length - 1)) * 100;

  return (
    <div className="journey-wrap">
      <div className="journey-heading">
        <span>REPORT JOURNEY</span>

        <span className="journey-step-count">
          Step {currentStep + 1} of {journeySteps.length}
        </span>
      </div>

      <div className="journey-track">
        <div className="journey-track-background" />

        <motion.div
          className="journey-track-fill"
          initial={{
            width: reduceMotion ? `${progress}%` : '0%',
          }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: 'easeInOut',
          }}
        />

        {journeySteps.map((step, index) => {
          const completed = index < currentStep;
          const current = index === currentStep;
          const Icon = completed ? Check : null;

          return (
            <div className="journey-step" key={step.label}>
              <motion.div
                className={[
                  'journey-node',
                  completed ? 'completed' : '',
                  current ? 'current' : '',
                ].join(' ')}
                initial={
                  reduceMotion
                    ? false
                    : { scale: 0.8, opacity: 0.6 }
                }
                animate={{
                  scale: current ? 1.08 : 1,
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                {Icon ? <Icon size={13} /> : <span>{index + 1}</span>}
              </motion.div>

              <span
                className={[
                  'journey-step-label',
                  completed || current ? 'highlighted' : '',
                ].join(' ')}
              >
                {step.label}
              </span>

              <span className="journey-step-description">
                {step.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImpactPanel({ stats }) {
  const reduceMotion = useReducedMotion();

  const resolutionRate =
    stats.total > 0
      ? Math.round((stats.resolved / stats.total) * 100)
      : 0;

  return (
    <Reveal>
      <section className="citizen-impact">
        <div className="impact-copy">
          <div className="impact-eyebrow">
            <Sparkles size={14} />
            YOUR CIVIC IMPACT
          </div>

          <h2>Your voice is making a difference.</h2>

          <p>
            Every report helps bring attention to the issues
            that matter in your neighbourhood.
          </p>

          <div className="impact-mini-stats">
            <div>
              <span className="impact-mini-value">{stats.total}</span>
              <span className="impact-mini-label">
                Reports submitted
              </span>
            </div>

            <div>
              <span className="impact-mini-value">{stats.resolved}</span>
              <span className="impact-mini-label">
                Issues resolved
              </span>
            </div>
          </div>
        </div>

        <div className="impact-ring-area">
          <div className="impact-ring">
            <svg
              viewBox="0 0 120 120"
              aria-label={`${resolutionRate}% of reports resolved`}
            >
              <circle
                className="impact-ring-track"
                cx="60"
                cy="60"
                r="48"
              />

              <motion.circle
                className="impact-ring-progress"
                cx="60"
                cy="60"
                r="48"
                initial={{
                  pathLength: reduceMotion ? resolutionRate / 100 : 0,
                }}
                animate={{
                  pathLength: resolutionRate / 100,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1,
                  ease: 'easeOut',
                }}
              />
            </svg>

            <div className="impact-ring-content">
              <span className="impact-percentage">
                {resolutionRate}%
              </span>

              <span className="impact-ring-caption">
                Resolution rate
              </span>
            </div>
          </div>

          <span className="impact-ring-note">
            Based on your reports
          </span>
        </div>
      </section>
    </Reveal>
  );
}

function ComplaintCard({
  complaint,
  index,
  onDelete,
  deleting,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className="citizen-complaint-card"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.2),
        layout: { duration: 0.22 },
      }}
    >
      <div className="complaint-card-top">
        <div className="complaint-card-title">
          <div className="citizen-category-icon">
            <ClipboardList size={18} />
          </div>

          <div className="complaint-title-copy">
            <h3>{complaint.category || 'Civic issue'}</h3>

            <span className="complaint-reference">
              Report #{complaint.id}
            </span>
          </div>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      <p className="complaint-description">
        {complaint.description || 'No description provided.'}
      </p>

      {complaint.address && (
        <p className="complaint-address">
          <MapPin size={15} />
          <span>{complaint.address}</span>
        </p>
      )}

      {complaint.image_url && (
        <img
          src={complaint.image_url}
          alt={`Photo of ${complaint.category || 'reported civic issue'}`}
          loading="lazy"
          className="citizen-complaint-image"
        />
      )}

      <ComplaintJourney status={complaint.status} />

      <div className="complaint-card-footer">
        <span>
          <Activity size={14} />
          Tracked by SmartCity
        </span>

        {complaint.status === 'resolved' && (
          <span className="resolved-note">
            <CheckCircle2 size={14} />
            Issue resolved
          </span>
        )}
      </div>

      {/* Delete report button */}
      <div className="mt-4 flex justify-end border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() => onDelete(complaint)}
          disabled={deleting}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-400/60 hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Delete report ${complaint.id}`}
        >
          {deleting ? (
            <RefreshCw size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}

          {deleting ? 'Deleting...' : 'Delete report'}
        </button>
      </div>
    </motion.article>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const { user } = useAuth();

  const citizenName =
    user?.name?.trim() ||
    user?.fullName?.trim() ||
    user?.username?.trim() ||
    'Citizen';

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.get('/complaints/my');
      const data = res.data?.complaints;

      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch complaints:', err);

      setError(
        'We could not load your complaints. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Scroll to My Reports when opened from the navbar.
  useEffect(() => {
    if (
      location.pathname === '/dashboard' &&
      location.hash === '#my-reports'
    ) {
      const timer = window.setTimeout(() => {
        document.getElementById('my-reports')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);

      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // Delete a report from the backend and then update the UI.
  const handleDeleteComplaint = async (complaint) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete report #${complaint.id}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(complaint.id);

    try {
      // This endpoint must exist in your backend.
      await api.delete(`/complaints/${complaint.id}`);

      // Remove the deleted report from the citizen's current view.
      setComplaints((currentComplaints) =>
        currentComplaints.filter(
          (item) => String(item.id) !== String(complaint.id)
        )
      );
    } catch (err) {
      console.error('Failed to delete complaint:', err);

      const message =
        err.response?.data?.message ||
        'Could not delete this report. Please try again.';

      window.alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(
    () => ({
      total: complaints.length,

      pending: complaints.filter((c) =>
        ['pending', 'verified', 'assigned'].includes(c.status)
      ).length,

      progress: complaints.filter(
        (c) => c.status === 'in_progress'
      ).length,

      resolved: complaints.filter(
        (c) => c.status === 'resolved'
      ).length,
    }),
    [complaints]
  );

  const filteredComplaints = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesStatus =
        activeFilter === 'all' ||
        complaint.status === activeFilter;

      const matchesSearch =
        !query ||
        [
          complaint.category,
          complaint.description,
          complaint.address,
          complaint.status,
          complaint.id,
        ].some((value) =>
          String(value ?? '').toLowerCase().includes(query)
        );

      return matchesStatus && matchesSearch;
    });
  }, [complaints, activeFilter, searchQuery]);

  return (
    <div className="citizen-dashboard min-h-screen">
      <Navbar />

      <main className="citizen-main mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

        {/* Welcome hero */}
        <Reveal>
          <section className="citizen-welcome">
            <div className="welcome-grid-pattern" />

            <div className="welcome-content">
              <div className="citizen-eyebrow">
                <Sparkles size={14} />
                YOUR CIVIC SPACE
              </div>

              <h1>
                Welcome, <span>{citizenName} 👋</span>
              </h1>

              <p>
                Every report brings your community one step closer
                to a better place to live. Track your reports and
                see the difference you make.
              </p>

              <Link
                to="/submit-complaint"
                className="citizen-primary-button"
              >
                <Plus size={18} />
                Report an issue
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="welcome-visual" aria-hidden="true">
              <motion.div
                className="welcome-orbit orbit-large"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                className="welcome-orbit orbit-small"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                className="welcome-pin"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <MapPin size={34} />
              </motion.div>

              <span className="welcome-orbit-dot dot-one" />
              <span className="welcome-orbit-dot dot-two" />
              <span className="welcome-orbit-dot dot-three" />
            </div>
          </section>
        </Reveal>

        {/* Overview statistics */}
        <section className="citizen-overview">
          <div className="citizen-section-heading">
            <div>
              <h2>Your overview</h2>
              <p>A clear picture of your reported issues.</p>
            </div>

            <button
              type="button"
              onClick={fetchComplaints}
              disabled={loading}
              className="citizen-refresh-button"
            >
              <RefreshCw
                size={16}
                className={loading ? 'animate-spin' : ''}
              />
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <StatCard
              title="Total reports"
              value={loading ? 0 : stats.total}
              icon={ClipboardList}
              color="stat-blue"
              delay={0}
            />

            <StatCard
              title="Awaiting resolution"
              value={loading ? 0 : stats.pending}
              icon={Clock3}
              color="stat-amber"
              delay={0.07}
            />

            <StatCard
              title="In progress"
              value={loading ? 0 : stats.progress}
              icon={RefreshCw}
              color="stat-violet"
              delay={0.14}
            />

            <StatCard
              title="Resolved"
              value={loading ? 0 : stats.resolved}
              icon={CheckCircle2}
              color="stat-green"
              delay={0.21}
            />
          </div>
        </section>

        {/* Personal civic impact */}
        {!loading && !error && complaints.length > 0 && (
          <section className="citizen-impact-section">
            <ImpactPanel stats={stats} />
          </section>
        )}

        {/* My Reports */}
        <section
          id="my-reports"
          className="citizen-reports-section scroll-mt-6"
        >
          <div className="citizen-section-heading reports-heading">
            <div>
              <h2>My reports</h2>
              <p>
                Follow every step from submission to resolution.
              </p>
            </div>

            <Link
              to="/submit-complaint"
              className="citizen-secondary-button"
            >
              <Plus size={16} />
              New report
            </Link>
          </div>

          {/* Search */}
          <div className="citizen-search-wrap">
            <Search size={18} />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, locations or categories..."
              aria-label="Search complaints"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="citizen-clear-search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="citizen-filter-row">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`citizen-filter ${
                  activeFilter === filter.value ? 'active' : ''
                }`}
              >
                {filter.label}

                {filter.value === 'all' && !loading && (
                  <span className="citizen-filter-count">
                    {complaints.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="citizen-loading-list">
              {[1, 2, 3].map((item) => (
                <div className="citizen-skeleton-card" key={item}>
                  <div className="citizen-skeleton skeleton-title" />
                  <div className="citizen-skeleton skeleton-line" />
                  <div className="citizen-skeleton skeleton-short" />
                  <div className="citizen-skeleton skeleton-journey" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="citizen-empty-state">
              <div className="empty-state-icon error-icon">
                <CircleAlert size={27} />
              </div>

              <h3>Unable to load reports</h3>
              <p>{error}</p>

              <button
                type="button"
                onClick={fetchComplaints}
                className="citizen-secondary-button"
              >
                <RefreshCw size={16} />
                Try again
              </button>
            </div>
          )}

          {/* No complaints */}
          {!loading && !error && complaints.length === 0 && (
            <div className="citizen-empty-state">
              <motion.div
                className="empty-state-icon"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FileText size={29} />
              </motion.div>

              <h3>Your civic journey starts here</h3>

              <p>
                Report a road problem, damaged streetlight or
                another issue in your community.
              </p>

              <Link
                to="/submit-complaint"
                className="citizen-primary-button"
              >
                <Plus size={17} />
                Submit your first report
              </Link>
            </div>
          )}

          {/* No matching reports */}
          {!loading &&
            !error &&
            complaints.length > 0 &&
            filteredComplaints.length === 0 && (
              <div className="citizen-empty-state">
                <div className="empty-state-icon">
                  <Search size={27} />
                </div>

                <h3>No matching reports</h3>

                <p>
                  Try a different keyword or choose another status.
                </p>

                <button
                  type="button"
                  className="citizen-text-button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}

          {/* Complaint cards with Delete buttons */}
          {!loading && !error && filteredComplaints.length > 0 && (
            <motion.div layout className="citizen-complaint-list">
              <AnimatePresence mode="popLayout">
                {filteredComplaints.map((complaint, index) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    index={index}
                    onDelete={handleDeleteComplaint}
                    deleting={
                      String(deletingId) === String(complaint.id)
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Bottom call to action */}
        {!loading && complaints.length > 0 && (
          <Reveal>
            <section className="citizen-bottom-banner">
              <div className="bottom-banner-icon">
                <TrendingUp size={22} />
              </div>

              <div className="bottom-banner-copy">
                <h3>Let's make your neighbourhood better.</h3>

                <p>
                  See another issue? Report it and help your
                  community move forward.
                </p>
              </div>

              <Link
                to="/submit-complaint"
                className="citizen-secondary-button"
              >
                Report an issue
                <ArrowRight size={16} />
              </Link>
            </section>
          </Reveal>
        )}
      </main>
    </div>
  );
}
