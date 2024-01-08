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
  getCountFromServer,
} from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import Listingitem from '../../components/Listingitem'
import Wrapper from '../../components/Layout/PageWrapper'
import { useQuery } from 'react-query'
import PageWrapper from '../../components/Layout/PageWrapper'
import Pagination from '../../components/Pagination'
import ContentWrapper from '../../components/Layout/ContentWrapper'
import SkeletonPost from '../../components/Skeletons/SkeletonPost'

function Category() {
  const [totalDocs, setTotalDocs] = useState()
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);



  const [loadMore, setLoadMore] = useState(false)


  const params = useParams()
  const categoryName = params.categoryName

  const { data: listings, isLoading, error } = useQuery(
    ["paginatedData", currentPage, categoryName],
    async () => {
      const listingref = collection(db, "listings");
      let q = query(
        listingref,
        where('category', '==', categoryName),
        orderBy('timestamp', 'desc'),
        limit(8));

      // Start after the last document from the previous page, if applicable.
      if (currentPage > 1) {
        q = query(
          listingref,
          where('category', '==', categoryName),
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing)
          , limit(8));
      }

      const snapshot = await getDocs(q);
      console.log(snapshot)
      const countSnapShot = await getCountFromServer(q)
      setTotalDocs(countSnapShot.data().count)
      setLastFetchedListing(snapshot.docs[snapshot.docs.length - 1])
      const listings = []

      snapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      return listings
    }
  );

  console.dir(listings, totalDocs)


  return (
    <PageWrapper>
      <>
        <div className=''>
          <header className=' flex-col items-start '>

            <div className='flex items-center gap-1 text-[10px] mb-3'>
              <div>
                <img className='h-9' src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc=" alt="ICON" />
              </div>
              <div className='flex items-start flex-col'>
                <h1 className='text-xl'>Gandhinagar</h1>
                <p className='text-[16px]'>Daiict road, infocity...</p>
              </div>
            </div>
            <div className='h-[300px] bg-slate-50 p-3 rounded-xl w-full md:w-max shadow-lg'>
              <h1 className='text-[25px] md:text-[35px] my-3 font-bold text-blue-700 '>Rent {params.categoryName} equipment in Gandhinagar</h1>
              <p className='tex-[16px] font-light'>Hire photography equipments from fellow photographer in Gandhinagar, over 50% cheaper than traditional rental houses  </p>
            </div>



          </header>



          {isLoading ? (
            <div className='grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:p-3 '>
              {[...Array(10).keys()].map(i => (
                <SkeletonPost />
              ))}
            </div>



          ) : listings && listings.length > 0 ? (
            <>
              <main className='my-12'>
                <div className=' grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2  z-0'>
                  {listings.map((listing) => listing.data.listingEnabled && (<Listingitem className="border border-1px"
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
          <Pagination currentPage={currentPage} totalItems={totalDocs} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />

        </div></>

    </PageWrapper>

  )
}

export default Category