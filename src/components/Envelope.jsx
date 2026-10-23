import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import seal from '../assets/seal.webp';

export default function Envelope({ opened, rising, onClick }) {
  const [flapBack, setFlapBack] = useState(false);

  // Flap khulte hi thodi der baad paper ke peeche chala jata hai
  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setFlapBack(true), 350);
    return () => clearTimeout(t);
  }, [opened]);

  return (
    <motion.button
      onClick={onClick}
      aria-label="Open the letter"
      className="relative block h-48 w-72 touch-manipulation"
      style={{ perspective: 900 }}
      animate={opened ? { y: 0 } : { y: [0, -6, 0] }}
      transition={opened ? {} : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Back */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: 'linear-gradient(135deg,#a91d1d,#8f1414)', boxShadow: '0 25px 40px -15px rgba(90,20,20,.55)' }}
      />

      {/* Flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-28 origin-top"
        style={{
          background: 'linear-gradient(#cf3434,#b32424)',
          clipPath: 'polygon(0 0,100% 0,50% 100%)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          zIndex: flapBack ? 5 : 30,
        }}
        animate={{ rotateX: opened ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Andar ka paper (upar uthta hai) */}
      <motion.div
        className="absolute inset-x-4 top-3 z-10 h-40 rounded-lg"
        style={{ background: '#f7f1e3', boxShadow: '0 2px 10px rgba(0,0,0,.2)' }}
        animate={{ y: rising ? -135 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <div className="mx-4 mt-4 space-y-2">
          <div className="h-1.5 w-1/2 rounded bg-stone-300/70" />
          <div className="h-1.5 w-full rounded bg-stone-300/70" />
          <div className="h-1.5 w-4/5 rounded bg-stone-300/70" />
        </div>
      </motion.div>

      {/* Front pocket */}
      <div
        className="absolute inset-0 z-20 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg,#e04545,#c62828)',
          clipPath: 'polygon(0 0,50% 52%,100% 0,100% 100%,0 100%)',
        }}
      />

      {/* Wax seal: flap ki nok par bilkul beech me */}
      <motion.img
        src={seal}
        alt=""
        draggable={false}
        className="pointer-events-none absolute left-1/2 z-40 w-16 select-none"
        style={{ top: '7rem', x: '-50%', y: '-50%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.35))' }}
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.6 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}