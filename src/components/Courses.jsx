import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { CATEGORIES, courses } from '../data/courses'
import CourseCard from './CourseCard'
import CourseDrawer from './CourseDrawer'

export default function Courses() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses.filter((c) => {
      const catOk = category === 'All' || c.category === category
      if (!catOk) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.short.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <section id="courses" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Courses built for <span className="text-gradient">real outcomes</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Filter by track or search by name. Every course runs 3 classes per week with
            hands-on projects.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <input
              id="course-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan/50 focus:ring-1 focus:ring-cyan/40"
            />
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Course categories"
          >
            {CATEGORIES.map((cat) => {
              const active = category === cat
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-gradient-accent text-navy'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDetails={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-slate-400">
            No courses match your filters. Try another category or clear the search.
          </p>
        )}
      </div>

      <CourseDrawer course={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
