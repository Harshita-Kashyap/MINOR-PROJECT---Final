export default function MetricCard({ title, value, note, accent = "blue" }) {
  const accentStyles = {
    blue: "from-blue-500/10 to-blue-100 dark:from-blue-500/10 dark:to-blue-900/20",
    purple:
      "from-purple-500/10 to-purple-100 dark:from-purple-500/10 dark:to-purple-900/20",
    green:
      "from-green-500/10 to-green-100 dark:from-green-500/10 dark:to-green-900/20",
    amber:
      "from-yellow-500/10 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-900/20",
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-gradient-to-br p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:shadow-gray-950/30 ${
        accentStyles[accent] || accentStyles.blue
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
        {value ?? 0}
      </h2>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {note}
      </p>
    </div>
  );
}