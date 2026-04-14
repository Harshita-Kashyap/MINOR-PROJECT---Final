export default function AuthSection({ title, children }) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50">
      {title && (
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}