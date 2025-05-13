import { useEffect, useState } from "react";
import { getClassList } from "../../../services/classes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Option } from "../../../types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import InputBox from "../../../components/InputBox/InputBox";
import SearchOptionSelect from "../../../components/searchOptionSelect/SearchOptionSelect";
import Button from "../../../components/button/Button";
import { createAssignment } from "../../../services/assignments";
import toast from "react-hot-toast";

type CreateAssignmentProps = {
  onClose: () => void;
  refetch: () => void;
  classId?: string | number;
};

const createAssignmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  classId: z.string().min(1, "Class is required"),
  date: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    })
    .transform((value) => new Date(value).toISOString()),
});

export default function CreateAssignment({
  onClose,
  refetch,
  classId,
}: CreateAssignmentProps) {
  const [selectedClass, setSelectedClass] = useState<Option | undefined>();

  const { data: classList, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: getClassList,
  });

  const mutation = useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      toast.success("Assignment created successfully");
      refetch();
      setTimeout(() => {
        onClose();
      }, 500); // Delay of 500ms before closing the modal
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
    resolver: zodResolver(createAssignmentSchema),
  });

  useEffect(() => {
    if (classId && classList) {
      const initialClass = classList.find((cls: Option) => cls.id === classId);
      if (initialClass) {
        setSelectedClass(initialClass);
        setValue("classId", initialClass.id, { shouldValidate: true });
      }
    }
  }, [classId, classList, setValue]);

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const handleClassSelect = (option: Option) => {
    setValue("classId", option.id, { shouldValidate: true });
    setSelectedClass(option);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <h2 className="mb-5">Create Class</h2>
      <div className="grid grid-cols-1 gap-3">
        <InputBox
          placeholder="Enter assignment name"
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <SearchOptionSelect
          handleSelected={handleClassSelect}
          options={classList ?? []}
          selected={selectedClass}
          setSelected={setSelectedClass}
          placeholder="Select the Class"
          error={errors.classId?.message}
          isLoading={isClassesLoading}
          label="Select Class"
        />

        <div>
          <label
            htmlFor="date"
            className="block text-sm  text-typography-secondary mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className={`text-sm placeholder:text-typography-dark/70 placeholder:text-sm appearance-none  ring-typography-secondary/30 block w-full rounded-[8px] py-2.5 pr-10 pl-3  text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-surface ${
              errors.date ? "border-red-500" : ""
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-5">
        <Button colour="light" onClick={onClose}>
          Cancel
        </Button>
        <Button colour="primary" type="submit" loading={mutation.isPending}>
          Create Assignment
        </Button>
      </div>
    </form>
  );
}
