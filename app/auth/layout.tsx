import React, { ReactNode } from 'react'
import styles from "@/public/styles/styles.module.css";


const layout = ({children}:{children:ReactNode}) => {
  return (
    <div
      className={
        ` min-h-[80vh] md:min-h-[100vh] py-4 flex items-center justify-center ` + styles.authBg
      }
    >
        {children}
    </div>  )
}

export default layout