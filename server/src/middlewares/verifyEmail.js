const { Resend } = require("resend");
const fs = require("fs");
// const logo = require("../assets/EventGo_logo.png");

async function sendVerificationMail(email) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const mailOptions = {
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Test mail from resend",
        attachments: [
            {
                filename: "EventGo_logo.png",
                content: fs
                    .readFileSync("./assets/EventGo_logo.png")
                    .toString("base64"),
                encoding: "base64",
                cid: "EventGo_logo.png", // same cid value as in the html img src
            },
        ],
        html: ` <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your OTP from EventGo/title>
    <style>
      /* General resets for email clients */
      body,table,td,p,a,li,blockquote{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
      img{ -ms-interpolation-mode:bicubic; }

      /* Container */
      .email-wrapper{ width:100%; background-color:#f4f6f8; padding:24px 0; }
      .email-content{ max-width:620px; margin:0 auto; }

      /* Card */
      .card{ background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(20,30,40,0.06); }
      .card-inner{ padding:32px; }

      /* Logo */
      .logo{ text-align:center; padding:18px 0; }
      .logo img{ max-height:48px; display:block; margin:0 auto; }

      /* Headings */
      h1{ font-family:Helvetica, Arial, sans-serif; font-size:20px; margin:0 0 8px; color:#111827; }
      p { font-family:Helvetica, Arial, sans-serif; color:#374151; font-size:15px; line-height:1.5; margin:0 0 16px; }

      /* OTP box */
      .otp{ font-family: 'Courier New', Courier, monospace; font-size:28px; letter-spacing:6px; text-align:center; padding:18px 12px; border-radius:8px; background:#f8fafc; display:inline-block; min-width:220px; }

      /* Button */
      .btn{ display:inline-block; text-decoration:none; padding:12px 20px; border-radius:8px; font-weight:600; }
      .btn-primary{ background:#0f62fe; color:white; }

      /* Footer */
      .footer{ font-family:Helvetica, Arial, sans-serif; color:#9ca3af; font-size:13px; text-align:center; padding:20px 8px; }

      /* Responsive */
      @media only screen and (max-width:480px){
        .card-inner{ padding:20px; }
        .otp{ font-size:22px; min-width:180px; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0;">

    <!-- Wrapper table for email clients -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-wrapper">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-content">

            <!-- Card -->
            <tr>
              <td>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="card">
                  <tr>
                    <td class="logo" style="padding-top:18px;">
                      <!-- Replace src with your logo URL -->
                      <img src="cid:EventGo_logo.png" alt="{{BRAND_NAME}}" width="160" style="border:0;" />
                    </td>
                  </tr>

                  <tr>
                    <td class="card-inner">
                      <h1>Hello Chetan,</h1>
                      <p>We received a request to sign in to your <strong>EventGo</strong> account. Enter the one-time password (OTP) below to continue. This code will expire in <strong>10 minutes</strong>.</p>

                      <div style="text-align:center; margin:18px 0 24px;">
                        <span class="otp">${Math.floor(
                            Math.random() * 10000
                        )}</span>
                      </div>

                      <p style="text-align:center; margin-bottom:22px;">
                        <a href="#" class="btn btn-primary" style="background:#0f62fe; color:#ffffff;">Verify &amp; Continue</a>
                      </p>

                      <p>If you didn't request this, you can safely ignore this email — no changes were made to your account.</p>

                      <p style="margin-top:18px; font-size:13px; color:#6b7280;">Need help? Reply to this email or contact our support team.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td>
                <div class="footer">
                  <p style="margin:6px 0;">© 2025 EventGo. All rights reserved.</p>
                  <p style="margin:6px 0;">EventGo · 123 Your Street · City, Country</p>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>`,
    };

    const { data, error } = await resend.emails.send(mailOptions);

    if (error) return console.log("Something went wrong", error);

    console.log(data);
}

module.exports = sendVerificationMail;
