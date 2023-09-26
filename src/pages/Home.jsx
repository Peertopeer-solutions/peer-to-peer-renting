import React, { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  startAt,
  endBefore,
  getCountFromServer,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


import Explore from './Explore'
import DatePickerStyled from '../components/UI/DatePickerStyled'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import Pagination from '../components/Pagination'

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
        limit(10));

      // Start after the last document from the previous page, if applicable.
      if (currentPage > 1) {
        q = query(
          listingref,
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing)
          , limit(10));
      }

      const snapshot = await getDocs(q);
      const countSnapShot = await getCountFromServer(listingref)
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

          <Explore isLoading={isLoading} error={error} listings = {data} currentPage={currentPage}  totalItems={totalDocs} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
          <Pagination  currentPage={currentPage}  totalItems={totalDocs} onPageChange={(pageNumber) => setCurrentPage(pageNumber)}/>

        </>
      
  
  );
}

export default Home
