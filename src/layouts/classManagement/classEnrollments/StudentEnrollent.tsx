import { useMutation, useQuery } from "@tanstack/react-query";
import SearchOptionSelect from "../../../components/searchOptionSelect/SearchOptionSelect";
import { getClassList } from "../../../services/classes";
import { useState } from "react";
import { Option } from "../../../types/common";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { enorollStudents } from "../../../services/enrollment";
import Button from "../../../components/button/Button";
type StudentEnrollentProps = {
  selectedIds: (string | number)[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};
const studentEnrollSchema = z.object({
  classId: z.string().min(1, "Class is required"),
});
export default function StudentEnrollent({
  selectedIds,
  setOpenModal,
  refetch,
}: StudentEnrollentProps) {
  const [selectedClass, setSelectedClass] = useState<Option | undefined>();
  const { data, isLoading } = useQuery({
    queryKey: ["classesList"],
    queryFn: getClassList,
  });

  const mutation = useMutation({
    mutationFn: enorollStudents,
    onSuccess: () => {
      toast.success("Students enrolled successfully");
      refetch();
      setTimeout(() => setOpenModal(false), 0); // Ensure modal closes after mutation completes
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(studentEnrollSchema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      classId: data.classId,
      studentIds: selectedIds as number[],
    });
  };

  const handleClassSelect = (option: Option) => {
    setSelectedClass(option);
    setValue("classId", option.id);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <h2 className="text-xl text-typography-secondary">Enroll Students</h2>
        <p className="text-sm text-typography-secondary/50">
          Select a class for the selected students to enroll.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-typography-secondary">Selected Students:</p>
        <div className="flex flex-wrap gap-2">
          {selectedIds.map((id) => (
            <span
              key={id}
              className="px-2 py-1 text-xs font-semibold rounded bg-blue-200 text-blue-800"
            >
              {id}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <SearchOptionSelect
          handleSelected={handleClassSelect}
          options={data ?? []}
          selected={selectedClass}
          setSelected={setSelectedClass}
          placeholder="Select the Tutor"
          error={errors.classId?.message}
          isLoading={isLoading}
          label="Class Name"
        />
        <div className="flex justify-end mt-4 gap-5">
          <Button colour="light" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button colour="primary" type="submit" loading={mutation.isPending}>
            Enroll Students
          </Button>
        </div>
      </div>
    </form>
  );
}
