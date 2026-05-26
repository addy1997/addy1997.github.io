import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const rawX = useMotionValue(-600);
  const rawY = useMotionValue(-600);

  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [rawX, rawY]);

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        style={{
          position: 'fixed',
          left: -240,
          top: -240,
          x,
          y,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.055) 0%, transparent 68%)',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
        }}
      />
      {/* Tight inner highlight */}
      <motion.div
        style={{
          position: 'fixed',
          left: -60,
          top: -60,
          x,
          y,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
        }}
      />
    </>
  );
}
