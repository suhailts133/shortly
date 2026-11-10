import { API_ROUTES } from "../../../api/apiRoutes";
import { baseApi } from "../../../api/baseApi";
import type { IApiResponse, JwtResponse } from "../../../api/responseType";
import type { LoginFormType } from "../schemas/loginSchema";
import type { SignupFormType } from "../schemas/signupSchema";
import type { ResendOtpPayload, VerifyOTPPayload } from "../schemas/VerifyOtpSchema";

export const userSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IApiResponse, LoginFormType>({
      query: (body) => ({
        url: API_ROUTES.AUTH.LOGIN,
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation<IApiResponse, SignupFormType>({
      query: (body) => ({
        url: API_ROUTES.AUTH.SIGN_UP,
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<IApiResponse<JwtResponse>, VerifyOTPPayload>({
      query: (body) => ({
        url: API_ROUTES.AUTH.VERIFY_OTP,
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation<IApiResponse, ResendOtpPayload>({
      query: (body) => ({
        url: API_ROUTES.AUTH.RESEND_OTP,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyOtpMutation, useResendOtpMutation } = userSlice;
