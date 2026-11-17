import { motion } from 'framer-motion'
import { Flag, Layers, Sparkles, Trophy } from 'lucide-react'

const STEPS = [
  {
    icon: Flag,
    title: 'Foundations',
    body: 'Computer basics, Python, Office, and Frontend Foundations — build confidence and core habits.',
  },
  {
    icon: Layers,
    title: 'Intermediate',
    body: 'FastAPI, Scrapy, Selenium, Data Analysis — deepen skills with guided projects.',
  },
  {
    icon: Sparkles,
    title: 'Advanced',
    body: 'MERN, Django REST, Rails, Flutter, Kotlin — ship full products end to end.',
  },
  {
    icon: Trophy,
    title: 'Portfolio / Freelancing',
    body: 'Polish case studies, GitHub presence, and client-ready workflows to land work.',
  },
]

export default function LearningPath() {
  return (
    <section className="relative py-16 sm:py-20" aria-labelledby="path-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 id="path-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
            Your learning <span className="text-gradient">path</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Foundations → Intermediate → Advanced → Portfolio / Freelancing. Start where you are;
            we help you climb.
          </p>
        </motion.div>

        <ol className="relative mt-12 grid gap-6 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-cyan via-indigo to-violet lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-navy ring-2 ring-cyan/50">
                  <step.icon className="size-5 text-cyan" aria-hidden="true" />
                </div>
                <span className="font-display text-xs font-semibold uppercase tracking-widest text-slate-500 lg:mt-3">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
