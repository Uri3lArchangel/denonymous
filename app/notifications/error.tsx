'use client';

import { MdOutlineRunningWithErrors, MdWarningAmber, MdWifiTetheringErrorRounded } from "react-icons/md";

 
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  console.log(error.name)
 
  return (
    <main className="flex  flex-col items-center pt-20 bg-black h-[100vh] text-white">
      <MdWarningAmber size={70} className="text-red-500" />
      <h2 className="text-center text-2xl sm:text-4xl ">{error.message.split("|")[1]=="client"?error.message.split("|")[0]:error.digest }</h2>
      <div className="flex flex-col items-center w-full max-w-[400px] sm:flex-row justify-between">
      <button
        className="my-4 rounded-md gradient_elements_div px-4 py-2 text-sm text-black "
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => {window.location.reload()}
        }
      >
        Try again
      </button>
      <button onClick={()=>{
        window.history.back()
      }}>Go back</button>
      </div>
    </main>
  );
}