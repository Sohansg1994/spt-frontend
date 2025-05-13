import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "../../services/students";
import { Student } from "../../types/students";
import { useState } from "react";
import Table from "../../components/table/Table";
import { Column } from "../../types/table";
import Button from "../../components/button/Button";
import { ComponentHeaderLayout } from "../../utils/layout";
import SearchBox from "../../components/searchBox/SearchBox";
import PopUpModal from "../../components/popUpModal/PopUpModal";
import CreateStudent from "./CreateStudent";

export default function StudentManagement() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const columns: Column<Student>[] = [
    { key: "id", title: "Student ID", sortable: false },
    { key: "name", title: "Student Name", sortable: true },
    { key: "registrationNumber", title: "Registation Number", sortable: true },
    { key: "email", title: "Email", sortable: true },
    { key: "gradeLevel", title: "Grade Level", sortable: true },
  ];
  return (
    <div className="bg-white p-5 ring-1 rounded-md ring-gray-100">
      <ComponentHeaderLayout
        title="Student Management"
        actions={[
          <Button
            key="create"
            colour="primary"
            className="rounded-[5px]"
            fullWidth
            onClick={() => setOpen(true)}
          >
            Create Student
          </Button>,
        ]}
      >
        <div className="w-[550px] py-2">
          <SearchBox />
        </div>
        {/* <div className="flex gap-2 py-2 flex-wrap">
            <div className="w-32">
              <SelectStatus
                options={stockStatuses}
                selectedOption={stockStatus}
                setSelectedOption={setStockStatus}
                ringColor=" ring-typography-primary"
                textColor="text-typography-primary"
              />
            </div>
          </div> */}
      </ComponentHeaderLayout>
      <Table
        columns={columns}
        data={data ?? []}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        rowKey="id"
        loading={isLoading}
      />
      <PopUpModal open={open} onClose={() => setOpen(false)}>
        <CreateStudent
          refetchStudents={refetch}
          onClose={() => setOpen(false)}
        />
      </PopUpModal>
    </div>
  );
}
