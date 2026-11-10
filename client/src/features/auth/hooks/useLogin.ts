import { useAuthService } from "../api/authService";
import type { LoginFormType } from "../schemas/loginSchema";

export const useLogin = () => {
  const { login, isLogging } = useAuthService();
  const handleLogin = async (body: LoginFormType) => await login(body);
  return {
    handleLogin,
    isLogging,
  };
};
