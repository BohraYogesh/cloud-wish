import { useCallback, useRef, useState } from 'react';

// Mobile par autoplay block hota hai, isliye play() ko user tap se hi call karo.
export default function useAudio(src) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);

  const play = useCallback(() => {
    if (!src) return;
    if (!ref.current) {
      ref.current = new Audio(src);
      ref.current.loop = true;
      ref.current.volume = 0.6;
    }
    ref.current.play().catch(() => {});
  }, [src]);

  const toggle = () => {
    if (!ref.current) return;
    if (muted) ref.current.play().catch(() => {});
    else ref.current.pause();
    setMuted(!muted);
  };

  return { play, toggle, muted };
}
