import { useState } from "react";
import { useAuthService } from "../api/authService";
import type { ResendOtpPayload } from "../schemas/VerifyOtpSchema";

export const useResendOtp = () => {
    const { resendOtp, isOtpResending } = useAuthService();
    const [resendOTPError, setResendOTPError] = useState<string | null>(null);
    const [resendOtpSuccessMessage, setResendOtpSuccessMessage] = useState<string | null>(null);

    const handleResendOtp = async (data: ResendOtpPayload) => {
        setResendOTPError("")
        setResendOtpSuccessMessage("")
        const result = await resendOtp(data);
        if (result.success) {
            setResendOtpSuccessMessage(result.message as string)
            setTimeout(() => {
                setResendOtpSuccessMessage(null);
            }, 3000);
        } else {
            setResendOTPError(result.message as string)
            setTimeout(() => {
                setResendOTPError(null);
            }, 3000);
        }
    }

    return {
        handleResendOtp,
        isResendOtpLoading: isOtpResending,
        resendOTPError,
        resendOtpSuccessMessage
    }

}