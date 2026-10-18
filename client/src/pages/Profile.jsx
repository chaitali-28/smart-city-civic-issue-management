
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CalendarDays,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UserCircle,
  ImagePlus,
  LogOut,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const cardStyle =
  'rounded-2xl border border-slate-700/70 bg-slate-900/80 shadow-lg shadow-slate-950/10';

const labelStyle = 'text-sm text-slate-400';
const valueStyle = 'mt-1 break-words text-sm font-medium text-slate-100';

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="group flex min-w-0 items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-800/50 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <p className={labelStyle}>{label}</p>
        <p className={valueStyle}>{value || 'Not provided'}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Keep the registered name instead of replacing it with a generic name.
  const fullName =
    user?.name ||
    user?.fullName ||
    user?.full_name ||
    user?.username ||
    'Citizen';

  const email = user?.email || user?.emailAddress || user?.email_address;
  const phone = user?.phone || user?.phoneNumber || user?.phone_number;
  const address =
    user?.address ||
    user?.residentialAddress ||
    user?.residential_address;
  const city = user?.city;
  const role = user?.role || 'Citizen';

  const createdAt =
    user?.createdAt ||
    user?.created_at ||
    user?.registeredAt ||
    user?.registrationDate;

  // Give each account its own photo on this browser.
  const accountKey = user?.id || user?._id || user?.email || 'citizen';
  const storageKey = `smartcity-profile-image-${accountKey}`;

  const [profileImage, setProfileImage] = useState(null);
  const [photoMessage, setPhotoMessage] = useState('');
  const [photoError, setPhotoError] = useState('');

  useEffect(() => {
    try {
      const savedImage = window.localStorage.getItem(storageKey);
      setProfileImage(savedImage);
    } catch {
      setProfileImage(null);
    }
  }, [storageKey]);

  const initials = useMemo(
    () =>
      fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || 'C',
    [fullName]
  );

  const formattedDate = createdAt
    ? (() => {
        const date = new Date(createdAt);
        return Number.isNaN(date.getTime())
          ? String(createdAt)
          : date.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
      })()
    : null;

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    setPhotoMessage('');
    setPhotoError('');

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setPhotoError('Please choose a JPG, PNG, or WebP image.');
      event.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Your image must be smaller than 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setPhotoError('Could not read this image. Please try again.');
        return;
      }

      try {
        window.localStorage.setItem(storageKey, reader.result);
        setProfileImage(reader.result);
        setPhotoMessage('Profile photo updated on this browser.');
      } catch {
        setPhotoError(
          'Could not save the photo in this browser. Try a smaller image.'
        );
      }
    };

    reader.onerror = () => {
      setPhotoError('Could not read this image. Please try again.');
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemovePhoto = () => {
    try {
      window.localStorage.removeItem(storageKey);
      setProfileImage(null);
      setPhotoMessage('Profile photo removed.');
      setPhotoError('');
    } catch {
      setPhotoError('Could not remove the saved photo.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setPhotoError('Logout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        {/* Back to dashboard */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Hero and profile photo */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mb-6 overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-[#111D33] via-[#10243A] to-[#0E3340] shadow-xl shadow-black/20"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              {/* Avatar and upload control */}
              <div className="relative shrink-0">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-800 text-3xl font-bold text-cyan-200 shadow-lg shadow-cyan-950/30">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={`${fullName}'s profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile photo"
                  className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#10243A] bg-cyan-400 text-slate-950 shadow-lg transition hover:scale-105 hover:bg-cyan-300"
                >
                  <Camera size={19} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <div className="pt-1">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  <UserRound size={14} />
                  My Profile
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {fullName}
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Manage your registered information and stay connected
                  with your civic reports.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/50 px-3 py-1.5 text-xs font-medium text-slate-200">
                    <ShieldCheck size={14} className="text-cyan-300" />
                    {role}
                  </span>

                  {formattedDate && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300">
                      <CalendarDays size={14} className="text-cyan-300" />
                      Joined {formattedDate}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {/* <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20"
                  >
                    <ImagePlus size={16} />
                    {profileImage ? 'Change Photo' : 'Add Profile Photo'}
                  </button> */}

                  {profileImage && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:text-rose-300"
                    >
                      Remove photo
                    </button>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  JPG, PNG or WebP · Maximum 2 MB
                </p>

                {photoMessage && (
                  <p role="status" className="mt-2 text-sm text-emerald-300">
                    {photoMessage}
                  </p>
                )}

                {photoError && (
                  <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-rose-300">
                    <AlertCircle size={15} />
                    {photoError}
                  </p>
                )}
              </div>
            </div>

            <Link
              to="/dashboard#my-reports"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              <FileText size={17} />
              My Reports
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.section>

        {/* Account information and quick actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3"
        >
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className={`${cardStyle} p-5 sm:p-6 lg:col-span-2`}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <UserCircle size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  Registered Information
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Information available from your account
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailCard
                icon={UserRound}
                label="Full Registered Name"
                value={fullName}
              />

              <DetailCard
                icon={Mail}
                label="Email Address"
                value={email}
              />

              {phone && (
                <DetailCard
                  icon={Phone}
                  label="Phone Number"
                  value={phone}
                />
              )}

              {address && (
                <DetailCard
                  icon={MapPin}
                  label="Residential Address"
                  value={address}
                />
              )}

              {city && (
                <DetailCard
                  icon={MapPin}
                  label="City"
                  value={city}
                />
              )}

              <DetailCard
                icon={ShieldCheck}
                label="Account Role"
                value={role}
              />

              <DetailCard
                icon={CalendarDays}
                label="Registration Date"
                value={formattedDate || 'Not available'}
              />
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-400/20 bg-blue-400/[0.06] p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-cyan-300"
              />
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Your account, your information
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  These details are displayed from your logged-in account.
                  If a registered detail is missing, check that your
                  registration form and backend return that field.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.aside
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <section className={`${cardStyle} p-5`}>
              <h2 className="text-lg font-bold text-white">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-400">
                Continue your civic activity.
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  to="/submit-complaint"
                  className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-3 transition hover:border-cyan-400/40 hover:bg-slate-800"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <FileText size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-100">
                      Report an Issue
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Submit a civic complaint
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                </Link>

                <Link
                  to="/dashboard#my-reports"
                  className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-3 transition hover:border-cyan-400/40 hover:bg-slate-800"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <MapPin size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-100">
                      Track My Reports
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      View complaint progress
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-[#102A40] to-[#102E35] p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <BadgeCheck size={22} />
              </div>
              <h2 className="text-lg font-bold text-white">
                Building Better Communities
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Every genuine civic report can help your community become
                safer, cleaner, and better maintained.
              </p>
            </section>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/[0.06] px-5 py-3.5 text-sm font-semibold text-rose-300 transition hover:border-rose-400/50 hover:bg-rose-400/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.aside>
        </motion.div>

        <footer className="mt-10 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
          SmartCity · Citizen Portal · Building better communities together
        </footer>
      </main>
    </div>
  );
}





