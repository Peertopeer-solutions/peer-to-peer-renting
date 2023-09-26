import { React, useEffect, useState } from 'react'
import { db, auth } from '../firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import DatePicker from "../components/DatePicker";

import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import DatePickerStyled from './UI/DatePickerStyled';
import DeleteCrossIcon from './UI/DeleteCrossIcon';

const Request = ({ listing, listingId, onClose,listingPrice }) => {


  // set details which a user would love to see before accepting requests

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [TotalBill, SetTotalBill] = useState(false);
  const [rentalPeriod, setRentalperiod] = useState(null);

  console.log(startDate, endDate)

  const navigate = useNavigate();
  useEffect(() => {
    setDatecheck(false)
    if (startDate && endDate !== null) {
      let diff = new moment.duration(endDate.getTime() - startDate.getTime());

      setRentalperiod(Math.round(diff.asDays()))

    }
  }, [endDate])

  const [dateCheck, setDatecheck] = useState(false)



  const ClearDate = () => {

    if (startDate && endDate) {
      setStartDate(null)
      setEndDate(null)
    }
  }

  // Create a new rental request document in Firestore
  const createRentalRequest = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (endDate === null) {

      setDatecheck(true)

    }
    else {
      setDatecheck(false)

      if (userId) {
        // // Create a new rental request document in Firestore
        await addDoc(collection(db, "rentalRequest"), {
          userId: userId,
          OwnerId: listing.userRef,
          startDate: startDate,
          endDate: endDate,
          productId: listingId,
          rentalPeriod: rentalPeriod,
          status: 'pending',
          timestamp: serverTimestamp(),

        });
        navigate('/requestedItems')
        console.log('collection created')
      }

      // Close the rental request form
    }
  }

  const PriceCheck = () => {
    if (startDate && endDate) {
      SetTotalBill(true)

    }
  }
  console.log("start date setup", startDate)


  // Define options for formatting the date
  const options = {
    month: 'short',
    day: 'numeric'
  };

  // Format the date as a localized string

  const RentalStartDate = new Date(startDate).toLocaleString('en-US', options);;
  const RentalFinishDate = new Date(endDate).toLocaleString('en-US', options);;
  // console.log(RentalStartDate)
  let price;

  if (rentalPeriod >= 1 && rentalPeriod <= 6) {
    price = listingPrice; // Price for 1-6 days
  } else if (rentalPeriod > 6 && rentalPeriod < 30) {
    price = Math.round(listingPrice * 4 / 7); // Price for 7-29 days
  } else {
    price = Math.round(listingPrice * 12 / 30); // Price for 30 or more days
  }

  return (
    <>

      {TotalBill ?

        <div className='fixed -bottom-1 md:bottom-[40%]  left-0 right-0 m-auto md:w-2/5 bg-white rounded-lg  z-20 '>
          <button className='absolute -top-1 md:-right-1 -right-0 bg-red-500 text-white rounded-full w-6 aspect-[1/1] px-1' onClick={onClose}><DeleteCrossIcon /></button>

          <div className='p-3 m-3'>
            <div className=''>
              <div className='flex justify-between py-4 ' >
              <div className='flex space-x-4 text-[16px] font-medium'>
              <p className='font-light'>{rentalPeriod} Days</p>
                <p>{RentalStartDate}-{RentalFinishDate}</p>
              </div>
              <button className='text-blue-500 font-medium text-[16px]' onClick={() => SetTotalBill(false)}>Change Dates</button>
              </div>
              
              <div className='border-b border-t py-3'>
              <div className='flex justify-between leading-loose '>
              <p className='font-light'>₹{listingPrice} x {rentalPeriod} Days</p>
              <p className='font-light'>₹{listingPrice*rentalPeriod}</p>
              </div>
    
              <div className='flex justify-between leading-loose '>
              <p className='font-light'>Service charge</p>
              <p className='font-light'>₹{price*rentalPeriod}</p>
              </div>  
             {rentalPeriod>7 && <div className='flex justify-between leading-loose '>
              <p className='font-light'>Weekly discount</p>
              <p className='font-light'>₹{listingPrice*rentalPeriod-price*rentalPeriod}</p>
              </div>}
              </div>
             
              <div className='flex justify-between leading-loose  font-bold'>
              <p className=''>Total</p>
              <p className=''>₹{price*rentalPeriod}</p>
              </div>
            </div>



          </div>
          <div className='flex flex-col justify-center items-end space-x-3  space-y-2 mt-5 border-t p-3'>
            <div className='mx-auto'>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3  border border-blue-700 rounded-full text-light shadow-2xl shadow-element md:flex-[10%] active:scale-95 hover:opacity-70 duration-200'
                onClick={createRentalRequest}>Book now</button>

            </div>
            {dateCheck && <p className='text-red-500 text-sm font-normal'>please select tenure</p>}

          </div>

        </div>

        : <div className='fixed -bottom-1 md:bottom-[10%]  left-0 right-0 m-auto md:w-2/5 bg-white rounded-lg  z-20 '>
          <button className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 aspect-[1/1] px-1' onClick={onClose}><DeleteCrossIcon /></button>
          <div className="flex  justify-center items-center  p-3 ">

            {/* <DatePicker
            
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
  
          /> */}
            <DatePickerStyled
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
            />


          </div>
          <div className='flex flex-col justify-center items-end space-x-3  space-y-2 mt-5 border p-3'>
            <div className='space-x-2'>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3  border border-blue-700 rounded-full text-light shadow-2xl shadow-element md:flex-[10%] active:scale-95 hover:opacity-70 duration-200'
                onClick={PriceCheck}>Continue</button>
              <button className=' bg-gray-300  text-black font-medium  py-2 px-3 border  rounded-full  shadow-2xl   hover:opacity-70 duration-100' onClick={ClearDate}>Clear dates</button>

            </div>
            {dateCheck && <p className='text-red-500 text-sm font-normal'>please select tenure</p>}

          </div>



        </div>}


    </>

  )
}

export default Request;
