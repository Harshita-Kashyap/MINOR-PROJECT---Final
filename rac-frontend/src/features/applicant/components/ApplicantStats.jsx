import Card from "../../../shared/components/ui/Card";

const toneStyles = {
  default:
    "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
  info:
    "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
  warning:
    "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
  success:
    "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-gray-800",
};

export default function ApplicantStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
        <Card
          key={index}
          className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 ${
            toneStyles[item.tone || "default"]
          }`}
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {item.title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.value}
          </h3>
        </Card>
      ))}
    </div>
  );
}