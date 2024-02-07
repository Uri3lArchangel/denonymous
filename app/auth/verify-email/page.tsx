import React from "react";
import styles from "../../../styles/styles.module.css";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

function page() {
  return (
    <div
      className={
        `min-h-[100vh] py-6 flex items-center justify-center ` + styles.authBg
      }
    >
      <form
        className={`border border-[#EDC211] rounded-[15px] max-w-[400px] w-10/12 px-8 py-12 bg-[#020106] text-white ${styles.all}`}
      >
        <div className="flex justify-center mb-5">
          <Image src={logo} alt="logo" />
        </div>
        <button
          className={`border-2 text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
        >
          Resend Verification Link
        </button>
        <div>
          <label htmlFor="email_change" className="block text-sm mb-5">
            Enter New Email
          </label>
          <input
            type="email"
            id="email_change"
            placeholder="abc...@gmail.com"
            className=" border-b-2 border-[#B58419] w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
          />
        </div>
        <button
          className={`border-2  text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
        >
          Change Email
        </button>
      </form>
    </div>
  );
}

export default page;
