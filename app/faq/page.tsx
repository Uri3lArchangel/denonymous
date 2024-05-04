import React from "react";
import { FaqAccordion } from "@/src/FE/components/subcomponents/Accordion";
import FaqData from "@/src/data/faq.json";

const page = () => {
  return (
    <div className="bg-[#175dfd] p-3 rounded-2xl w-[85%] mx-auto md:w-[60%] mb-20">
      {FaqData.faqs.map((faqItem, index) => {
        return (
          <FaqAccordion
            id={index}
            question={faqItem.question}
            answer1={faqItem.answer1}
            answer2={faqItem.answer2}
          />
        );
      })}
    </div>
  );
};

export default page;
