import SignInForm from "@/src/FE/components/SignInForm";
import styles from "../../../styles/styles.module.css";
import React from "react";

function page() {

  return (
    <>
      <div
        className={`min-h-[100vh] py-6 flex items-center justify-center `+ styles.authBg}
      >

        <SignInForm />
      </div>
    </>
  );
}

export default page;
