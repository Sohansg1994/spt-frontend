import React, { ReactNode } from "react";
import { classNames } from "../../utils/classnames";
import Spinner from "../spinner/Spinner";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  colour?:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "white"
    | "primary"
    | "dark"
    | "light"
    | "secondary"
    | "none";
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  permission?: boolean;
};

const buttonColour: Record<string, string> = {
  blue: "bg-blue-500 hover:bg-blue-600 focus-visible:outline-blue-500 text-white",
  red: "bg-red-500 hover:bg-red-600 focus-visible:outline-red-500 text-white",
  green:
    "bg-green-500 hover:bg-green-600 focus-visible:outline-green-500 text-white",
  yellow:
    "bg-yellow-500 hover:bg-yellow-600 focus-visible:outline-yellow-500 text-white",
  white:
    "bg-white hover:bg-gray-50 ring-1 ring-gray-300 text-gray-900 shadow-sm",
  primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm",
  dark: "bg-neutral-800 hover:bg-neutral-700 text-white shadow-sm",
  none: "bg-transparent text-neutral-700 focus-visible:outline-none font-semibold",
  secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm",
  light:
    "bg-primary-50 hover:bg-primary-100 text-primary-700 ring-1 ring-primary-200 shadow-sm",
};

const buttonDisabledColour: Record<string, string> = {
  blue: "bg-blue-300 text-white/70 cursor-not-allowed",
  red: "bg-red-300 text-white/70 cursor-not-allowed",
  green: "bg-green-300 text-white/70 cursor-not-allowed",
  yellow: "bg-yellow-300 text-white/70 cursor-not-allowed",
  white: "bg-gray-100 text-gray-500 cursor-not-allowed",
  primary: "bg-primary-200 text-white cursor-not-allowed",
  dark: "bg-neutral-600 text-neutral-400 cursor-not-allowed",
  none: "text-neutral-400 bg-transparent cursor-not-allowed font-semibold",
  secondary: "bg-secondary-200 text-white cursor-not-allowed",
  light: "bg-primary-100 text-primary-300 cursor-not-allowed",
};

const Button = ({
  children,
  type = "button",
  loading,
  disabled = false,
  onClick,
  colour = "blue",
  icon,
  fullWidth = false,
  rounded = false,
  className = "",
  permission = true,
}: ButtonProps) => {
  const isDisabled = disabled || !permission;

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        isDisabled ? buttonDisabledColour[colour] : buttonColour[colour],
        fullWidth ? "w-full" : "w-fit",
        rounded ? "rounded-full" : "rounded-[8px]",
        "text-sm inline-flex justify-center items-center px-3 py-2  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2 whitespace-nowrap",
        className
      )}
      disabled={isDisabled}
    >
      {loading ? (
        <Spinner dark />
      ) : (
        <>
          {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
