import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type InputBoxProps = {
  name: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "number" | "date" | "password";
  disabled?: boolean;
  customStyle?: string;
  label?: string;
};

function InputBox({
  name,
  placeholder = "",
  error,
  type = "text",
  disabled = false,
  customStyle = "",
  label,
}: InputBoxProps) {
  const { register, watch } = useFormContext(); // ✅ Use Form Context
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fieldValue = watch(name) ?? ""; // ✅ Ensure we have a value

  return (
    <div className="relative w-full">
      <div
        className={`relative border rounded-md px-3 pt-2.5 pb-1 transition-all duration-200 ${
          isFocused || fieldValue
            ? "border-typography-secondary/30"
            : "border-typography-secondary/30"
        } ${error ? "border-red-500" : ""} ${disabled ? "bg-gray-100" : ""}`}
      >
        {label && (
          <label
            htmlFor={name}
            className={`absolute left-2 transition-all duration-200 bg-white px-1 ${
              isFocused || fieldValue
                ? "-top-2 left-2 text-xs text-typography-dark/70 "
                : "top-2.5 text-gray-500 text-sm"
            }`}
          >
            {label}
          </label>
        )}

        <input
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(!!fieldValue)}
          className={`w-full bg-transparent text-gray-900 outline-none pt-2 pb-1 px-1 text-sm placeholder-transparent ${customStyle}`}
          placeholder={placeholder}
        />

        {type === "password" && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {showPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default InputBox;
