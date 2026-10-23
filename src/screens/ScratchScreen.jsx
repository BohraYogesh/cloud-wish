import { useState } from 'react';
import cfg from '../config/birthday.config';
import ScratchCard from '../components/ScratchCard';
import PillButton from '../components/PillButton';
import scratchBg from '../assets/scratch-bg.webp';

export default function ScratchScreen({ next }) {
  const total = cfg.scratch.messages.length;
  const [count, setCount] = useState(0);

  return (
    <section
      className="screen gap-5"
      style={{
        backgroundImage: `url(${scratchBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2 className="text-center font-serif text-[clamp(1.6rem,7vw,2.1rem)] italic text-slate-800">{cfg.scratch.title}</h2>

      <div className="flex w-full flex-col gap-5">
        {cfg.scratch.messages.map((m, i) => (
          <ScratchCard key={i} message={m} onReveal={() => setCount((c) => c + 1)} />
        ))}
      </div>

      <div className="mt-2 flex w-full items-center justify-center gap-3 font-serif text-lg italic text-slate-500">
        <span>Revealed: {count}/{total}</span>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-pink-100">
          <div className="h-full rounded-full bg-pink-400 transition-all duration-500" style={{ width: `${(count / total) * 100}%` }} />
        </div>
      </div>

      {count === total ? (
        <PillButton onClick={next}>{cfg.scratch.done}</PillButton>
      ) : (
        <button onClick={next} className="btn font-serif text-xl italic text-slate-400">{cfg.scratch.skip} ›</button>
      )}
    </section>
  );
}