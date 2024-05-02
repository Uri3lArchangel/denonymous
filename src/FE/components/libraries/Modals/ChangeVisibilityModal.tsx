'use client'
import React, { useState } from 'react'
import { ModalComponent, ModalStyles } from '../antd';
import { changeDenonymousViewState, changeResponsesVisibilityActiion } from '@/src/BE/serverActions/actions';
import { denonymousType } from '@/types';

const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",border:"1px solid #f6d108",color:"#fff"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles

function ChangeDenonymousResponseVisibility({modal,setmodal,changeVisibility,e}:{modal:boolean,setmodal:React.Dispatch<React.SetStateAction<boolean>>,changeVisibility:any,e:denonymousType}) {
   
  return (
<ModalComponent styles={styles} title={e.responsesViewState?<h1 className='text-white'>Change Response Visibility</h1>:<h1 className='text-white'>Activate Denonymous</h1> } ok={true} onOk={changeVisibility} state={modal} setState={setmodal}>
<div>Are you sure you want to {e.responsesViewState?"Hide your responses, others won't see any of your responses":"Unhide your responses, everyone would be able to see all your responses"} {e.topic}</div>
</ModalComponent>  )
}

export default ChangeDenonymousResponseVisibility