import { baseUrl } from "@/src/core/extras/globalData"

// Design email page layout and use inline styles eg... <p style={{color:"black"}}></p>
// Warning do not remove the link below, it can be styled and adjusted
export const EmailTemplateResend = ({uuid}:{uuid:string})=>{
    console.log("email",uuid)
    return(
        <div>
           <p>{baseUrl+`/api/email-verification?key=${uuid}`}</p> 
        </div>
    )
    }