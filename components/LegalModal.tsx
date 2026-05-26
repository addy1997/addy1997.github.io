import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | 'cookies' | null;

/* ── Content ─────────────────────────────────────────────── */
const CONTENT: Record<NonNullable<LegalType>, { title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Overview',
        body: 'This portfolio website is a personal project and does not collect, store, or process any personally identifiable information. No account registration, login, or form submission is required to browse this site.',
      },
      {
        heading: 'Information Collected',
        body: 'This site does not use analytics, tracking pixels, or advertising scripts. The only data stored locally in your browser is a single theme preference key ("theme") via localStorage, which records whether you have selected light or dark mode. This value never leaves your device.',
      },
      {
        heading: 'Third-Party Services',
        body: 'Google Fonts are loaded from fonts.googleapis.com and fonts.gstatic.com. Devicon icons are loaded from cdn.jsdelivr.net. These requests are subject to the respective providers\' own privacy policies. No user data is shared with these services beyond standard HTTP request metadata (IP address, browser user-agent) as part of normal CDN operation.',
      },
      {
        heading: 'External Links',
        body: 'This site contains links to GitHub repositories and other external websites. Once you leave this site, the privacy practices of those third-party services apply and are outside my control.',
      },
      {
        heading: 'Cookies',
        body: 'This site does not use tracking or advertising cookies. The only browser storage used is a localStorage entry for your theme preference, which is not a cookie and is not transmitted to any server.',
      },
      {
        heading: 'Contact',
        body: 'If you have questions about this Privacy Policy, you can reach me at adwaitnaik27@gmail.com.',
      },
      {
        heading: 'Changes',
        body: 'This policy may be updated from time to time. The date of last revision is reflected in the site\'s source code.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By accessing this portfolio website, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.',
      },
      {
        heading: 'Purpose',
        body: 'This website is a personal portfolio intended solely for informational purposes — to present my professional experience, skills, and projects to prospective employers, collaborators, and other interested parties.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content on this site — including text, design, code, and imagery — is the intellectual property of Adwait Naik unless otherwise attributed. You may not reproduce, distribute, or create derivative works from any content without prior written permission.',
      },
      {
        heading: 'Accuracy of Information',
        body: 'I endeavour to keep all information accurate and up-to-date. However, no warranty is made regarding the completeness or accuracy of the content. Information may change without notice.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'This site is provided "as is" without warranties of any kind. I shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website.',
      },
      {
        heading: 'External Links',
        body: 'Links to third-party websites (GitHub, LinkedIn, company websites) are provided for convenience only. I have no control over their content and accept no responsibility for them.',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
      },
      {
        heading: 'Contact',
        body: 'Questions regarding these Terms may be directed to adwaitnaik27@gmail.com.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    sections: [
      {
        heading: 'What Are Cookies',
        body: 'Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to site owners.',
      },
      {
        heading: 'How This Site Uses Storage',
        body: 'This portfolio does not set any cookies. The only browser storage used is a single localStorage entry with the key "theme", which stores your light/dark mode preference. This entry is never read by any server and never transmitted anywhere.',
      },
      {
        heading: 'Third-Party CDN Requests',
        body: 'Loading Google Fonts and Devicon icons from their respective CDNs involves outbound HTTP requests. These CDN providers may log standard server access data (IP, browser, timestamp) as part of normal operation. This site has no control over those logs.',
      },
      {
        heading: 'No Tracking or Advertising Cookies',
        body: 'This site contains no analytics, advertising, retargeting, or social-media tracking of any kind. No cookies are used for profiling or behavioural advertising.',
      },
      {
        heading: 'Managing Preferences',
        body: 'Because no cookies are set by this site, there is nothing to manage or opt out of. You can clear your browser\'s localStorage at any time through your browser\'s developer tools or settings to reset your theme preference.',
      },
      {
        heading: 'Contact',
        body: 'Questions about this Cookie Policy can be sent to adwaitnaik27@gmail.com.',
      },
    ],
  },
};

/* ── Modal ───────────────────────────────────────────────── */
interface Props {
  open: LegalType;
  onClose: () => void;
}

export default function LegalModal({ open, onClose }: Props) {
  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const content = open ? CONTENT[open] : null;

  return (
    <AnimatePresence>
      {open && content && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              inset: '5vh 0 0',
              margin: '0 auto',
              maxWidth: '720px',
              width: '92%',
              borderRadius: '1.25rem 1.25rem 0 0',
              backgroundColor: 'var(--c-surface)',
              border: '1px solid var(--c-subtle)',
              borderBottom: 'none',
              zIndex: 201,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
            }}
          >
            {/* Sticky header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid var(--c-subtle)',
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--c-text)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                {content.title}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.18 }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.4rem', borderRadius: '0.4rem',
                  color: 'var(--c-muted)', display: 'flex', alignItems: 'center',
                }}
                aria-label="Close"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Scrollable body */}
            <div
              style={{
                overflowY: 'auto',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}
            >
              {content.sections.map((s) => (
                <div key={s.heading}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {s.heading}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      color: 'var(--c-muted)',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}

              {/* Bottom padding so last item isn't flush */}
              <div style={{ height: '2rem' }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
