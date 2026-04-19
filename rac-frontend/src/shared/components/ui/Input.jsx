import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  className = "",
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const isPassword = type === "password";

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-xl border px-3 py-2.5 text-sm
            bg-white text-gray-900 placeholder:text-gray-400
            dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500
            ${isPassword ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:focus:ring-blue-400 dark:focus:border-blue-400
            transition duration-150
            ${
              disabled
                ? "cursor-not-allowed bg-gray-100 opacity-60 dark:bg-gray-800"
                : ""
            }
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {showPassword ? t("hide") : t("show")}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 dark:text-red-400">{error}</span>
      )}

      {!error && helperText && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Input;