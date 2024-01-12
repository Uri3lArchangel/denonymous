import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalComponent = ({state,setState,children,ok,title,key}:{state:boolean,setState:React.Dispatch<React.SetStateAction<boolean>>,children:React.ReactNode,ok?:()=>Promise<void>,title:string | React.ReactNode,key?:any}) => {


  return (
    <>
   
      <Modal key={key} title={title} open={state} onOk={ok} onCancel={()=>{setState(false)}}>
 {children}
      </Modal>
    </>
  );
};

export default ModalComponent;