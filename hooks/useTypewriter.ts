import { useState, useEffect } from 'react';

type Phase = 'typing' | 'pause-full' | 'deleting' | 'pause-empty';

export function useTypewriter(
  text: string,
  typeSpeed = 55,
  deleteSpeed = 30,
  pauseFull = 1800,
  pauseEmpty = 500,
) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < text.length) {
        timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase('pause-full'), pauseFull);
      }
    } else if (phase === 'pause-full') {
      timer = setTimeout(() => setPhase('deleting'), 0);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), deleteSpeed);
      } else {
        timer = setTimeout(() => setPhase('pause-empty'), pauseEmpty);
      }
    } else if (phase === 'pause-empty') {
      timer = setTimeout(() => setPhase('typing'), 0);
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, text, typeSpeed, deleteSpeed, pauseFull, pauseEmpty]);

  const showCursor = phase === 'typing' || phase === 'deleting';

  return { displayed, showCursor };
}
