import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import InputBox from "../../components/InputBox/InputBox";

import { signUpUser, SignUpData } from "../../services/userService";
import SelectBox from "../../components/selectBox/SelectBox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success("Sign up successful!");
      navigate("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputBox
            id="name"
            label="Name"
            type="text"
            register={register("name")}
            error={errors.name}
          />
          <InputBox
            id="email"
            label="Email"
            type="email"
            register={register("email")}
            error={errors.email}
          />
          <InputBox
            id="password"
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password}
          />
          <div>
            <SelectBox
              id="role"
              label="Role"
              options={[
                { value: "STUDENT", label: "Student" },
                { value: "TEACHER", label: "Teacher" },
                { value: "ADMIN", label: "Admin" },
              ]}
              register={register("role")}
              error={errors.role}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
