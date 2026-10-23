import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import cfg from '../config/birthday.config';
import GradientText from '../components/GradientText';
import PillButton from '../components/PillButton';
import finalGif from '../assets/final-page.gif';
import pinkCloud from '../assets/pink-cloud.webp';
import whiteCloud from '../assets/white-cloud.webp';
import FallingStars from '../components/FallingStars';
import FallingHeart from '../components/FallingHearts';

const colors = ['#f472b6', '#a78bfa', '#fbbf24', '#93c5fd', '#fb7185'];

export default function FinalScreen({ restart }) {
  const F = cfg.final;
  const calm = useReducedMotion();
  const [open, setOpen] = useState(() => new Set()); // ek saath kitne bhi open reh sakte hain
  const [seen, setSeen] = useState(() => new Set());
  const all = seen.size === F.wishes.length;

  const tap = (i) => {
    // sirf usi cloud ko toggle karo jise tap kiya, baaki jaise hain waise rahenge
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
    setSeen((s) => new Set(s).add(i));
  };

  useEffect(() => {
    if (!all) return;
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, colors });
    const t = setTimeout(() => confetti({ particleCount: 80, spread: 110, origin: { y: 0.5 }, colors }), 500);
    return () => clearTimeout(t);
  }, [all]);

  return (
    <section className="screen gap-6 text-center">
      <FallingStars />
      <FallingHeart />
      <img
        src={finalGif}
        alt=""
        draggable={false}
        className="pointer-events-none w-44 select-none"
      />

      <h1 className="font-serif text-[clamp(2rem,9vw,2.6rem)] font-semibold italic leading-tight">
        <GradientText>{F.title}</GradientText>
      </h1>
      <p className="font-serif text-xl italic text-pink-500">{F.hint} ({seen.size}/{F.wishes.length})</p>

      <div className="mt-4 grid w-full grid-cols-2 justify-items-center gap-x-2 gap-y-12 px-2">
        {F.wishes.map((w, i) => {
          const last = i === F.wishes.length - 1 && F.wishes.length % 2 === 1;
          const isOpen = open.has(i);
          const isWhite = i % 2 === 1; // left = pink, right = white
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              aria-label={`Wish ${i + 1}`}
              className={`btn relative w-28 ${
                last ? 'col-span-2 -mt-8 justify-self-center' : ''
              } ${isOpen ? 'z-20' : 'z-0'}`}
            >
              {/* cloud + number + bubble, sab ek saath halke upar-niche hilte hain */}
              <motion.div
                className="relative"
                animate={calm ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 3.5 + (i % 3) * 0.7,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={isWhite ? whiteCloud : pinkCloud}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className="pointer-events-none w-full select-none"
                />
                <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400 font-ui text-base text-white shadow-md">
                  {i + 1}
                </span>

                {/* bubble cloud ke UPAR khulta hai */}
                <AnimatePresence>
                  {isOpen && (
                    <span className="absolute bottom-[70%] left-1/2 z-10 -translate-x-1/2">
                      <motion.span
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
                        className="relative block whitespace-nowrap rounded-2xl bg-white/95 px-5 py-2.5 font-serif text-lg italic text-pink-600 shadow-lg"
                      >
                        {w}
                        {/* neeche ki chhoti tail */}
                        <span className="absolute left-1/2 top-full -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 bg-white/95" />
                      </motion.span>
                    </span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          );
        })}
      </div>

      {all && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full rounded-[2rem] border border-white bg-white/60 p-6 shadow-xl shadow-pink-200/50 backdrop-blur"
        >
          <div className="text-5xl">🎂</div>
          <p className="mt-3 font-serif text-xl italic leading-9 text-slate-700">{F.message}</p>
          <p className="mt-4 whitespace-nowrap font-script text-2xl text-pink-400">♡ {F.tag} ♡</p>
          <PillButton variant="plain" onClick={restart} className="mt-5 text-lg">{F.replay}</PillButton>
        </motion.div>
      )}

      <span className="absolute bottom-2 left-2 text-5xl">🎈</span>
      <span className="absolute bottom-2 right-2 text-5xl">🎈</span>
    </section>
  );
}