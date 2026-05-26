import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Twitter, PenLine } from 'lucide-react';
import { profile } from '../data/profile';
import type { SocialLink } from '../data/profile';

/* ── Icon map ────────────────────────────────────────────── */
function SocialIcon({ icon, size = 16 }: { icon: SocialLink['icon']; size?: number }) {
  switch (icon) {
    case 'github':   return <Github   size={size} />;
    case 'linkedin': return <Linkedin size={size} />;
    case 'email':    return <Mail     size={size} />;
    case 'twitter':  return <Twitter  size={size} />;
    case 'medium':   return <PenLine  size={size} />;
    default:         return <ExternalLink size={size} />;
  }
}

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: i * 0.1 },
  }),
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24"
      style={{
        backgroundColor: 'var(--c-bg)',
        borderTop: '1px solid var(--c-subtle)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          custom={0} variants={fadeUp}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>
            Get in touch
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Contact
          </h2>
          <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
        </motion.div>

        {/* Two-column card */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          custom={1} variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >

          {/* ── About card ── */}
          <div
            style={{
              borderRadius: '1rem',
              border: '1px solid var(--c-subtle)',
              backgroundColor: 'var(--c-surface)',
              padding: '2rem',
              transition: 'background-color 0.25s ease',
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              About
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--c-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              {profile.bio}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {profile.highlights.map((h) => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'var(--c-muted)' }}>
                  <MapPin size={13} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect card ── */}
          <div
            style={{
              borderRadius: '1rem',
              border: '1px solid var(--c-subtle)',
              backgroundColor: 'var(--c-surface)',
              padding: '2rem',
              transition: 'background-color 0.25s ease',
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Connect
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {profile.social.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '0.6rem',
                    textDecoration: 'none',
                    color: 'var(--c-muted)',
                    transition: 'background-color 0.18s ease, color 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.07)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
                  }}
                >
                  <span style={{ color: 'var(--c-accent)', display: 'flex', alignItems: 'center' }}>
                    <SocialIcon icon={s.icon} size={17} />
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}>
                    {s.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
