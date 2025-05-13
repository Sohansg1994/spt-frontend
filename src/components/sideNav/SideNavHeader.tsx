import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils/classnames";

/* -------------------------------------------------------------------------- */
/*                                 type                                       */
/* -------------------------------------------------------------------------- */
type props = {
  label?: string;
  path: string;
  isOpen?: boolean;
  icon?: ReactNode;
  maxWidth: string;
  minWidth: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
  isDisabled?: boolean;
};

export default function SideNavHeader({
  label,
  path,
  isOpen,
  icon,
  minWidth,
  maxWidth,
  setIsOpen,
  isMobile = false,
  isDisabled = false,
}: props) {
  const location = useLocation();
  const navigate = useNavigate();
  const locationArray = location.pathname.split("/");
  const pathArray = path.split("/");

  const isActive =
    pathArray[pathArray.length - 1] ===
    `${locationArray[locationArray.length - 1]}`;

  const handleNavigate = () => {
    if (!isDisabled) {
      navigate(path);
      if (isMobile) setIsOpen(false);
    }
  };

  return (
    <li className="mb-1">
      <button
        onClick={handleNavigate}
        disabled={isDisabled}
        className={classNames(
          isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-primary-200",
          isActive
            ? "text-typography-primary font-semibold "
            : "text-typography-secondary ",
          isOpen
            ? isMobile
              ? maxWidth
              : maxWidth
            : isMobile
            ? "hidden"
            : minWidth,
          `group flex gap-x-4 py-2.5 sm:py-3 text-base leading-6 whitespace-nowrap overflow-hidden transition-all duration-300`
        )}
      >
        <div
          className={classNames(
            isActive
              ? "text-typography-primary "
              : "text-typography-secondary ",
            isOpen ? "ml-6" : "transition-all duration-500 ml-4",
            "h-6 w-6 shrink-0"
          )}
        >
          {icon}
        </div>
        {isOpen && <div>{label}</div>}
      </button>
    </li>
  );
}
