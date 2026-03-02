import nodemailer from "nodemailer";

const smtpHost = process.env.DTC_SMTP_HOST;
const smtpPort = Number(process.env.DTC_SMTP_PORT || 587);
const smtpUser = process.env.DTC_SMTP_USER;
const smtpPass = process.env.DTC_SMTP_PASS;
const smtpSecure = String(process.env.DTC_SMTP_SECURE || "false") === "true";

const hasSmtpConfig = Boolean(smtpHost && smtpUser && smtpPass);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })
  : null;

export async function sendMail({
  to,
  subject,
  text,
  replyTo,
  attachments
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}) {
  if (!transporter || !smtpUser) {
    console.info("[DTC] SMTP not configured. Skipping email send.", {
      to,
      subject,
      text,
      attachments: attachments?.map((item) => item.filename) || []
    });
    return;
  }

  await transporter.sendMail({
    from: smtpUser,
    to,
    subject,
    text,
    replyTo,
    attachments
  });
}
