import { motion } from 'framer-motion';

export default function Polaroid({ item, tilt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-[2rem] bg-white p-4 pb-6 shadow-2xl shadow-pink-300/40"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-slate-100">
        {item.img ? (
          <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <span className="text-8xl">{item.emoji}</span>
        )}
      </div>
      <h3 className="mt-5 text-center font-serif text-2xl font-semibold italic text-slate-900">{item.title}</h3>
      <p className="text-center text-sm tracking-[.3em] text-pink-500">{item.year}</p>
      <p className="mt-1 text-center font-serif text-lg italic text-slate-500">{item.caption}</p>
    </motion.div>
  );
}
