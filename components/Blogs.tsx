import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, ArrowUpRight, ArrowDownUp } from 'lucide-react';

interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  image: string | null;
  description: string;
}

type SortOrder = 'newest' | 'oldest';

/* gradient fallbacks keyed by index */
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  'linear-gradient(135deg, #0891B2 0%, #2563EB 100%)',
  'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
  'linear-gradient(135deg, #D97706 0%, #DC2626 100%)',
  'linear-gradient(135deg, #1D4ED8 0%, #059669 100%)',
];

function formatDate(raw: string) {
  return new Date(raw).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

/* pull the first <img src="..."> out of article HTML */
function extractImage(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

/* ── Skeleton ──────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{ borderRadius: '1rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-surface)', overflow: 'hidden' }}>
      <div style={{ height: '180px', backgroundColor: 'var(--c-subtle)', opacity: 0.45 }} />
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {[40, 85, 65, 30].map((w, i) => (
          <div key={i} style={{ height: i === 1 ? '1rem' : '0.7rem', width: `${w}%`, borderRadius: '4px', backgroundColor: 'var(--c-subtle)', opacity: 0.6 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────── */
function PostCard({ post, gradientIndex }: { post: MediumPost; gradientIndex: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
      {/* ── Image / gradient banner ── */}
      <div
        style={{
          height: '185px',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
          background:
            post.image && !imgFailed
              ? 'var(--c-subtle)'
              : FALLBACK_GRADIENTS[gradientIndex % FALLBACK_GRADIENTS.length],
        }}
      >
        {post.image && !imgFailed && (
          <img
            src={post.image}
            alt={post.title}
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
        )}

        {/* bottom-fade overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />

        {/* "Medium" badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(0,0,0,0.42)',
            backdropFilter: 'blur(6px)',
            borderRadius: '999px',
            padding: '0.18rem 0.55rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <ExternalLink size={9} style={{ color: '#fff', opacity: 0.8 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.67rem', color: '#fff', opacity: 0.85, fontWeight: 500 }}>
            Medium
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '1.2rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Calendar size={11} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.71rem', color: 'var(--c-muted)', fontWeight: 500 }}>
            {formatDate(post.pubDate)}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.93rem',
            fontWeight: 700,
            color: hovered ? 'var(--c-accent)' : 'var(--c-text)',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            margin: 0,
            transition: 'color 0.18s ease',
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.81rem',
            color: 'var(--c-muted)',
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.description}
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
          Read article
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ArrowUpRight size={13} />
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

/* ── Section ───────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function Blogs() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@adwaitnaik2')
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok') {
          setPosts(
            data.items.map((item: Record<string, unknown>) => ({
              title: item.title as string,
              pubDate: item.pubDate as string,
              link: item.link as string,
              /* extract cover image from content HTML; thumbnail field is empty in Medium feeds */
              image: extractImage((item.content as string) ?? '') || (item.thumbnail as string | null) || null,
              description: stripHtml((item.description as string) ?? '').slice(0, 160) + '…',
            }))
          );
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    if (!posts.length) return posts;
    return [...posts].sort((a, b) => {
      const diff = new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      return sortOrder === 'newest' ? diff : -diff;
    });
  }, [posts, sortOrder]);

  return (
    <section
      id="blogs"
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
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          custom={0} variants={fadeUp}
          style={{ marginBottom: '2.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>
              Writing
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
              Blogs
            </h2>
            <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
          </div>

          {/* Sort toggle — only when posts are loaded */}
          {!loading && !error && (
            <motion.button
              onClick={() => setSortOrder((o) => (o === 'newest' ? 'oldest' : 'newest'))}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '0.55rem',
                border: '1px solid var(--c-subtle)',
                backgroundColor: 'var(--c-surface)',
                color: 'var(--c-muted)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.18s ease, color 0.18s ease',
                alignSelf: 'center',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-subtle)';
                (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
              }}
            >
              <ArrowDownUp size={13} />
              {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
            </motion.button>
          )}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}
            >
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--c-muted)' }}
            >
              Could not load articles right now.{' '}
              <a href="https://medium.com/@adwaitnaik2" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>
                View on Medium
              </a>
            </motion.p>
          ) : (
            <motion.div
              key="posts"
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}
            >
              <AnimatePresence mode="popLayout">
                {sorted.map((post, i) => (
                  <PostCard key={post.link} post={post} gradientIndex={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── View all ── */}
        {!loading && !error && (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            custom={1} variants={fadeUp}
            style={{ marginTop: '2.5rem', textAlign: 'center' }}
          >
            <a
              href="https://medium.com/@adwaitnaik2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--c-accent)',
                textDecoration: 'none',
                padding: '0.6rem 1.25rem',
                border: '1px solid var(--c-accent)',
                borderRadius: '0.6rem',
                transition: 'background-color 0.18s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.07)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
            >
              View all on Medium
              <ExternalLink size={14} />
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}
