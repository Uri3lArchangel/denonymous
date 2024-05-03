import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "contact@denonymous.xyz",
    pass: process.env.webmail_pass,
  },
});
// https://denonymous.xyz
export async function signUpConfirmation(recipientEmail: string, key: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "Denonymous <contact@denonymous.xyz>", // sender address
    to: recipientEmail, // list of receivers
    subject: "Registration Email verification ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    <div style="padding:2em 0;background-image:linear-gradient(270deg,#f2d204 0%,#f6d108 27.6%,#edc211 54.17%,#e3b419 77.6%,#daa521 100%);">
    <div style="max-width:400px;width:100%;margin:auto;background-color:black;padding:2em 0.1em;border-radius:10px;box-shadow: 2px 2px 20px #000b;">
        <div style="background-color: black; text-align: left;padding:1em; ">
        <h1 style="font-size:1.2rem;font-weight:bold;color:white;">WELCOME!</h1>
        <img style="display:block;" src="https://denonymous.xyz/images/logo.png" width="180px" height="40px" />
        </div>
        <div style="text-align:left;padding:1em;border-radius:10px;background-color:white;width:80%;margin:auto;">
        <h2 style="font-size:1.1rem;color:black;">You Are Almost There!</h2>
        <p style="font-size:0.9rem;color:black;">Verify your email, to complete this process pase the code provided below</p>
        <hr>
        <p style="font-size:0.9rem;color:black;">Here is your code: ${key}</p>
          </div>
    <div style="background-color: black; text-align: center;padding:2em 0">
    Copyright © 2023 denonymous, All rights reserved.
    <ul  style="display:flex; margin:2em 0;;justify-content:center">
    <li style="margin:0 1em;">
    <a href="https://twitter.com/denonymous_" style="text-decoration:none;">
    <img src="https://denonymous.xyz/images/twitter.png" alt="twitter" width="40px" height="40px" />
    </a>
  </li>
  <li style="margin:0 1em;">
  <a href="https://www.instagram.com/denonymous_/" style="text-decoration:none;">
  <img src="https://denonymous.xyz/images/insta.png" alt="instagram" width="40px" height="40px" />
  </a>
  </li>
  <li style="margin:0 1em;">
  <a href="https://www.linkedin.com/company/denonymous" style="text-decoration:none;">
  <img src="https://denonymous.xyz/images/linkedin.png" alt="linkedin" width="40px" height="40px" />
  </a>
  </li>
  <li style="margin:0 1em;">  
  <a href="https://denonymous.medium.com/" style="text-decoration:none;">
  <img src="https://denonymous.xyz/images/medium.png" alt="medium" width="40px" height="40px" />
  </a>
  </li>
  </ul>
    </div>
    </div>
`, // html body
  });

  console.log("Message sent: %s", info);
}

export async function passwordReset(recipientEmail: string, key: string) {
  // send mail with defined transport object
console.log({recipientEmail,key})

  const info = await transporter.sendMail({
    from: "Denonymous <contact@denonymous.xyz>", // sender address
    to: recipientEmail, // list of receivers
    subject: "Password Reset ✔", // Subject line
    html: `
    <div style="padding:2em 0;background-image:linear-gradient(270deg,#f2d204 0%,#f6d108 27.6%,#edc211 54.17%,#e3b419 77.6%,#daa521 100%);">
    <div style="max-width:400px;width:100%;margin:auto;background-color:black;padding:2em 0.1em;border-radius:10px;box-shadow: 2px 2px 20px #000b;">

    <div style="background-color: black; text-align: left;padding:1em; ">
    <h1 style="font-size:1.2rem;font-weight:bold;color:white;">RESET!</h1>
    <img style="display:block;" src="https://denonymous.xyz/images/logo.png" width="180px" height="40px" />
    </div>
    <div style="text-align:left;padding:1em;border-radius:10px;background-color:white;width:80%;margin:auto;">

    <h2 style="font-size:1.1rem;color:black;">Reset your password</h2>
        <p style="font-size:0.9rem;color:black;">A password reset was initiated to your email, follow the link below to continue and create a new password</p>
        <hr>
        <p style="font-size:0.9rem;color:black;">link: https://denonymous.xyz/auth/new-password/${key}</p>
    </div>
    <div style="background-color: black; text-align: center;padding:2em 0">

    <div style="background-color: black; text-align: center;">
    Copyright © 2023 denonymous, All rights reserved.
    <ul  style="display:flex; margin:2em 0;justify-content:center">
    <li style="margin:0 1em;">
      <a href="https://twitter.com/denonymous_" style="text-decoration:none; >
      <img src="https://denonymous.xyz/images/twitter.png" alt="twitter" width="40px" height="40px" />
      </a>
    </li>
    <li style="margin:0 1em;">
    <a href="https://www.instagram.com/denonymous_/" style="text-decoration:none;">
    <img src="https://denonymous.xyz/images/insta.png" alt="instagram" width="40px" height="40px" />
    </a>
    </li>
    <li style="margin:0 1em;">
    <a href="https://www.linkedin.com/company/denonymous" style="text-decoration:none;">
    <img src="https://denonymous.xyz/images/linkedin.png" alt="linkedin" width="40px" height="40px" />
    </a>
    </li>
    <li style="margin:0 1em;">  
    <a href="https://denonymous.medium.com/" style="text-decoration:none;">
    <img src="https://denonymous.xyz/images/medium.png" alt="medium" width="40px" height="40px" />
    </a>
    </li>
  </ul>    
    </div>
</div>`, // html body
  });

  console.log("Message sent: %s", info);
}
