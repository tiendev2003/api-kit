const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
       user: "trancongtien406@gmail.com",
      pass: "yejgxnjdsrbjfdey",
    },
  });
  const msg = {
    from: `Trần Công Tiến <${process.env.MY_EMAIL}>`,
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };

  return await transporter.sendMail(msg);
};

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/api/v1/auth/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Vui lòng click vào link bên dưới để có thể xác minh email của bạn : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;
  return await sendMail({
    to: email,
    subject: "Xác minh email",
    html: `<h2>Xin chào ${name}</h2>
      ${message}
      `,
  });
};

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/api/v1/auth/verify-email?token=${token}&email=${email}`;
  const message = `<p>Vui lòng click vào link bên dưới để có thể đặt lại mật khẩu của bạn : 
      <a href="${resetURL}">Đặt lại mặt khẩu</a></p>`;
  return await sendMail({
    to: email,
    subject: "Đặt lại mật khẩu",
    html: `<h2>Xin chào ${name}</h2>
    ${message}
    `,
  });
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
