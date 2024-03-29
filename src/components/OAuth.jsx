import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../../public/assets/svg/googleIcon.svg';

const OAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const buttonText =
		location.pathname === '/sign-up'
			? 'Sign up with Google'
			: 'Sign in with Google';

	const onGoogleClick = async (e) => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn,t exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timeStamp: serverTimestamp(),
				});
			}
			navigate('/');
		} catch (error) {
			console.error(error.message);
			toast.error('Could not authorize with Google');
		}
	};
	return (
		<button
			type='button'
			className='py-2 border-2 w-full bg-gray-100 rounded-lg flex items-center justify-center gap-2'
			onClick={onGoogleClick}
		>
			<img className='h-5 w-5' src={googleIcon} alt='google' />
			<span>{buttonText}</span>
		</button>
	);
};

const OAuthV1 = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const onGoogleClick = async (e) => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn,t exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timeStamp: serverTimestamp(),
				});
			}
			navigate(-1);
		} catch (error) {
			console.error(error.message);
			toast.error('Could not authorize with Google');
		}
	};

	return (
		<button
			className='ring-1 ring-black shadow-md flex items-center gap-2 p-3 rounded '
			onClick={onGoogleClick}
		>
			<p className='text-[18px]'>
				Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with
			</p>
		</button>
	);
};

export default OAuth;
