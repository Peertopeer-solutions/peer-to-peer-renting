import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { auth, db } from '../firebase.config'

const FeedbackForm = () => {
  const [user, setUser] = useState(null)

  const location = useLocation()
  const product = location.state.product
  const productId = location.state.productId
  const request = location.state.rental
  const order = location.state.order
  const [easeOfUseRating, setEaseOfUseRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [affordabilityRating, setAffordabilityRating] = useState(0);
  const [rentingExperienceRating, setRentingExperienceRating] = useState(0);
 
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

    });

    return ()=> {
      unsubscribe()
    }

  }, [])
  const handleSubmit = async() =>{

    setLoading(true)
    const docRef = await addDoc(collection(db, "feedback"), {
       productId: "Product ID",
       user: "User ID",
       text: "Feedback Text",
       easeOfuseRating: easeOfUseRating,
       affordabilityRating: affordabilityRating,
       rentingExperienceRating: rentingExperienceRating,
       tags: ["Feature Request", "Bug Report"],
       timestamp: serverTimestamp()
    });
    setLoading(false);
    toast.success("Thank you for your feedback");
    navigate(`/profile`);

  }
  console.log(product)
  const options = { dateStyle: 'long' };

  const startDate = new Date(request.startDate?.seconds * 1000).toLocaleString('en-US', options);
  const endDate = new Date(request.endDate?.seconds * 1000).toLocaleString('en-US', options);
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">Help us improve </h3>

            <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img className="w-full hidden md:block" src={product && product.imgUrls[0]} alt="dress" />
                <img className="w-full md:hidden" src={product && product.imgUrls[0]} alt="dress" />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.title}</h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Rental start: </span> {startDate}
                    </p>
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Rental End: </span> {endDate}
                    </p>

                  </div>
                </div>

              </div>
            </div>

          </div>
          {/* <div className='flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
              <form onSubmit={handleSubmmit}>

              </form>
            </div> */}
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Feedback</h3>

              <div className="flex justify-center items-center w-full space-y-4 flex-col pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Ease of use</p>
                  <div className="flex items-center">
                    
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setEaseOfUseRating(n)}
                        className={`mx-1 ${n <= easeOfUseRating ? "text-yellow-400" : "text-gray-400"
                          }`}
                      >
                        <span className="star">&#9733;</span>

                      </button>
                    ))}
                  </div>                        
                  </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Affordability</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setAffordabilityRating(n)}
                        className={`mx-1 ${n <= affordabilityRating ? "text-yellow-400" : "text-gray-400"
                          }`}
                      >
                        <span className="star">&#9733;</span>

                      </button>
                    ))}
                  </div>                        
                  </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Rental expeirence</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRentingExperienceRating(n)}
                        className={`mx-1 ${n <= rentingExperienceRating ? "text-yellow-400" : "text-gray-400"
                          }`}
                      >
                        <span className="star">&#9733;</span>

                      </button>
                    ))}
                  </div>                        
                  </div>

                  <div className="flex justify-between  w-full">
                    <textarea required onChange={()=>setComments(e.target.value)} placeholder="Share your concerns" cols="30" rows="10" className='border border-black w-full rounded-xl p-3'></textarea>

                  </div>


              </div>
           
            </div>
            {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                    <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                            <div class="w-8 h-8">
                                <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                            </div>
                            <div className="flex flex-col justify-start items-center">
                                <p className="text-lg leading-6 font-semibold text-gray-800">
                                    DPD Delivery
                                    <br />
                                    <span className="font-normal">Delivery with 24 Hours</span>
                                </p>
                            </div>
                        </div>
                        <p className="text-lg font-semibold leading-6 text-gray-800">Rs 300</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                    </div>
                </div> */}
          </div>
        </div>

      </div>
      <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                <button onClick={handleSubmit} className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Submmit feedback</button>
                            </div>
    </div>
  )
}

export default FeedbackForm
