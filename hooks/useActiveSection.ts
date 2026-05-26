import { useState, useEffect } from 'react';

const SECTION_IDS = ['about', 'experience', 'skills', 'projects', 'blogs', 'contact'];
const NAVBAR_H = 68;

export function useActiveSection(): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const update = () => {
      let best = '';
      let bestTop = -Infinity;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top - NAVBAR_H;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          best = id;
        }
      });
      setActive(best);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return active;
}
