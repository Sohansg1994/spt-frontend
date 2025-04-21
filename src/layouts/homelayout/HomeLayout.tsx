import { Outlet, useNavigate } from "react-router";

import SideNav from "../../components/sideNav/SideNav";
import {
  AdjustmentsVerticalIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

import { SideNavItem } from "../../types/sideNav";

const primaryList: SideNavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: SquaresPlusIcon,
    functionId: 1,
    current: false,
  },
];

const mainList: SideNavItem[] = [
  {
    name: "Stock Management",
    path: "stock-management",
    functionId: 5,
    icon: AdjustmentsVerticalIcon,
    current: false,
  },
];
const secondaryList: SideNavItem[] = [
  {
    name: "Settings",
    path: "settings",
    functionId: 9,
    icon: Cog6ToothIcon,
    current: false,
  },
];

export default function HomeLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/sign-up");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col bg-light-background h-screen">
        {/* <TopBar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        <div className="flex flex-grow overflow-hidden">
          <div className="hidden lg:flex"></div>

          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-grow overflow-auto m-2 sm:mx-5 sm:p-5 ">
              <Outlet />
              <div className="pb-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
