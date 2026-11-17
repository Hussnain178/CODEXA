import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faqs'

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="font-display text-base font-semibold text-white sm:text-lg">
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            className="shrink-0 text-cyan"
            aria-hidden="true"
          >
            <ChevronDown className="size-5" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/5 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-400">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Quick answers about schedule, levels, fees, and support.
          </p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId((id) => (id === item.id ? null : item.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
