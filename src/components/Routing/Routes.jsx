import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundries/ErrorBoundry';

import RootLayout from '../Layout/RootLayout';
import { Suspense, lazy } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import Spinner from '../Spinner';
import AuthPage from '../../pages/AuthPage';
// import Profile from '../../pages/Profile';
import EmailVerification from '../../pages/EmailVerification';
const UserListings = lazy(() => import('../ProfileComponents/UserListings'));
const OrderConfirmation = lazy(() => import('../../pages/OrderConfirmation'));
const Category = lazy(() => import('../../pages/Category/Category'));
const Profile = lazy(() => import('../../pages/Profile'));
const Signin = lazy(() => import('../../pages/Signin'));
const Signup = lazy(() => import('../../pages/Signup'));
const Forgotpassword = lazy(() => import('../../pages/Forgotpassword'));
const CreateListing = lazy(() => import('../../pages/CreateListing'));
const Listing = lazy(() => import('../../pages/Listing/Listing'));
const Contact = lazy(() => import('../../pages/Contact'));
const EditListing = lazy(() => import('../../pages/EditListing'));
const RequestedRental = lazy(() => import('../../pages/RequestedRental'));
const Userverification = lazy(() => import('../../pages/Userverification'));
const RentalRequests = lazy(() => import('../../pages/RentalRequests'));
const OrderPage = lazy(() => import('../../pages/OrderPage'));
const FeedbackForm = lazy(() => import('../../pages/FeedbackForm'));

const PrivcayPolicy = lazy(() => import('../../pages/Policies/PrivcayPolicy'));
const TermsAndConditions = lazy(() =>
	import('../../pages/Policies/TermsAndConditions')
);
const ShippingPolicy = lazy(() =>
	import('../../pages/Policies/ShippingPolicy')
);
const DamagePolicy = lazy(() => import('../../pages/Policies/DamagePolicy'));
const Home = lazy(() => import('../../pages/Home'));

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	if (checkingStatus) {
		return <Spinner />;
	}

	return loggedIn ? <Outlet /> : <Navigate to={routes.signin} />;
};

export const routes = {
	signin: '/auth/sign-in',
	signup: '/auth/sign-up',
	emailVerification: '/auth/verify',
	home: '/',
	createListing: '/create-listing',
	profile: '/profile',
	listings: '/profile/listings',
	requestedItems: '/profile/requestedItems',
};

export const router = createBrowserRouter([
	{
		path: '*',
		element: <RootLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: '',
				element: <Home />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'create-listing',
				element: <PrivateRoute />,
				errorElement: <ErrorBoundary />,

				children: [
					{
						path: '',
						element: <CreateListing />,
						errorElement: <ErrorBoundary />,
					},
				],
			},

			{
				path: 'orderConfirmation/:orderId',
				element: <OrderConfirmation />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'feedback/:orderId',
				element: <FeedbackForm />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'termscondition',
				element: <TermsAndConditions />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'damagepolicy',
				element: <DamagePolicy />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'shippingpolicy',
				element: <ShippingPolicy />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'requesteditems',
				element: <ShippingPolicy />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'privacypolicy',
				element: <PrivcayPolicy />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'category/:categoryName',
				element: <Category />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: ':categoryName/:listingId',
				element: <Listing />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'forgotpassword',
				element: <Forgotpassword />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'edit-listing/:listingId',
				element: <EditListing />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'order/:requestId/:productId',
				element: <OrderPage />,
				errorElement: <ErrorBoundary />,
			},
			//profile-route-nested
			{
				path: 'profile',
				element: <PrivateRoute />,
				children: [
					{
						path: '',
						element: <Suspense fallback={<Spinner />}><Profile /></ Suspense>,
						errorElement: <ErrorBoundary />,

						children: [
							{
								path: 'listings',
								element: <UserListings />,
								errorElement: <ErrorBoundary />,
							},
							{
								path: 'requestedItems',
								element: <RequestedRental />,
								errorElement: <ErrorBoundary />,
							},
							{
								path: 'rentalRequests',
								element: <RentalRequests />,
								errorElement: <ErrorBoundary />,
							},
						],
					},
				],
			},
		],
	},
	{
		path: 'auth',
		element: <AuthPage />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: 'sign-in',
				element: <Signin />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'sign-up',
				element: <Signup />,
				errorElement: <ErrorBoundary />,
			},
			{
				path: 'verify',
				element: <EmailVerification />,
				errorElement: <ErrorBoundary />,
			},
		],
	},
]);
