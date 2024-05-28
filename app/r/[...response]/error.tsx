'use client';

import { errorcodes } from "@/src/core/data/errorcodes";
import { MdWarningAmber } from "react-icons/md";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error }) => {

  let display = "This denonymous doesn't exist"
  return (
    <main className="flex flex-col items-center pt-20 bg-black h-[100vh] text-white">
      <MdWarningAmber size={70} className="text-red-500" />
      <h2 className="text-center text-2xl sm:text-4xl">{display}</h2>
      <div className="flex flex-col items-center w-full max-w-[400px] sm:flex-row justify-between">
        <button
          className="my-4 rounded-md px-4 py-2 text-sm text-black gradient_elements_div"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        <button
          className="my-4 rounded-md px-4 py-2 text-sm text-black gradient_elements_div"
          onClick={() => window.history.back()}
        >
          Go back
        </button>
      </div>
    </main>
  );
};

export default Error;
