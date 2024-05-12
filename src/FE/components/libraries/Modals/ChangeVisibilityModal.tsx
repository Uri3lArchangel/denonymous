'use client'
import React, { useState } from 'react'
import { ModalComponent, ModalStyles } from '../antd';
import { denonymousType } from '@/types';

const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",border:"1px solid #f6d108",color:"#fff"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles

function ChangeDenonymousResponseVisibility({modal,setmodal,changeVisibility,e,topic}:{modal:boolean,setmodal:React.Dispatch<React.SetStateAction<boolean>>,changeVisibility:any,e:denonymousType,topic:string}) {
   
  return (
<ModalComponent styles={styles} title={e.responsesViewState?<h1 className='text-white'>Hide all responses</h1>:<h1 className='text-white'>Show all responses</h1> } ok={true} onOk={()=>{
  
  changeVisibility();
  setmodal(false)
  
  }} state={modal} setState={setmodal}>
<div>Are you sure you want to {e.responsesViewState?"Hide your responses, others won't see any of your responses":"Unhide your responses, everyone would be able to see all your responses"} {topic}</div>
</ModalComponent>  )
}

export default ChangeDenonymousResponseVisibility