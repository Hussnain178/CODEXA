import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '../config/site'
import { useLeadModal } from '../hooks/useLeadModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openLeadModal } = useLeadModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-navy/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="group flex items-baseline gap-2 shrink-0" onClick={close}>
          <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {site.brand}
          </span>
          <span className="text-xs font-medium text-slate-400 group-hover:text-cyan transition-colors">
            {site.byline}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openLeadModal()}
            className="hidden sm:inline-flex items-center rounded-xl bg-gradient-accent px-4 py-2 text-sm font-semibold text-navy shadow-lg shadow-indigo-500/20 transition hover:brightness-110 focus-visible:outline-offset-2"
          >
            Enroll Now
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-navy/95 backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {site.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    close()
                    openLeadModal()
                  }}
                  className="w-full rounded-xl bg-gradient-accent px-4 py-3 text-sm font-semibold text-navy"
                >
                  Enroll Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
