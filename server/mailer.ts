import nodemailer from "nodemailer";
import { ENV } from "./_core/env";
import type { ContactInput } from "./contact";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!ENV.smtp.host || !ENV.smtp.user || !ENV.smtp.pass) {
    throw new Error("SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing)");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: ENV.smtp.host,
      port: ENV.smtp.port,
      secure: ENV.smtp.secure,
      auth: { user: ENV.smtp.user, pass: ENV.smtp.pass },
    });
  }

  return transporter;
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const transport = getTransporter();

  await transport.sendMail({
    from: ENV.smtp.from,
    to: ENV.contactToEmail,
    replyTo: input.email,
    subject: `[Emerald Group Website] ${input.subject || "New enquiry"} — ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject || "(not specified)"}`,
      "",
      input.message,
    ].join("\n"),
  });
}
