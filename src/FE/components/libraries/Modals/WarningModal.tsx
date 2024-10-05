"use client";

import Link from "next/link";
import React, { SetStateAction } from "react";

const WarningModal = ({ message,setModal,state }: { message: string,setModal:React.Dispatch<SetStateAction<boolean>>,state?:"i" }) => {
  return (
    <section className="fixed w-full h-full top-0 left-0 bg-black z-[100] flex items-center justify-center  blurBg">
      <div>
        <p className="my-4 max-w-[800px]">{message}</p>
        <div className="block lg:flex justify-around max-w-[400px] mx-auto">
        {state == "i"?<button>Upgrade this denonymous</button>:<Link href="/subscription" className="gradient_elements_div px-4 py-2 block mx-auto rounded-md w-fit ">
          Upgrade to premium
        </Link>}
        <button className="bg-red-500 px-4 py-2 mx-auto block rounded-md" onClick={(()=>{
            setModal(false)
        })}>Close</button>
        </div>
      </div>
    </section>
  );
};

export default WarningModal;
