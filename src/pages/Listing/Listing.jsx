import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase.config";
import Request from "../../components/Request";
import RatingUI from "../../components/UI/RatingUI";
import AuthContext from '../../FirebaseAuthContext';
import { useQuery } from 'react-query';
import SkeletonListing from "./SkeletonListing";
import GeocodingApi from "../../components/Mapping/GeocodingApi";
import ReviewList from "../../components/ReviewSection/ReviewList";
import PageWrapper from "../../components/Layout/PageWrapper";
import PriceCard from "./PriceCard";

import { IoIosHeart } from "react-icons/io";


const Listing = () => {

  const [displayImage, setDisplayImage] = useState(null)
  const [requestStatus, setRequeststatus] = useState(false);

  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const [showRentalRequestForm, setShowRentalRequestForm] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const authCtx = useContext(AuthContext)
  const listingId = params.listingId;

  useEffect(() => {

    const checkExistingRequest = async () => {
      const rentalRequestsRef = collection(db, "rentalRequest");
      if (authCtx.currentUser) {
        console.log("usr exists");
        const q = query(
          rentalRequestsRef,
          where("productId", "==", listingId),
          where("userId", "==", authCtx.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        console.log(snapshot);
        if (!snapshot.empty) {
          setRequeststatus(true);
        }
      }
    };
    checkExistingRequest();
    console.log(requestStatus);
  }, [authCtx, listingId]);

  const fetchListing = async () => {
    const docRef = doc(db, "listings", listingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Listing not found');
    }
  };

  const { data: listing, isLoading, isError } = useQuery(['listing', listingId], fetchListing);


  if (isError) {
    return <div>Error fetching data</div>;
  }


  return (
    <>
      {showRentalRequestForm && (<div className="fixed inset-0 bg-black box-content opacity-60	z-20">

      </div>)}
      {
        isLoading ?
          <div>
            <SkeletonListing />
          </div> : (
              <PageWrapper>
                 <main
                className="md:grid md:grid-cols-2 mx-auto   md:gap-16 
                xl:gap-6 md:h-[100vh] overflow-y-scroll no-scrollbar "
              >
                <section className=" w-full md:max-h-full block">
                  <div className="relative w-full aspect-[4/3] flex items-center bg-gray-100 border rounded-xl">
                    <div className="flex flex-col flex-1 absolute top-6 right-6 space-y-4">
                      <p>Share</p>
                      <p>Whislist</p>
                    </div>
                    <img
                      className="h-full w-full object-cover md:cursor-pointer rounded-2xl"
                      src={displayImage === null ? listing.imgUrls[0] : displayImage}
                      alt="img"
                    />
                  </div>
                  <div className="flex justify-start mt-4 items-center  overflow-x-scroll space-x-2 mx-auto">
                    {
                      listing.imgUrls.map((index) => (
                        <button key={index} className="bg-gray-100 rounded-lg  my-2 overflow-hidden " onClick={() => setDisplayImage(index)}>

                          <img className="object-cover border shadow-xl  w-[150px] aspect-[4/3]" src={index} />

                        </button>
                      ))
                    }
                  </div>

                  {/* <button
                  className="absolute grid place-content-center top-1/2 -translate-y-1/2 left-5 rounded-full bg-light p-3 active:scale-110 active:text-element md:hidden">
              </button> */}

                  {/* <button
                  className="absolute grid place-content-center top-1/2 -translate-y-1/2 right-5 rounded-full bg-light p-3 active:scale-110 active:text-element  md:hidden">
              </button> */}

                  {/* <div className="hidden md:grid grid-cols-4 gap-8">thumbnail</div> */}

                  <div className="hidden md:block ">
                    <div className="flex flex-col space-y-2 leading-loose mb-4">
                      <h1 className="text-[24px] font-semibold text-gray-900 ">Description</h1>
                      <p className="text-gray-700 font-normal whitespace-pre-line">Great as always, item returned as borrowed
                      </p>
                    </div>
                    <div className=" text-[32px] font-semibold space-y-2">
                      <p className=" text-2xl font-semibold text-gray-900 mb-4">Location</p>
                      <div className="">
                        <GeocodingApi pincode={listing.pincode} />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                  <ReviewList />

                  </div>

                </section>

                <section className={showRentalRequestForm ? "pt-6 space-y-6 font-bold pb-10 md:p-0 z-1 " : "pt-6 space-y-6 font-bold pb-10 md:p-0 z-1 "}>

                  <PriceCard listingId={listingId} requestStatus={requestStatus} listing={listing} setShowRentalRequestForm={setShowRentalRequestForm} showRentalRequestForm={showRentalRequestForm} />

                  <div className="flex md:hidden flex-col space-y-2 leading-loose">

                    <h1 className="text-[24px] font-bold text-gray-900 mb-4">Description</h1>
                    <p className="text-[16px] font-normal text-gray-700 whitespace-pre-wrap">{listing.description}</p>
                  </div>
                  <div className="md:hidden ">
                    <p className="text-2xl font-normal text-gray-900 mb-4">Location</p>
                    <div className="">
                      <GeocodingApi pincode={listing.pincode} />
                    </div>
                  </div>
                  <div className="md:hidden">
                  <ReviewList />

                  </div>


                </section>

              </main>
              </PageWrapper>
             

       
            

          )
      }


    </>


  );
};

export default Listing;
