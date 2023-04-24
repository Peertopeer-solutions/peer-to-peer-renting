import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Listingitem from '../components/Listingitem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import Orders from '../components/Orders'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [orders, setOrders] = useState(null)
  const [user, setUser] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      const listingsRef = collection(db, 'listings')
      const ordersRef = collection(db, 'orders')
  
      const listingsQuery = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid)
      )
  
      const ordersQuery = query(
        ordersRef,
        where('userRef', '==', auth.currentUser.uid)
      )
  
      const [listingsQuerySnap, ordersQuerySnap] = await Promise.all([
        getDocs(listingsQuery),
        getDocs(ordersQuery)
      ])
  
     
      const listing = listingsQuerySnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
  
      const orders = ordersQuerySnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
    
      setListings(listing)
      setOrders(orders)
      setLoading(false)
    }
  
    setLoading(true)
    fetchData()
   
  }, [user])

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  })

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onList = (e) => {
    
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }


  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  return (
    <div className=' m-3 p-1'>
      <header className=''>
        <p className='text-[16px] md:text-[35px] my-3 font-semibold  px-3'>My Profile</p>
       
      </header>

      <main>
          <p className='text-[16px] md:text-[35px] my-3 font-semibold  px-3  '>Personal Details</p>
          

        <div className='my-3 p-3 bg-white shadow-2xl flex flex-col jsutify-start space-y-3 w-full md:w-max rounded-sm '>
          <form className='space-y-2'>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'p-2 ring-1 ring-black  rounded  w-full'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'p-2 ring-1 ring-black rounded w-full'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
          <Link to='/create-listing' className='bg-white rounded-full p-3 flex w-max  ring-2 ring-blue-700'>
          
          <p>rent your products</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
        {
          auth.currentUser.uid == 'QPaLnxFym0THZQcXOO27VmedDLF2' && (<Link to='/adminPanel' className='bg-white rounded-full p-3 flex w-max ring-2 ring-blue-700'>
          
          <p>Admin panel</p>
          <img src={arrowRight} alt='arrow right' />

        </Link>)
        }
        <div className='flex items-center justify-between'>
                  <p >Verification status : <span className='text-yellow-500 font-semibold'>PENDING</span></p>
                  <p
            className='text-[18px] md:text-[35px]'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'Edit'}
          </p>
        </div>
        </div>

       
        
            <p className='text-[16px] md:text-[35px] my-3 font-semibold  px-3'>Your Listings</p>

        {!loading && listings?.length > 0 ? (
          <>
            <div className=' grid grid-cols-2 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:p-3  px-3'>
              { listings?.map((listing) => (
                <Listingitem 
                  keyId={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                  onList={() => onList(listing.id)}
                />
              ))}
            </div>
            
          </>
        ):(<p className='my-3   px-3'>no listings</p>)}
        
        <p className='text-[16px] md:text-[35px] my-3 font-semibold  px-3'>Your orders</p>

        {
          !loading && orders?.length > 0 ?(

            <div>
              { orders?.map((order)=>(
                  <Orders
                  orderId = {order.id}
                  order = {order.data}
                  
                  />
              ))
              }
            </div>
          ):
          (
            <p className='my-3   px-3'>No orders</p>
          )
        }

      </main>
    </div>
  )
}

export default Profile