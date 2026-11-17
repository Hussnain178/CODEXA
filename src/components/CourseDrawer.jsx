import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { formatFee, site } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

export default function CourseDrawer({ course, onClose }) {
  const { openLeadModal } = useLeadModal()
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!course) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [course, onClose])

  return (
    <AnimatePresence>
      {course && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="presentation">
          <motion.button
            type="button"
            aria-label="Close course details"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-navy-soft shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-cyan">
                  {course.category} · {course.level}
                </p>
                <h2 id={titleId} className="mt-1 font-display text-xl font-bold text-white">
                  {course.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <p className="text-sm leading-relaxed text-slate-300">{course.short}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="glass rounded-xl p-3">
                  <dt className="text-xs text-slate-500">Duration</dt>
                  <dd className="mt-1 font-semibold text-white">{course.weeks} weeks</dd>
                </div>
                <div className="glass rounded-xl p-3">
                  <dt className="text-xs text-slate-500">Schedule</dt>
                  <dd className="mt-1 font-semibold text-white">3 classes / week</dd>
                </div>
                <div className="glass rounded-xl p-3">
                  <dt className="text-xs text-slate-500">Total classes</dt>
                  <dd className="mt-1 font-semibold text-white">{course.totalClasses}</dd>
                </div>
                <div className="glass rounded-xl p-3">
                  <dt className="text-xs text-slate-500">Fee</dt>
                  <dd className="mt-1 font-semibold text-white">{formatFee(course.feePkr)}</dd>
                </div>
              </dl>

              <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                Topics
              </h3>
              <ul className="mt-3 space-y-2">
                {course.topics.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                Outcomes
              </h3>
              <ul className="mt-3 space-y-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-400" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="safe-bottom flex gap-2 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openLeadModal(course)
                }}
                className="flex-1 rounded-xl bg-gradient-accent px-4 py-3 text-sm font-semibold text-navy"
              >
                Enroll
              </button>
              <a
                href={site.whatsapp.getUrl(site.whatsapp.courseMessage(course.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-center text-sm font-semibold text-[#25D366]"
              >
                WhatsApp
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
