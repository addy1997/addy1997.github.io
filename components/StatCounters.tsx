import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const STATS = [
  { value: 4,  suffix: '+', label: 'Years Experience' },
  { value: 4,  suffix: '',  label: 'Companies' },
  { value: 24, suffix: '+', label: 'Technologies' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    let startTs: number | null = null;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const pct = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setCount(Math.round(eased * value));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatCounters() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            paddingRight: i < STATS.length - 1 ? '2rem' : 0,
            borderRight: i < STATS.length - 1 ? '1px solid var(--c-subtle)' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.9rem',
              fontWeight: 700,
              color: 'var(--c-text)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              color: 'var(--c-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
