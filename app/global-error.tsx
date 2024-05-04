'use client'
 
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <main className="flex flex-col items-center justify-center ">
    <h2 className="text-center">{error.message}</h2>
    <button
      className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
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