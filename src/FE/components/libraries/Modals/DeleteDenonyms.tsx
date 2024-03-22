'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { ModalComponent } from '../antd';
import { deleteDenonymousAction } from '@/src/BE/serverActions/actions';
import { useEdgeStore } from '@/src/core/lib/edgestore';
export interface ModalStyles {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    wrapper?: CSSProperties;
    content?: CSSProperties;
  }

function DeleteDenonymsModal({setModal,modal,topic}:{modal:boolean,setModal:React.Dispatch<React.SetStateAction<boolean>>,topic:string}) {
    const {edgestore}  = useEdgeStore()

  useEffect(()=>{
    modal=false
  })
    const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",border:"1px solid #f6d108"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles
  return (
    <ModalComponent state={modal} setState={setModal} styles={styles} onOk={async()=>{
        let a = await deleteDenonymousAction(topic!);
        if(a){
        for(let i=0;i<a.length;i++){
            await edgestore.denonymousMedia.delete({url:a[i]})
        
        }
        };
        setModal(false)
        }} ok={true} title={<p className='text-white text-md'>Delete Denonymous</p>} mask={true} >

     <div className=" text-red-500 text-xl">Are you sure you want to delete this denonymous?, this action cannot be undone !</div>

  </ModalComponent>  )
}

export default DeleteDenonymsModal