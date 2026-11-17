import { motion } from 'framer-motion'
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Laptop,
  MessageSquareHeart,
  Rocket,
  Users,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Laptop,
    title: 'Online & on-site',
    body: 'Join live from anywhere or attend in person — same curriculum, same mentor attention.',
  },
  {
    icon: Rocket,
    title: 'Project-first learning',
    body: 'Build portfolio pieces every track so you finish with proof, not just certificates.',
  },
  {
    icon: BookOpenCheck,
    title: 'Structured paths',
    body: 'Clear Foundations → Intermediate → Advanced progression so you never feel lost.',
  },
  {
    icon: Users,
    title: 'Small cohort focus',
    body: 'Interactive classes with room for questions, code reviews, and pair debugging.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Free counselling',
    body: 'Not sure where to start? Talk to us — we map the right course to your goals.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Career & freelance ready',
    body: 'From Git habits to freelancing tips — skills that transfer to jobs and clients.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 line-grid" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Why <span className="text-gradient">CODEXA</span>
          </h2>
          <p className="mt-3 text-slate-400">
            A focused academy experience — practical tools, accountable pacing, and mentors who ship.
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-accent/15 text-cyan ring-1 ring-white/10">
                <f.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
