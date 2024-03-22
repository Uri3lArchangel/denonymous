import CreatePost from "@/src/FE/components/CreatePosts";
import styles from "../styles/styles.module.css";


export default function page() {
return(  
<div className={`${styles.all} `}>
   <CreatePost />
  </div>
  )
}
