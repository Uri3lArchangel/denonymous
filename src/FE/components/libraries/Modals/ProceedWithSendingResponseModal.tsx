import React, { SetStateAction } from 'react'
import { ModalComponent } from '../antd'

function ProceedWithSendingResponseModal({state,set}:{state:boolean,set:React.Dispatch<SetStateAction<boolean>>}) {
  return (
    <>
      <ModalComponent title="Confirm Send Response"  state={state} setState={set} >
        <h1>Send response without media?</h1>
        </ModalComponent>  
    </>
  )
}

export default ProceedWithSendingResponseModal