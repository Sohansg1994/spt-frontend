import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../../components/InputBox/InputBox";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import Button from "../../components/button/Button";
import SearchOptionSelect from "../../components/searchOptionSelect/SearchOptionSelect";
import { useState } from "react";
import { Option } from "../../types/common";
import { getTeacherList } from "../../services/teachers";
import { createClass } from "../../services/classes";
import { getSubjectList } from "../../services/subjects";

// Validation schema using zod
const createClassSchema = z.object({
  name: z.string().min(1, "Name is required"),
  teacherId: z.number().int("Teacher ID must be an integer"),
  subjectId: z.number().int("Subject ID must be an integer"),
  batchYear: z.number().int("Batch year must be an integer"),
  type: z.string().min(1, "Type is required"),
});

type CreateClassProps = {
  onClose: () => void;
  refetchClasses: () => void;
};

const classTypes: Option[] = [
  { id: "THEORY", name: "Theory" },
  { id: "REVISION", name: "Revision" },
  { id: "PRIMARY", name: "Primary" },
  { id: "PRACTICAL", name: "Practical" },
  { id: "NONE_OF_ABOVE", name: "None of the Above" },
];
export default function CreateClass({
  onClose,
  refetchClasses,
}: CreateClassProps) {
  const [selectedClassType, setSelectedClassType] = useState<
    Option | undefined
  >();
  const [selectedTutor, setSelectedTutor] = useState<Option | undefined>();
  const [selectedSubject, setSelectedSubject] = useState<Option | undefined>();
  const [selectedBatch, setSelectedBatch] = useState<Option | undefined>();
  const { data: teachersData, isLoading: isTeachersLoading } = useQuery({
    queryKey: ["teachersList"],
    queryFn: getTeacherList,
  });
  const { data: subjectData, isLoading: isSubjectLoading } = useQuery({
    queryKey: ["subjectsList"],
    queryFn: getSubjectList,
  });
  const mutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      toast.success("Class created successfully");
      refetchClasses();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createClassSchema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  const handleClassTypeSelect = (option: Option) => {
    setValue("type", option.id, { shouldValidate: true });
  };
  const handleTutorSelect = (option: Option) => {
    setValue("teacherId", Number(option.id), { shouldValidate: true });
  };
  const handleSubjectSelect = (option: Option) => {
    setValue("subjectId", Number(option.id), { shouldValidate: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <h2 className="mb-5">Create Class</h2>
      <div className="grid grid-cols-1 gap-3">
        <InputBox
          placeholder="Enter your name"
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <SearchOptionSelect
          handleSelected={handleTutorSelect}
          options={teachersData ?? []}
          selected={selectedTutor}
          setSelected={setSelectedTutor}
          placeholder="Select the Tutor"
          error={errors.teacherId?.message}
          isLoading={isTeachersLoading}
          label="Tutor Name"
        />
        <SearchOptionSelect
          handleSelected={handleSubjectSelect}
          options={subjectData ?? []}
          selected={selectedSubject}
          setSelected={setSelectedSubject}
          placeholder="Select the Subject"
          error={errors.subjectId?.message}
          isLoading={isSubjectLoading}
          label="Subject Name"
        />
        <SearchOptionSelect
          handleSelected={handleClassTypeSelect}
          options={classTypes}
          selected={selectedClassType}
          setSelected={setSelectedClassType}
          placeholder="Select the Class Type"
          error={errors.type?.message}
          isLoading={false}
          label="Class Type"
        />
        <SearchOptionSelect
          handleSelected={(option) =>
            setValue("batchYear", Number(option.id), { shouldValidate: true })
          }
          options={Array.from({ length: 13 }, (_, i) => ({
            id: (new Date().getFullYear() - 2 + i).toString(),
            name: (new Date().getFullYear() - 2 + i).toString(),
          }))}
          selected={selectedBatch}
          setSelected={setSelectedBatch}
          placeholder="Select the Batch Year"
          error={errors.batchYear?.message}
          isLoading={false}
          label="Batch Year"
        />
      </div>

      <div className="flex justify-end mt-4 gap-5">
        <Button colour="light" onClick={onClose}>
          Cancel
        </Button>
        <Button colour="primary" type="submit" loading={mutation.isPending}>
          Create Class
        </Button>
      </div>
    </form>
  );
}
