import { useLocation } from "react-router-dom";
import RouteTabs from "../../components/routeTabs/RouteTabs";
import { Tab } from "../../types/tab";
import Assignments from "./assignments/Assignments";

const tabs: Record<string, Tab> = {
  "/assignment-management": {
    name: "Assignments",
    component: <Assignments />,
  },
};
export default function AssignmentManagement() {
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
