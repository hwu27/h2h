// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation'


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

{/* WIP handle errors and displays*/}
export function GoogleSignInBtn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    };
    return (<button className='flex items-center mb-12 font-bold hover:text-gray-200' onClick={signInWithGoogle}><FcGoogle className='mr-2'/>Sign in with Google</button>);
  }

export function SignInBtn({ email, password }) {
  const router = useRouter();

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      router.push(`/dashboard/${user.uid}`);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  return (<button className='flex items-center mb-12 text-xl font-bold hover:text-gray-200' onClick={signInWithEmail}>Sign in</button>)
}

export function SignUpBtn({ email, password }) {
  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  return (<button className='flex items-center mb-12 text-xl font-bold hover:text-gray-200' onClick={signUpWithEmail}>Sign up</button>)
}

export function SignOutBtn() {
    const signOutUser = () => {
      signOut(auth).then(() => {
        console.log('Signed out');
      }).catch((error) => {
        console.error(error);
      });
    };

    return auth.currentUser &&  (
        <button onClick = {signOutUser}>Sign Out</button>
    )
}