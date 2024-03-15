import React, { lazy, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FirebaseAuthProvider } from '../../FirebaseAuthContext';
const Footer = lazy(() => import('../Footer'));
import Navbar from '../Navbar';
import PageWrapper from './PageWrapper';
import Banner from '../Design/Banner';

import { useSelector } from 'react-redux';

const RootLayout = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const { isBannerVisible } = useSelector((state) => state.ui);
	return (
		<>
			<FirebaseAuthProvider>
				{/* {isBannerVisible && (
					<Banner
						text='You might not be able to use few features as you have not verified your email address.'
						linkText='Verify now'
					/>
				)} */}
				<header>
					<Navbar />
				</header>
				<PageWrapper>
					<main>
						<Outlet />
					</main>
				</PageWrapper>

				<Footer />
			</FirebaseAuthProvider>
			<ToastContainer />
		</>
	);
};

export default RootLayout;
