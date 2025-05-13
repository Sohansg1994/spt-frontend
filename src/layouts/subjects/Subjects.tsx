import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import Table from "../../components/table/Table";
import { Column, SortConfig } from "../../types/table";
import Button from "../../components/button/Button";
import { ComponentHeaderLayout } from "../../utils/layout";
import SearchBox from "../../components/searchBox/SearchBox";

import { Subject } from "../../types/subject";
import { getAllSubjects } from "../../services/subjects";
import PopUpModal from "../../components/popUpModal/PopUpModal";
import CreateSubject from "./CreateSubject";
export default function Subjects() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjects,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig<Subject>>({
    key: null,
    direction: null,
  });
  const columns: Column<Subject>[] = [
    { key: "id", title: "Subject ID", sortable: false },
    { key: "name", title: "Subject Name", sortable: true },
  ];
  return (
    <div className="bg-white p-5 ring-1 rounded-md ring-gray-100">
      <ComponentHeaderLayout
        title="Subjects"
        actions={[
          <Button
            key="create"
            colour="primary"
            className="rounded-[5px]"
            fullWidth
            onClick={() => setOpen(true)}
          >
            Create Subject
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
        <CreateSubject
          refetchSubjects={refetch}
          onClose={() => setOpen(false)}
        />
      </PopUpModal>
    </div>
  );
}
