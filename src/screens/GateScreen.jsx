import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import cfg from "../config/birthday.config";
import GradientText from "../components/GradientText";
import PillButton from "../components/PillButton";
import pinkCloud from "../assets/pink-cloud.webp";
import whiteCloud from "../assets/white-cloud.webp";
import bear from "../assets/bear.webp";
import pinkFlower from "../assets/pink-flower.webp";

export default function GateScreen({ next, audio }) {
  const [refused, setRefused] = useState(false);
  const calm = useReducedMotion(); // reduced-motion wale users ke liye animation band

  const go = () => {
    audio.play();
    next();
  };

  // Clouds halke se idhar-udhar tairte hain
  const drift = (x, y, dur) =>
    calm
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration: dur, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <section className="screen justify-center text-center">
      {/* Pink cloud (top-left) */}
      <motion.img
        src={pinkCloud}
        alt=""
        draggable={false}
        decoding="async"
        className="pointer-events-none absolute left-0 top-14 w-28 select-none"
        {...drift(14, -8, 7)}
      />

      {/* White cloud + swinging bear (top-right) */}
      <div className="pointer-events-none absolute right-2 top-8 w-36">
        <motion.img
          src={whiteCloud}
          alt=""
          draggable={false}
          decoding="async"
          className="w-full select-none"
          {...drift(-12, 8, 8)}
        />
        <div className="absolute left-1/2 top-[45%] w-16 -translate-x-1/2">
          <motion.img
            src={bear}
            alt=""
            draggable={false}
            decoding="async"
            className="w-full select-none"
            style={{ transformOrigin: "50% 0%" }}
            animate={calm ? {} : { rotate: [-7, 7, -7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!refused ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center"
          >
            <h1 className="font-serif text-[clamp(1.9rem,9vw,2.6rem)] font-semibold italic leading-tight">
              <GradientText>{cfg.gate.title}</GradientText>
            </h1>
            <p className="mt-5 font-serif text-[clamp(1.1rem,5vw,1.4rem)] italic text-pink-500">
              {cfg.gate.sub} ✿
            </p>

            <div className="mt-12 flex w-full flex-col items-center gap-4">
              <PillButton
                onClick={go}
                className="!px-7 !py-2 !text-xl !min-h-[46px]"
              >
                {cfg.gate.button}
              </PillButton>
              <PillButton
                variant="plain"
                onClick={() => setRefused(true)}
                className="!px-6 !py-1.5 !text-lg !min-h-[42px]"
              >
                {cfg.gate.later[0]}
              </PillButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="refused"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center"
          >
            {/* "How dare you" par halka sa shake */}
            <motion.h1
              animate={calm ? {} : { x: [0, -10, 10, -8, 8, -4, 4, 0] }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[clamp(2.2rem,11vw,3rem)] font-semibold italic leading-tight"
            >
              <GradientText from="from-red-500" to="to-pink-500">
                {cfg.gate.refuse.title}
              </GradientText>
            </motion.h1>
            <p className="mt-5 font-serif text-[clamp(1.1rem,5vw,1.4rem)] italic text-pink-500">
              {cfg.gate.refuse.sub}
            </p>

            <div className="mt-12">
              <PillButton onClick={() => setRefused(false)}>
                {cfg.gate.refuse.back}
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom corners: pink flowers (halke fade ke saath) */}
      <img
        src={pinkFlower}
        alt=""
        draggable={false}
        decoding="async"
        className="pointer-events-none absolute bottom-0 left-0 w-32 select-none opacity-75"
        style={{
          WebkitMaskImage: "linear-gradient(to top, #000 55%, transparent)",
          maskImage: "linear-gradient(to top, #000 55%, transparent)",
        }}
      />
      <img
        src={pinkFlower}
        alt=""
        draggable={false}
        decoding="async"
        className="pointer-events-none absolute bottom-0 right-0 w-32 -scale-x-100 select-none opacity-75"
        style={{
          WebkitMaskImage: "linear-gradient(to top, #000 55%, transparent)",
          maskImage: "linear-gradient(to top, #000 55%, transparent)",
        }}
      />
    </section>
  );
}
