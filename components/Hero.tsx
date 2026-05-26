import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { profile } from '../data/profile';
import { useTypewriter } from '../hooks/useTypewriter';
import StatCounters from './StatCounters';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const photoVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.3 },
  },
};

function scrollToAbout() {
  const el = document.getElementById('about');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
}

export default function Hero() {
  const { displayed, showCursor } = useTypewriter(profile.title);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Main content — vertically centred */}
      <div className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-10 w-full">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-14">

            {/* ── Left: text ── */}
            <motion.div
              className="flex-1 max-w-xl"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {/* Name */}
              <motion.h1
                variants={item}
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
                  color: 'var(--c-text)',
                  letterSpacing: '-0.025em',
                }}
              >
                {profile.name}
              </motion.h1>

              {/* Typewriter title */}
              <motion.div variants={item} className="mb-6" style={{ height: '2rem', display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--c-accent)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {displayed}
                  {showCursor && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.75 }}
                      style={{ marginLeft: 1, color: 'var(--c-accent)' }}
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={item}
                style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginBottom: '1.5rem' }}
              />

              {/* Bio */}
              <motion.p
                variants={item}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--c-muted)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                {profile.bio}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} className="flex flex-wrap items-center gap-3">
                {/* Get in touch — filled blue */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--c-accent)',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: 'none',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent-dim)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent)')}
                >
                  Get in touch
                </motion.a>

                {/* Learn more — no background, no border, just text */}
                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'transparent',
                    color: 'var(--c-text)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-accent)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-text)')}
                >
                  Learn more
                </motion.a>
              </motion.div>

              {/* Animated stat counters */}
              <motion.div variants={item}>
                <StatCounters />
              </motion.div>
            </motion.div>

            {/* ── Right: circular photo ── */}
            <motion.div
              className="flex justify-center md:justify-end shrink-0"
              variants={photoVariant}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    width: 'clamp(220px, 30vw, 290px)',
                    height: 'clamp(220px, 30vw, 290px)',
                    borderRadius: '50%',
                    padding: '4px',
                    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
                    boxShadow: '0 8px 40px rgba(37,99,235,0.18)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: 'var(--c-subtle)',
                    }}
                  >
                    <img
                      src={profile.avatarUrl}
                      alt={`${profile.name} profile photo`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const parent = (e.currentTarget as HTMLImageElement).parentElement;
                        if (parent && !parent.querySelector('.initials-fallback')) {
                          const fb = document.createElement('div');
                          fb.className = 'initials-fallback';
                          fb.style.cssText =
                            'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:Space Grotesk,sans-serif;font-size:3rem;font-weight:700;color:#6B7280;';
                          fb.textContent = 'AN';
                          parent.appendChild(fb);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll down indicator ── */}
      <motion.div
        className="flex flex-col items-center pb-10 gap-2 cursor-pointer select-none"
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
          }}
        >
          Scroll down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color="#9CA3AF" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
