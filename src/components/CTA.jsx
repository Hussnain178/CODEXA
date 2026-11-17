import { motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'
import { site } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

export default function CTA() {
  const { openLeadModal } = useLeadModal()

  return (
    <section id="contact" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 sm:p-12"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-cyan/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-violet/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
              <Sparkles className="size-4" aria-hidden="true" />
              Next cohort seats open
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to start your tech career?
            </h2>
            <p className="mt-3 text-slate-300">
              Enroll in a course or chat with us on WhatsApp for free counselling — we will help
              you pick the right path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openLeadModal()}
                className="inline-flex items-center rounded-xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-navy shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
              >
                Enroll
              </button>
              <a
                href={site.whatsapp.getUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
