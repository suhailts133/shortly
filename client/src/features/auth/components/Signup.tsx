import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../shared/components/form/InputField";
import SubmitButton from "../../../shared/components/form/SubmitButton";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, type SignupFormType } from "../schemas/signupSchema";
import { useSignUp } from "../hooks/useSignup";
export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    });
    const { handleSignUp, isLoading } = useSignUp()
    const navigate = useNavigate();



    const onSubmit = async (data: SignupFormType) => {
        const result = await handleSignUp({
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        })
        if (result.success) {
            navigate("/auth/verify-otp", { state: { where: "signup", email: data.email } })
        }
    }


    return (
        <div className="max-w-md w-full bg-surface backdrop-blur-2xl border border-surface-border rounded-xl p-8">
            <h2 className="text-4xl font-semibold text-accent mb-2 text-center font-Dynalight-Regular tracking-tight">
                Blogs
            </h2>
            <p className="text-center text-base font-Jost-Semibold text-text-muted mb-8 tracking-wide">
                Create Account
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <InputField
                    label="Name"
                    type="name"
                    placeholder="your name"
                    registration={register("name")}
                    error={errors.name?.message}
                />
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
                <InputField
                    label="Confirm Password"
                    placeholder="********"
                    showPasswordToggle={true}
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <SubmitButton
                    isLoading={isLoading}
                    label="Sign Up"
                    loadingLabel="Sending OTP..."
                    type="submit"
                />
            </form>




            <div className="mt-6 text-center text-sm text-text-muted">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="text-accent font-Jost-Semibold hover:underline"
                >
                    login
                </Link>
            </div>
        </div>
    );
}
