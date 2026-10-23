import { motion, useReducedMotion } from 'framer-motion';
import cfg from '../config/birthday.config';
import GradientText from '../components/GradientText';
import PillButton from '../components/PillButton';
import FallingStars from '../components/FallingStars';
import happy from '../assets/happy.gif';
import welcomeBg from '../assets/welcome-bg.webp';
import pinkCloud from '../assets/pink-cloud.webp';
import whiteCloud from '../assets/white-cloud.webp';

// Halka fade + tairta hua cloud
function SoftCloud({ src, className, x, y, dur, calm }) {
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

export default function WelcomeScreen({ next }) {
  const calm = useReducedMotion();

  return (
    <section
      className="screen justify-center text-center"
      style={{
        backgroundImage: `url(${welcomeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SoftCloud src={pinkCloud} className="left-0 top-10 w-28" x={14} y={-8} dur={7} calm={calm} />
      <SoftCloud src={whiteCloud} className="right-0 top-24 w-32" x={-12} y={8} dur={9} calm={calm} />
      <SoftCloud src={whiteCloud} className="bottom-20 left-0 w-28" x={12} y={6} dur={8} calm={calm} />
      <SoftCloud src={pinkCloud} className="bottom-8 right-0 w-24" x={-10} y={-6} dur={10} calm={calm} />

      <FallingStars />

      {/* Content clouds ke upar rahe, isliye z-10 */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <img
          src={happy}
          alt=""
          draggable={false}
          className="w-52 select-none object-contain"
        />

        <h1 className="whitespace-nowrap font-serif text-[clamp(1.35rem,6.8vw,2.2rem)] font-semibold italic leading-tight">
          <GradientText from="from-pink-500" to="to-purple-500">{cfg.welcome.title}</GradientText>
        </h1>

        <PillButton
          variant="glass"
          onClick={next}
          className="!px-7 !py-2 !text-xl !min-h-[46px]"
        >
          {cfg.welcome.button}
        </PillButton>
      </div>
    </section>
  );
}