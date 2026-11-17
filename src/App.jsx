import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Courses from './components/Courses'
import WhyUs from './components/WhyUs'
import LearningPath from './components/LearningPath'
import Staff from './components/Staff'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import WhatsAppFloat from './components/WhatsAppFloat'
import { LeadModalProvider } from './hooks/useLeadModal'

export default function App() {
  return (
    <LeadModalProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Courses />
        <WhyUs />
        <LearningPath />
        <Staff />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <LeadModal />
      <WhatsAppFloat />
    </LeadModalProvider>
  )
}
