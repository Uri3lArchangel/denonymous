import React, { useState } from 'react'
import { ModalComponent, ModalStyles } from '../antd';
import { changeDenonymousViewState } from '@/src/BE/serverActions/actions';
import { denonymousType } from '@/types';

const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",border:"1px solid #f6d108",color:"#fff"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles

function ActivateDenonyms({modal,setmodal,topic,e}:{modal:boolean,setmodal:React.Dispatch<React.SetStateAction<boolean>>,topic:string|undefined,e:denonymousType}) {
  return (
<ModalComponent styles={styles} title={e.isActive?<h1 className='text-white'>Deactivate Denonymous</h1>:<h1 className='text-white'>Activate Denonymous</h1> } ok={true} onOk={async()=>{
changeDenonymousViewState(topic!);setmodal(false);
}} state={modal} setState={setmodal}>
<div>Are you sure you want to {e.isActive?"deactivte this denonymous, you would stop receiving responses from users, but still keep your messages":"activate your denonymous, users would now be able to send responses to you"} {e.topic}</div>
</ModalComponent>  )
}

export default ActivateDenonyms