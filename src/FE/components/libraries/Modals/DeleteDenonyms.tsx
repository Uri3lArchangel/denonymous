'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { ModalComponent } from '../antd';
import {  deleteDenonymousAction } from '@/src/BE/serverActions/actions';
import { useEdgeStore } from '@/src/core/lib/edgestore';
import { deleteDenonymousDB } from '@/src/BE/DB/queries/denonymous/query';
import { revalidateTag } from 'next/cache';
export interface ModalStyles {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    wrapper?: CSSProperties;
    content?: CSSProperties;
  }

function DeleteDenonymsModal({setModal,modal,key_,setLoading}:{modal:boolean,setModal:React.Dispatch<React.SetStateAction<boolean>>,key_:string,setLoading:React.Dispatch<React.SetStateAction<boolean>>}) {
    const {edgestore}  = useEdgeStore()

  // useEffect(()=>{
  //  setModal(false)
  // })
    const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",border:"1px solid #f6d108"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles
  return (
    <ModalComponent state={modal}  setState={setModal} styles={styles} onOk={async()=>{
      setLoading(true)
       let a =await  deleteDenonymousAction(key_)
       
            setModal(false)
        setLoading(false)
        }} ok={true} title={<p className='text-white text-md'>Delete Denonymous</p>} mask={true} >

     <div className=" text-red-500 text-xl">Are you sure you want to delete this denonymous?, this action cannot be undone !</div>

  </ModalComponent>  )
}

export default DeleteDenonymsModal