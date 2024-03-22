'use client'
import React, { CSSProperties, ReactNode, useState } from 'react';
import {  ButtonProps, Modal } from 'antd';
import { Carousel } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { Share2Icon } from 'lucide-react';

export interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}
export const ModalComponent = ({state,setState,styles,children,ok,title,key,mask,maskC,CancelButton,onOk}:{state:boolean,setState:React.Dispatch<React.SetStateAction<boolean>>,children:React.ReactNode,ok?:boolean,title:string | React.ReactNode,key?:any,mask?:boolean,maskC?:boolean,styles?:Omit<ModalStyles, "wrapper"> | undefined,CancelButton?:ButtonProps,onOk?:any}) => {


  return (
    <>
   
      <Modal key={key} styles={styles} title={title} mask={mask} maskClosable={maskC} open={state} cancelButtonProps={{className:"text-white",danger:true}} onOk={onOk} okType={'default'}  okText={ok?"ok":null} okButtonProps={ok?{className:"text-[#fff]"}:undefined} onCancel={()=>{setState(false)}}>
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


import { Tooltip } from 'antd';

export const TooltipApp= ({title,text,children}:{title:string,text:string,children?:any}) => {
  
if(children){
  return(
     <Tooltip title={title}>
{children}
  </Tooltip> 
  )
}

if(text.length >= 24){
    let t = text.substring(0,26)
     text=t+'...'

  return(
  <Tooltip title={title}>
    <p className={` cursor-pointer topicTextLarge`}>{text}</p>
  </Tooltip>
  )
}else{
  return(
    <Tooltip title={title}>
      <p className={` cursor-pointer topicText`}>{text}</p>
    </Tooltip>
    ) 
}
  };

  import { DownOutlined, SmileOutlined } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Dropdown, Space } from 'antd';
  

 
  export const DropdownApp = ({items,trigger,triggerComponent}:{items?:MenuProps['items'],triggerComponent:ReactNode,trigger?:("contextMenu" | "click" | "hover")[]}) => {
   
    
   return(
     <Dropdown menu={{ items }} trigger={trigger} >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {triggerComponent}
          {/* hover me */}
        </Space>
      </a>
    </Dropdown>)
  };
  