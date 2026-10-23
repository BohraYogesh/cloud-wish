import { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 32, onDone, className = '' }) {
  const [i, setI] = useState(0);
  const done = i >= text.length;

  useEffect(() => {
    if (done) {
      onDone && onDone();
      return;
    }
    const prev = i > 0 ? text[i - 1] : '';
    let d = speed;
    if (i === 0) d = 600;                          // shuru me thoda ruko
    else if ('.!?'.includes(prev)) d = speed * 9;  // vaakya ke baad lamba pause
    else if (',;:'.includes(prev)) d = speed * 4;  // comma par chhota pause
    const t = setTimeout(() => setI(i + 1), d);
    return () => clearTimeout(t);
  }, [i, text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Tap karne par poora text turant dikh jata hai
    <p onClick={() => setI(text.length)} className={`relative cursor-default whitespace-pre-line ${className}`}>
      {/* Poora text invisible rakha hai, taaki card ki height typing ke dauran kud-kud na kare */}
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {text.slice(0, i)}
        {!done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-pink-400" />}
      </span>
    </p>
  );
}