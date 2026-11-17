import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { site } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

const STATS = [
  { label: 'Classes/Week', value: 3, suffix: '' },
  { label: 'Weeks', value: 16, prefix: '10–', suffix: '' },
  { label: 'Hands-on Projects', value: 1, display: 'Hands-on', isText: true },
  { label: 'Online & On-site', value: 1, display: 'Flexible', isText: true },
]

const CODE_LINES = [
  { type: 'comment', text: '// Welcome to CODEXA' },
  { type: 'kw', text: 'const', rest: ' career = ' },
  { type: 'str', text: '"tech"' },
  { type: 'plain', text: ';' },
  { type: 'kw', text: 'await', rest: ' codexa.learn({ ' },
  { type: 'key', text: 'mode' },
  { type: 'plain', text: ': ' },
  { type: 'str', text: '"hands-on"' },
  { type: 'plain', text: ' });' },
  { type: 'fn', text: 'grow' },
  { type: 'plain', text: '(); // Code. Automate. Grow.' },
]

function AnimatedCounter({ value, prefix = '', suffix = '', reduced }) {
  const [count, setCount] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setCount(value)
      return
    }
    let frame
    const start = performance.now()
    const duration = 1400
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, reduced])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

function TypingMockup({ reduced }) {
  const [visible, setVisible] = useState(reduced ? CODE_LINES.length : 0)

  useEffect(() => {
    if (reduced) return
    if (visible >= CODE_LINES.length) return
    const id = setTimeout(() => setVisible((v) => v + 1), 380)
    return () => clearTimeout(id)
  }, [visible, reduced])

  return (
    <div
      className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/10"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-400">codexa-terminal</span>
      </div>
      <pre className="min-h-[220px] overflow-x-auto p-4 font-mono text-[13px] leading-7 sm:text-sm">
        <code>
          {CODE_LINES.slice(0, visible).map((line, i) => (
            <span key={i} className="block">
              <span className="mr-3 select-none text-slate-600">{String(i + 1).padStart(2, '0')}</span>
              {line.type === 'comment' && <span className="text-slate-500">{line.text}</span>}
              {line.type === 'kw' && (
                <>
                  <span className="text-violet-300">{line.text}</span>
                  {line.rest && <span className="text-slate-200">{line.rest}</span>}
                </>
              )}
              {line.type === 'str' && <span className="text-cyan">{line.text}</span>}
              {line.type === 'key' && <span className="text-indigo-300">{line.text}</span>}
              {line.type === 'fn' && <span className="text-emerald-300">{line.text}</span>}
              {line.type === 'plain' && <span className="text-slate-200">{line.text}</span>}
            </span>
          ))}
          {!reduced && visible < CODE_LINES.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-cyan align-middle" />
          )}
        </code>
      </pre>
    </div>
  )
}

export default function Hero() {
  const { openLeadModal } = useLeadModal()
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo/25 blur-3xl" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 line-grid opacity-30" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {site.brand} <span className="text-slate-400">{site.byline}</span>
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn to <span className="text-gradient">ship real software</span>
          </h1>
          <p className="mt-3 font-display text-xl font-semibold text-slate-100 sm:text-2xl">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Practical courses in web, mobile, automation, and office skills — with
            live mentoring, weekly classes, and projects you can put in your portfolio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-navy shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              Explore Courses
              <ArrowRight className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => openLeadModal()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-white/10"
            >
              <MessageCircle className="size-4 text-cyan" />
              Get Free Counselling
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <TypingMockup reduced={!!reduced} />
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { key: 'c', label: '3 Classes/Week', node: <AnimatedCounter value={3} reduced={!!reduced} />, hint: 'classes' },
            { key: 'w', label: '10-16 Weeks', node: <><AnimatedCounter value={10} reduced={!!reduced} />–<AnimatedCounter value={16} reduced={!!reduced} /></>, hint: 'weeks' },
            { key: 'p', label: 'Hands-on Projects', node: '∞', hint: 'projects' },
            { key: 'm', label: 'Online & On-site', node: '2', hint: 'modes' },
          ].map((stat, i) => (
            <motion.li
              key={stat.key}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl px-4 py-5 text-center"
            >
              <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.node}
              </div>
              <div className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</div>
            </motion.li>
          ))}
        </ul>
        {/* Keep unused STATS referenced for clarity / future — display labels match brief */}
        <span className="sr-only">{STATS.map((s) => s.label).join(', ')}</span>
      </div>
    </section>
  )
}
