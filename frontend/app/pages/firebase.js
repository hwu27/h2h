// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";


const config = {
    apiKey: 'AIzaSyBk2cy7-rBxXftgGz1yDP2p8ExvDoLwsV0',
    authDomain: 'h2h-firebase.firebaseapp.com',
    projectId: 'h2h-firebase',
    storageBucket: 'h2h-firebase.appspot.com',
    messagingSenderId: '299562939435',
    appId: '1:299562939435:web:7ff002e91f5fa024df666e',
    measurementId: 'G-LETXYNHPDE'
};

const app = initializeApp(config);
const auth = getAuth(app);

export function LoginBtn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };
    return (<button className='flex items-center mb-12' onClick={signInWithGoogle}><FcGoogle className='mr-2'/>Sign in with Google</button>);
  }
  
export function SignOutBtn() {
    return auth.currentUser &&  (
        <button onClick = {() => auth.signOut}>Sign Out</button>
    )
}