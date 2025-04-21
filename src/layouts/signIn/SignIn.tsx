import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../../components/InputBox/InputBox";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      toast.success("Sign in successful!");
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
    // Add your sign-in logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-6 bg-white shadow-md rounded-md min-w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
