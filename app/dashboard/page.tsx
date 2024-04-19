import CreatePost from "@/src/FE/components/CreatePosts";
import styles from "../../styles/styles.module.css";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Dashboard | Denonymous',
  robots:{
    index:false
  },
 
}

export default function page() {
return(  
<div className={`${styles.all} `}>
   <CreatePost />
  </div>
  )
}
