'use client'
import React, { useContext } from 'react'
import styles from "../../../../styles/styles.module.css";
import { useFormStatus } from 'react-dom';
import { NotificationContext } from '../contexts/NotificationContext';

function SubmitButtonComponent() {
    const {pending}=useFormStatus()
    const notification = useContext(NotificationContext)!
  return (
    <button
    className={
      "border-2  text-base text-black font-bold p-2 my-12 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] " +
      styles.signInBtn
    }
    aria-disabled={pending}
    disabled={pending}
    type="submit"
  >
    {pending?"Please wait...":"Create"}
  </button>  )
}

export default SubmitButtonComponent