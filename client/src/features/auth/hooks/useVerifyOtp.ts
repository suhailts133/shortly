import { useState } from "react";
import { useAuthService } from "../api/authService";
import type { VerifyOTPPayload } from "../schemas/VerifyOtpSchema";

export const useVerifyOtp = () => {
  const { verifyOtp, isOtpVerifying } = useAuthService();
  const [error, setError] = useState<string>("");
  const handleVerification = async (data: VerifyOTPPayload) => {
    setError("");
    const result = await verifyOtp(data);
    if (!result.success) {
      setError(result.message as string);
    }
    return result;
  };

  return {
    handleVerification,
    error,
    isOtpVerifying,
  };
};
