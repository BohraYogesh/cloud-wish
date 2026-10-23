import { motion, useReducedMotion } from 'framer-motion';
import cfg from '../config/birthday.config';
import GradientText from '../components/GradientText';
import Polaroid from '../components/Polaroid';
import PillButton from '../components/PillButton';
import pinkCloud from '../assets/pink-cloud.webp';
import whiteCloud from '../assets/white-cloud.webp';

function FloatingCloud({ src, className = '', x = 12, y = 8, dur = 6 }) {
  const calm = useReducedMotion();
  return (
    <motion.img
      src={src}
      alt=""
      draggable={false}
      decoding="async"
      className={`pointer-events-none absolute select-none ${className}`}
      initial={{ opacity: 0 }}
      animate={
        calm
          ? { opacity: 0.6 }
          : { opacity: [0.45, 0.75, 0.45], x: [0, x, 0], y: [0, y, 0] }
      }
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function MemoriesScreen({ next }) {
  const M = cfg.memories;
  return (
    <section className="screen relative overflow-hidden gap-8 text-center">
      {/* Top right - pink cloud */}
      <FloatingCloud
        src={pinkCloud}
        className="right-0 top-2 w-32"
        x={-10}
        y={8}
        dur={6}
      />

      {/* Bottom left - white cloud */}
      <FloatingCloud
        src={whiteCloud}
        className="bottom-0 left-0 w-36"
        x={12}
        y={-8}
        dur={7}
      />

      <div className="relative z-10 pt-4">
        <h2 className="font-serif text-[clamp(2rem,9vw,2.6rem)] font-semibold italic">
          <GradientText from="from-pink-500" to="to-purple-500">{M.title}</GradientText>
        </h2>
        <p className="font-serif text-xl italic text-slate-400">{M.subtitle}</p>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-10 px-2 py-4">
        {M.items.map((item, i) => (
          <Polaroid key={i} item={item} tilt={i % 2 ? 3 : -3} />
        ))}
      </div>

      <PillButton variant="purple" onClick={next} className="relative z-10">{M.button}</PillButton>
    </section>
  );
}