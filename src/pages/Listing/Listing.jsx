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
// import { Helmet } from 'react-helmet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { db } from "../../firebase.config";
// import Spinner from "../../../public/assets/svg/shareIcon.svg";
// import shareIcon from "../../../public/assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { DateRangePicker } from "react-date-range";
import Request from "../../components/Request";
import RatingUI from "../../components/UI/RatingUI";
import AuthContext from '../../FirebaseAuthContext';
import { useQuery } from 'react-query';
import Spinner from "../../components/Spinner";
import SkeletonListing from "./SkeletonListing";



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

  const onClick = (() => {
    if (authCtx.currentUser) {
      setShowRentalRequestForm(true)
    }
    else {
      navigate("/sign-in")
    }
  })


  console.log("image", authCtx.currentUser)
  return (
    <>
     {showRentalRequestForm && (<div className="fixed inset-0 bg-black box-content opacity-60	z-20">

</div>)}
{
  isLoading ? 
  <div>
    <SkeletonListing/>
  </div>:(
    <main
    className="md:grid md:grid-cols-2 mx-auto  md:py-[5rem] md:gap-16 xl:px-24
       xl:gap-6 overflow-y-scroll mt-4"
  >
   
  
    <section  className="flex flex-col  w-full md:max-h-full">
      <div className="h-[350px]  md:h-[500px] overflow-hidden flex items-center bg-gray-100 border rounded-xl">
        <img
          className="h-full w-full  object-cover md:cursor-pointer"
          src={displayImage === null ? listing.imgUrls[0] : displayImage}
          alt="img"
        />
      </div>
      <div className="flex justify-start mt-4 items-center  overflow-x-scroll space-x-2 mx-auto">
        {
          listing.imgUrls.map((index) => (
            <button  className="bg-gray-100 rounded-lg  my-2 overflow-hidden " onClick={() => setDisplayImage(index)}>
  
              <img className="object-cover border shadow-xl  w-[100px] aspect-[4/3]" src={index} />
  
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
  
      <div className="hidden md:block m-2">
      <div className="flex flex-col space-y-2 leading-loose">
          <h1 className="text-[32px] font-bold">Description</h1>
          <p className="text  18px] font-normal whitespace-pre-line">{listing.description}</p>
        </div>
        <p className=" ">Location</p>
  
        <div className="w-full mx-auto h-36 border border-red-500 my-3">
              <h1 className="w-full h-96 border " ></h1>
              <h1 className=" h-96 border" ></h1>
              <h1 className="h-96" ></h1>
        </div>
      </div>
    </section>
  
    <section className={showRentalRequestForm?"pt-6 px-6 space-y-6 font-bold pb-10 md:p-0   z-1 ":"pt-6 px-4 space-y-6 font-bold pb-10 md:p-0 xl:sticky xl:top-0 z-1 "}>
      <div className="space-y-4 md:space-y-6 ">
        <h1 className="text-[32px] font-medium capit alize text-primary ">
          {listing.title}
        </h1>
        <div className="flex-col justify-between md:block ">
          <div className="">
            <div className="mx-auto xl:mr-24 bg-gray-50 rounded-xl  ">
              <div className="flex justify-between p-3 xl:p-6   ">
                <div className="flex space-x-2 px-1 items-center">
                <img src={authCtx.currentUser?.photoURL} alt="" className="w-9 rounded-full"/>
                <p className="font-semibold">{authCtx.currentUser?.displayName}</p>
                </div>
                <RatingUI rating={4} />
              </div>
  
              <div className="px-3 mb-3">
                {listing.offer
                  ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : <div className="grid grid-cols-3 place-item-center gap-2 xl:gap-6 font-normal -z-1">
                    <div className="flex flex-col items-center border shadow-lg py-3 space-y-1 justify-center rounded-md  bg-white">
                      <p className="text-[14px] text-gray-400 font-light">Daily</p>
                      <span className="text-[18px] text-blue-500">
                        ₹ {listing.regularPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="text-gray-400">/day</span>
                      </span>
  
                    </div>
                    <div className="flex flex-col items-center border shadow-lg p-1 space-y-1  justify-center rounded-md  bg-white">
                      <p className="text-[14px] text-gray-400 font-light">7 Days +</p>
                      <div className="text-[18px] text-blue-500">
                        ₹ {Math.round(listing.regularPrice * 4 / 7)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="text-gray-400">/day</span>
                      </div>
  
                    </div>
                    <div className="flex flex-col items-center border shadow-lg p-1  justify-center rounded-md  bg-white">
                      <p className="text-[14px] text-gray-400 font-light">30 Days +</p>
                      <span className="text-[18px] text-blue-500">
                        ₹ {Math.round(listing.regularPrice * 12 / 30)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="text-gray-400">/day</span>
                      </span>
  
                    </div>
  
  
  
                  </div>
                }
              </div>
  
  
              <div className="p-3 mx-auto w-full">
                {requestStatus ? (
                  <Link className=" text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded" to="/requestedItems">
                    Go to requested rental
                  </Link>
                ) : (
                  <div className=" mx-auto  ">
                    {showRentalRequestForm ? (
                      <Request
                        listing={listing}
                        listingId={listingId}
                        listingPrice = {listing.regularPrice}
                        onClose={() => setShowRentalRequestForm(false)}
                        
                      />
                    ) : (
                      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={onClick}>Check Availability and price</button>
                    )}
                  </div>
                )}
              </div>
  
            </div>
            {listing.offer && (
              <span className="text-sm md:text-2xl py-1 px-2 bg-blue-600 rounded-md ">
                <span>
                  {Math.round(
                    100 - (listing.discountedPrice * 100) / listing.regularPrice
                  )}{" "}
                  % OFF
                </span>
              </span>
            )}
          </div>
          <p className="text-sm md:text-2xl text-off line-through text-red-600">
            {listing.offer && <span>₹{listing.regularPrice}</span>}
          </p>
        </div>
        
  
      </div>
  
  
      <div className="flex md:hidden flex-col space-y-2 leading-loose">
  
          <h1 className="text-[24px] font-bold">Description</h1>
          <p className="text-[16px] font-normal whitespace-pre-wrap">{listing.description}</p>
        </div>
      <div className="md:hidden ">
        <p className="text-l">Location</p>
        <div className="w-full h-36 border border-red-500  mx-auto rounded-md">
  
        </div>
      </div>
  
    </section>
  </main>
  

  )
}


    </>
   

  );
};

export default Listing;
