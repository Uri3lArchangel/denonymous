
export function validateEmail(email: string): { status: "error"|"success" } {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 

    if (!emailRegex.test(email)) {
        return { status: "error"};
    }

    return { status: "success" };
}

export const validateUsername = (e:string)=>{
    if(e.match(/(\W)/g)){
      return false;
    }else{ 
      return true;
    }
   }