import { ReactNode } from "react";
import { classNames } from "../../utils/classnames";

/* -------------------------------------------------------------------------- */
type Props = {
  tabs: Tab[];
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedTabIndex: number;
};

type Tab = {
  name: string;
  component: React.ReactNode;
  current?: boolean;
  icon?: ReactNode;
};
/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function SelectionTabs({
  tabs,
  setSelectedTabIndex,
  selectedTabIndex,
}: Props) {
  const handleTabClick = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <div>
      <div>
        <nav
          className="isolate flex gap-2   bg-surface-light-primary rounded-lg   dark:bg-surface-dark-primary "
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              className={classNames(
                tabIdx === selectedTabIndex
                  ? "border-light-primary text-light-primary"
                  : "border-transparent text-typography-secondary-light  hover:text-gray-700 ",
                "whitespace-nowrap border-b-2 px-1 py-2 text-sm "
              )}
              aria-current={tabIdx === selectedTabIndex ? "page" : undefined}
              onClick={() => handleTabClick(tabIdx)}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
