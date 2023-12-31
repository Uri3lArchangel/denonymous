import SignInForm from "@/src/FE/components/SignInForm";
import styles from "../../../styles/styles.module.css";
import React from "react";

function page() {

  return (
    <>
      <div
        className={`h-screen flex items-center justify-center ${styles.authBg}`}
      >

        <SignInForm />
      </div>
    </>
  );
}

export default page;
