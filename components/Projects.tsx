import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, MapPin, Calendar, Award } from 'lucide-react';
import { profile } from '../data/profile';
import type { ProjectCategory } from '../data/profile';

const CATEGORIES: ProjectCategory[] = ['Robotics', 'Machine Learning', 'Agentic AI'];

/* ── Category accent colours ─────────────────────────────── */
const CAT_COLOR: Record<ProjectCategory, { color: string; bg: string; border: string }> = {
  'Robotics':         { color: '#10B981', bg: 'rgba(16,185,129,0.09)',  border: 'rgba(16,185,129,0.25)' },
  'Machine Learning': { color: '#F59E0B', bg: 'rgba(245,158,11,0.09)', border: 'rgba(245,158,11,0.25)' },
  'Agentic AI':       { color: '#3B82F6', bg: 'rgba(59,130,246,0.09)',  border: 'rgba(59,130,246,0.25)' },
};

/* ── Animations ─────────────────────────────────────────── */
const sectionVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
};

const gridVariant = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.22 } },
};

/* ── Tech stack pill ─────────────────────────────────────── */
function TechPill({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, boxShadow: '0 0 0 1.5px rgba(37,99,235,0.4)' }}
      transition={{ duration: 0.15 }}
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.65rem',
        borderRadius: '9999px',
        fontSize: '0.72rem',
        fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
        color: 'var(--c-accent)',
        backgroundColor: 'rgba(37,99,235,0.07)',
        border: '1px solid rgba(37,99,235,0.18)',
        cursor: 'default',
      }}
    >
      {label}
    </motion.span>
  );
}

/* ── Project card ────────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof profile.projects[0] }) {
  const [hovered, setHovered] = useState(false);
  const cc = CAT_COLOR[project.category];

  return (
    <motion.article
      variants={cardVariant}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      style={{
        borderRadius: '1rem',
        border: `1px solid ${hovered ? cc.border : 'var(--c-subtle)'}`,
        backgroundColor: 'var(--c-surface)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? `0 16px 40px ${cc.color}18` : 'none',
        transition: 'border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.25s ease',
      }}
    >
      {/* Subtle corner glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '180px',
          background: `radial-gradient(circle at top right, ${cc.color}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header row: title + category badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--c-text)',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            flexShrink: 0,
            fontSize: '0.68rem',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            color: cc.color,
            backgroundColor: cc.bg,
            border: `1px solid ${cc.border}`,
            padding: '0.2rem 0.55rem',
            borderRadius: '9999px',
            letterSpacing: '0.02em',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Hackathon badge */}
      {project.event && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.8rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.22)',
            alignSelf: 'flex-start',
          }}
        >
          <Award size={13} color="#F59E0B" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F59E0B' }}>
            {project.event}
          </span>
        </motion.div>
      )}

      {/* Date + location */}
      {(project.date || project.location) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {project.date && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--c-muted)', fontFamily: "'Inter', sans-serif" }}>
              <Calendar size={12} />
              {project.date}
            </span>
          )}
          {project.location && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--c-muted)', fontFamily: "'Inter', sans-serif" }}>
              <MapPin size={12} />
              {project.location}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: 'var(--c-muted)',
          lineHeight: 1.75,
          margin: 0,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.techStack.map((t) => <TechPill key={t} label={t} />)}
      </div>

      {/* Footer links */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--c-subtle)',
              backgroundColor: 'transparent',
              color: 'var(--c-text)',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-accent)';
              (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-subtle)';
              (e.currentTarget as HTMLElement).style.color = 'var(--c-text)';
            }}
          >
            <Github size={14} />
            GitHub
          </motion.a>
        )}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--c-accent)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent-dim)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent)')}
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

/* ── Empty state ─────────────────────────────────────────── */
function EmptyState({ category }: { category: ProjectCategory }) {
  const cc = CAT_COLOR[category];
  return (
    <motion.div
      variants={cardVariant}
      style={{
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '4rem 2rem',
        borderRadius: '1rem',
        border: `1px dashed ${cc.border}`,
        backgroundColor: cc.bg,
      }}
    >
      <span style={{ fontSize: '2rem' }}>🚧</span>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--c-muted)', textAlign: 'center', margin: 0 }}>
        {category} projects coming soon.
      </p>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>('Agentic AI');
  const filtered = profile.projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="py-24"
      style={{ backgroundColor: 'var(--c-bg)', borderTop: '1px solid var(--c-subtle)', transition: 'background-color 0.25s ease' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>
            What I've built
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Projects
          </h2>
          <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', gap: '0.375rem', padding: '0.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-subtle)', alignSelf: 'flex-start', width: 'fit-content', marginBottom: '2.5rem' }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const cc = CAT_COLOR[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  position: 'relative',
                  padding: '0.45rem 1.1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? cc.color : 'var(--c-muted)',
                  backgroundColor: 'transparent',
                  transition: 'color 0.2s ease',
                  zIndex: 1,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-bg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '0.5rem',
                      backgroundColor: cc.bg,
                      border: `1px solid ${cc.border}`,
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={gridVariant}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {filtered.length > 0
              ? filtered.map((p) => <ProjectCard key={p.id} project={p} />)
              : <EmptyState category={active} />
            }
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
