'use client'
import { PencilIcon } from 'lucide-react'
import React from 'react'

function EditableInput({input,setInputChangeTrigger,inputvalue}:{input?:{id?:string,name?:string,className?:any,defaultValue?:string,value?:string,readOnly?:boolean},setInputChangeTrigger:React.Dispatch<React.SetStateAction<boolean>>,inputvalue:string}) {
  return (
    <div className='flex border border-[#D4D4D4] rounded-md  py-2 px-4 mx-auto'>
      <input type="text" value={inputvalue} readOnly={true} id={input?.id?.replace("-input",'')} hidden />
    <input  onChange={
      (e)=>{
      
        e.currentTarget.value = e.currentTarget.value.trim()
        if(e.currentTarget.value == inputvalue){
        setInputChangeTrigger(false)
          return
        }
        setInputChangeTrigger(true)
      }
    } type="text" {...input} className='bg-transparent w-[100%] outline-none text-[#dcdcdc]' />
    <PencilIcon size={20} className="text-[#ffdf00] cursor-pointer"
 
    onClick={
     ()=>{
      if(!input || !input.id) return
      const inp = document.getElementById(input.id) as HTMLInputElement
      inp.readOnly=false;
      inp.select()
     } 
    }/>
</div>  
)
}

export default EditableInput