'use client'
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <section >
      <h5 className="text-2xl text-center mb-6">Frequently Asked Questions?</h5>
      <div className="px-3 py-2 bg-transparent text-[#D4D4D4] ">
      <button onClick={handleOpenAccordion} className=" mx-auto block">

        <div className="flex justify-between ">
          <p className="font-bold border-b border-black/80 pb-2">{question}</p>
            {isOpen ? <Close /> : <Open />}
        </div>
        </button>

        <div className={`${isOpen ? null : "hidden"} font-semi-bold max-w-[400px]`}>
          <p className={`text-sm mt-4 text-black`}>{answer1}</p>
          <p className={`text-sm mt-4 text-black`}>{answer2}</p>
        </div>
      </div>
</section>  );
};

export const Open = () => {
  return (
  <ChevronDown />

  );
};
export const Close = () => {
  return (
    
    <ChevronUp />

  );
};
