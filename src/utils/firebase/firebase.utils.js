import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
    createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBdJHD41M1dXi8mYWxOKx-lTgAOU4Va6ZM",
	authDomain: "crwn-clothing-db-acf49.firebaseapp.com",
	projectId: "crwn-clothing-db-acf49",
	storageBucket: "crwn-clothing-db-acf49.appspot.com",
	messagingSenderId: "468820945385",
	appId: "1:468820945385:web:808490d69b03af2fec0378",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const creatAt = new Date();

		try {
			setDoc(userDocRef, {
				displayName,
				email,
				creatAt,
                ...additionalInformation
			});
		} catch (error) {
			console.log("Error creatinf the user", error.message);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const userAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async () =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
