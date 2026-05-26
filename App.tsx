import { useState } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import ScrollProgressBar from './components/ScrollProgressBar';
import CursorGlow from './components/CursorGlow';
import LegalModal, { type LegalType } from './components/LegalModal';
import CookieBanner from './components/CookieBanner';

const FOOTER_LINKS: { label: string; type: LegalType }[] = [
  { label: 'Privacy Policy', type: 'privacy' },
  { label: 'Cookie Policy',  type: 'cookies' },
  { label: 'Terms of Service', type: 'terms' },
];

export default function App() {
  const [legalOpen, setLegalOpen] = useState<LegalType>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--c-bg)', transition: 'background-color 0.25s ease' }}>
      <ScrollProgressBar />
      <CursorGlow />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Blogs />
          <Contact />
        </main>

        <footer
          className="border-t"
          style={{
            borderColor: 'var(--c-subtle)',
            backgroundColor: 'var(--c-surface)',
            transition: 'border-color 0.25s ease, background-color 0.25s ease',
          }}
        >
          <div
            className="max-w-5xl mx-auto px-6 py-6"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            {/* Left: copyright */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--c-muted)', margin: 0 }}>
              © {new Date().getFullYear()} Adwait Naik. All rights reserved.
            </p>

            {/* Right: policy links */}
            <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
              {FOOTER_LINKS.map(({ label, type }, i, arr) => (
                <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    onClick={() => setLegalOpen(type)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                      color: 'var(--c-muted)', padding: '0.2rem 0.4rem',
                      borderRadius: '0.25rem', transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-accent)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-muted)')}
                  >
                    {label}
                  </button>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'var(--c-subtle)', fontSize: '0.75rem', userSelect: 'none' }}>·</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </footer>
      </motion.div>

      {/* Legal modals */}
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(null)} />

      {/* Cookie consent banner */}
      <CookieBanner onOpenPolicy={(type) => setLegalOpen(type)} />

      {/* Vercel Analytics + Speed Insights — no-op locally, activates on Vercel */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
