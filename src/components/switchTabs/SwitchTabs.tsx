import { Tab } from "../../types/tab";
import { classNames } from "../../utils/classnames";
import { useNavigate, useLocation } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                                 types                                      */
/* -------------------------------------------------------------------------- */
type SwitchTabsProps = {
  tabs: Record<string, Tab>;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function SwitchTabs({ tabs }: SwitchTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="bg-transparent rounded-full ring-1 ring-light-primary w-full flex h-10"
      aria-label="Switch Tabs"
    >
      {Object.entries(tabs).map(([path, tab]) => (
        <div
          key={path}
          className={classNames(
            "cursor-pointer w-1/2 h-full text-sm font-semibold rounded-full transition duration-300 flex justify-center items-center",
            location.pathname === path
              ? "bg-light-primary text-typography-primary-light"
              : "text-typography-primary"
          )}
          onClick={() => navigate(`${path}`)}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.name}
        </div>
      ))}
    </nav>
  );
}
