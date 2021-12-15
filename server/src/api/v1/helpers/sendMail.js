import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

//using sendingblue
export const sendMail = async (to, url, txt, from = "kr.ashu465@gmail.com") => {
  const transporter = nodemailer.createTransport({
    host: process.env.SENDINGBLUE_HOST,
    port: process.env.SENDINGBLUE_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDINGBLUE_EMAIL, // generated ethereal user
      pass: process.env.SENDINGBLUE_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: `Mars <${from}>`,
    to: to,
    subject: "Mars",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Notification Alert</h2>
            <p>A new work has been assigned to you.
            </p>
            
             <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
  
             </div>
        `,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error);
    }
  });
};
