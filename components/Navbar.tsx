import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs',    href: '#blogs'    },
  { label: 'Contact',  href: '#contact'  },
];

// Characters that make up the logo, alternating accent vs muted
const LOGO_PARTS = [
  { text: '<', accent: false },
  { text: '.', accent: false },
  { text: 'A', accent: true },
  { text: 'N', accent: true },
  { text: '>', accent: false },
];

function AnimatedLogo() {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.05rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      aria-label="Home"
    >
      {LOGO_PARTS.map((part, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 + i * 0.07, duration: 0.3, ease: 'easeOut' }}
          style={{ color: part.accent ? 'var(--c-accent)' : 'var(--c-muted)' }}
        >
          {part.text}
        </motion.span>
      ))}
    </motion.a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const activeSection = useActiveSection();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: 'var(--c-nav-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--c-subtle)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <AnimatedLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className="text-sm"
                style={{
                  color: isActive ? 'var(--c-accent)' : 'var(--c-muted)',
                  transition: 'color 0.2s ease',
                  fontWeight: isActive ? 600 : 400,
                  position: 'relative',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-text)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? 'var(--c-accent)' : 'var(--c-muted)'; }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--c-accent)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Dark / light toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1, rotate: isDark ? -15 : 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              color: 'var(--c-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  <Sun size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  <Moon size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <ResumeButton />
        </nav>

        {/* Mobile right controls: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark / light toggle (mobile) */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              color: 'var(--c-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex' }}
                >
                  <Sun size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex' }}
                >
                  <Moon size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <button
            className="p-2 rounded-md"
            style={{ color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: 'var(--c-surface)',
              borderBottom: '1px solid var(--c-subtle)',
              transition: 'background-color 0.25s ease',
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm py-1"
                    style={{
                      color: isActive ? 'var(--c-accent)' : 'var(--c-muted)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'color 0.2s ease',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2">
                <ResumeButton />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
