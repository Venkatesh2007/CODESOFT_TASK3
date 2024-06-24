import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBCP8Pd6hWuZPGMq5wJSEL01mLyvrTs-f4",
    authDomain: "badam-blog.firebaseapp.com",
    projectId: "badam-blog",
    storageBucket: "badam-blog.appspot.com",
    messagingSenderId: "778992495626",
    appId: "1:778992495626:web:caa2d170c3cfbf7fe083f3",
    measurementId: "G-342JW4TBYY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider(); // Add GitHubAuthProvider
const signOut = () => {
    sessionStorage.removeItem('user');
    return auth.signOut();
};
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, githubProvider,signOut,db ,storage};
