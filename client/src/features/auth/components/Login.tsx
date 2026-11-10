import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../shared/components/form/InputField";
import SubmitButton from "../../../shared/components/form/SubmitButton";
import { LoginSchema, type LoginFormType } from "../schemas/loginSchema";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "../hooks/useLogin";
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur",
    });
    const { isLogging, handleLogin } = useLogin()
    const navigate = useNavigate();



    const onSubmit = async (data: LoginFormType) => {
        const result = await handleLogin(data);
        if (result.success) {
            navigate("/");
        }
        console.log(data)
    }


    return (
        <div className="max-w-md w-full bg-surface backdrop-blur-2xl border border-surface-border rounded-xl p-8">
            <h2 className="text-4xl font-semibold text-accent mb-2 text-center font-Dynalight-Regular tracking-tight">
                Blogs
            </h2>
            <p className="text-center text-base font-Jost-Semibold text-text-muted mb-8 tracking-wide">
                Welcome back
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <InputField
                    label="Email"
                    type="email"
                    placeholder="you@studio.com"
                    registration={register("email")}
                    error={errors.email?.message}
                />

                <InputField
                    label="Password"
                    placeholder="********"
                    showPasswordToggle={true}
                    registration={register("password")}
                    error={errors.password?.message}
                />
                <SubmitButton
                    isLoading={isLogging}
                    label="Login"
                    loadingLabel="Verifying"
                    type="submit"
                />
            </form>




            <div className="mt-6 text-center text-sm text-text-muted">
                Don't have an account?{" "}
                <Link
                    to="/auth/signup"
                    className="text-accent font-Jost-Semibold hover:underline"
                >
                    signup
                </Link>
            </div>
        </div>
    );
}
