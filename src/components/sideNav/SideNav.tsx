import { useState } from "react";
import { classNames } from "../../utils/classnames";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SPT from "../../assets/SPT.png";
import SideNavHeader from "./SideNavHeader";

type Props = {
  mainList: SideNavItem[];
  secondaryList: SideNavItem[];
};

type SideNavItem = {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  current: boolean;
};

export default function SideNav({ mainList, secondaryList }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const maxWidth = "w-72";
  const minWidth = "w-14";

  return (
    <div
      className={classNames(
        isOpen
          ? `transition-all duration-200 ${maxWidth} `
          : `transition-all duration-200  ${minWidth} `,
        "z-10  h-screen shadow-md bg-white dark:bg-background-dark-secondary flex flex-col relative"
      )}
    >
      <div>
        <div
          className={`flex items-center pt-8  justify-between ${
            isOpen ? "px-5 pb-5" : "px-2.5"
          }`}
        >
          {isOpen && (
            <img
              className="w-40 hidden dark:block"
              src={SPT}
              alt="Your Company"
            />
          )}
          {isOpen && (
            <img className="w-40 dark:hidden" src={SPT} alt="Your Company" />
          )}

          <div
            className="p-2 bg-surface group cursor-pointer  hover:bg-primary-500 duration-300 hover:text-background-dark-secondary rounded-[6px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRightIcon
              className={`w-5 text-typography-light-primary dark:text-primary-500 group-hover:text-black duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        <div className="mt-3 border-b-2   pb-2">
          <ul>
            {mainList.map((item, index) => (
              <SideNavHeader
                key={`${index}-${item.name}`}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                path={item.path}
                label={item.name}
                maxWidth={maxWidth}
                minWidth={minWidth}
                icon={<item.icon />}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-[18px] mt-2 ">
        <ul>
          {secondaryList.map((item, index) => (
            <SideNavHeader
              key={`${index}-${item.name}`}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              path={item.path}
              label={item.name}
              maxWidth={maxWidth}
              minWidth={minWidth}
              icon={<item.icon />}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
