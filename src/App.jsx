import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Explore from "./pages/Explore"
import Offers from "./pages/Offers"
import Category from "./pages/Category"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Forgotpassword from "./pages/Forgotpassword"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Privateroute from "./components/Privateroute"
import CreateListing from "./pages/CreateListing"
import Listing from "./pages/Listing"
import Contact from "./pages/Contact"
import EditListing from "./pages/EditListing"
import RequestedRental from "./pages/RequestedRental"
import Userverification from "./pages/Userverification"
import RentalRequests from "./pages/RentalRequests"
import OrderPage from "./pages/OrderPage"
import OrderConfirmation from "./pages/OrderConfirmation"
import AdminDashBoard from "./pages/AdminDashBoard"
import FeedbackForm from "./pages/FeedbackForm"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import PrivcayPolicy from "./pages/PrivcayPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import ShippingPolicy from "./pages/ShippingPolicy"
import DamagePolicy from "./pages/DamagePolicy"

function App() {


  return (
    <>
      <Router>
                
          <Navbar/>

        <div className="mt-16 w-full">
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/category/:categoryName' element={<Category/>} />
          <Route path='/profile' element={<Privateroute/>}>
          <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup/>} />
          <Route path='/forgotpassword' element={<Forgotpassword/>} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/edit-listing/:listingId' element={<EditListing/>} />
          <Route path='/category/:categoryName/:listingId' element={<Listing/>} /> 
          <Route path='/contact/:landlordId' element={<Contact/>} /> 
          <Route path='/requestedItems' element={<RequestedRental/>} /> 
          <Route path='/rentalRequests' element={<RentalRequests/>} /> 
          <Route path='/verification' element={<Userverification/>} /> 
          <Route path='/order/:requestId/:productId' element={<OrderPage/>} /> 
          <Route path='/orderConfirmation/:orderId' element={<OrderConfirmation/>} />
          <Route path='/adminPanel/*' element={<AdminDashBoard/>} /> 
          <Route path='/feedback/:orderId' element={<FeedbackForm/>}/>
          <Route path='/feedback/:orderId' element={<FeedbackForm/>}/>
          <Route path='/privacy-policy' element={<PrivcayPolicy/>}/>
          <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>

          <Route path='/shipping-policy' element={<ShippingPolicy/>}/>
          <Route path='/damage-policy' element={<DamagePolicy/>}/>

        </Routes>
        </div>
       <Footer/>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
