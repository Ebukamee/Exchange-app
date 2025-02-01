import { toaster } from "../components/ui/toaster";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firesbase/firebase";
import { collection,addDoc } from "firebase/firestore";

export const toast = (type, message, title) => {
  toaster.create({
    title: title,
    description: message,
    type: type,
  });
};

export const err = (s) => {
  let substr = s.substring(22, s.length - 2) + s.charAt(s.length - 1);
  if (
    s ==
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return "Password Should be at least 6 characters";
  }

  return substr.charAt(0).toUpperCase() + substr.slice(1);
};
export const cut = (s) => {
  let index = s.indexOf(" ");
  if(s.includes(' ')) {
    return s.substring(0, index);
  }
  return s;
};

export const checkBankDetails = async (id) => {
  // Make this an async function
  try {
    const documentRef = doc(db, "BankDetails", id);
    const documentSnapshot = await getDoc(documentRef); // Await the Promise
    if (documentSnapshot.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking bank details:", error);
    return;
  }
};
export const  formatDate = (milliseconds) =>  {
    const date = new Date(milliseconds);

    // Get the date part: Oct 01 2024
    const dateOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    // Get the time part: 07:23pm
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions).toLowerCase();

    // Combine the date and time
    return `${formattedDate} ${formattedTime}`;
  }

 