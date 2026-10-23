import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cfg from "../config/birthday.config";
import Envelope from "../components/Envelope";
import Typewriter from "../components/Typewriter";
import PillButton from "../components/PillButton";
import letterBg from "../assets/letterscreen-bg.webp";
import seal from "../assets/seal.webp";
import FallingHearts from "../components/FallingHearts";

export default function LetterScreen({ next }) {
  const [opening, setOpening] = useState(false);
  const [rising, setRising] = useState(false);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(false);
  const L = cfg.letter;

  // Sequence: seal fade + flap khulta hai -> paper upar uthta hai -> letter card aata hai
  const tap = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => setRising(true), 700);
    setTimeout(() => setOpen(true), 1900);
  };

  return (
    <section
      className="screen justify-center"
      style={{
        backgroundImage: `url(${letterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FallingHearts />
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="env"
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-12"
          >
            <h2 className="text-center font-serif text-[clamp(1.7rem,8vw,2.2rem)] italic text-slate-800">
              {cfg.envelope.title}
            </h2>
            <Envelope opened={opening} rising={rising} onClick={tap} />
            <p
              className={`font-serif text-lg italic text-slate-500 ${opening ? "opacity-0" : "animate-pulse"}`}
            >
              {cfg.envelope.hint}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 70, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center gap-8"
          >
            <div
              className="relative w-full rounded-[1.25rem] border border-amber-100/80 px-7 pb-8 pt-9"
              style={{
                background: "linear-gradient(160deg,#fffaf0,#f6edda)",
                boxShadow:
                  "0 30px 60px -20px rgba(90,40,40,.45), inset 0 0 0 1px rgba(255,255,255,.7)",
              }}
            >
              {/* Washi tape */}
              <span className="absolute -top-3 left-6 h-6 w-16 -rotate-6 bg-pink-200/70 shadow-sm" />
              <span className="absolute -top-3 right-6 h-6 w-16 rotate-6 bg-purple-200/70 shadow-sm" />

              <h3 className="font-serif text-[1.7rem] font-semibold italic text-slate-900">
                {L.heading}
              </h3>

              <div className="my-4 flex items-center gap-2 text-pink-300">
                <span className="h-px flex-1 bg-gradient-to-r from-pink-300 to-transparent" />
                <span className="text-xs">✦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-pink-300 to-transparent" />
              </div>

              <Typewriter
                text={L.body}
                speed={32}
                onDone={() => setTyped(true)}
                className="font-serif text-[1.2rem] italic leading-9 text-slate-700"
              />

              <div className="mt-6 flex min-h-[4.5rem] items-end justify-between">
                {typed && (
                  <>
                    <motion.img
                      src={seal}
                      alt=""
                      draggable={false}
                      initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: -12 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 14,
                        delay: 0.5,
                      }}
                      className="w-14 select-none"
                      style={{
                        filter: "drop-shadow(0 3px 4px rgba(0,0,0,.3))",
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-right"
                    >
                      <p className="font-script text-lg text-purple-500">
                        {L.closing}
                      </p>
                      <p className="font-script text-3xl text-pink-500">
                        {L.from}
                      </p>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {typed && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <PillButton
                  variant="magenta"
                  onClick={next}
                  className="!px-7 !py-2 !text-xl !min-h-[46px]"
                >
                  {L.button}
                </PillButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
