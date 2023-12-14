import React, { useState } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import Explore from './Explore'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import Pagination from '../components/Pagination'
import Cta from '../components/UI/Cta'
import Features from '../components/UI/Features'


const Home = () => {

  const [totalDocs, setTotalDocs] = useState()
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const {pathName} = useLocation()

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["paginatedData", currentPage],
    async () => {
      const listingref = collection(db, "listings");
      let q = query(
        listingref, 
        orderBy('timestamp', 'desc'),
        limit(8));

      // Start after the last document from the previous page, if applicable.
      if (currentPage > 1) {
        q = query(
          listingref,
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing)
          , limit(8));
      }

      const snapshot = await getDocs(q);
      const countSnapShot = await getCountFromServer(listingref)
      console.log(countSnapShot.data().count)
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

  return (

        <>
          <Cta/>
          <Features/>  
          <Explore isLoading={isLoading} error={error} listings = {data}  />
          <Pagination  currentPage={currentPage}  totalItems={totalDocs} onPageChange={(pageNumber) => setCurrentPage(pageNumber)}/>
        </>
      
  
  );
}

export default Home
