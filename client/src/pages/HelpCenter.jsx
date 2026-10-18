
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CircleHelp,
  Mail,
  Phone,
  FileText,
  Clock3,
  CheckCircle2,
  UserCheck,
  Wrench,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const faqs = [
  {
    question: 'How do I report a civic issue?',
    answer:
      'Open Report Issue, select the issue category, provide a clear description and location, attach a photo if available, and submit your complaint.',
  },
  {
    question: 'How can I check my complaint status?',
    answer:
      'Open My Reports from your dashboard. You can check the latest status of each complaint you have submitted.',
  },
  {
    question: 'What if my issue has not been resolved?',
    answer:
      'Check the complaint status in My Reports. If the issue remains unresolved, contact the support team using the official contact details provided by your SmartCity administrator.',
  },
  {
    question: 'Can I submit more than one complaint?',
    answer:
      'Yes. Submit a separate report for each distinct civic issue so that each problem can be tracked individually.',
  },
];

const statuses = [
  {
    label: 'Pending',
    description: 'Your complaint has been submitted and is awaiting review.',
    icon: Clock3,
    color: 'text-amber-300',
    bg: 'bg-amber-400/10',
  },
  {
    label: 'Verified',
    description: 'The complaint has been reviewed and verified.',
    icon: CheckCircle2,
    color: 'text-sky-300',
    bg: 'bg-sky-400/10',
  },
  {
    label: 'Assigned',
    description: 'The complaint has been assigned to the responsible team.',
    icon: UserCheck,
    color: 'text-violet-300',
    bg: 'bg-violet-400/10',
  },
  {
    label: 'In Progress',
    description: 'The responsible team is working on the issue.',
    icon: Wrench,
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
  },
  {
    label: 'Resolved',
    description: 'The complaint has been marked as resolved.',
    icon: CheckCircle2,
    color: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
  },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm
                     text-slate-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Page heading */}
        <section className="relative mb-8 overflow-hidden rounded-3xl
                            border border-cyan-400/15
                            bg-gradient-to-br from-[#111D33]
                            via-[#10243A] to-[#0E3340] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-16
                          h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center
                            justify-center rounded-2xl border
                            border-cyan-300/20 bg-cyan-300/10
                            text-cyan-300">
              <CircleHelp size={30} />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase
                            tracking-[0.2em] text-cyan-300">
                CITIZEN SUPPORT
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Help Center
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Need help with a civic complaint? Find guidance,
                understand complaint statuses, and get the right support.
              </p>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mb-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10
                          bg-white/[0.04] p-6 transition
                          hover:border-cyan-400/30">
            <div className="mb-4 flex h-11 w-11 items-center
                            justify-center rounded-xl bg-cyan-400/10
                            text-cyan-300">
              <FileText size={23} />
            </div>

            <h2 className="text-lg font-semibold">Report a Civic Issue</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Report potholes, broken streetlights, waste, water problems,
              or other civic issues in your area.
            </p>

            <Link
              to="/submit-complaint"
              className="mt-5 inline-flex items-center gap-2 rounded-xl
                         border border-cyan-400/20 bg-cyan-400/10
                         px-4 py-2.5 text-sm font-semibold text-cyan-300
                         transition hover:bg-cyan-400/20"
            >
              Report Issue <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10
                          bg-white/[0.04] p-6 transition
                          hover:border-cyan-400/30">
            <div className="mb-4 flex h-11 w-11 items-center
                            justify-center rounded-xl bg-cyan-400/10
                            text-cyan-300">
              <Clock3 size={23} />
            </div>

            <h2 className="text-lg font-semibold">Track Your Complaint</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Check whether your complaint is pending, assigned,
              in progress, or resolved.
            </p>

            <Link
              to="/dashboard#my-reports"
              className="mt-5 inline-flex items-center gap-2 rounded-xl
                         border border-cyan-400/20 bg-cyan-400/10
                         px-4 py-2.5 text-sm font-semibold text-cyan-300
                         transition hover:bg-cyan-400/20"
            >
              View My Reports <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Complaint status guide */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">
              Understanding Complaint Status
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Here's what each status means in your dashboard.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {statuses.map((status) => {
              const Icon = status.icon;

              return (
                <div
                  key={status.label}
                  className="flex gap-4 rounded-2xl border
                             border-white/10 bg-white/[0.04] p-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center
                                   justify-center rounded-xl ${status.bg}
                                   ${status.color}`}>
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className={`font-semibold ${status.color}`}>
                      {status.label}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {status.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Quick answers to common questions about SmartCity.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border
                          border-white/10 bg-white/[0.03]">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between
                             gap-4 px-5 py-4 text-left transition
                             hover:bg-white/[0.03]"
                >
                  <span className="text-sm font-medium sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-cyan-300 transition-transform
                      ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>

                {openFaq === index && (
                  <p className="px-5 pb-5 text-sm leading-6 text-slate-400">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact details */}
        <section className="rounded-2xl border border-cyan-400/20
                            bg-gradient-to-r from-[#10243A]
                            to-[#102D3B] p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center
                          rounded-xl bg-cyan-400/10 text-cyan-300">
            <CircleHelp size={26} />
          </div>

          <h2 className="mt-4 text-xl font-bold sm:text-2xl">
            Still Need Help?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            For help with your account or a complaint, contact your
            SmartCity support team using the official contact details
            configured for your project.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10
                            bg-[#0B1220]/40 p-4">
              <Mail size={21} className="text-cyan-300" />
              <h3 className="mt-3 font-semibold">Email Support</h3>
              <p className="mt-1 text-sm text-slate-400">
                smartcity.support@gmail.com
              </p>
            </div>

            <div className="rounded-xl border border-white/10
                            bg-[#0B1220]/40 p-4">
              <Phone size={21} className="text-cyan-300" />
              <h3 className="mt-3 font-semibold">Phone Support</h3>
              <p className="mt-1 text-sm text-slate-400">
                8796453256.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-500">
          SmartCity · Citizen Help Center
        </p>
      </main>
    </div>
  );
}
