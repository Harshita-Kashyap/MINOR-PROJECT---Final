export default function Card({
  children,
  className = "",
  hover = false,
  padding = "p-5",
}) {
  return (
    <div
      className={`
        rounded-2xl border border-gray-200 bg-white shadow-sm
        dark:border-gray-700/70 dark:bg-gray-900/80
        ${padding}
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}