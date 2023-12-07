import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSetup from './pages/ProfileSetup';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundries/ErrorBoundry';
const UserListings = lazy(()=>import('./components/ProfileComponents/UserListings'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Category = lazy(() => import('./pages/Category/Category'));
const Profile = lazy(() => import('./pages/Profile'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Forgotpassword = lazy(() => import('./pages/Forgotpassword'));
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
		
			
			<div className='w-full'>
				
<Suspense fallback={<Spinner/>}>
				<Routes>
				
					<Route path='/' element={
						
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Home />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/category/:categoryName' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Category />
							</Suspense>
						</ErrorBoundary>
					} />
					
					<Route path='/profile' element={
					
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
							<Profile/>
							</Suspense>
						</ErrorBoundary>
				} >
          <Route path="requestedItems" element={
						<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
						<RequestedRental />
						</Suspense>
					</ErrorBoundary>
					} />
          <Route path="rentalRequests" element={
						<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
						<RentalRequests/>
						</Suspense>
					</ErrorBoundary>
					} />
          <Route path="listings" element={
						<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
						<UserListings/>
						</Suspense>
					</ErrorBoundary>
					} />
					</Route>
					<Route path='/sign-in' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Signin />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/sign-up' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Signup />
							</Suspense>
						</ErrorBoundary>
					} />
					{/* ... other routes */}
					<Route path='/forgotpassword' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Forgotpassword />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/create-listing' element={
					
				
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<CreateListing />
							</Suspense>
						</ErrorBoundary>

					}/>
		
					<Route path='/edit-listing/:listingId' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<EditListing />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/:categoryName/:listingId' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Listing />
							</Suspense>
						</ErrorBoundary>
					} />

					{/* <Route path='/requestedItems' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<RequestedRental />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/rentalRequests' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<RentalRequests />
							</Suspense>
						</ErrorBoundary>
					} /> */}
					<Route path='/verification' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<Userverification />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/order/:requestId/:productId' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<OrderPage />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/orderConfirmation/:orderId' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<OrderConfirmation />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/feedback/:orderId' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner/>}>
								<FeedbackForm />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/privacy-policy' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<PrivcayPolicy />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/terms-and-conditions' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<TermsAndConditions />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/shipping-policy' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<ShippingPolicy />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/damages-policy' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<DamagePolicy />
							</Suspense>
						</ErrorBoundary>
					} />
					<Route path='/profileset' element={
						<ErrorBoundary>
							<Suspense fallback={<Spinner />}>
								<ProfileSetup />
							</Suspense>
						</ErrorBoundary>
					} />
				</Routes></Suspense>

			</div>
			
		


			{!loading && <Footer />}

			<ToastContainer />
		</>
	);
}

export default App;
