import { motion } from 'framer-motion'
import {
  BarChart3,
  Bot,
  Briefcase,
  Bug,
  Code2,
  FileText,
  Layers,
  Layout,
  Monitor,
  Palette,
  Presentation,
  Server,
  Sheet,
  Smartphone,
  TabletSmartphone,
  Train,
  Zap,
  Clock,
  CalendarDays,
} from 'lucide-react'
import { formatFee } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

const ICONS = {
  Layers,
  Server,
  Train,
  Zap,
  Layout,
  Palette,
  Smartphone,
  TabletSmartphone,
  Bug,
  Bot,
  BarChart3,
  Code2,
  Sheet,
  FileText,
  Presentation,
  Briefcase,
  Monitor,
}

const LEVEL_STYLES = {
  Beginner: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Intermediate: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Advanced: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
}

export default function CourseCard({ course, onDetails }) {
  const { openLeadModal } = useLeadModal()
  const Icon = ICONS[course.icon] || Layers

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="glass glass-hover group flex h-full flex-col rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-accent/15 text-cyan ring-1 ring-white/10 transition group-hover:scale-105">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${LEVEL_STYLES[course.level]}`}
        >
          {course.level}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-white">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{course.short}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-cyan" aria-hidden="true" />
          <dt className="sr-only">Weeks</dt>
          <dd>{course.weeks} weeks</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-indigo-300" aria-hidden="true" />
          <dt className="sr-only">Classes</dt>
          <dd>3 / week · {course.totalClasses} total</dd>
        </div>
      </dl>

      <p className="mt-3 font-display text-lg font-bold text-white">
        {formatFee(course.feePkr)}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => openLeadModal(course)}
          className="flex-1 rounded-xl bg-gradient-accent px-3 py-2.5 text-sm font-semibold text-navy transition hover:brightness-110"
        >
          Enroll
        </button>
        <button
          type="button"
          onClick={() => onDetails(course)}
          className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white transition hover:border-cyan/40"
        >
          Details
        </button>
      </div>
    </motion.article>
  )
}
