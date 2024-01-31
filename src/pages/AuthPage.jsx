import React from 'react';
import AuthLayout from '../components/Layout/AuthLayout';
import { Outlet } from 'react-router-dom';
const AuthPage = () => {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
};

export default AuthPage;
