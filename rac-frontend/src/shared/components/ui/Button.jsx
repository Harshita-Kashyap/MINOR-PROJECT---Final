function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
  loading = false,
  loadingText = "Processing...",
  type = "button",
  icon,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:-translate-y-0.5 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    danger:
      "bg-red-600 text-white hover:-translate-y-0.5 hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:-translate-y-0.5 hover:bg-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-400 dark:text-white dark:hover:bg-gray-700",
    outlineWhite:
      "border border-white bg-transparent text-white hover:-translate-y-0.5 hover:bg-white hover:text-blue-900 focus:ring-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="inline-flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;