import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputBoxProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
}

const InputBox: React.FC<InputBoxProps> = ({
  id,
  label,
  type,
  register,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        {...register}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputBox;
