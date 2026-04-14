import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}