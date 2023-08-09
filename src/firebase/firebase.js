import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8X_a_OgR6PeLavbbqW0tExTyP_PDqK04",
    authDomain: "status-project-4b538.firebaseapp.com",
    projectId: "status-project-4b538",
    storageBucket: "status-project-4b538.appspot.com",
    messagingSenderId: "811567655897",
    appId: "1:811567655897:web:d97624568f1758ec2d07c8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
