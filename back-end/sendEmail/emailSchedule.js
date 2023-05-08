const nodemailer = require("nodemailer");
const Bday = require("../model/Bday");
const User = require("../model/User");
const dotenv = require("dotenv");
dotenv.config();

const sendReminder = async () => {
  const today = new Date();
  const todayMonth = today.getMonth() + 1; // JavaScript months are 0-indexed, so add 1
  const todayDay = today.getDate();
  const todayFormatted = `${todayDay}-${todayMonth}`;

  const bdays = await Bday.find({ bday: todayFormatted });
  if (!bdays) return;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PSWD,
    },
  });

  bdays.map(async (bday) => {
    
    const user = await User.findById(bday.user);
    console.log("user", user)
    if(!user){
        console.log("no user to send email");
        return
    }
  
    // setup email data
    let mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: `Reminder to wish your friend, ${bday.name}`,
      html: `
          <html>
            <body>
              <p>Hi there,</p>
              <p>Just a friendly reminder that today is <b>${bday.name}'s</b> birthday. Don't forget to wish them a happy birthday!</p>
            </body>
          </html>
        `,
    };

    // send email using transporter object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

module.exports = {
  sendReminder,
};
