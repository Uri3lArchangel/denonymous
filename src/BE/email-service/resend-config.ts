
import { Resend } from "resend"
import { EmailTemplateResend } from "./signup-email.template"

const resend = new Resend(process.env.resendAPIKey!)

export async function Email_Signup_Verification(uuid:string,userEmail:string) {
    try {
        console.log('sending mail')
        const data = await resend.emails.send({
            from:"DPOMarket <contact@directprivateoffers.com>",
            to:userEmail,
            subject:"Email Verification",
            react:EmailTemplateResend({uuid})
        })
        return {status:true,message:"email sent successfully"}
    } catch (error:any) {
        return {status:false,message:error.message}
    }
}
