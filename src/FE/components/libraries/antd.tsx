import React, { useState } from 'react';
import {  Modal } from 'antd';
import { Carousel } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { Share2Icon } from 'lucide-react';

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

// icon={<BsThreeDotsVertical size className="text-black" />}


export const FloatButtonComponent = ({className,selectedIds}:{className?:string,selectedIds?:string}) => (
  <>
    <FloatButton.Group
      className={className}
      type="primary"
      style={{ right: 30 }}
    
    >
      <FloatButton  icon={<Share2Icon size={20} className="translate-x-[-2px]" />} />
      {/* <FloatButton icon={<CommentOutlined />} /> */}
    </FloatButton.Group>
   
  </>
);

