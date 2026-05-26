import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import type { LegalType } from './LegalModal';

const STORAGE_KEY = 'cookie-consent';

interface Props {
  onOpenPolicy: (type: LegalType) => void;
}

export default function CookieBanner({ onOpenPolicy }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 1.2 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(680px, calc(100vw - 2rem))',
            zIndex: 300,
            borderRadius: '1rem',
            backgroundColor: 'var(--c-surface)',
            border: '1px solid var(--c-subtle)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(37,99,235,0.06)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Icon + text */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: '1 1 260px' }}>
            <Cookie size={20} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '0.83rem', color: 'var(--c-muted)', lineHeight: 1.6 }}>
              This site stores your theme preference locally.{' '}
              <button
                onClick={() => onOpenPolicy('cookies')}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  color: 'var(--c-accent)', fontFamily: "'Inter', sans-serif",
                  fontSize: '0.83rem', textDecoration: 'underline',
                }}
              >
                Cookie Policy
              </button>
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <motion.button
              onClick={reject}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--c-subtle)',
                backgroundColor: 'transparent',
                color: 'var(--c-muted)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.15s, color 0.15s',
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
              Reject All
            </motion.button>

            <motion.button
              onClick={accept}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: 'var(--c-accent)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent-dim)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-accent)')}
            >
              Accept All
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
