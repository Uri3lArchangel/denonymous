import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Carousel } from 'antd';

export const ModalComponent = ({state,setState,children,ok,title,key}:{state:boolean,setState:React.Dispatch<React.SetStateAction<boolean>>,children:React.ReactNode,ok?:()=>Promise<void>,title:string | React.ReactNode,key?:any}) => {


  return (
    <>
   
      <Modal key={key} title={title} open={state} onOk={ok} onCancel={()=>{setState(false)}}>
 {children}
      </Modal>
    </>
  );
};




const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const CarouselApp = ({children,className}:{children:React.ReactNode,className?:any}) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}  className={className}>
      {children}
    </Carousel>
  );
};

;