import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classnames";
import { Option } from "../../types/common";

/* -------------------------------------------------------------------------- */
/*                                 types                                      */
/* -------------------------------------------------------------------------- */

type Props = {
  options: Option[];
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  className?: string;
  ringColor?: string;
  textColor?: string;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export default function SelectStatus({
  options,
  selectedOption,
  setSelectedOption,
  className,
  textColor = "text-typography-secondary/70",
  ringColor = "ring-typography-secondary/30",
}: Props) {
  return (
    <div className={`flex items-center `}>
      <Menu as="div" className="relative inline-block text-left w-full  ">
        {({ open }) => (
          <>
            {" "}
            {/* Ensure full width of the parent */}
            <div className="w-full">
              <Menu.Button
                className={`${
                  open ? "" : ""
                } group inline-flex  rounded-[8px] ring-1  justify-between text-sm outline-none px-4 py-2  w-full bg-transparent ${textColor} ${ringColor} ${className}`}
              >
                {selectedOption.name}
                <ChevronDownIcon
                  className={`${
                    open ? "" : ""
                  } w-5 mt-0.5 -mr-1.5 duration-200 flex h-full items-center ${textColor} `}
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-full overflow-hidden origin-top-right rounded-[8px] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-surface-dark-secondary  dark:text-white ">
                {" "}
                {/* Make dropdown full width */}
                <div className="">
                  {options.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedOption(option)}
                          className={classNames(
                            option.name === selectedOption.name
                              ? "font-medium text-typography-secondary/70"
                              : "text-typography-secondary/70  ",
                            active
                              ? "cursor-pointer hover:bg-light-secondary duration-300"
                              : "bg-transparent",
                            "block w-full text-left px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
