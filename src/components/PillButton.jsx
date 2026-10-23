const variants = {
  pink: 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-300/60',
  purple: 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg shadow-purple-300/60',
  magenta: 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-300/60',
  glass: 'bg-white/70 backdrop-blur text-pink-600 shadow-lg shadow-pink-200/60 border border-white',
  plain: 'bg-white/50 text-slate-500 border border-white/80',
};

export default function PillButton({ variant = 'pink', className = '', ...props }) {
  return (
    <button
      {...props}
      className={`btn rounded-full px-10 py-3 font-serif italic text-2xl ${variants[variant]} ${className}`}
    />
  );
}
