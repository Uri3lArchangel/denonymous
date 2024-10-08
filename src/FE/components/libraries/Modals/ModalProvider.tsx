'use client'
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
    isOpen:false,
    openModal:()=>{},
    closeModal:()=>{},
    data:null as any,
    setDataValue:(a:any)=>{}
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }:{children:React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data,setData]=useState<any>()
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const setDataValue = (a:any)=>setData(a)

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, data, setDataValue }}>
      {children}
    </ModalContext.Provider>
  );
};
