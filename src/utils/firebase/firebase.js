import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoXFXMvOAkhS8DjP9h4d4vIi_Al6ViW3k",
    authDomain: "tndra-db.firebaseapp.com",
    projectId: "tndra-db",
    storageBucket: "tndra-db.appspot.com",
    messagingSenderId: "631507779907",
    appId: "1:631507779907:web:aff3311acc1f77928e2ff6"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // check if user data exists
    if(userSnapshot.exists()) {
        // if exists, return user doc ref
        return userDocRef;
    }
    // else: create/setDoc with data from userAuth in my collection
    else {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (e) {
            console.log('error creating the user', e.message);
        }
    }

    

};