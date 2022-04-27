const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const { to, subject, content } = options;

    // create transport
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //   define email options
    const emailOptions = {
      from: "admin@porcham.com",
      to,
      subject,
      text: content,
    };

    // send email
    await transport.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
