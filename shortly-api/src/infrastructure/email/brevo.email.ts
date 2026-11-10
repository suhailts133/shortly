import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../config/env.config';

interface EmailRecipient {
  email: string;
  name?: string;
}

interface BrevoEmailPayload {
  sender: { name: string; email: string };
  to: EmailRecipient[];
  subject: string;
  textContent: string;
  htmlContent: string;
}

interface BrevoSuccessResponse {
  messageId?: string;
}

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

@Injectable()
export class BrevoEmail {
  private readonly logger = new Logger(BrevoEmail.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async sendVerificationEmail(email: string, otp: string): Promise<boolean> {
    const payload: BrevoEmailPayload = {
      sender: { name: 'Blogs', email: this.config.get('BREVO_SENDER', { infer: true }) },
      to: [{ email }],
      subject: 'Verify Your Account',
      textContent: `Dear User,
Your One-Time Password (OTP) for verifying your account is ${otp}.
Please enter this OTP on the verification page to complete the process. For security reasons, do not share this code with anyone.
If you did not request this email, please ignore it or contact our support team immediately.
Thank you for choosing our services!
Best regards,
Shortly Support Team`,
      htmlContent: `
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for verifying your account is:</p>
        <h2>${otp}</h2>
        <p>Please enter this OTP on the verification page to complete the process. <strong>Do not share this code with anyone</strong>.</p>
        <br>
        <p>Thank you for choosing our services!</p>
        <p>Best regards,</p>
        <p><strong>Shortly Support Team</strong></p>
      `,
    };

    try {
      const res = await fetch(BREVO_URL, {
        method: 'POST',
        headers: {
          'api-key': this.config.get('BREVO_API_KEY', { infer: true }),
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        this.logger.error(`Brevo API error (${res.status}): ${body}`);
        return false;
      }

      const data = (await res.json()) as BrevoSuccessResponse;
      if (!data.messageId) {
        this.logger.error('Brevo responded OK but returned no messageId');
        return false;
      }

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Email service connection failure: ${message}`);
      return false;
    }
  }
}