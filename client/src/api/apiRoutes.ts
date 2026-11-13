export const API_ROUTES = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh",
  },
  URL: {
    CREATE: "/url/",
    MY_URLS: "/url/all",

  },
} as const;
