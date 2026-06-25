import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",

    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  // Generate plain text email
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate HTML email
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,

    port: process.env.MAILTRAP_SMTP_PORT,

    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  // Email details
  const email = {
    from: "email.taskmanager@example.com",

    to: options.email,

    subject: options.subject,

    text: emailTextual,

    html: emailHTML,
  };

  try {
    const response = await transporter.sendMail(email);

    console.log("Email sent successfully");

    return response;
  } catch (error) {
    console.error(
      "Email service failed silently. Make sure you provided your MAILTRAP credentials in the .env file.",
    );

    console.error("Error", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,

      intro: "Welcome to our app! We are excited to have you on board.",

      action: {
        instruction: "To verify your email, please click the button below.",

        button: {
          color: "#22BC66",

          text: "Verify your email",

          link: verificationUrl,
        },
      },

      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,

      intro: "We received a request to reset your account password.",

      action: {
        instruction: "To reset your password, click the button below.",

        button: {
          color: "#22BC66",

          text: "Reset password",

          link: passwordResetUrl,
        },
      },

      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
