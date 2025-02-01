import { create } from "zustand";
import { db, storage } from "../firesbase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, getDoc, updateDoc, addDoc,collection,getDocs,orderBy } from "firebase/firestore";
import useAuthStore from "./userStore";

const TransactionStore = create((set) => ({
  Transaction: [],
  Giftcard:[],
  ImageArray: [],
  uploadImages: async (Images) => {
    try {
    
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
    
      return imageUrls;

    //   console.log(ImageArray);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  uploadGiftcard: async (
    Name,
    Icon,
    subCategory,
    userId,
    Rate,
    Amount,
    Country,
    email,
    Description,
    Images
  ) => {
    try {
      await setTimeout(() => {
        addDoc(collection(db, "Transactions"), {
          Type:'Giftcard',
          Name,
          Icon,
          subCategory,
          userId,
          Rate,
          Amount,
          Country,
          email,
          status: "Pending",
          date: Date.now(),
          Images,
          Description,
        });
      }, 3000);

      set({ImageArray:[]})
    } catch (error) {
      throw new Error(error.message);
    }
  },
  uploadCrypto: async (
    Name,
    Icon,
    userId,
    Rate,
    Amount,
    email,
    Description,
    Images
  ) => {
    try {
      await setTimeout(() => {
        addDoc(collection(db, "Transactions"), {
          Type:'Crypto',
          Name,
          Icon,
          userId,
          Rate,
          Amount,
          email,
          status: "Pending",
          date: Date.now(),
          Images,
          Description,
        });
      }, 3000);

      set({ImageArray:[]})
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getTransactions : async () => {
    try {
        const latest = await getDocs(
            collection(db, 'Transactions'),
            orderBy('date', '')
    
        );
    var dat=[]
        latest.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          dat.push(data)
        });

        set({Transaction : dat})
    
        console.log(dat);

      } catch (error) {
        console.error('Error fetching transactions: ', error);
      }
},
getGiftcards : async () => {
    try {
        const latest = await getDocs(
            collection(db, 'Giftcard'),
            orderBy('date', '')
    
        );
    var dat=[]
        latest.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          dat.push(data)
        });

        set({Giftcard : dat})
    
        console.log(dat);

      } catch (error) {
        console.error('Error fetching transactions: ', error);
      }
},
updateStatus : async (id,status) => {
    try {
        await updateDoc(doc(db,'Transactions',id),{status})
      } catch (error) {
        throw new Error(error.message)
      }
}
}));


export default TransactionStore;
