const TECHS = [
  'React',
  'Node.js',
  'MongoDB',
  'Django',
  'FastAPI',
  'Flutter',
  'Kotlin',
  'Ruby on Rails',
  'Python',
  'Selenium',
  'Scrapy',
  'Excel',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Figma',
  'PostgreSQL',
  'Git',
  'Docker',
  'PowerPoint',
  'Word',
]

export default function TechMarquee() {
  const doubled = [...TECHS, ...TECHS]

  return (
    <section className="relative border-y border-white/5 py-6" aria-label="Technologies we teach">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent sm:w-24" />
      <div className="overflow-hidden">
        <ul className="animate-marquee flex w-max gap-3 pr-3">
          {doubled.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              className="glass shrink-0 rounded-full px-4 py-2 text-sm font-medium text-slate-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
