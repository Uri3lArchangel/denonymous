import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "denonymous-contact@denexus.xyz",
    pass: process.env.webmail_pass,
  },
});
// https://denonymous.denexus.xyz
export async function signUpConfirmation(recipientEmail:string,key:string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Denonymous <denonymous-contact@denexus.xyz>', // sender address
    to: recipientEmail, // list of receivers
    subject: "Sign up Email verification ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<div>
    <div style="text-align: center;">
        <div style="background-color: black; text-align: center;">
        <img src="http://127.0.0.1:3000/images/delogo.svg" width="70px" height="70px" />
        </div>
        <h1>You Are Almost There!</h1>
        <p>Your e-mail has been used to signup on our webapp, to complete this process click the verify email link below</p>
        <p>👇👇👇👇👇👇👇👇👇</p>
        <a href="http://127.0.0.1:3000/api/email-verification?key=${key}" style="background-image:linear-gradient(270deg,#ffdf00 0%,#f6d108 27.6%,#edc211 54.17%,#e3b419 77.6%,#daa521 100%);display: block;padding: 0.6em 2.5em;width: fit-content;border-radius: 20px;color: black;text-decoration: none;margin: auto;">Verify Email</a>
    </div>
    <footer style="display: flex; align-items:center; font-size: 1.5rem;color: #ffdf00; background-color: black; justify-content: center;margin: 2em auto;">
        <img  src="http://127.0.0.1:3000/images/delogo.svg" width="40px" height="40px" />
        <p>nonymous</p>
    </footer>
</div>`, // html body
  });

  console.log("Message sent: %s", info);
}


export async function passwordReset(recipientEmail:string,key:string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Denonymous <denonymous-contact@denexus.xyz>', // sender address
    to: recipientEmail, // list of receivers
    subject: "Password Reset ✔", // Subject line
    html: `<div>
    <div style="text-align: center;">
        <div style="background-color: black; text-align: center;">
        <img src="http://127.0.0.1:3000/images/delogo.svg" width="70px" height="70px" />
        </div>
        <h1>Reset your password</h1>
        <p>A password reset was initiated to your email, click the link to continue and create a new password</p>
        <p>👇👇👇👇👇👇👇👇👇</p>
        <a href="http://127.0.0.1:3000/auth/reset-password?key=${key}" style="background-image:linear-gradient(270deg,#ffdf00 0%,#f6d108 27.6%,#edc211 54.17%,#e3b419 77.6%,#daa521 100%);display: block;padding: 0.6em 2.5em;width: fit-content;border-radius: 20px;color: black;text-decoration: none;margin: auto;">Reset Password</a>
    </div>
    <footer style="display: flex; align-items:center; font-size: 1.5rem;color: #ffdf00; background-color: black; justify-content: center;margin: 2em auto;">
        <img  src="http://127.0.0.1:3000/images/delogo.svg" width="40px" height="40px" />
        <p>nonymous</p>
    </footer>
</div>`, // html body
  });

  console.log("Message sent: %s", info);
}

