import { create } from "zustand";
import { auth, db } from "../firesbase/firebase";

import { createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,updateProfile,onAuthStateChanged,updateEmail, signOut } from "firebase/auth";
import {  setDoc,doc,getDoc, updateDoc,collection, getDocs } from "firebase/firestore"

const useAuthStore = create((set)=>({
    user:null,
    BankDetails:null,
    authisReady:false,
    setUser: (user) => set({ user }),
    setAuthIsReady: (ready) => set({ authIsReady: ready }),
    subscribeToAuthChanges: () => {
      onAuthStateChanged(auth, (user) => {
        set({ user, authIsReady: true });
      });
    },
    signup: async (email, password, name) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          if (res) {
            await updateProfile(res.user, { displayName: name });
            set({ user: res.user });
            await sendEmailVerification(auth.currentUser);
            console.log("Signup successful");
          }
        } catch (error) {
          console.error("Error during signup:", error.message);
          throw new Error(error.message);
        }
      },
      login: async(email,password) => {
        try{
            const res = await signInWithEmailAndPassword(auth,email,password);
        }
        catch(error) {
            throw new Error(error.message)
        }
      },
      sendVerificationMail : () => {
        try {
          sendEmailVerification(auth.currentUser)
        } catch (error) {
          throw new Error(error.message)
        }
      },
      ProfileUpdate : (user,name,email) => {
        try {
          updateProfile(user,{displayName:name});
            updateEmail(user,email);
        } catch (error) {
          throw new Error(error)
        }
      },
      updateBankDetails : async (BankName,AccountName,AccountNumber,id) => {
        try {
          await setDoc(doc(db,'BankDetails',id),{BankName,AccountName,AccountNumber})
        } catch (error) {
          throw new Error(error.message)
        }
      },
      updateProfileBankDetails : async (BankName,AccountName,AccountNumber,id) => {
        try {
          await updateDoc(doc(db,'BankDetails',id),{BankName,AccountName,AccountNumber})
        } catch (error) {
          throw new Error(error.message)
        }
      },
      getBankDetails : async (Id) => {
        const documentRef = doc(db,'BankDetails', Id);
        const documentSnapshot = await getDoc(documentRef);
      
        if (documentSnapshot.exists()) {
        
          set({BankDetails:documentSnapshot.data()})
          return ocumentSnapshot.data()
        } 
        else {
        return null;
        }
      },
      logout : async () => {
        try {
          await signOut(auth);
          set({ user: null });
        } catch (error) {
          console.error("Sign-out error:", error);
        
        }
      },
      getAllUsers :  async () => {
        try {
          // Reference to the "users" collection
          const usersCollectionRef = collection(db, "users");
      
          // Fetch all documents from the collection
          const querySnapshot = await getDocs(usersCollectionRef);
          // Map through the documents and extract user data
          const users = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Document ID
            ...doc.data(), // Spread the document data
          }));
      
          return users;
        } catch (error) {
          console.error("Error fetching users:", error);
          throw error; // Re-throw the error for handling in the calling function
        }
      },

}))


export default useAuthStore;