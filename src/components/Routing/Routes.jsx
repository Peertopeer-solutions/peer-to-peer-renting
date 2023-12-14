import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundries/ErrorBoundry';
import PrivateRoute from '../PrivateRoute';
import RootLayout from '../Layout/RootLayout';
import { lazy } from 'react';

const UserListings = lazy(() => import('../ProfileComponents/UserListings'))
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
const Footer = lazy(() => import('../Footer'));
const PrivcayPolicy = lazy(() => import('../../pages/Policies/PrivcayPolicy'));
const TermsAndConditions = lazy(() => import('../../pages/Policies/TermsAndConditions'));
const ShippingPolicy = lazy(() => import('../../pages/Policies/ShippingPolicy'));
const DamagePolicy = lazy(() => import('../../pages/Policies/DamagePolicy'));
const Home = lazy(() => import('../../pages/Home'));



export const router = createBrowserRouter([
	{
				path: '*',
				element:<RootLayout/>,
				errorElement:<ErrorBoundary/>,
				children: [
					{
						path:'',
						element:<Home/>,
						errorElement:<ErrorBoundary />,
					},
					{
						path:'create-listing',
						element:<PrivateRoute/>,
						errorElement:<ErrorBoundary />,

						children:[
							{
								path:'',
								element:<CreateListing/>,
								errorElement:<ErrorBoundary />,

							
							}
						]
					},
					{
						path:'sign-in',
						element:<Signin/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'sign-up',
						element:<Signup/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'orderConfirmation/:orderId',
						element:<OrderConfirmation/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'feedback/:orderId',
						element:<FeedbackForm/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'termscondition',
						element:<TermsAndConditions/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'shippingpolicy',
						element:<ShippingPolicy/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'requesteditems',
						element:<ShippingPolicy/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'privacypolicy',
						element:<PrivcayPolicy/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'category/:categoryName',
						element:<Category/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:':categoryName/:listingId',
						element:<Listing/>,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'forgotpassword',
						element:<Forgotpassword />,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'edit-listing/:listingId',
						element:<EditListing />,
						errorElement:<ErrorBoundary />,

					},
					{
						path:'order/:requestId/:productId',
						element:<OrderPage/>,
						errorElement:<ErrorBoundary />,

					},
					//profile-route-nested
					{
						path:'profile',
						element:<PrivateRoute/>,
						children:[
							{
						path:'',
						element:<Profile/>,
						errorElement:<ErrorBoundary />,

						children:[
							{
								path:'listings',
								element:<UserListings/>,
								errorElement:<ErrorBoundary />,


							},
							{
								path:'requestedItems',
								element:<RequestedRental />,
								errorElement:<ErrorBoundary />,


							},
							{
								path:"rentalRequests",
								element:<RentalRequests/>,
								errorElement:<ErrorBoundary />,
							}
						]

					}
						]
					}
					
				]
			}	
]);

