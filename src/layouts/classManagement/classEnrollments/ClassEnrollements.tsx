import { useState } from "react";
import Button from "../../../components/button/Button";
import SearchBox from "../../../components/searchBox/SearchBox";
import { ComponentHeaderLayout } from "../../../utils/layout";
import Table from "../../../components/table/Table";
import { Column } from "../../../types/table";
import { Student, StudentClass } from "../../../types/students";
import { getAllStudentsWithClasses } from "../../../services/students";
import { useQuery } from "@tanstack/react-query";
import PopUpModal from "../../../components/popUpModal/PopUpModal";
import StudentEnrollent from "./StudentEnrollent";
import { getClassesSummary } from "../../../services/classes";

export default function ClassEnrollements() {
  // const [open, setOpen] = useState(false);
  const [OpenEnrollmentModal, setOpenEnrollmentModal] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const {
    data: studentData,
    isLoading: isStudentDataLoading,
    refetch: studentDataRefetch,
  } = useQuery({
    queryKey: ["studentsWithClasses"],
    queryFn: getAllStudentsWithClasses,
  });
  const { data: classesSummaryData } = useQuery({
    queryKey: ["classesSummary"],
    queryFn: getClassesSummary,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const columns: Column<Student>[] = [
    { key: "id", title: "Student ID", sortable: false },
    {
      key: "name",
      title: "Student",
      sortable: true,
      render: (_, row) => (
        <div>
          <div className="font-semibold">{row.name}</div>
          <div className="text-xs text-gray-500">{row.registrationNumber}</div>
        </div>
      ),
    },
    { key: "email", title: "Email", sortable: true },
    {
      key: "classes",
      title: "Classes",
      sortable: false,
      render: (classes: StudentClass[]) =>
        classes.length > 0 ? (
          <span className="flex flex-wrap gap-1">
            {classes.map((cl) => (
              <span
                key={cl.classId}
                className="px-2 py-1 text-xs font-semibold rounded bg-blue-200 text-blue-800"
              >
                {cl.name}
              </span>
            ))}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Not Assigned Yet</span>
        ),
    },
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
            onClick={() => setOpenEnrollmentModal(true)}
          >
            Enroll Students
          </Button>,
        ]}
      >
        <div className="w-[550px] py-2">
          <SearchBox />
        </div>
      </ComponentHeaderLayout>

      <div className="w-full flex ">
        <div className="w-3/5 p-3 border-r-2 border-light-base">
          <Table
            columns={columns}
            data={studentData ?? []}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            rowKey="id"
            loading={isStudentDataLoading}
            enableRowSelection={true}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
        <div className="w-2/5 p-3">
          <div className="flex flex-col gap-2">
            {classesSummaryData?.map((cl) => (
              <div
                key={cl.id}
                className="p-3 bg-light-base rounded-md shadow-sm flex w- full justify-between"
              >
                <div>
                  <h1 className="text-sm font-semibold">{cl.name}</h1>
                  <p className="text-xs text-gray-500">{cl.teacherName}</p>
                </div>
                <div>{cl.totalEnrolled}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PopUpModal
        open={OpenEnrollmentModal}
        onClose={() => setOpenEnrollmentModal(false)}
      >
        <StudentEnrollent
          setOpenModal={setOpenEnrollmentModal}
          selectedIds={selectedIds}
          refetch={studentDataRefetch}
        />
      </PopUpModal>
    </div>
  );
}
