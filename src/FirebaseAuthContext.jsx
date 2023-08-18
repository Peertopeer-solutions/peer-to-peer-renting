import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useMemo } from 'react';
import { auth } from './firebase.config';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({});

const FirebaseAuthProvider = (props) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		console.log('I am running.');
		const userAuthListener = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				setUser(user);
			}
		});
		return userAuthListener;
	}, []);
	const signOut = () => {
		auth.signOut();
		setUser(null);
		navigate('/');
	};

	const value = useMemo(() => {
		return {
			currentUser: user,
			setCurrentUser: setUser,
			signOut: signOut,
		};
	}, [user]);
	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};
export { FirebaseAuthProvider };
export default AuthContext;
