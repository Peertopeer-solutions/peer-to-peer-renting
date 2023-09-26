import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const Category = lazy(() => import('./pages/Category'));
const Profile = lazy(() => import('./pages/Profile'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Forgotpassword = lazy(() => import('./pages/Forgotpassword'));

import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSetup from './pages/ProfileSetup';
import Spinner from './components/Spinner';

const Privateroute = lazy(() => import('./components/Privateroute'));
const CreateListing = lazy(() => import('./pages/CreateListing'));
const Listing = lazy(() => import('./pages/Listing/Listing'));
const Contact = lazy(() => import('./pages/Contact'));
const EditListing = lazy(() => import('./pages/EditListing'));
const RequestedRental = lazy(() => import('./pages/RequestedRental'));
const Userverification = lazy(() => import('./pages/Userverification'));
const RentalRequests = lazy(() => import('./pages/RentalRequests'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
// import OrderConfirmation from "./pages/OrderConfirmation"
// import AdminDashBoard from "./pages/AdminDashBoard"
const FeedbackForm = lazy(() => import('./pages/FeedbackForm'));
const Footer = lazy(() => import('./components/Footer'));
const PrivcayPolicy = lazy(() => import('./pages/PrivcayPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const DamagePolicy = lazy(() => import('./pages/DamagePolicy'));
const Home = lazy(() => import('./pages/Home'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
import Cta from './components/UI/Cta'
import Features from './components/UI/Features'
import LandingPage from './components/LandingPage';
function App() {
	const [loading, setLoading] = useState(true);
	const { pathname } = useLocation();
	console.log(pathname)
	// Simulate a delay for loading purposes
	useEffect(()=>{
		window.scrollTo(0,0)
	},[pathname])
	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1000); // Adjust the delay time as needed

		return () => clearTimeout(timeout);
	}, []);
	return (
		<>
			<Navbar />
		<Routes>
			<Route path='/' element={<LandingPage/>}/>

		</Routes>

			<Suspense >
				<div className=' h-[100%] pt-9 w-full'>
					<Routes>
						<Route path='/' element={<Home/>} />
						<Route path='/category/:categoryName' element={<Category/>} />
						<Route path='/profile' element={<Privateroute />}>
							<Route path='/profile' element={<Profile />} />
						</Route>
						<Route path='/sign-in' element={<Signin />} />
						<Route path='/sign-up' element={<Signup />} />
						<Route path='/forgotpassword' element={<Forgotpassword />} />
						<Route path='/' element={<Privateroute />}>
							<Route path='/create-listing' element={<CreateListing />} />
						</Route>

						<Route path='/edit-listing/:listingId' element={<EditListing />} />
						<Route path='/:categoryName/:listingId' element={<Listing />} />
						<Route path='/contact/:landlordId' element={<Contact />} />
						<Route path='/requestedItems' element={<RequestedRental />} />
						<Route path='/rentalRequests' element={<RentalRequests />} />
						<Route path='/verification' element={<Userverification />} />
						<Route
							path='/order/:requestId/:productId'
							element={<OrderPage />}
						/>
						<Route
							path='/orderConfirmation/:orderId'
							element={<OrderConfirmation />}
						/>
						{/* <Route path='/adminPanel/*' element={<AdminDashBoard/>} />  */}
						<Route path='/feedback/:orderId' element={<FeedbackForm />} />
						<Route path='/feedback/:orderId' element={<FeedbackForm />} />
						<Route path='/privacy-policy' element={<PrivcayPolicy />} />
						<Route
							path='/terms-and-conditions'
							element={<TermsAndConditions />}
						/>

						<Route path='/shipping-policy' element={<ShippingPolicy />} />
						<Route path='/damages-policy' element={<DamagePolicy />} />
						<Route path='/profileset' element={<ProfileSetup/>} />
					</Routes>
				</div>
			</Suspense>

			{!loading && <Footer />}

			<ToastContainer />
		</>
	);
}

export default App;
