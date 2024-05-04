import { useState } from "react";

interface FaqAccordionProps {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
}

export const FaqAccordion = (props: FaqAccordionProps) => {
  const { question, answer1, answer2 } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="px-3 py-2 bg-transparent text-[#D4D4D4] mb-5">
        <div className="flex justify-between">
          <p className="font-bold">{question}</p>
          <button onClick={handleOpenAccordion}>
            {isOpen ? <Close /> : <Open />}
          </button>
        </div>
        <div className={`${isOpen ? null : "hidden"} font-semi-bold`}>
          <p className={`text-sm mt-4 text-[white]`}>{answer1}</p>
          <p className={`text-sm mt-4 text-[white]`}>{answer2}</p>
        </div>
      </div>
    </>
  );
};

export const Open = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12H17"
        stroke="#D4D4D4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17V7"
        stroke="#D4D4D4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const Close = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12H17"
        stroke="#D4D4D4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
