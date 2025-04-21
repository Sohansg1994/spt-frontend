import { useState } from "react";
import { classNames } from "../../utils/classnames";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import SideNavHeader from "./SideNavHeader";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSignOut } from "../../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { SideNavItem } from "../../types/sideNav";
import { FunctionPermissions } from "../../types/staff";
import { Square3Stack3DIcon } from "@heroicons/react/20/solid";

type Props = {
  primaryList: SideNavItem[];
  mainList: SideNavItem[];
  secondaryList: SideNavItem[];
};

export default function SideNav({
  mainList,
  secondaryList,
  primaryList,
}: Props) {
  const { userData } = useUserStore((state) => state);
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(true); // State for Inventory Management toggle
  const maxWidth = "w-[240px]";
  const minWidth = "w-14";

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div
      className={classNames(
        isOpen
          ? `transition-all duration-200 ${maxWidth}`
          : `transition-all duration-200 ${minWidth}`,
        "z-10 shadow-md bg-light-surface flex flex-col relative border-t-2 h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
      )}
    >
      <div>
        {/* Main Menu Header */}
        <div
          className={`flex items-center pt-3 ${
            isOpen ? "px-5 justify-between" : "px-2.5 justify-end"
          }`}
        >
          {isOpen && (
            <div className="text-typography-secondary-dark/50 text-xs font-semibold">
              Main Menu
            </div>
          )}
          <div
            className="w-6 h-6 flex items-center justify-center bg-light-primary text-typography-primary-light group cursor-pointer rounded-full duration-300 hover:bg-primary-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRightIcon
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Primary List */}
        <div className="mt-3">
          <ul>
            {primaryList?.map((item, index) => {
              const permission = userData.permissions.find(
                (perm: FunctionPermissions) =>
                  perm.functionId === item.functionId
              );

              return (
                <li
                  key={`${index}-${item.name}`}
                  className={`${
                    isOpen
                      ? "transition-all duration-300 px-2"
                      : "flex justify-center"
                  } hover:text-primary hover:bg-surface-light-primary ${
                    isOpen ? maxWidth : minWidth
                  }`}
                >
                  <SideNavHeader
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    path={item.path}
                    label={item.name}
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    icon={<item.icon />}
                    isDisabled={!permission?.grant_view}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Inventory Management Header with Expand/Collapse */}
        <div className="">
          <div
            className="flex items-center justify-between cursor-pointer px-5 py-2.5"
            onClick={() => setIsInventoryOpen(!isInventoryOpen)}
          >
            {isOpen && (
              <div className="text-typography-secondary-dark/50 text-xs font-semibold">
                Inventory Management
              </div>
            )}
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-300 ${
                isInventoryOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isInventoryOpen && (
            <ul>
              {mainList?.map((item, index) => {
                const permission = userData.permissions.find(
                  (perm: FunctionPermissions) =>
                    perm.functionId === item.functionId
                );

                return (
                  <li
                    key={`${index}-${item.name}`}
                    className={`${
                      isOpen
                        ? "transition-all duration-300 px-2"
                        : "flex justify-center"
                    } hover:text-primary hover:bg-surface-light-primary ${
                      isOpen ? maxWidth : minWidth
                    }`}
                  >
                    <SideNavHeader
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      path={item.path}
                      label={item.name}
                      maxWidth={maxWidth}
                      minWidth={minWidth}
                      icon={<item.icon />}
                      isDisabled={!permission?.grant_view}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="flex flex-col gap-y-3 mt-2">
        <button className="relative bg-gradient-to-r from-light-primary-light to-light-primary mx-2 p-3 rounded-md text-typography-primary-light text-center overflow-hidden">
          <Square3Stack3DIcon
            className={`absolute bottom-[-12px] right-[-12px] w-10 h-10 `}
          />
          Booking Management
        </button>
        <button className="relative bg-gradient-to-r from-light-primary-light to-light-primary mx-2 p-3 rounded-md text-typography-primary-light text-center overflow-hidden">
          <Square3Stack3DIcon
            className={`absolute bottom-[-12px] right-[-12px] w-10 h-10 `}
          />
          Campaign Management
        </button>
      </div>

      {/* Secondary List & User Info */}
      <div className="mb-[18px] mt-3 border-t-2">
        {isOpen && (
          <div className="text-typography-secondary-dark/50 text-xs font-semibold px-5 py-2.5">
            Other
          </div>
        )}
        <ul>
          {secondaryList?.map((item, index) => (
            <li
              key={`${index}-${item.name}`}
              className={`${
                isOpen
                  ? "transition-all duration-300 px-2"
                  : "flex justify-center"
              } hover:text-primary hover:bg-surface-light-primary ${
                isOpen ? maxWidth : minWidth
              }`}
            >
              <SideNavHeader
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                path={item.path}
                label={item.name}
                maxWidth={maxWidth}
                minWidth={minWidth}
                icon={<item.icon />}
              />
            </li>
          ))}

          {/* User Profile and Sign Out */}
          <li>
            <div
              className={`${"flex justify-between items-start"} ${
                isOpen ? "px-5" : "transition-all duration-500 ml-4"
              }`}
            >
              {isOpen && (
                <div className="flex gap-4 items-start justify-start">
                  <div
                    className="p-1 w-fit rounded-xl mt-1 bg-light-base-dark hover:bg-typography-secondary-dark focus:outline-none focus:ring-2 focus:ring-gray-300 h-fit ring-1 ring-light-background"
                    aria-label="Notifications"
                  >
                    <UserIcon className="h-5 w-5 text-typography-primary-light" />
                  </div>
                  <div className="text-sm text-typography-secondary-dark font-semibold">
                    <div>{userData.name}</div>
                    <div className="text-xs text-typography-secondary/50">
                      {userData?.roles[0]?.name}
                    </div>
                  </div>
                </div>
              )}
              <ArrowRightStartOnRectangleIcon
                className="h-5 w-5 text-typography-primary hover:scale-125 mt-1 cursor-pointer"
                onClick={handleSignOut}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
