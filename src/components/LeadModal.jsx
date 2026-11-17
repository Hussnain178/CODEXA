import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { buildFormUrl, site } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

function getFocusable(root) {
  if (!root) return []
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
}

export default function LeadModal() {
  const { isOpen, courseName, closeLeadModal } = useLeadModal()
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const titleId = useId()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false)
      return
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLeadModal()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = getFocusable(panelRef.current)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeLeadModal])

  const formSrc = isOpen ? buildFormUrl(courseName) : null
  const waText = courseName
    ? site.whatsapp.courseMessage(courseName)
    : undefined

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close enrolment form"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLeadModal}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative flex h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-navy-soft shadow-2xl sm:h-[min(90dvh,820px)] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              <div>
                <h2 id={titleId} className="font-display text-lg font-bold text-white sm:text-xl">
                  Enrol / Free counselling
                </h2>
                {courseName ? (
                  <p className="mt-1 text-sm text-slate-300">
                    Selected course:{' '}
                    <span className="font-semibold text-cyan">{courseName}</span>
                    <span className="mt-1 block text-xs text-amber-200/90">
                      Please select the same course in the form.
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-slate-400">
                    Tell us about your goals — we will get back on WhatsApp.
                  </p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeLeadModal}
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto bg-white">
              {!iframeLoaded && (
                <div
                  className="absolute inset-0 z-10 flex flex-col gap-3 bg-slate-100 p-4"
                  aria-hidden="true"
                >
                  <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                  <div className="h-24 animate-pulse rounded bg-slate-200" />
                  <div className="mt-auto h-12 animate-pulse rounded bg-slate-300" />
                  <span className="sr-only">Loading form…</span>
                </div>
              )}
              {formSrc && (
                <iframe
                  title="CODEXA enrolment Google Form"
                  src={formSrc}
                  className="h-full min-h-[520px] w-full border-0"
                  onLoad={() => setIframeLoaded(true)}
                />
              )}
            </div>

            <div className="safe-bottom border-t border-white/10 bg-navy-soft px-4 py-3 sm:px-6">
              <a
                href={site.whatsapp.getUrl(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                <MessageCircle className="size-4" />
                Prefer WhatsApp? Chat with us
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
