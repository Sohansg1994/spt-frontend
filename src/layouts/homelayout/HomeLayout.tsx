import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";
import SideNav from "../../components/sideNav/SideNav";
import {
  AcademicCapIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  Square2StackIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

import { SideNavItem } from "../../types/sideNav";
import TopBar from "../../components/topBar/TopBar";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../services/userService";

const mainList: SideNavItem[] = [
  {
    name: "Students Management",
    path: "students-management",
    functionId: 5,
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Class Management",
    path: "class-management",
    functionId: 5,
    icon: Square2StackIcon,
    current: false,
  },
  {
    name: "Teachers Management",
    path: "teachers-management",
    functionId: 5,
    icon: AcademicCapIcon,
    current: false,
  },
  {
    name: "Subjects",
    path: "subjects",
    functionId: 5,
    icon: BookOpenIcon,
    current: false,
  },
  {
    name: "Assignment Management",
    path: "assignment-management",
    functionId: 5,
    icon: DocumentDuplicateIcon,
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
    const accessToken = Cookies.get("access_token"); // ✅ read cookie using js-cookie
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
  });
  console.log("data", data);
  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <>
      <div className="flex flex-col bg-gray-50 h-screen">
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-grow overflow-hidden">
          <div className="">
            <SideNav mainList={mainList} secondaryList={secondaryList} />
          </div>

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
