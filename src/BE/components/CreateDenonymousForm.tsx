import React from 'react'
import SubmitButtonComponent from '@/src/FE/components/subcomponents/SubmitButtonComponent';

function CreateDenonymousForm({formAction}:{formAction:(payload: FormData) => void}) {
  return (
    <form action={formAction} >
    <input
      placeholder="Enter denonymous title"
      name="topic"
      className="border-2 border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
    />
    <textarea
      name="description"
      id=""
      cols={30}
      className="border-2 block border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
      rows={10}
      placeholder="Description(Optional)"
    ></textarea>
  <SubmitButtonComponent />
    </form>
  )
}

export default CreateDenonymousForm