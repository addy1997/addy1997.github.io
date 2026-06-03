import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, Video, FileText, Image as ImageIcon } from 'lucide-react';

interface Achievement {
  title: string;
  date: string;
  category: 'award' | 'conference' | 'media' | 'presentation';
  description: string;
  link: string;
  image?: string;
  videoThumbnail?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Augmented Reality Application Showcase',
    date: 'Feb 2024',
    category: 'conference',
    description: 'AR application developed and exhibited at Mobile World Congress 2024 in Barcelona, Spain. A global showcase of cutting-edge mobile and AR technologies.',
    link: 'https://drive.google.com/file/d/12YVnVeI8mQuxdWsqWG5GHkssTZksuf0P/view?usp=drive_link',
    image: 'https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=500&h=300&fit=crop',
  },
  {
    title: 'KTP Knowledge Transfer Partnership Documentary',
    date: '2024',
    category: 'media',
    description: 'Featured in a documentary highlighting my role as a Knowledge Transfer Partnership (KTP) associate, demonstrating real-world technology transfer and collaboration.',
    link: 'https://www.youtube.com/watch?v=lCIzbYYILeo',
    videoThumbnail: 'https://img.youtube.com/vi/lCIzbYYILeo/maxresdefault.jpg',
  },
  {
    title: 'Super-Immersive Robotics Presentation',
    date: '2023',
    category: 'presentation',
    description: 'Demo presentation of the VR-controlled super-immersive robotic teleoperation system at ACM Augmented Humans Conference. Showcasing real-time remote manipulation capabilities.',
    link: 'https://photos.app.goo.gl/77YFwENqCz1X28vg7',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  award: <Award size={14} />,
  conference: <Award size={14} />,
  media: <Video size={14} />,
  presentation: <FileText size={14} />,
};

const CATEGORY_LABELS: Record<string, string> = {
  award: 'Award',
  conference: 'Conference',
  media: 'Documentary',
  presentation: 'Presentation',
};

const CATEGORY_COLORS: Record<string, string> = {
  award: '#F59E0B',
  conference: '#3B82F6',
  media: '#8B5CF6',
  presentation: '#EC4899',
};

type AchievementCategory = 'all' | 'award' | 'conference' | 'media' | 'presentation';

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const thumbnail = achievement.videoThumbnail || achievement.image;
  const isVideo = !!achievement.videoThumbnail;

  return (
    <motion.a
      href={achievement.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',
        border: '1px solid var(--c-subtle)',
        backgroundColor: 'var(--c-surface)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 36px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        borderColor: hovered ? 'rgba(37,99,235,0.4)' : 'var(--c-subtle)',
      }}
    >
      {/* ── Image / Thumbnail ── */}
      {thumbnail && !imgFailed && (
        <div
          style={{
            height: '200px',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            backgroundColor: 'var(--c-subtle)',
          }}
        >
          <img
            src={thumbnail}
            alt={achievement.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.45s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Bottom fade overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 55%)',
              pointerEvents: 'none',
            }}
          />

          {/* Category badge */}
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              backgroundColor: `${CATEGORY_COLORS[achievement.category]}dd`,
              backdropFilter: 'blur(6px)',
              borderRadius: '999px',
              padding: '0.35rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#fff',
            }}
          >
            {CATEGORY_ICONS[achievement.category]}
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>
              {CATEGORY_LABELS[achievement.category]}
            </span>
          </div>

          {/* Play icon for videos */}
          {isVideo && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: hovered ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Video size={24} color={CATEGORY_COLORS[achievement.category]} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Body ── */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 700,
            color: hovered ? 'var(--c-accent)' : 'var(--c-text)',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            margin: 0,
            transition: 'color 0.18s ease',
          }}
        >
          {achievement.title}
        </h3>

        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 500 }}>
          {achievement.date}
        </span>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.82rem',
            color: 'var(--c-muted)',
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {achievement.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.28rem',
            marginTop: '0.4rem',
            color: 'var(--c-accent)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
        >
          View {isVideo ? 'video' : 'details'}
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ExternalLink size={13} />
          </motion.span>
        </div>
      </div>
    </motion.a>
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

export default function Achievements() {
  const [filter, setFilter] = useState<AchievementCategory>('all');

  const filtered = ACHIEVEMENTS.filter((achievement) => filter === 'all' || achievement.category === filter);

  return (
    <section
      id="achievements"
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
              Highlights
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
              Achievements
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
          {(['all', 'award', 'conference', 'media', 'presentation'] as const).map((type) => (
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
              {type === 'all' ? 'All' : CATEGORY_LABELS[type]}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((achievement, i) => (
                <AchievementCard key={`${achievement.category}-${achievement.title}`} achievement={achievement} index={i} />
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
            No achievements in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
