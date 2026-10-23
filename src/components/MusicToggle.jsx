export default function MusicToggle({ audio }) {
  return (
    <button
      onClick={audio.toggle}
      aria-label="Toggle music"
      className="btn fixed right-3 z-30 grid h-11 w-11 place-items-center rounded-full bg-white/80 text-xl shadow-md"
      style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)', minHeight: 44 }}
    >
      {audio.muted ? '🔇' : '🔊'}
    </button>
  );
}
