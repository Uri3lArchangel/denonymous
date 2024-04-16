import React, { CSSProperties, SetStateAction } from 'react'
import { ModalComponent, ModalStyles } from '../antd'
import EmailVerificationComponent from '../../subcomponents/EmailVerificationComponent'


const styles:ModalStyles = {
content:{background:"#020106"},
header:{background:"#020106"}

}
function VerifyEmailModal({state,setState,email}:{state:boolean,setState:React.Dispatch<SetStateAction<boolean>>,email:string}) {
  return (
<ModalComponent ok={false} mask styles={styles} title="Verify New Email " setState={setState} state={state} >
<EmailVerificationComponent email={email} />
</ModalComponent>  

)
}

export default VerifyEmailModal