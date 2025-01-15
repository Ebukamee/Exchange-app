import { toaster } from "../components/ui/toaster";

 export const toast = (type, message, title) => {
    toaster.create({
      title: title,
      description: message,
      type: type,
    });
  };

  export const err = (s) => {
    let substr = s.substring(22,s.length - 2) + s.charAt(s.length-1);
    if(s="Firebase: Password should be at least 6 characters (auth/weak-password).") {
        return "Password Should be at least 6 characters";
    }
    
   return substr.charAt(0).toUpperCase() + substr.slice(1);
  }