import React from "react";

interface SelectBoxProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: any; // Replace `any` with the appropriate type from react-hook-form if needed
  error?: { message?: string };
}

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  label,
  options,
  register,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        {...register}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default SelectBox;
