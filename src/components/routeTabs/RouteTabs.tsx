import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classnames";

/* -------------------------------------------------------------------------- */
type RouteTabsProps = {
  tabs: Record<string, Tab>;
  itemGap?: string;
};

type Tab = {
  name: string;
  component: ReactNode;
  icon?: ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function RouteTabs({ tabs, itemGap = "gap-2" }: RouteTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div>
        <nav
          className={`isolate flex bg-surface rounded-lg ${itemGap}`}
          aria-label="Tabs"
        >
          {Object.entries(tabs).map(([path, tab]) => (
            <a
              key={tab.name}
              className={classNames(
                location.pathname === path
                  ? "border-primary-600 text-typography-secondary font-medium"
                  : "border-transparent text-typography-secondary/80 hover:text-gray-700",
                "whitespace-nowrap border-b-2 px-1 py-2 text-sm"
              )}
              aria-current={location.pathname === path ? "page" : undefined}
              onClick={() => navigate(path)}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
