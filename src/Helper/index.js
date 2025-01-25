import { toaster } from "../components/ui/toaster";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firesbase/firebase";

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
