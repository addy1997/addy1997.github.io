import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--c-accent) 0%, #06B6D4 100%)',
          boxShadow: '0 0 8px var(--c-accent)',
          transition: 'width 80ms linear',
        }}
      />
    </div>
  );
}
