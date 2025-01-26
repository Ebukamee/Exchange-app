import { create } from "zustand";
import { db,storage } from "../firesbase/firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {  setDoc,doc,getDoc, updateDoc,addDoc } from "firebase/firestore"

const TransactionStore = create(()=> ({
    Transaction:[],
    Images:[],
    uploadImages : async(Images) => {
        try {
            const uploadPromises = Images.map(async (Image) => {
              const Ref = ref(storage, "products");
              const ImagesRef = ref(Ref, Image.name);
              const metadata = {
                contentType: 'image/jpeg',
              };
        
              // Upload each image
              const snapshot = await uploadBytes(ImagesRef, Image, metadata);
              console.log('Uploaded Image:', snapshot);
        
              // Get the download URL
              const downloadURL = await getDownloadURL(ImagesRef);
              console.log('Download URL:', downloadURL);
        
              return downloadURL; // Return the download URL for this file
            });
        
            // Wait for all uploads to finish
            const urls = await Promise.all(uploadPromises);
            
            // Save all URLs in the state
            set({Images:urls});
            console.log('All uploaded URLs:', Images);
          }
        catch (error) {
           throw new Error(error.message)
        }
    },
    uploadGiftcard : async(Name,subCategory,userId,Rate,Amount,Country,email,Images) => {
        try {
            await setTimeout(() => {
                addDoc(collection(db, "Transactions"),{Name,subCategory,userId,Rate,Amount,Country,email,status:'confirmed',date:Date.now(),Images});
            }, 3000)
          } catch (error) {
           throw new Error(error.message)
          }
    }
}))

export default TransactionStore;