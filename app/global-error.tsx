'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
    <h2 className="text-center">{error.message.split("|")[1]=="client"?error.message.split("|")[0]:error.digest }</h2>
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