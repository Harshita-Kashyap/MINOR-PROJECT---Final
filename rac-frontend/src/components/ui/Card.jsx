export default function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      p-4 rounded-xl shadow-sm 
      ${hover ? "hover:shadow-md transition" : ""}
      ${className}`}
    >
      {children}
    </div>
  );
}