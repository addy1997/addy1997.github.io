import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, BookOpen, Award } from 'lucide-react';

interface Publication {
  title: string;
  date: string;
  type: 'journal' | 'conference' | 'thesis';
  link: string;
  description: string;
}

const PUBLICATIONS: Publication[] = [
  {
    title: 'HMM-based Phoneme Speech Recognition System for Control of Industrial Robots',
    date: 'Jan 2021',
    type: 'journal',
    link: '#',
    description: 'Journal article on speech recognition systems applied to industrial robotic control using Hidden Markov Models.',
  },
  {
    title: 'Super-immersive Remote Working via Virtual Reality Controlled Robotics',
    date: 'Mar 2023',
    type: 'conference',
    link: '#',
    description: 'Conference paper presenting an immersive VR-based teleoperation system for remote robotic manipulation and collaboration.',
  },
  {
    title: 'Novel View Synthesis from Blurry Images',
    date: 'Aug 2022',
    type: 'thesis',
    link: '#',
    description: 'Master\'s thesis on generating novel viewpoints from blurry images using advanced computer vision techniques.',
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  journal: <BookOpen size={14} />,
  conference: <Award size={14} />,
  thesis: <BookOpen size={14} />,
};

const TYPE_LABELS: Record<string, string> = {
  journal: 'Journal Article',
  conference: 'Conference Paper',
  thesis: 'Master\'s Thesis',
};

const TYPE_COLORS: Record<string, string> = {
  journal: '#2563EB',
  conference: '#059669',
  thesis: '#7C3AED',
};

function formatDate(raw: string) {
  return new Date(`${raw} 2021`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

type PublicationType = 'all' | 'journal' | 'conference' | 'thesis';

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: `1px solid ${hovered ? 'rgba(37,99,235,0.4)' : 'var(--c-subtle)'}`,
        backgroundColor: 'var(--c-surface)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 36px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Header: Type badge + Date ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: `${TYPE_COLORS[pub.type]}15`,
            color: TYPE_COLORS[pub.type],
            padding: '0.35rem 0.7rem',
            borderRadius: '0.5rem',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {TYPE_ICONS[pub.type]}
          {TYPE_LABELS[pub.type]}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--c-muted)' }}>
          <Calendar size={12} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 500 }}>
            {pub.date}
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1rem',
          fontWeight: 700,
          color: hovered ? 'var(--c-accent)' : 'var(--c-text)',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          margin: 0,
          transition: 'color 0.18s ease',
        }}
      >
        {pub.title}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
          color: 'var(--c-muted)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {pub.description}
      </p>

      {/* ── Link ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.28rem',
          marginTop: '0.25rem',
          color: 'var(--c-accent)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 600,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.18s ease',
        }}
      >
        View publication
        <motion.span
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ExternalLink size={13} />
        </motion.span>
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function Publications() {
  const [filter, setFilter] = useState<PublicationType>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return PUBLICATIONS;
    return PUBLICATIONS.filter((pub) => pub.type === filter);
  }, [filter]);

  return (
    <section
      id="publications"
      className="py-24"
      style={{
        backgroundColor: 'var(--c-bg)',
        borderTop: '1px solid var(--c-subtle)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* ── Heading row ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: '2.25rem' }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>
              Research & Publications
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
              Publications
            </h2>
            <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
          </div>
        </motion.div>

        {/* ── Filter buttons ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {(['all', 'journal', 'conference', 'thesis'] as const).map((type) => (
            <motion.button
              key={type}
              onClick={() => setFilter(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.6rem',
                border: `1.5px solid ${filter === type ? 'var(--c-accent)' : 'var(--c-subtle)'}`,
                backgroundColor: filter === type ? 'rgba(37,99,235,0.08)' : 'transparent',
                color: filter === type ? 'var(--c-accent)' : 'var(--c-muted)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                textTransform: 'capitalize',
              }}
              onMouseEnter={(e) => {
                if (filter !== type) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== type) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-subtle)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
                }
              }}
            >
              {type === 'all' ? 'All' : TYPE_LABELS[type]}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((pub, i) => (
                <PublicationCard key={`${pub.type}-${pub.title}`} pub={pub} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--c-muted)', textAlign: 'center', marginTop: '2rem' }}
          >
            No publications in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
