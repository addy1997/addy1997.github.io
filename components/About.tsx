import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const sectionVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.14,
    },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--c-surface)',
        borderTop: '1px solid var(--c-subtle)',
        transition: 'background-color 0.25s ease',
      }}
      className="py-24"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Section heading */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
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
            Get to know me
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
            About
          </h2>
          <div
            style={{
              width: '2.5rem',
              height: '2px',
              backgroundColor: 'var(--c-subtle)',
              marginTop: '1rem',
            }}
          />
        </motion.div>

        {/* London Bridge image — Ken Burns continuous pan + zoom */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
          style={{
            borderRadius: '0.75rem',
            overflow: 'hidden',
            height: 'clamp(220px, 38vw, 420px)',
          }}
        >
          <motion.img
            src="/assets/LondonBridge_GettyImages.jpg"
            alt="Tower Bridge, London"
            animate={{
              scale: [1, 1.07],
              x: [0, -18],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transformOrigin: 'center center',
            }}
          />
        </motion.div>

        {/* Bio paragraphs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: '1.75rem',
          }}
        >
          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'var(--c-muted)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

      </div>
    </section>
  );
}
