import { create } from "zustand";
import { auth } from "../firesbase/firebase";

import { createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,updateProfile,onAuthStateChanged,updateEmail } from "firebase/auth";

const useAuthStore = create((set)=>({
    user:null,
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
}))


export default useAuthStore;