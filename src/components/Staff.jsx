import { motion } from 'framer-motion'
import { ExternalLink, Globe, Link2 } from 'lucide-react'
import { staff } from '../data/staff'

export default function Staff() {
  return (
    <section id="instructor" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Meet your <span className="text-gradient">instructor</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Mentors who teach what they build. Grid scales cleanly from 1 to 4 members.
          </p>
        </motion.div>

        <ul
          className={`mt-10 grid gap-6 ${
            staff.length === 1
              ? 'max-w-xl'
              : staff.length === 2
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {staff.map((member, i) => (
            <motion.li
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    className="size-16 rounded-2xl object-cover ring-2 ring-white/10"
                  />
                ) : (
                  <div
                    className="flex size-16 items-center justify-center rounded-2xl bg-gradient-accent font-display text-xl font-bold text-navy"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                )}
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-cyan">{member.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">{member.bio}</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
                {member.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <a
                  href={member.social.linkedin}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={`${member.name} LinkedIn (placeholder)`}
                >
                  <Link2 className="size-4" />
                </a>
                <a
                  href={member.social.github}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={`${member.name} GitHub (placeholder)`}
                >
                  <Globe className="size-4" />
                </a>
                <a
                  href={member.social.twitter}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={`${member.name} Twitter (placeholder)`}
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
