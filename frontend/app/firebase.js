// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

{/* WIP - Implement more robust account error alerts */}
export function GoogleSignInBtn() {

    const router = useRouter();
    
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (!userDocSnap.exists()) {
            router.push(`/welcome/${user.uid}`);
          } else {
            router.push(`/dashboard/${user.uid}`);
          }
        }).catch((error) => {
          console.log(error.message)
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

      router.push(`/welcome/${user.uid}`);
    })
    .catch((error) => {
      console.log(error.code);
      if (error.code === 'auth/invalid-credential') {
        return alert('Invalid credentials');
      }
    });
  }
  return (<button className='flex items-center mb-12 text-xl font-bold hover:text-gray-200' onClick={signInWithEmail}>Sign in</button>)
}

export function SignUpBtn({ email, password }) {
  const router = useRouter();

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      router.push(`/welcome/${user.uid}`);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return alert('Email already in use');
      }
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
        <a className='font-bold hover:text-gray-200 cursor-pointer whitespace-nowrap mx-2' onClick = {signOutUser}>Sign Out</a>
    )
}