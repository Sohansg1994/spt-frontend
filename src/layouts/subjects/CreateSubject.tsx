import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../../components/InputBox/InputBox";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/button/Button";
import { createSubject } from "../../services/subjects";

const createSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type CreateSubjectProps = {
  onClose: () => void;
  refetchSubjects: () => void;
};
export default function CreateSubject({
  onClose,
  refetchSubjects,
}: CreateSubjectProps) {
  const mutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      toast.success("Subject created successfully");
      refetchSubjects();
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
    resolver: zodResolver(createSubjectSchema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <h2 className="mb-5">Create Subject</h2>
      <div className="grid grid-cols-1 gap-3">
        <InputBox
          placeholder="Enter subject name"
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />
      </div>

      <div className="flex justify-end mt-4 gap-5">
        <Button colour="light" onClick={onClose}>
          Cancel
        </Button>
        <Button colour="primary" type="submit" loading={mutation.isPending}>
          Create Subject
        </Button>
      </div>
    </form>
  );
}
