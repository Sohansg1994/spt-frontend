import { useQuery } from "@tanstack/react-query";
import { getAllAssignments } from "../../../services/assignments";
import { Assignment } from "../../../types/assignment";
import { Column } from "../../../types/table";
import { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { ComponentHeaderLayout } from "../../../utils/layout";
import SearchBox from "../../../components/searchBox/SearchBox";

import { Option } from "../../../types/common";
import SearchOptionSelect from "../../../components/searchOptionSelect/SearchOptionSelect";
import { getClassList } from "../../../services/classes";
import Button from "../../../components/button/Button";
import PopUpModal from "../../../components/popUpModal/PopUpModal";
import CreateAssignment from "./CreateAssignment";

export default function Assignments() {
  const [selectedClass, setSelectedClass] = useState<Option>();
  const [openModal, setOpenModal] = useState(false);
  const {
    data: classList,
    isLoading: isClassesLoading,
    isSuccess: isClassesSuccess,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: getClassList,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assignments", selectedClass?.id],
    queryFn: getAllAssignments,
    enabled: !!selectedClass,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Assignment | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const columns: Column<Assignment>[] = [
    { key: "id", title: "Assignment ID", sortable: false },
    { key: "name", title: "Assignment Name", sortable: true },
    { key: "date", title: "Date", sortable: true },
  ];
  useEffect(() => {
    if (isClassesSuccess && classList?.length > 0) {
      setSelectedClass(classList[0]);
    }
  }, [isClassesSuccess]);
  return (
    <div className="bg-white p-5 ring-1 rounded-md ring-gray-100">
      <ComponentHeaderLayout
        title="Assignment Management"
        actions={[
          <Button
            key="create"
            colour="primary"
            className="rounded-[5px]"
            fullWidth
            onClick={() => setOpenModal(true)}
          >
            Create Assignment
          </Button>,
        ]}
      >
        <div className="w-[550px] py-2">
          <SearchBox />
        </div>
        <div className="flex gap-2 py-2 flex-wrap">
          <div className="w-64">
            <SearchOptionSelect
              options={classList ?? []}
              isLoading={isClassesLoading}
              selected={selectedClass}
              setSelected={setSelectedClass}
            />
          </div>
        </div>
      </ComponentHeaderLayout>
      <Table
        columns={columns}
        data={data ?? []}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        rowKey="id"
        loading={isLoading}
      />
      <PopUpModal open={openModal} onClose={() => setOpenModal(false)}>
        <CreateAssignment
          classId={selectedClass?.id}
          onClose={() => setOpenModal(false)}
          refetch={refetch}
        />
      </PopUpModal>
    </div>
  );
}
