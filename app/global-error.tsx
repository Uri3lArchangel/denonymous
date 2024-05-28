'use client'
 
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <main className="flex flex-col items-center justify-center ">
      <h2 className="text-center text-2xl sm:text-4xl ">{error.message.split("|")[1]=="client"?error.message.split("|")[0]:"An Error occured" }</h2>
    <button
      className="mt-4 rounded-md gradient_elements_div px-4 py-2 text-sm text-black "
      onClick={
        () => {window.location.reload()}
      }
    >
      Try again
    </button>
    <button onClick={()=>{
      window.history.back()
    }}>Go back</button>
  </main>
  )
}