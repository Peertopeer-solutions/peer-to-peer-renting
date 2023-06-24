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

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [loadMore, setLoadMore] = useState(false)


  const params = useParams()


  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          where('category', '==', params.categoryName),

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
    if (listings?.length > 9) {
      setLoadMore(true)
    }
  }, [params.categoryName])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('category', '==', params.categoryName),
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

  console.log("listings", listings,params.  categoryName)


  return (
    <div className='category'>
      <header className='m-3 flex-col items-start '>

        <div className='flex items-center gap-1 text-[10px] mb-3'>
          <div>
            <img className='h-9' src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc=" alt="ICON" />
          </div>
          <div className='flex items-start flex-col'>
            <h1 className='text-xl'>Gandhinagar</h1>
            <p className='text-[16px]'>Daiict road, infocity...</p>
          </div>
        </div>
        <div className=' bg-slate-50 p-3 rounded-xl w-full md:w-max shadow-lg'>
        <h1 className= 'text-[25px] md:text-[35px] my-3 font-bold text-blue-700 '>Rent {params.categoryName} equipment in Gandhinagar</h1>
        <p className='tex-[16px] font-light'>Hire photography equipments from fellow photographer in Gandhinagar, over 50% cheaper than traditional rental houses  </p>
        </div>



      </header>


      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <div className=' grid sm:grid-cols-2 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-2 md:p-3 md:px-16 px-3'>
              {listings.map((listing) => listing.data.listingEnabled && (<Listingitem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />)
              )}
            </div>
          </main>

          <br />
          <br />
          {loadMore && lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category