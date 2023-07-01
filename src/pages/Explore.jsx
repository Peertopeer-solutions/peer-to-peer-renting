import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { categories } from '../assets/data'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Listingitem from '../components/Listingitem'
import Cta from '../components/Cta'
import Features from '../components/Features'


const Explore = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [loadMore, setLoadMore] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0);



  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings()
    if (listings?.length > 4) {
      setLoadMore(true)
    }

  }, [])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }
  console.log("last", lastFetchedListing)

  return (
    <>
      <div className="">


        <main className='flex flex-col'>
          {/* <Slider/> */}


          <div>
            <div className='md:m-7  mt-12 mb-12'>
              <p className="text-2xl text-gray-800 md:text-[35px] m-3 mb-5 md:px-16 uppercase">Categories</p>

              <div className='grid gap-[16px] md:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-3 md:px-16' >
                {categories.map((data) => (
                  <div className='w-full bg-white drop-shadow-lg rounded-lg ' key={data.name}>
                    <Link to={`category/${data.name}`}  >
                      <div key={data.name} className='mx-auto w-full border rounded-full'>
                        <div className='flex item-center'>
                          <img src={data.image} loading="lazy" alt="" className="rounded-tl-lg rounded-tr-lg h-24 w-full object-cover md:h-36 " />

                        </div>
                        <div className='rounded-lg h-12 flex   items-center bg-white'>
                          <p className=" text-sm md:text-lg w-[100%] p-1 text-center ">{data.name}</p>

                        </div>

                      </div>
                    </Link>
                  </div>



                ))}
              </div>
            </div>

           <div className='md:m-7 mt-12 mb-12'>
           {loading ? (
              <Spinner />
            ) : listings && listings.length > 0 ? (
              <>
                <main className=''>

                  <h1 className='text-2xl text-gray-800 md:text-[35px] m-3 mb-5 mt-5  uppercase md:px-16 '>Trending products</h1>
                  <div className=''>
                    <div className="grid sm:grid-cols-2 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-2 md:p-3 md:px-16 px-3">
                      {listings.map((listing,) => listing.data.listingEnabled && (

                        <Listingitem
                          listing={listing.data}
                          id={listing.id}
                          keyId={listing.id}

                        />




                      )
                      )}
                      {loadMore && lastFetchedListing && (
                        <div className=''>
                          <p className='text-black' onClick={onFetchMoreListings}>
                          Load More
                        </p>
                        </div>
                        
                      )}
                    </div>
                    </div>



                </main>

                <br />
                <br />

              </>
            ) : (
              <p>No more listing</p>
            )}
           </div>
          </div>

        </main>
      </div>
    </>

  )
}

export default Explore