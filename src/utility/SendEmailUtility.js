var nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  //   let transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "test.email.raj@gmail.com",
  //       pass: "testemailraj12345@",
  //     },
  //     port: 465,
  //     host: "smtp.gmail.com",
  //   });
  let transporter = nodemailer.createTransport({
    host: `${process.env.mail_host}`,
    port: 25,
    secure: false,
    auth: {
      user: `${process.env.mail_user}`,
      pass: `${process.env.mail_pass}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object

  let mailOptions = {
    from: "Task Manager <TaskManager@rajdevullash.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
