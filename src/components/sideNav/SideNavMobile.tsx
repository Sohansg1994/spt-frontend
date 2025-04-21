import { useEffect, useRef } from "react";
import { classNames } from "../../utils/classnames";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SideNavHeader from "./SideNavHeader";
import useUserStore from "../../stores/useUserStore";
import { useSignOut } from "../../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { SideNavItem } from "../../types/sideNav";
import { FunctionPermissions } from "../../types/staff";

/* -------------------------------------------------------------------------- */
/*                                 types                                      */
/* -------------------------------------------------------------------------- */
type Props = {
  mainList: SideNavItem[];
  secondaryList: SideNavItem[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function SideNavMobile({
  mainList,
  setIsOpen,
  isOpen,
  secondaryList,
}: Props) {
  const maxWidth = "w-72";
  const minWidth = "w-0";
  const { userData } = useUserStore((state) => state);
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        className={classNames(
          isOpen ? ` ${maxWidth}` : ` ${minWidth}`,
          "fixed top-0 left-0 h-full overflow-x-hidden duration-300 ease-in-out z-40 bg-white dark:bg-background-dark-secondary shadow-xl"
        )}
        ref={menuRef}
      >
        <section className="">
          <div
            className={classNames(
              isOpen
                ? `transition-all duration-200 ${maxWidth} `
                : `transition-all duration-200  ${minWidth} `,
              "z-10  h-screen shadow-md bg-light-surface  flex flex-col relative border-t-2"
            )}
          >
            <div>
              <div
                className={`flex items-center pt-8 pb-3 ${
                  isOpen ? "px-5 justify-between" : "px-2.5 justify-end"
                }`}
              >
                {isOpen && (
                  <div className="text-typography-secondary-dark/50   text-xs font-semibold">
                    Main Menu
                  </div>
                )}
                <div
                  className="w-6 h-6 flex items-center justify-center bg-light-primary text-typography-primary-light group cursor-pointer rounded-full duration-300 hover:bg-primary-700"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <XMarkIcon
                    className=" w-8 text-white hover:text-primary-light transition-all duration-200  cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
              </div>

              <div className="mt-3 border-b-2  pb-2">
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
                          isDisabled={!permission?.grant_view} // Disable based on grant_view
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="mb-[18px] mt-3 ">
              {isOpen && (
                <div className="text-typography-secondary-dark/50  text-xs font-semibold px-5 py-2.5">
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
                    }  hover:text-primary hover:bg-surface-light-primary ${
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

                <li>
                  <div
                    className={`${"flex justify-between  items-start"} ${isOpen ? "px-5" : "transition-all duration-500 ml-4"}`}
                  >
                    {isOpen && (
                      <div className="flex gap-4 items-start justify-start">
                        <div
                          className="p-1 w-fit rounded-xl mt-1 bg-light-base-dark hover:bg-typography-secondary-dark focus:outline-none focus:ring-2 focus:ring-gray-300 h-fit ring-1 ring-light-background"
                          aria-label="Notifications"
                        >
                          <UserIcon className="h-5 w-5 text-typography-primary-light" />
                        </div>
                        <div className="text-sm text-typography-secondary-dark font-semibold ">
                          <div>{userData.name}</div>
                          <div className="text-xs text-typography-secondary/50">
                            {userData?.roles[0]?.name}
                          </div>
                        </div>
                      </div>
                    )}
                    <ArrowRightStartOnRectangleIcon
                      className="h-5 w-5 text-typography-primary hover:scale-125 mt-1"
                      onClick={handleSignOut}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 "
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
