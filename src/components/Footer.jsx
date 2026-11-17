import { site } from '../config/site'
import { CATEGORIES } from '../data/courses'

const FOOTER_LINKS = [
  { href: '#courses', label: 'Courses' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#instructor', label: 'Instructor' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const categories = CATEGORIES.filter((c) => c !== 'All')

  return (
    <footer className="border-t border-white/10 bg-navy-soft/80 pb-28 pt-12 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <a href="#top" className="inline-flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-white">{site.brand}</span>
            <span className="text-xs text-slate-400">{site.byline}</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            {site.tagline} Practical tech education for web, mobile, automation, and office skills.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
            Explore
          </h3>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-slate-400 transition hover:text-cyan">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
            Categories
          </h3>
          <ul className="mt-3 space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <a href="#courses" className="text-sm text-slate-400 transition hover:text-cyan">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
            Contact
          </h3>
          <p className="mt-3 text-sm text-slate-400">
            Chat with us on WhatsApp for course details and counselling.
          </p>
          <a
            href={site.whatsapp.getUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-[#25D366] hover:underline"
          >
            +{site.whatsapp.number}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 px-4 pt-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {year} {site.brand} {site.byline}. All rights reserved.
      </div>
    </footer>
  )
}
