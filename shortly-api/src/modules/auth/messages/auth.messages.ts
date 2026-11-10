export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  LOGIN_SUCCESS: 'Logged in successfully',
  ALREADY_EXISTS: 'User already exists',
  REGISTER_SUCCESS: 'OTP sent to your email',
  REGISTER_FAILED: 'Registration failed',
  OTP_FAILED: 'Failed to send OTP',
  OTP_EXPIRED: 'OTP expired, please register again',
  OTP_INCORRECT: 'Incorrect OTP',
  OTP_SUCCESS: 'Account verified',
  OTP_RESEND: 'A new OTP has been sent',
  EXPIRED_TOKEN: 'Refresh token expired',
  NEW_TOKEN_CREATED: 'New access token created',
} as const;