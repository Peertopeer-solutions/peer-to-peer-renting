import { React, useContext, useEffect, useMemo, useState } from 'react';
import { db, auth } from '../firebase.config';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

import DatePicker from './DatePicker';

import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import DatePickerStyled from './UI/DatePickerStyled';
import DeleteCrossIcon from './UI/DeleteCrossIcon';
import AuthContext from '../FirebaseAuthContext';
import { mergeBookedDates } from '@src/helpers/bookingDates';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import Row from '@src/components/Layout/Row';
import Column from '@src/components/Layout/Column';

const Request = ({ listing, listingId, onClose, listingPrice }) => {
  const authCtx = useContext(AuthContext);

  // set details which a user would love to see before accepting requests

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [TotalBill, SetTotalBill] = useState(false);
  const [rentalPeriod, setRentalperiod] = useState(null);

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rentalRequests', listingId],
    queryFn: async (ctx) => {
      try {
        const ref = collection(db, 'rentalRequest');
        const id = ctx.queryKey[1];
        const q = query(ref);
        //where('productId', '==', id), where('status', '==', 'accepted'), orderBy('startDate', 'asc')
        const snapshot = await getDocs(q);
        console.log('snapshot', snapshot);
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const bookedDates = useMemo(() => {
    return mergeBookedDates(requests);
  }, [requests]);

  const navigate = useNavigate();
  useEffect(() => {
    setDatecheck(false);
    if (startDate && endDate !== null) {
      let diff = new moment.duration(endDate.getTime() - startDate.getTime());

      setRentalperiod(Math.round(diff.asDays()));
    }
  }, [endDate]);

  const [dateCheck, setDatecheck] = useState(false);

  const ClearDate = () => {
    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Create a new rental request document in Firestore
  const createRentalRequest = async () => {
    const user = authCtx.currentUser;
    const userId = user ? user.uid : null;

    if (endDate === null) {
      setDatecheck(true);
    } else {
      setDatecheck(false);

      if (userId) {
        // // Create a new rental request document in Firestore
        await addDoc(collection(db, 'rentalRequest'), {
          userId: userId,
          OwnerId: listing.userRef,
          startDate: startDate,
          endDate: endDate,
          productId: listingId,
          rentalPeriod: rentalPeriod,
          status: 'pending',
          timestamp: serverTimestamp(),
        });
        navigate('/profile/requestedItems');
        console.log('collection created');
      }

      // Close the rental request form
    }
  };

  const checkIfDateSelected = () => {
    if (startDate && endDate) {
      return SetTotalBill(true);
    }
    setDatecheck(true);
  };

  // Define options for formatting the date
  const options = {
    month: 'short',
    day: 'numeric',
  };

  // Format the date as a localized string

  const RentalStartDate = new Date(startDate).toLocaleString('en-US', options);
  const RentalFinishDate = new Date(endDate).toLocaleString('en-US', options);
  // console.log(RentalStartDate)
  let price;

  if (rentalPeriod >= 1 && rentalPeriod <= 6) {
    price = listingPrice; // Price for 1-6 days
  } else if (rentalPeriod > 6 && rentalPeriod < 30) {
    price = Math.round((listingPrice * 4) / 7); // Price for 7-29 days
  } else {
    price = Math.round((listingPrice * 12) / 30); // Price for 30 or more days
  }

  const selectedDateRangeText =
    startDate && endDate
      ? `${format(startDate, 'MMMM d, yyyy')} - ${format(
          endDate,
          'MMMM d, yyyy'
        )}`
      : '';

  return (
    <>
      {TotalBill ? (
        <div className='fixed -bottom-2 left-0 w-full  md:translate-x-1/2 md:bottom-44 md:w-1/2  bg-white rounded-2xl z-20 '>
          <div className='p-3 m-3 '>
            <div className='flex flex-col space-y-6'>
              <div className='flex space-x-4 justify-between py-4 '>
                <div className='flex space-x-6 text-[16px] font-medium'>
                  <p className='font-light'>{rentalPeriod} Days</p>
                  <p>
                    {RentalStartDate}-{RentalFinishDate}
                  </p>
                </div>
                <button
                  className='text-blue-500 font-medium text-[16px]'
                  onClick={() => SetTotalBill(false)}
                >
                  Change Dates
                </button>
              </div>

              <div className='flex flex-col space-y-3 border-b border-t py-3'>
                <div className='flex justify-between leading-loose '>
                  <p className='font-light'>
                    ₹{listingPrice} x {rentalPeriod} Days
                  </p>
                  <p className='font-light'>₹{listingPrice * rentalPeriod}</p>
                </div>

                <div className='flex justify-between leading-loose '>
                  <p className='font-light'>Service charge</p>
                  <p className='font-light'>₹{price * rentalPeriod}</p>
                </div>
                {rentalPeriod > 7 && (
                  <div className='flex justify-between leading-loose '>
                    <p className='font-light'>Weekly discount</p>
                    <p className='font-light'>
                      ₹{listingPrice * rentalPeriod - price * rentalPeriod}
                    </p>
                  </div>
                )}
              </div>

              <div className='flex justify-between leading-loose  font-bold'>
                <p className=''>Total</p>
                <p className=''>₹{price * rentalPeriod}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-end space-x-3  space-y-2 mt-5 border-t p-3'>
            <div className='mx-auto'>
              <button
                className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3  border border-blue-700 rounded-full text-light shadow-2xl shadow-element md:flex-[10%] active:scale-95 hover:opacity-70 duration-200'
                onClick={createRentalRequest}
              >
                Book now
              </button>
            </div>
            {dateCheck && (
              <p className='text-red-500 text-sm font-normal'>
                please select tenure
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='fixed left-0 w-full  md:translate-x-1/2 md:bottom-24 md:w-1/2  bg-white rounded-2xl z-20'>
          <button
            className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 aspect-[1/1] px-1'
            onClick={onClose}
          >
            <DeleteCrossIcon />
          </button>
          <div className='flex  justify-center items-center  p-3 '>
            <DatePickerStyled
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              bookedDates={bookedDates}
            />
          </div>
          <Row className='border-t p-3 justify-between items-center'>
            {dateCheck ? (
              <span className='text-red-500 text-sm font-normal'>
                A tenure needs to be selected to proceed ahead
              </span>
            ) : (
              <span className='font-medium text-sm'>
                Selected tenure: {selectedDateRangeText}
              </span>
            )}

            <Row className='space-x-2'>
              <button
                className='text-gray-800 hover:bg-gray-100 px-4 py-2 rounded transition'
                onClick={ClearDate}
              >
                Reset
              </button>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                onClick={checkIfDateSelected}
              >
                Continue
              </button>
            </Row>
          </Row>
        </div>
      )}
    </>
  );
};

export default Request;
