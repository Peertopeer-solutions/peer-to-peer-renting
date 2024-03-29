import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/firebase.config';

const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(undefined);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
					setUser(user);
				}
				setCheckingStatus(false);
			});
		}
		return () => {
			isMounted.current = false;
		};
	}, []);

	return { loggedIn, checkingStatus, user };
};

export default useAuthStatus;
