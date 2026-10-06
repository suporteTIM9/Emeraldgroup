export const ENV = {
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT || "3000"),
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
    from: process.env.SMTP_FROM ?? "Emerald Group Website <no-reply@emeraldgroup-inc.com>",
  },
  contactToEmail: process.env.CONTACT_TO_EMAIL ?? "info@emeraldgroup-inc.com",
};

if (ENV.isProduction && (!ENV.smtp.host || !ENV.smtp.user || !ENV.smtp.pass)) {
  console.warn(
    "[ENV] SMTP is not fully configured (SMTP_HOST/SMTP_USER/SMTP_PASS) — the contact form will fail to send email."
  );
}
