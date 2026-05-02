export default function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30 ${className}`}
    >
      {children}
    </div>
  );
}