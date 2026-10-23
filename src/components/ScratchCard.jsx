import { useEffect, useRef, useState } from "react";

const BRUSH = 26; // ungli ke liye bada brush
const THRESHOLD = 0.55; // 55% scratch hote hi poora card khul jayega
const CHECK_EVERY = 5; // har 5 moves par check (jaldi reveal, phir bhi smooth)

export default function ScratchCard({ message, onReveal }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const drawing = useRef(false);
  const moves = useRef(0);
  const done = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Canvas ek hi baar draw hota hai (resize par reset nahi hota)
  useEffect(() => {
    const c = canvas.current;
    const r = wrap.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#f9c6dc");
    g.addColorStop(0.5, "#c4e4fd");
    g.addColorStop(1, "#f6c9ec");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);

    ctx.fillStyle = "rgba(255,255,255,.35)";
    for (let k = 0; k < 7; k++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * r.width,
        Math.random() * r.height,
        20 + Math.random() * 50,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.fillStyle = "rgba(170,70,110,.75)";
    ctx.font = 'italic 600 20px "Cormorant Garamond", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch to reveal ✦", r.width / 2, r.height / 2);
  }, []);

  const clearedRatio = () => {
    const c = canvas.current;
    const data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let clear = 0,
      total = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
      // har 16th pixel sample
      total++;
      if (data[i] < 128) clear++; // aadha-transparent edge bhi gino
    }
    return clear / total;
  };

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setRevealed(true); // canvas fade-out hoke poora card dikh jata hai
    onReveal && onReveal();
  };

  const scratch = (e) => {
    if (done.current) return;
    const c = canvas.current;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    moves.current++;
    if (moves.current % CHECK_EVERY === 0 && clearedRatio() > THRESHOLD)
      finish();
  };

  return (
    <div
      ref={wrap}
      className="relative h-40 w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-pink-300/40"
    >
      {/* Reveal hone ke baad dikhne wala card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-fuchsia-50 px-6 text-center">
        {/* Heart badge */}
        <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-pink-400 shadow">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="#fff"
            aria-hidden="true"
          >
            <path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.5 5 6.5 5c1.9 0 3.5 1 5.5 3 2-2 3.6-3 5.5-3 3 0 5.5 3 4 6.8C19.5 16.4 12 21 12 21z" />
          </svg>
        </span>

        {/* Sparkle icon */}
        <svg
          viewBox="0 0 32 32"
          className="h-9 w-9"
          fill="none"
          stroke="#f9a8d4"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 5c.9 6 4.5 9.6 10.5 10.5C17.5 16.4 13.9 20 13 26c-.9-6-4.5-9.6-10.5-10.5C8.5 14.6 12.1 11 13 5z" />
          <path d="M25 3c.4 2.4 1.6 3.6 4 4-2.4.4-3.6 1.6-4 4-.4-2.4-1.6-3.6-4-4 2.4-.4 3.6-1.6 4-4z" />
        </svg>

        <p className="mt-2 font-serif text-lg italic leading-7 text-slate-500">
          {message}
        </p>
      </div>

      {/* Scratch layer */}
      <canvas
        ref={canvas}
        className="absolute inset-0 h-full w-full transition-opacity duration-500"
        style={{
          touchAction: "none",
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
        onPointerDown={(e) => {
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e);
        }}
        onPointerMove={(e) => drawing.current && scratch(e)}
        onPointerUp={() => (drawing.current = false)}
        onPointerCancel={() => (drawing.current = false)}
      />
    </div>
  );
}
