import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { useLoginMutation, useResendOtpMutation, useSignupMutation, useVerifyOtpMutation } from "./userSlice";
import type { LoginFormType } from "../schemas/loginSchema";
import { setCredentials } from "../../../app/authSlice";
import { isApiError, UNKNOWN_ERROR } from "../../../api/responseType";
import type { SignupFormType } from "../schemas/signupSchema";
import type { ResendOtpPayload, VerifyOTPPayload } from "../schemas/VerifyOtpSchema";

export const useAuthService = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loginMutation, { isLoading: isLogging }] = useLoginMutation();
  const [signupMutation, { isLoading: isSigningIn }] = useSignupMutation();
  const [verifyOtpMutaion, { isLoading: isOtpVerifying }] = useVerifyOtpMutation();
  const [resendOtpMutaion, { isLoading: isOtpResending }] = useResendOtpMutation();

  const verifyOtp = async (payload: VerifyOTPPayload) => {
    try {
      const result = await verifyOtpMutaion(payload).unwrap();
      if (!result.data) {
        return { success: false, message: "JWT token not found" };
      }
      dispatch(setCredentials(result.data));
      return result;
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  const resendOtp = async (payload: ResendOtpPayload) => {
    try {
      const result = await resendOtpMutaion(payload).unwrap();
      return result;
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  const login = async (body: LoginFormType) => {
    try {
      const result = await loginMutation(body).unwrap();
      if (!result.data) {
        return { success: false, message: "JWT toekn not found" };
      }
      dispatch(setCredentials(result.data));
      return result;
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  const signup = async (body: SignupFormType) => {
    try {
      const result = await signupMutation(body).unwrap();
      return result;
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  return {
    login,
    isLogging,
    signup,
    isSigningIn,
    verifyOtp,
    isOtpVerifying,
    resendOtp,
    isOtpResending,
  };
};
