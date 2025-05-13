import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../../components/InputBox/InputBox";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/button/Button";
import SearchOptionSelect from "../../components/searchOptionSelect/SearchOptionSelect";
import { useState } from "react";
import { Option } from "../../types/common";
import { createStudent } from "../../services/students";
// Validation schema using zod
const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gradeLevel: z.string().min(1, "Grade level is required"),
});

type CreateStudentProps = {
  onClose: () => void;
  refetchStudents: () => void;
};

const grades: Option[] = [
  { id: "A/L", name: "A/L" },
  { id: "O/L", name: "O/L" },
  { id: "Grade_6-9", name: "Grade 6-9" },
  { id: "Grade_5", name: "Grade 5" },
  { id: "Grade_1-4", name: "Grade 1-4" },
];
export default function CreateStudent({
  onClose,
  refetchStudents,
}: CreateStudentProps) {
  const [selectedGrade, setSelectedGrade] = useState<Option | undefined>();
  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      toast.success("Student created successfully");
      refetchStudents();
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
    resolver: zodResolver(createStudentSchema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  const handleGradeSelect = (option: Option) => {
    setValue("gradeLevel", option.id, { shouldValidate: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <h2 className="mb-5">Create Student</h2>
      <div className="grid grid-cols-1 gap-3">
        <InputBox
          placeholder="Enter your name"
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <InputBox
          placeholder="Enter your email"
          label="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <SearchOptionSelect
          handleSelected={handleGradeSelect}
          options={grades}
          selected={selectedGrade}
          setSelected={setSelectedGrade}
          placeholder="Select Grade Level"
          error={errors.gradeLevel?.message}
        />
        <InputBox
          placeholder="Enter your password"
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
      </div>

      <div className="flex justify-end mt-4 gap-5">
        <Button colour="light" onClick={onClose}>
          Cancel
        </Button>
        <Button colour="primary" type="submit" loading={mutation.isPending}>
          Create Student
        </Button>
      </div>
    </form>
  );
}
