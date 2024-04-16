

export const EmailTemplateResend = ({token}:{token:string})=>{
    return(
        <div>
           <p>{process.env.baseURL+`/new-password/key=${token}`}</p> 
        </div>
    )
    }