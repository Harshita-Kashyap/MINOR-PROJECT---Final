import { useId, useState } from "react";

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

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
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
            w-full border rounded-xl px-3 py-2 text-sm
            ${isPassword ? "pr-12" : ""}
            ${error ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${className}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}

      {!error && helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
    </div>
  );
}

export default Input;