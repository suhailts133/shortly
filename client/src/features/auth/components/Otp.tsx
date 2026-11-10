import React, { useEffect, useRef, useState } from "react";
import ResendOtpSection from "./ResendOtpSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useResendOtp } from "../hooks/useResendOtp";

export default function Otp() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const [validationError, setValidationError] = useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const { handleVerification, error: verifyError, isOtpVerifying } = useVerifyOtp();
    const { handleResendOtp, resendOTPError, resendOtpSuccessMessage, isResendOtpLoading } = useResendOtp();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        setValidationError("");

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        if (otp.some((d) => d === "")) {
            setValidationError("Please enter all 6 digits.");
            return;
        }
        setValidationError("");

        const result = await handleVerification({ email, otp: otp.join("") });
        if (result.success) {
            navigate("/", { state: { where: "signUpOtpVerification" } });
        }
    };

    const handleResend = async () => {
        if (isResendOtpLoading) return;
        await handleResendOtp({ email });
    };

    return (
        <div className="w-fit bg-surface backdrop-blur-2xl border border-surface-border rounded-xl p-8">
            <h2 className="text-4xl font-semibold text-accent mb-3 text-center font-Dynalight-Regular">
                Blogs
            </h2>

            <p className="text-center text-sm text-text-muted mb-6">
                Enter the 6-digit code sent to your email
            </p>

            {/* OTP inputs */}
            <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        aria-label={`OTP digit ${index + 1}`}
                        className="
                            w-12 h-14 text-center text-xl font-semibold text-text-primary
                            border border-surface-border rounded-lg bg-surface-hover
                            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                            hover:border-accent-hover
                            transition-all duration-300"
                    />
                ))}
            </div>

            {/* Error / success messages */}
            {validationError && <p className="text-center text-sm text-error mb-4 -mt-2">{validationError}</p>}
            {verifyError && <p className="text-center text-sm text-error mb-4 -mt-2">{verifyError}</p>}
            {resendOTPError && <p className="text-center text-sm text-error mb-4 -mt-2">{resendOTPError}</p>}
            {resendOtpSuccessMessage && <p className="text-center text-sm text-success mb-4 -mt-2">{resendOtpSuccessMessage}</p>}

            {/* Submit button */}
            <div className="flex justify-center">
                {!isOtpVerifying ? (
                    <button type="button" className="auth-button" onClick={handleSubmit}>
                        Verify OTP
                    </button>
                ) : (
                    <button type="button" disabled className="auth-disabled-button flex items-center justify-center gap-2">
                        <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying otp
                    </button>
                )}
            </div>

            <ResendOtpSection onResend={handleResend} isLoading={isResendOtpLoading} />
        </div>
    );
}