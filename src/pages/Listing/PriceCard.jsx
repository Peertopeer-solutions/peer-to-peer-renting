import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Request from '../../components/Request'
import RatingUI from '../../components/UI/RatingUI'
import AuthContext from '../../FirebaseAuthContext';


const PriceCard = ({listing, listingId, setShowRentalRequestForm, requestStatus, showRentalRequestForm}) => {
  const authCtx = useContext(AuthContext)

  const onClick = (() => {
    if (authCtx.currentUser) {
      setShowRentalRequestForm(true)
    }
    else {
      navigate("/sign-in")
    }
  })
  
  console.log(listingId)
  return (
    <div className="space-y-4 md:space-y-6  sticky top-0 box-border">
    <h1 className="text-[32px] font-medium capitalize text-primary ">
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
                  <span className="text-[16px] text-blue-500">
                     {listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="text-gray-400">/day</span>
                  </span>

                </div>
                <div className="flex flex-col items-center border shadow-lg p-1 space-y-1  justify-center rounded-md  bg-white">
                  <p className="text-[14px] text-gray-400 font-light">7 Days +</p>
                  <div className="text-[15px] text-blue-500">
                     {Math.round(listing.regularPrice * 4 / 7)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="text-gray-400">/day</span>
                  </div>

                </div>
                <div className="flex flex-col items-center border shadow-lg p-1  justify-center rounded-md  bg-white">
                  <p className="text-[14px] text-gray-400 font-light">30 Days +</p>
                  <span className="text-[15px] text-blue-500">
                     {Math.round(listing.regularPrice * 12 / 30)
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
  )
}

export default PriceCard
