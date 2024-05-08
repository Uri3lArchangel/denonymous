"use client";
import React, {  useState } from "react";
import styles from "@/public/styles/styles.module.css";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../assets/LoadingSkeleton";
let CreateDenonymousForm:any;

  




export const CreateDenonymousClient = () => {


  const [isOpen, setIsOpen] = useState(false);

 
  const handleModalOpen = () => {
    CreateDenonymousForm = dynamic(
      ()=>import("@/src/BE/components/CreateDenonymousForm"),{loading(loadingProps) {
        
        return(<>{loadingProps.isLoading?<LoadingSkeleton className="" />:<></>}</>)
      }}
    )
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <section>
      <button
      id="createDenonymousBox"
        type="button"
        aria-label="Create a Denonymous"
        onClick={handleModalOpen}
        style={{ cursor: "pointer" }}
        className="flex items-center mx-auto justify-center flex-col"
      >
        <svg
          width="76"
          height="68"
          viewBox="0 0 76 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69.0909 35.1594C65.4005 33.8728 61.4153 33.6413 57.5967 34.4915C53.7782 35.3418 50.2823 37.2391 47.514 39.9637C44.7456 42.6884 42.8178 46.129 41.954 49.8873C41.0901 53.6456 41.3253 57.5679 42.6325 61.2H3.45455C2.53834 61.2 1.65967 60.8418 1.01181 60.2042C0.36396 59.5665 0 58.7017 0 57.8V3.4C0 2.49826 0.36396 1.63346 1.01181 0.995837C1.65967 0.358213 2.53834 0 3.45455 0H65.6364C66.5526 0 67.4313 0.358213 68.0791 0.995837C68.727 1.63346 69.0909 2.49826 69.0909 3.4V35.1594ZM34.7527 29.5222L12.6022 11.0092L8.12855 16.1908L34.7976 38.4778L60.9865 16.1738L56.468 11.0296L34.7527 29.5222ZM65.6364 51H76V57.8H65.6364V68H58.7273V57.8H48.3636V51H58.7273V40.8H65.6364V51Z"
            fill="url(#paint0_linear_169_1289)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_169_1289"
              x1="76"
              y1="34.0725"
              x2="-4.16699e-07"
              y2="34.0725"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDF00" />
              <stop offset="0.276042" stopColor="#F6D108" />
              <stop offset="0.541667" stopColor="#EDC211" />
              <stop offset="0.776042" stopColor="#E3B419" />
              <stop offset="1" stopColor="#DAA521" />
            </linearGradient>
          </defs>
        </svg>

      <label htmlFor="createDenonymousBox" className={styles.gradientHeader + " mt-7 text-xl text-center cursor-pointer block"}>
        Create a Denonymous
      </label>
      </button>

      {isOpen && (
        <>
          <dialog open={isOpen} className={`${styles.modal} h-full w-full`}>
            <div
              className={`${styles.modalContent} relative bg-[#242222] p-5 w-5/6 sm:w-[500px] h-[500px] mx-auto my-auto`}
            >
              <h1
                className={
                  "text-center font-bold text-xl pb-3 " + styles.gradientHeader
                }
              >
                Create a Denonymous
              </h1> 

              <CreateDenonymousForm handleModalClose={handleModalClose} />
              <button
                className="absolute top-0 right-0 p-4 text-[#fff] text-2xl"
                onClick={handleModalClose}
                aria-label="Close Modal"
              type="button"
              >
                &times;
              </button>
            </div>
          </dialog>
        </>
      )}
    </section>
  );
};