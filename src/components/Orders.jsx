import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import React, { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase.config'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Orders = ({order,orderId}) => {
  const [product, setProduct] = useState(null)
  const [Loading, setLoading] = useState(true)
  const [rentals, setRentals] = useState(null)
  const [orderDetails, SetOrderDetails] = useState(null)
  const navigate = useNavigate()
  const [toogleDetails, setToogleDetails] = useState(false)
  const handleToogle = () =>{
    if (!toogleDetails){
      setToogleDetails(true)
    }
    else{
      setToogleDetails(false)
    }
    
  }

  const handleOrderConfirmation = () =>{

    navigate(`/orderConfirmation/${orderId}`,{state:{product:product,rental:rentals,orders:orderDetails}})

  }
  
  // const fetchProduct = async () => {
  

  //   const productDocSnap = await getDoc(productDocRef)
  //   console.log(productDocSnap.data())
  //   setProduct(productDocSnap.data())
  // }
  
  // const fetchRequest = async () => {
  //   const requestDocSnap = await 
  //   setRentals(requestDocSnap.data())
  // }
  

  useEffect(() => {

    const fetchData = async () => {
      const listingsRef = collection(db, 'listings')
      const requestRef = collection(db, 'rentalRequest')
      const productDocRef = doc(listingsRef, order.productId)
      const requestDocRef = doc(requestRef, order.requestId)

      const [requestDocSnap, productDocSnap] = await Promise.all([
        getDoc(requestDocRef),
        getDoc(productDocRef)
      ])
  
    
      setProduct(productDocSnap.data())
      setRentals(requestDocSnap.data())
      SetOrderDetails(order)
      setLoading(false)
    }
  
    setLoading(true)
    fetchData()
   

  }, [])
  console.log('rentals',rentals, product,orde)

if(Loading){
  return (
    <div className='flex justify-center items-center'>...Loading</div>
  )
}

  const Reqid = orderId
  const str = JSON.stringify(Reqid)
  const uniqueRequestId = str.slice(-5,-1);
  const options = { dateStyle: 'long' };
  const date = new Date(order.timestamp?.seconds * 1000).toLocaleString('en-US', options);
  const starDate =  new Date(rentals.startDate?.seconds * 1000).toLocaleString('en-US', options);
  const endDate =  new Date(rentals.endDate?.seconds * 1000).toLocaleString('en-US', options);
  return (
    <div>
        <div className='flex flex-col '>
      <div className='w-full rounded-lg shadow-md lg:max-w-sm bg-white md:p-3'>
        <div className='flex justify-between'>
        <img
                className="object-contain w-16 md:w-[100px] ml-1"
                src={product && product.imgUrls[0]}
                alt= {`${product?.title}`}    
            />
          <div>
            <p className='text-[15px] font-medium md:text-lg uppercase p-2'><span className='font-bold'>Order:</span> #{uniqueRequestId}</p>
            <p className='text-[15px] md:text-sm p-2'>{date}</p>
          </div>
          <div className='flex flex-col items-end justify-center'>
          
          
            
            <button onClick={handleOrderConfirmation} className='p-2 text-[15px] md:text-sm truncate text-blue-700'>Your order</button>
          
          </div>
        </div>
      </div>
      

</div>
      </div>

  )
}

export default Orders
