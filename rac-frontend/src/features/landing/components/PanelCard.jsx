export default function PanelCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/70 ${className}`}
    >
      {children}
    </div>
  );
}