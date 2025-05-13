import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../../components/InputBox/InputBox";
import { useMutation } from "@tanstack/react-query";
import { createTeacher } from "../../services/teachers";
import toast from "react-hot-toast";
import Button from "../../components/button/Button";

// Validation schema using zod
const createTeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type CreateTeacherProps = {
  onClose: () => void;
  refetchTeachers: () => void;
};
export default function CreateTeacher({
  onClose,
  refetchTeachers,
}: CreateTeacherProps) {
  const mutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success("Teacher created successfully");
      refetchTeachers();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTeacherSchema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <h2 className="mb-5">Create Teacher</h2>
      <div className="grid grid-cols-1 gap-3">
        {" "}
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
          Create Teacher
        </Button>
      </div>
    </form>
  );
}
