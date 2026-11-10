import { useAuthService } from "../api/authService";
import type { SignupFormType } from "../schemas/signupSchema";

export const useSignUp = () => {
  const { signup, isSigningIn } = useAuthService();
  const handleSignUp = async (body: SignupFormType) => await signup(body);
  return {
    handleSignUp,
    isLoading: isSigningIn,
  };
};
