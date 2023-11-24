 import firebase from "firebase/compat/app";
 import "firebase/compat/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyAQ4NLkYArBqsrgoJbt08QCxXiLdTjOGpg",
  authDomain: "ecommerce-23dac.firebaseapp.com",
  projectId: "ecommerce-23dac",
  storageBucket: "ecommerce-23dac.appspot.com",
  messagingSenderId: "1093320182270",
  appId: "1:1093320182270:web:382d52413fc59ff1e318af"
};

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 
firebase.initializeApp(firebaseConfig);

export default firebase;
