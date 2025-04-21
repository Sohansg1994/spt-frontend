import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils/classnames";

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */
type Props = {
  label?: string;
  path: string;
  isOpen?: boolean;
  icon?: ReactNode;
  maxWidth: string;
  minWidth: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
  isDisabled?: boolean; // Prop to handle disabled state
};

/* -------------------------------------------------------------------------- */
/*                             SideNavHeader                                  */
/* -------------------------------------------------------------------------- */
export default function SideNavHeader({
  label = "Default Label",
  path,
  isOpen = false,
  icon = null,
  setIsOpen,
  isMobile = false,
  isDisabled = false, // Defaults to false
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const locationArray = location.pathname.split("/");
  const pathArray = path.split("/");
  const isActive = pathArray[0] === `${locationArray[1]}`;

  const handleNavigate = () => {
    if (!isDisabled) {
      navigate(path);
      if (isMobile) setIsOpen(false);
    }
  };

  const buttonClasses = classNames(
    isDisabled
      ? "cursor-not-allowed opacity-50"
      : "hover:text-typography-light-primary ",
    isActive
      ? "text-typography-primary font-semibold ring-1 ring-light-primary rounded-md bg-light-primary/20"
      : "text-typography-secondary-dark/50 font-semibold hover:bg-light-primary/20 hover:rounded-md ",
    // isOpen ? (isMobile ? maxWidth : maxWidth) : isMobile ? "hidden" : minWidth,
    isOpen ? `px-2.5 w-full ` : `px-2.5 `,
    `group flex gap-x-4  py-1.5 text-sm leading-6 whitespace-nowrap overflow-hidden transition-all duration-500  `
  );

  const iconClasses = classNames(
    isActive
      ? "text-typography-primary"
      : "text-typography-secondary-dark/50 group-hover:text-typography-light-primary ",
    isOpen ? "" : "transition-all duration-500",
    "h-5 w-5 shrink-0"
  );

  return (
    <ul>
      <li className="mb-2 ">
        <button
          onClick={handleNavigate}
          disabled={isDisabled} // Disable button if `isDisabled` is true
          className={buttonClasses}
          aria-label={label}
        >
          <div className={iconClasses}>{icon}</div>
          {isOpen && <div>{label}</div>}
        </button>
      </li>
    </ul>
  );
}
