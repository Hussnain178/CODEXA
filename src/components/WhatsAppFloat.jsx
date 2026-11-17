import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { site } from '../config/site'

const BUBBLE_KEY = 'codexa_wa_bubble_dismissed'

function readDismissed() {
  try {
    return sessionStorage.getItem(BUBBLE_KEY) === '1'
  } catch {
    return false
  }
}

function writeDismissed() {
  try {
    sessionStorage.setItem(BUBBLE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export default function WhatsAppFloat() {
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    if (readDismissed()) return
    const id = setTimeout(() => setShowBubble(true), 4000)
    return () => clearTimeout(id)
  }, [])

  const dismissBubble = () => {
    setShowBubble(false)
    writeDismissed()
  }

  return (
    <div className="safe-bottom safe-right pointer-events-none fixed bottom-0 right-0 z-[55] flex flex-col items-end gap-3 p-4">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="pointer-events-auto relative max-w-[240px] rounded-2xl border border-white/10 bg-navy-soft px-4 py-3 text-sm text-slate-200 shadow-xl shadow-black/40"
            role="status"
          >
            <button
              type="button"
              onClick={dismissBubble}
              className="absolute right-1.5 top-1.5 rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Dismiss chat tip"
            >
              <X className="size-3.5" />
            </button>
            <p className="pr-5">
              Hi 👋 Need help choosing a course? Chat with us!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={site.whatsapp.getUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="pulse-ring pointer-events-auto relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-105 focus-visible:outline-offset-4"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-7" fill="currentColor" />
      </a>
    </div>
  )
}
