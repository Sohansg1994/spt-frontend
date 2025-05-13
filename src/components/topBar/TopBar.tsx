import { useLocation } from "react-router-dom";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";

const displaySection: DisplaySection = {
  "/": "Home",
  "/paymentTransaction": "Payment Transaction",
  "/discounts": "Discounts",
  "/invoices": "Invoices",
  "/reports": "Reports",
  "/withdraw": "Withdraw",
  "/bankAccounts": "Bank Accounts",
  "/settings": "Settings",
  "/projects": "Projects",
  "/activityLog": "Activity Log",
  "/profileSettings": "Profile Settings",
};

/* -------------------------------------------------------------------------- */
/*                                 type                                       */
/* -------------------------------------------------------------------------- */
type DisplaySection = {
  [key: string]: string;
};
type TopBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export default function TopBar({ isOpen, setIsOpen }: TopBarProps) {
  const location = useLocation();

  return (
    <div>
      <div className="pt-3  bg-white w-full flex items-center justify-between  sm:border-b-2 border-gray-100 dark:border-background-dark-secondary ">
        <div className="flex gap-10 items-center ">
          <div className="lg:hidden sm:block ml-2">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Bars3BottomLeftIcon className="w-12 p-3 dark:bg-background-dark-secondary bg-background-light-secondary rounded-full text-typography-light-secondary dark:text-typography-dark-secondary transition-all duration-200" />
            </button>
          </div>
          <div className=" text-typography-light-primary dark:text-typography-dark-primary hidden sm:block text-lg font-bold ml-3">
            {displaySection[location.pathname]}
          </div>
        </div>

        <div className="flex items-center gap-5 mr-5">
          {/* <IconToggle
						isActive={isDarkMode}
						onToggle={() => setIsDarkMode(!isDarkMode)}
						activeIcon={<MoonIcon className="h-5 w-5 text-background-dark-primary" />}
						inactiveIcon={<SunIcon className="h-5 w-5 text-base-3-100" />}
						ariaLabel="Toggle Dark Mode"
						bgClass="dark:bg-background-dark-secondary bg-background-light-secondary"
					/> */}
          <div>
            <div className="dark:bg-background-dark-secondary bg-background-light-secondary relative cursor-pointer p-3 rounded-full">
              <div className="p-1 absolute right-4 bg-primary-500 border border-surface-light-primary dark:border-surface-dark-primary rounded-full" />
              <BellIcon
                strokeWidth={1.7}
                className=" text-typography-light-primary dark:text-typography-dark-primary w-6 h-6"
              />
            </div>
          </div>
          {/* <UserMenu /> */}
        </div>
      </div>
    </div>
  );
}
