import React, {lazy, Suspense} from "react"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"


const Category = lazy(() => import("./pages/Category"));
const Profile = lazy(() => import("./pages/Profile"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));

import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css'
import Privateroute from "./components/Privateroute"
const CreateListing = lazy(() => import("./pages/CreateListing"));
const Listing = lazy(() => import("./pages/Listing"));
const Contact = lazy(() => import("./pages/Contact"));
const EditListing = lazy(() => import("./pages/EditListing"));
const RequestedRental = lazy(() => import("./pages/RequestedRental"));
const Userverification = lazy(() => import("./pages/Userverification"));
const RentalRequests = lazy(() => import("./pages/RentalRequests"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
// import OrderConfirmation from "./pages/OrderConfirmation"
// import AdminDashBoard from "./pages/AdminDashBoard"
const FeedbackForm = lazy(() => import("./pages/FeedbackForm"));
const Footer = lazy(() => import("./components/Footer"));
const PrivcayPolicy = lazy(() => import("./pages/PrivcayPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const DamagePolicy = lazy(() => import("./pages/DamagePolicy"));
const Home = lazy(() => import("./pages/Home"))
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"))

function App() {


  return (
    <>
      
      <Router>
                
          <Navbar/>

        <Suspense>
        <div className="mt-16 w-full">
          <Routes>
          <Route path='/' element={<Home/>} />

          <Route path='/category/:categoryName' element={<Category/>} />
          <Route path='/profile' element={<Privateroute/>}>
          <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup/>} />
          <Route path='/forgotpassword' element={<Forgotpassword/>} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/edit-listing/:listingId' element={<EditListing/>} />
          <Route path='/:categoryName/:listingId' element={<Listing/>} /> 
          <Route path='/contact/:landlordId' element={<Contact/>} /> 
          <Route path='/requestedItems' element={<RequestedRental/>} /> 
          <Route path='/rentalRequests' element={<RentalRequests/>} /> 
          <Route path='/verification' element={<Userverification/>} /> 
          <Route path='/order/:requestId/:productId' element={<OrderPage/>} /> 
          <Route path='/orderConfirmation/:orderId' element={<OrderConfirmation/>} />
          {/* <Route path='/adminPanel/*' element={<AdminDashBoard/>} />  */}
          <Route path='/feedback/:orderId' element={<FeedbackForm/>}/>
          <Route path='/feedback/:orderId' element={<FeedbackForm/>}/>
          <Route path='/privacy-policy' element={<PrivcayPolicy/>}/>
          <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>

          <Route path='/shipping-policy' element={<ShippingPolicy/>}/>
          <Route path='/damages-policy' element={<DamagePolicy/>}/>

        </Routes>
        </div>
        </Suspense>
       
        
       <Footer/>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
