import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import Table from "../../../components/table/Table";
import { Column } from "../../../types/table";
import Button from "../../../components/button/Button";
import { ComponentHeaderLayout } from "../../../utils/layout";
import SearchBox from "../../../components/searchBox/SearchBox";

import { Class } from "../../../types/class";
import { getAllClasss } from "../../../services/classes";
import PopUpModal from "../../../components/popUpModal/PopUpModal";
import CreateClass from "../CreateClass";

export default function Classes() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClasss,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Class | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const columns: Column<Class>[] = [
    { key: "id", title: "User ID", sortable: false },
    { key: "name", title: "Student Name", sortable: true },
    { key: "subjectName", title: "Subject Name", sortable: true },
    { key: "batchYear", title: "Batch Year", sortable: true },
    { key: "teacherName", title: "Teacher Name", sortable: true },
  ];
  return (
    <div className="bg-white p-5 ring-1 rounded-md ring-gray-100">
      <ComponentHeaderLayout
        title="Class Management"
        actions={[
          <Button
            key="create"
            colour="primary"
            className="rounded-[5px]"
            fullWidth
            onClick={() => setOpen(true)}
          >
            Create Class
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
        <CreateClass refetchClasses={refetch} onClose={() => setOpen(false)} />
      </PopUpModal>
    </div>
  );
}
