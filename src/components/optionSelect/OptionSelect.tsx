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
  className?: string; // Add className prop
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export default function OptionSelect({
  options,
  selectedOption,
  setSelectedOption,
  className,
}: Props) {
  return (
    <div className={`flex items-center ${className}`}>
      <Menu as="div" className="relative inline-block text-left w-full  ">
        {({ open }) => (
          <>
            <div className="w-full">
              <Menu.Button
                className={`${
                  open ? "!ring-primary-500" : ""
                } group inline-flex ring-1 ring-light-base justify-between text-sm font-medium text-gray-700  rounded-[8px] outline-none px-4 py-[10.5px] bg-light-surface`}
              >
                {selectedOption.name}
                <ChevronDownIcon
                  className={`${
                    open ? "" : ""
                  } w-5 mt-0.5 -mr-1.5 duration-200 flex h-full items-center text-typography-secondary`}
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-full overflow-hidden origin-top-right rounded-[8px] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none bg-light-surface ">
                <div className="">
                  {options.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedOption(option)}
                          className={classNames(
                            option.name === selectedOption.name
                              ? " font-medium"
                              : "text-gray-500 ",
                            active ? " duration-300" : "bg-transparent",
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
