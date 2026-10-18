
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  UploadCloud,
  Send,
  X,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

import api from '../services/api';
import Navbar from '../components/Navbar';

export default function SubmitComplaint() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');

        const data = response.data;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
            ? data.categories
            : [];

        setCategories(list);

        if (list.length > 0) {
          setCategoryId(String(list[0].id));
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load categories. Please refresh the page.'
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!image) {
      setPreview('');
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be 5 MB or less.');
      event.target.value = '';
      return;
    }

    setError('');
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);

    const input = document.getElementById('complaint-image');
    if (input) input.value = '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!categoryId) {
      setError('Please select a complaint category.');
      return;
    }

    if (!description.trim()) {
      setError('Please describe the issue.');
      return;
    }

    if (!address.trim()) {
      setError('Please enter the issue location.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description.trim());
    formData.append('category_id', categoryId);
    formData.append('address', address.trim());

    if (image) {
      formData.append('image', image);
    }

    try {
      setSubmitting(true);

      await api.post('/complaints', formData);

      setSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to submit your complaint. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sc-compact min-h-screen text-white">
      <Navbar />

      <main className="compact-main mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="compact-layout">
          {/* LEFT: Complaint form */}
          <section className="compact-form-panel">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="compact-icon-box">
                  <MapPin size={19} />
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Civic Connect
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Report an Issue
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Help make your city better. Tell us what needs attention.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200"
              >
                <CheckCircle2 size={18} />
                Complaint submitted successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Issue Category <span className="text-cyan-300">*</span>
                </label>

                <select
                  id="category"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  disabled={loadingCategories || submitting}
                  required
                  className="compact-input"
                >
                  {loadingCategories ? (
                    <option value="">Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option value="">No categories available</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Description */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-slate-200"
                  >
                    Describe the Issue{' '}
                    <span className="text-cyan-300">*</span>
                  </label>

                  <span className="text-xs text-slate-500">
                    {description.length}/1000
                  </span>
                </div>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value.slice(0, 1000))
                  }
                  placeholder="Explain what happened and what needs to be fixed..."
                  rows={4}
                  maxLength={1000}
                  required
                  disabled={submitting}
                  className="compact-input min-h-28 resize-y"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Issue Location <span className="text-cyan-300">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="pointer-events-none absolute left-3 top-3.5 text-cyan-300"
                  />

                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter street, area or landmark"
                    maxLength={500}
                    required
                    disabled={submitting}
                    className="compact-input pl-10"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label
                  htmlFor="complaint-image"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Attach Photo{' '}
                  <span className="font-normal text-slate-500">
                    (Optional)
                  </span>
                </label>

                {!image ? (
                  <label
                    htmlFor="complaint-image"
                    className="compact-upload flex cursor-pointer items-center gap-3 rounded-xl p-3.5 transition hover:border-cyan-300/50 hover:bg-cyan-300/5"
                  >
                    <span className="compact-icon-box shrink-0">
                      <UploadCloud size={21} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-200">
                        Upload an issue photo
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        Images only · Maximum 5 MB
                      </span>
                    </span>

                    <ImageIcon
                      size={19}
                      className="shrink-0 text-slate-500"
                    />
                  </label>
                ) : (
                  <div className="compact-upload flex items-center gap-3 rounded-xl p-3">
                    {preview && (
                      <img
                        src={preview}
                        alt="Selected complaint"
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {image.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {(image.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={submitting}
                      aria-label="Remove selected image"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}

                <input
                  id="complaint-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={submitting}
                  className="sr-only"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  submitting ||
                  loadingCategories ||
                  categories.length === 0 ||
                  success
                }
                className="compact-submit flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <Send size={17} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Your report helps improve your community.
              </p>
            </form>
          </section>

          {/* RIGHT: Downloaded Gemini illustration */}
          <section className="compact-art">
            <div className="art-heading">
              <span className="art-eyebrow">
                <span className="art-live-dot" />
                SMARTER CITIES START HERE
              </span>

              <h2>
                Together, we can
                <br />
                <span>build a better city.</span>
              </h2>

              <p>
                Every report matters. Help us identify problems and make
                your neighbourhood safer, cleaner and better.
              </p>
            </div>

            <div className="art-image-wrap">
              <img
                src="/images/smartcity-illustration.png"
                alt="Illustration of a modern smart city with connected civic services"
                className="art-image"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="art-footer">
              <span className="art-footer-icon">
                <CheckCircle2 size={18} />
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Your voice makes a difference
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Report it. Track it. Improve it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        .sc-compact {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(ellipse at 78% 35%, rgba(8, 145, 178, 0.09), transparent 42%),
            #071426;
          color: #f8fafc;
        }

        .compact-main {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
        }

        .compact-layout {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(24px, 4vw, 64px);
        }

        .compact-form-panel {
          min-width: 0;
          padding: clamp(20px, 3vw, 32px);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 22px;
          background: rgba(11, 32, 53, 0.72);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(14px);
        }

        .compact-icon-box {
          display: inline-flex;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 12px;
          background: rgba(34, 211, 238, 0.09);
          color: #67e8f9;
        }

        .compact-input {
          display: block;
          width: 100%;
          border: 1px solid rgba(148, 163, 184, 0.19);
          border-radius: 12px;
          background: rgba(5, 18, 34, 0.7);
          padding: 11px 13px;
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .compact-input::placeholder {
          color: #64748b;
        }

        .compact-input:focus {
          border-color: rgba(34, 211, 238, 0.7);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.08);
        }

        .compact-input:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        select.compact-input {
          color-scheme: dark;
        }

        .compact-upload {
          border: 1px dashed rgba(148, 163, 184, 0.28);
          background: rgba(5, 18, 34, 0.38);
        }

        .compact-submit {
          border: 1px solid rgba(103, 232, 249, 0.35);
          background: linear-gradient(100deg, #0891b2, #0e7490);
          color: white;
          box-shadow: 0 8px 24px rgba(8, 145, 178, 0.16);
        }

        .compact-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          background: linear-gradient(100deg, #06a3c8, #0e829e);
          box-shadow: 0 10px 28px rgba(8, 145, 178, 0.24);
        }

        /* Illustration blends directly into the page background. */
        .compact-art {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px 0;
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          backdrop-filter: none;
        }

        .art-heading {
          position: relative;
          z-index: 1;
          max-width: 480px;
        }

        .art-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #67e8f9;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.19em;
        }

        .art-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2dd4bf;
          box-shadow: 0 0 12px rgba(45, 212, 191, 0.7);
        }

        .art-heading h2 {
          margin-top: 18px;
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 750;
          line-height: 1.16;
          letter-spacing: -0.045em;
          color: #f8fafc;
        }

        .art-heading h2 span {
          color: #67e8f9;
        }

        .art-heading > p {
          max-width: 400px;
          margin-top: 14px;
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.8;
        }

        .art-image-wrap {
          position: relative;
          width: 100%;
          margin-top: 8px;
        }

        .art-image {
          display: block;
          width: 100%;
          max-height: 390px;
          object-fit: contain;
          object-position: center;
          background: transparent;
          filter: saturate(0.96);
        }

        .art-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          align-self: flex-start;
          margin-top: 4px;
          padding: 12px 0;
        }

        .art-footer-icon {
          display: flex;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(45, 212, 191, 0.2);
          border-radius: 12px;
          background: rgba(45, 212, 191, 0.08);
          color: #5eead4;
        }

        @media (min-width: 1100px) {
          .compact-main {
            padding-top: 16px;
            padding-bottom: 16px;
          }

          .compact-form-panel {
            padding: 26px 30px;
          }
        }

        @media (max-width: 850px) {
          .compact-main {
            display: block;
            min-height: auto;
            padding-top: 24px;
            padding-bottom: 32px;
          }

          .compact-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 28px;
          }

          .compact-form-panel {
            order: 1;
          }

          .compact-art {
            order: 2;
            padding: 8px 4px;
          }

          .art-heading h2 {
            font-size: 34px;
          }

          .art-image {
            max-height: 360px;
          }
        }

        @media (max-width: 480px) {
          .compact-form-panel {
            padding: 20px 16px;
            border-radius: 18px;
          }

          .art-heading h2 {
            font-size: 30px;
          }

          .art-image {
            max-height: 280px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .compact-input,
          .compact-submit {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
