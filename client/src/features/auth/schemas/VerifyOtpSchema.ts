export interface VerifyOTPPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}
