import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';

const sectionVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const panelVariant = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

export default function Experience() {
  const [activeId, setActiveId] = useState<string>(profile.experience[0].id);
  const active = profile.experience.find((e) => e.id === activeId)!;

  return (
    <section
      id="experience"
      className="py-24"
      style={{
        backgroundColor: 'var(--c-bg)',
        borderTop: '1px solid var(--c-subtle)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Section heading ── */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--c-accent)',
              marginBottom: '0.5rem',
            }}
          >
            Where I've worked
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--c-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Experience
          </h2>
          <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
        </motion.div>

        {/* ── Two-column layout ── */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 220px) 1fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
          className="exp-grid"
        >
          {/* ── Left: full company names ── */}
          <div
            style={{
              borderRadius: '0.75rem',
              border: '1px solid var(--c-subtle)',
              backgroundColor: 'var(--c-surface)',
              overflow: 'hidden',
              transition: 'background-color 0.25s ease',
            }}
          >
            {profile.experience.map((exp, idx) => {
              const isActive = exp.id === activeId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.9rem 1.125rem',
                    border: 'none',
                    borderLeft: `3px solid ${isActive ? 'var(--c-accent)' : 'transparent'}`,
                    borderBottom: idx < profile.experience.length - 1 ? '1px solid var(--c-subtle)' : 'none',
                    backgroundColor: isActive ? 'rgba(37,99,235,0.07)' : 'transparent',
                    color: isActive ? 'var(--c-accent)' : 'var(--c-muted)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    lineHeight: 1.35,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-text)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
                  }}
                  aria-pressed={isActive}
                >
                  {exp.company}
                </button>
              );
            })}
          </div>

          {/* ── Right: job detail panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              variants={panelVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                borderRadius: '0.75rem',
                border: '1px solid var(--c-subtle)',
                backgroundColor: 'var(--c-surface)',
                padding: '1.75rem',
                transition: 'background-color 0.25s ease',
              }}
            >
              {/* Role title + date */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--c-text)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {active.role}
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--c-muted)',
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <Calendar size={13} />
                  {active.startDate} – {active.endDate}
                </span>
              </div>

              {/* Company link + location */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <a
                  href={active.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--c-accent)',
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  {active.company}
                  <ExternalLink size={12} />
                </a>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    color: 'var(--c-muted)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <MapPin size={12} />
                  {active.location}
                </span>
              </div>

              {/* Bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {active.bullets.map((b, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: 'var(--c-muted)',
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--c-text)' }}>
                      {b.label}:
                    </span>{' '}
                    {b.detail}
                  </p>
                ))}
              </div>

              {/* Skill tags — glow on hover */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {active.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      boxShadow: '0 0 0 1.5px rgba(37,99,235,0.55), 0 0 10px rgba(37,99,235,0.25)',
                      y: -1,
                    }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      color: 'var(--c-accent)',
                      backgroundColor: 'rgba(37,99,235,0.07)',
                      border: '1px solid rgba(37,99,235,0.18)',
                      cursor: 'default',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
