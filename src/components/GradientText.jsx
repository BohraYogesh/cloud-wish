export default function GradientText({ from = 'from-pink-500', to = 'to-orange-400', className = '', children }) {
  return <span className={`grad-text bg-gradient-to-r ${from} ${to} ${className}`}>{children}</span>;
}
