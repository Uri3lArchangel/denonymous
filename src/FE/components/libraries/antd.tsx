import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalComponent = ({state,setState,children}:{state:boolean,setState:React.Dispatch<React.SetStateAction<boolean>>,children:React.ReactNode}) => {


  return (
    <>
   
      <Modal title="share" open={state}  onCancel={()=>{setState(false)}}>
 {children}
      </Modal>
    </>
  );
};

export default ModalComponent;