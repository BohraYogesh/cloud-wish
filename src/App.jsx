import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cfg from './config/birthday.config';
import useAudio from './hooks/useAudio';
import Petals from './components/Petals';
import MusicToggle from './components/MusicToggle';
import GateScreen from './screens/GateScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ScratchScreen from './screens/ScratchScreen';
import LetterScreen from './screens/LetterScreen';
import MemoriesScreen from './screens/MemoriesScreen';
import FinalScreen from './screens/FinalScreen';

const screens = [GateScreen, WelcomeScreen, ScratchScreen, LetterScreen, MemoriesScreen, FinalScreen];
const backgrounds = [
  'bg-gradient-to-b from-pink-100 via-purple-50 to-white',
  'bg-[#fbf1ea]',
  'grid-paper',
  'bg-[#e9e3d4]',
  'bg-gradient-to-b from-blue-100 via-purple-100 to-pink-200',
  'bg-gradient-to-b from-pink-100 to-purple-100',
];

export default function App() {
  const [step, setStep] = useState(0);
  const audio = useAudio(cfg.music);

  // Phone ka back button ek step peeche le jaye (site se bahar nahi)
  useEffect(() => {
    history.replaceState({ s: 0 }, '');
    const onPop = (e) => setStep(e.state?.s ?? 0);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = (n) => {
    history.pushState({ s: n }, '');
    setStep(n);
    window.scrollTo(0, 0);
  };

  const Screen = screens[step];

  return (
    <>
      <div className={`fixed inset-0 -z-10 ${backgrounds[step]}`} />
      {[0, 2, 3, 4, 5].includes(step) && <Petals />}
      <div className="relative z-10 mx-auto w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Screen next={() => go(step + 1)} restart={() => go(0)} audio={audio} />
          </motion.div>
        </AnimatePresence>
      </div>
      {cfg.music && step > 0 && <MusicToggle audio={audio} />}
    </>
  );
}
