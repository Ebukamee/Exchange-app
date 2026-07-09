import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "POWERPAY <onboarding@resend.dev>";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
const LOGO_URL = `https://${DOMAIN}/powerpay-logo.png`;

// Lazy-initialize Resend client to avoid errors during build when API key isn't available
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Branded email template with logo, clean layout, and red accent.
function shell(title, body, cta) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f8;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f0f2f8;padding:40px 16px">
    <tr><td align="center">
      <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(10,14,36,0.06)">

        <!-- Header with logo -->
        <tr>
          <td style="background:#0a0e24;padding:28px 32px;text-align:center">
            <img src="${LOGO_URL}" alt="Powerpay" height="40" style="height:40px;width:auto;display:inline-block" />
          </td>
        </tr>

        <!-- Red accent bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#ef2b3a,#ff4757);height:4px;font-size:0;line-height:0">&nbsp;</td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 20px">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0a0e24;letter-spacing:-0.02em">${title}</h1>
            <p style="margin:0 0 28px;color:#535b83;font-size:15px;line-height:1.7">${body}</p>
            ${cta || ""}
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 32px"><div style="border-top:1px solid #eef0f6"></div></td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px 24px;text-align:center">
            <p style="margin:0 0 8px;color:#a7adcb;font-size:12px;line-height:1.5">
              &copy; ${new Date().getFullYear()} Powerpay. All rights reserved.
            </p>
            <p style="margin:0;color:#c5c9de;font-size:11px">
              Trade smart. Get paid fast.
            </p>
          </td>
        </tr>

      </table>

      <!-- Sub-footer -->
      <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%">
        <tr>
          <td style="padding:20px 32px;text-align:center">
            <p style="margin:0;color:#a7adcb;font-size:11px">
              This email was sent by Powerpay. If you didn&rsquo;t request this, you can safely ignore it.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function button(url, label) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 8px">
  <tr>
    <td style="background:#0a0e24;border-radius:999px">
      <a href="${url}" target="_blank" style="display:inline-block;background:#0a0e24;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:700;font-size:15px;letter-spacing:0.02em">${label}</a>
    </td>
  </tr>
</table>`;
}

export async function sendVerificationEmail(to, url) {
  const resend = getResendClient();
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your Powerpay email",
    html: shell(
      "Verify your email",
      "Welcome to Powerpay! Confirm your email address to activate your account and start trading.",
      button(url, "Verify email")
    ),
  });
}

export async function sendResetEmail(to, url) {
  const resend = getResendClient();
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your Powerpay password",
    html: shell(
      "Reset your password",
      "We received a request to reset your password. Click below to choose a new one. If this wasn&rsquo;t you, you can safely ignore this email.",
      button(url, "Reset password")
    ),
  });
}

// Generic transactional notice (e.g. trade approved / rejected).
export async function sendNotice(to, title, message) {
  const resend = getResendClient();
  await resend.emails.send({
    from: FROM,
    to,
    subject: title,
    html: shell(title, message),
  });
}
