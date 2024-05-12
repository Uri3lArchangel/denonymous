import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.webmail_pass,
    
  },
  secure:false
});
export async function signUpConfirmation(recipientEmail: string, key: string) {
  try{
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "Denonymous <contact@denonymous.xyz>", // sender address
    to: recipientEmail, // list of receivers
    subject: "Registration Email verification ✔", // Subject line
    text: `Welcome to Denonymous!
    Denonymous is an anonymous message platform where users can create Denonymous boxes. These boxes allow anonymous users to send text, images, audio, and video responses.
    To complete your registration, please verify your email address by using the following code:
    
    Verification Code: ${key}
    
    Copyright © 2023 Denonymous. All rights reserved.
    
    Follow us:
    - Twitter: https://twitter.com/denonymous_
    - Instagram: https://www.instagram.com/denonymous_/
    - LinkedIn: https://www.linkedin.com/company/denonymous
    - Medium: https://denonymous.medium.com/
    `, // plain text body

    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="preload" as="image" href="https://denonymous.xyz/images/twitter.avif">
    <link rel="preload" as="image" href="https://denonymous.xyz/images/insta.avif">
    <link rel="preload" as="image" href="https://denonymous.xyz/images/linkedin.avif">
    <link rel="preload" as="image" href="https://denonymous.xyz/images/medium.avif">
    <link rel="preload" as="image" href="https://denonymous.xyz/images/logo.avif">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
</head>
<body style="margin: 0; padding: 2em 0; font-family: Arial, sans-serif; background-color: #f8f8f8;">
<section style="border-radius:40px;width:fit-content; margin:auto;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
        <tr>
            <td align="center" bgcolor="#000" style="padding: 40px 0;">
                <img src="https://denonymous.xyz/images/logo.avif" alt="Denonymous Logo" width="180" height="40" style="display: block;">
            </td>
        </tr>
        <tr>
            <td bgcolor="#000" style="padding: 20px 30px;">
                <h2 style="font-size: 18px; margin: 0;color:#fff;">Welcome to Denonymous!</h2>
                <p style="font-size: 16px; margin-top: 20px;color:#fff;">Denonymous is an anonymous message platform where users can create Denonymous boxes. These boxes allow anonymous users to send text, images, audio, and video responses.</p>
                <p style="font-size: 16px;margin-top: 20px;color:#fff;">To complete your registration, please verify your email address by using the following code:</p>
                <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
                <p style="font-size: 30px;color:#fff;"><strong style="font-size:20px;">Verification Code:</strong> ${key}</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="#000" style="text-align: center; padding: 20px 30px;color:#fff;">
                <p style="font-size: 14px; margin: 0;">Copyright © 2023 Denonymous. All rights reserved.</p>
                <p style="font-size: 14px; margin-top: 10px;">Follow us:</p>
                <a href="https://twitter.com/denonymous_" style="text-decoration: none; margin-right: 10px;"><img src="https://denonymous.xyz/images/twitter.avif" alt="Twitter" width="30" height="30" style="display: inline-block;"></a>
                <a href="https://www.instagram.com/denonymous_/" style="text-decoration: none; margin-right: 10px;"><img src="https://denonymous.xyz/images/insta.avif" alt="Instagram" width="30" height="30" style="display: inline-block;"></a>
                <a href="https://www.linkedin.com/company/denonymous" style="text-decoration: none; margin-right: 10px;"><img src="https://denonymous.xyz/images/linkedin.avif" alt="LinkedIn" width="30" height="30" style="display: inline-block;"></a>
                <a href="https://denonymous.medium.com/" style="text-decoration: none;"><img src="https://denonymous.xyz/images/medium.avif" alt="Medium" width="30" height="30" style="display: inline-block;"></a>
            </td>
        </tr>
    </table>
    </section>
</body>
</html>


`, // html body
  });

  console.log("Message sent: %s", info);}
  catch(err:any){
    console.log(err)
  throw new Error(err)

  }
}

export async function passwordReset(recipientEmail: string, key: string) {

  try{
  // send mail with defined transport object

  const info = await transporter.sendMail({
    from: "Denonymous <contact@denonymous.xyz>", // sender address
    to: recipientEmail, // list of receivers
    subject: "Password Reset ✔", // Subject line
    text:`RESET!

    Reset your password
    
    Denonymous is an anonymous message platform where users can create Denonymous boxes. These boxes allow anonymous users to send text, images, audio, and video responses.
    
    A password reset was initiated for your account. Please follow the link below to continue and create a new password:
    
    Link: https://denonymous.xyz/auth/new-password/${key}
    
    Copyright © 2023 Denonymous, All rights reserved.
    `,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preload" as="image" href="https://denonymous.xyz/images/twitter.avif">
        <link rel="preload" as="image" href="https://denonymous.xyz/images/insta.avif">
        <link rel="preload" as="image" href="https://denonymous.xyz/images/linkedin.avif">
        <link rel="preload" as="image" href="https://denonymous.xyz/images/medium.avif">
        <link rel="preload" as="image" href="https://denonymous.xyz/images/logo.avif">
        <title>Password Reset Email</title>
    </head>
    <body style="margin: 0; padding: 2em 0; font-family: Arial, sans-serif; background-color: #f8f8f8;">
        <div style="max-width: 400px; width: 100%; margin: auto; background-color: black; padding: 2em 0.1em; ">
    
            <div style="background-color: black; text-align: left; padding: 1em;">
                <h1 style="font-size: 1.2rem; font-weight: bold; color: white;">RESET!</h1> box-shadow: 2px 2px 20px  box-shadow: 2px 2px 20px #000b;#000b;
                    If you did not initiate this password reset, please ignore this email.
                </p>
            </div>
    
            <div style="background-color: black; text-align: center; padding: 2em 0;">
                <p style="font-size: 14px; color: #ffffff;">
                    If you have any questions or need assistance, please contact us at support@denonymous.xyz.
                </p>
                <p style="font-size: 14px; color: #ffffff;">
                    We appreciate your use of Denonymous!
                </p>
    
                <p style="font-size: 14px; color: #ffffff;">Copyright © 2023 Denonymous, All rights reserved.</p>
    
                <ul style="display: flex; margin: 2em 0; justify-content: center; padding: 0; list-style: none;">
                    <li style="margin: 0 1em;">
                        <a href="https://twitter.com/denonymous_" style="text-decoration: none;">
                            <img loading="eager" fetchpriority="high" src="https://denonymous.xyz/images/twitter.avif" alt="Twitter" width="40px" height="40px">
                        </a>
                    </li>
                    <li style="margin: 0 1em;">
                        <a href="https://www.instagram.com/denonymous_/" style="text-decoration: none;">
                            <img loading="eager" fetchpriority="high" src="https://denonymous.xyz/images/insta.avif" alt="Instagram" width="40px" height="40px">
                        </a>
                    </li>
                    <li style="margin: 0 1em;">
                        <a href="https://www.linkedin.com/company/denonymous" style="text-decoration: none;">
                            <img loading="eager" fetchpriority="high" src="https://denonymous.xyz/images/linkedin.avif" alt="LinkedIn" width="40px" height="40px">
                        </a>
                    </li>
                    <li style="margin: 0 1em;">  
                        <a href="https://denonymous.medium.com/" style="text-decoration: none;">
                            <img loading="eager" fetchpriority="high" src="https://denonymous.xyz/images/medium.avif" alt="Medium" width="40px" height="40px">
                        </a>
                    </li>
                </ul>    
    
            </div>
    
        </div>
    </body>
    </html>
    `, // html body
  });

  console.log("Message sent: %s", info)
}catch(err:any){

  console.log(err)
  throw new Error(err)
}
}
