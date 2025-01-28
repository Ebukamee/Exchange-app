import { create } from "zustand";
import { db, storage } from "../firesbase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";

const TransactionStore = create(() => ({
  Transaction: [],
  Images: [],
  uploadImages: async (Images) => {
    try {
      //  const uploadPromises = Images.map(async (Image) => {
      //   const Ref = ref(storage, "products");
      //   const ImagesRef = ref(Ref, Image.name);
      //   const metadata = {
      //     contentType: 'image/jpeg',
      //   };

      //   // Upload each image
      //   const snapshot = await uploadBytes(ImagesRef, Image, metadata);
      //   console.log('Uploaded Image:', snapshot);

      //   // Get the download URL
      //   const downloadURL = await getDownloadURL(ImagesRef);
      //   console.log('Download URL:', downloadURL);

      //   return downloadURL; // Return the download URL for this file
      // });

      // // Wait for all uploads to finish
      // const urls = await Promise.all(uploadPromises);

      // // Save all URLs in the state
      // set({Images:urls});
      // console.log('All uploaded URLs:', Images);
      const imageUrls = await Promise.all(
        Images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          
          // Add required Cloudinary parameters
          formData.append("upload_preset", "Blixexchange"); // Replace with your actual upload preset
          // formData.append("api_key", "your_api_key"); // Only needed for signed uploads
    
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/drzxvn4sl/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary error: ${errorData.error.message}`);
          }
    
          const data = await response.json();
          return data.secure_url; // Cloudinary returns URLs in secure_url property
        })
      );
    
      console.log("Uploaded Image URLs:", imageUrls);
    //   return imageUrls;

      console.log(imageUrls);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  uploadGiftcard: async (
    Name,
    subCategory,
    userId,
    Rate,
    Amount,
    Country,
    email,
    Descrption,
    Images
  ) => {
    try {
      await setTimeout(() => {
        addDoc(collection(db, "Transactions"), {
          Name,
          subCategory,
          userId,
          Rate,
          Amount,
          Country,
          email,
          status: "confirmed",
          date: Date.now(),
          Images,
          Descrption,
        });
      }, 3000);
    } catch (error) {
      throw new Error(error.message);
    }
  },
}));

export default TransactionStore;
