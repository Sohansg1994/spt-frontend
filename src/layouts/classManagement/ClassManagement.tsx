import { Tab } from "../../types/tab";
import { useLocation } from "react-router-dom";
import RouteTabs from "../../components/routeTabs/RouteTabs";
import Classes from "./classes/Classes";
import ClassEnrollements from "./classEnrollments/ClassEnrollements";

const tabs: Record<string, Tab> = {
  "/class-management": {
    name: "Classes",
    component: <Classes />,
  },
  "/class-management/enrollments": {
    name: "Enrollments",
    component: <ClassEnrollements />,
  },
};
export default function ClassManagement() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-surface rounded-2xl ring-1 ring-gray-100 p-5">
        <RouteTabs tabs={tabs} itemGap="gap-5" />
      </div>
      <div>{tabs[location.pathname].component}</div>
    </div>
  );
}
