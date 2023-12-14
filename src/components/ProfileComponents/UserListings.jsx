import React from 'react'
import { useState, useEffect, useCallback,lazy, Suspense, } from 'react'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
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

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase.config'
import ListingItem from '../Listingitem'
import Orders from '../Orders'
import ListingProfileTile from './ListingProfileTile'

const UserListings = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [orders, setOrders] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

console.log(listings)
console.log(orders)

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     console.log(user)
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // })

  const onLogout = () => {
    auth.signOut()
    navigate('/')
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
      navigate(`/profile`)
      toast.success('Successfully deleted listing')
    }
  }


  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  const isNotActiveStyle = 'text-[16px] md:text-[24px] my-3 font-semibold  px-3 flex items-center px-5 gap-3 text-gray-500   capitalize border ';
  const isActiveStyle = 'text-[16px] md:text-[24px] my-3 font-semibold  px-3 flex items-center px-7 gap-3 font-extrabold border-r-2  transition-all duration-200 ease-in-out capitalize';
  const [activeSection, setActiveSection] = useState('listings'); // Default to 'listings'

  return (
     <main className='h-full flex-col '>




        <div className='border-t-2 border-gray-500 flex justify-center  mx-auto w-3/4  overflow-y-scroll'>

          <button
            className={activeSection === 'listings' ? `${isActiveStyle}` : `${isNotActiveStyle}`}
            onClick={() => setActiveSection('listings')}
          >
            Your Listings
          </button>


          <button
            className={activeSection === 'orders' ? `${isActiveStyle}` : `${isNotActiveStyle}`}
            onClick={() => setActiveSection('orders')}
          >
            Your Orders
          </button>


        </div>

        <div className='flex mt-3 '>
          {activeSection === 'listings' && (
            <div className=''>

              {!loading && listings?.length > 0 ? (
                <>
                  <div className='  md:p-3 '>
                    {listings?.map((listing) => (
                      <ListingProfileTile
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
              ) : (<p className='my-3   px-3'>no listings</p>)}
            </div>
          )}

          {activeSection === 'orders' && (
            <div> {
              !loading && orders?.length > 0 ? (

                <div className='mx-auto'>
                  {orders?.map((order) => (
                    <Orders
                      orderArr={order}
                    />
                  ))
                  }
                </div>
              ) :
                (
                  <p className='my-3  px-3'>No orders</p>
                )
            }</div>

          )}




        </div>

      </main> 
  )
}

export default UserListings
