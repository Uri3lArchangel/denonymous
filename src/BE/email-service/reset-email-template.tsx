

export const EmailTemplateResend = ({token}:{token:string})=>{
    return(
        <div>
           <p>{process.env.baseURL+`/api/reset-password?key=${token}`}</p> 
        </div>
    )
    }