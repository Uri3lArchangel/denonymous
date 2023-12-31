import React from "react";
import SignUpForm from "../../../src/FE/components/SignUpForm";
import styles from "../../../styles/styles.module.css";

function page() {
  return (
    <>
      <div
        className={`h-full flex items-center justify-center ${styles.authBg}`}
      >
        <SignUpForm />
      </div>
    </>
  );
}

export default page;
