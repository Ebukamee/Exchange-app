import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "Paycryppt <onboarding@resend.dev>";

// Lazy-initialize Resend client to avoid errors during build when API key isn't available
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Branded email shell (red accent, matches the app).
function shell(title, body, cta) {
  return `
  <div style="background:#f5f6fb;padding:32px 0;font-family:'Plus Jakarta Sans',Arial,sans-serif">
    <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e7e9f2">
      <div style="background:#0a0e24;padding:22px 28px">
        <span style="color:#fff;font-weight:800;letter-spacing:.12em;font-size:18px">PAY<span style="color:#ef2b3a">CRYPPT</span></span>
      </div>
      <div style="padding:32px 28px;color:#111634">
        <h1 style="margin:0 0 12px;font-size:22px">${title}</h1>
        <p style="margin:0 0 24px;color:#535b83;font-size:15px;line-height:1.6">${body}</p>
        ${cta || ""}
      </div>
      <div style="padding:18px 28px;border-top:1px solid #e7e9f2;color:#a7adcb;font-size:12px">
        © ${new Date().getFullYear()} Paycryptt. Trade smart. Get paid fast.
      </div>
    </div>
  </div>`;
}

function button(url, label) {
  return `<a href="${url}" style="display:inline-block;background:#0a0e24;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:700;font-size:15px">${label}</a>`;
}

export async function sendVerificationEmail(to, url) {
  const resend = getResendClient();
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your Paycryptt email",
    html: shell(
      "Verify your email",
      "Welcome to Paycryptt! Confirm your email address to activate your account and start trading.",
      button(url, "Verify email")
    ),
  });
}

export async function sendResetEmail(to, url) {
  const resend = getResendClient();
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your Paycryptt password",
    html: shell(
      "Reset your password",
      "We received a request to reset your password. Click below to choose a new one. If this wasn't you, you can ignore this email.",
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
