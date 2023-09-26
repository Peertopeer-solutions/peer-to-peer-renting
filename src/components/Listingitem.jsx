import { Link } from 'react-router-dom'

import { ReactComponent as DeleteIcon } from '../../public/assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../../public/assets/svg/editIcon.svg'

import Switch from 'react-switch'

import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import RatingUI from './UI/RatingUI'

function ListingItem({ listing, id, onEdit, onDelete, onList, keyId, orders }) {
  const [formData, setFormData] = useState({ ...listing })
  const [rating, setRating] = useState(4)
  const [isEnabled, setIsEnabled] = useState(listing?.listingEnabled)
  const handleClick = async () => {
    const docRef = doc(db, 'listings', id)
    if (formData.listingEnabled === true) {
      formData.listingEnabled = false
      setIsEnabled(false)
    }
    else {
      formData.listingEnabled = true
      setIsEnabled(true)
    }
    await updateDoc(docRef, formData)
    if (formData.listingEnabled === true) {
      toast.success('List is active')
    }
    else {
      toast.success('List is not active')
    }

  }


  return (
    <div className='w-full md:w-[290px]' key={keyId} >
      <Link className="relative flex flex-col justify-start w-full md:w-[290px] h-full " to={`/${listing.category}/${id}`}>
        <div className="absolute right-0 top-0 m-1xx md:m-3 max-w-fit ">
          {/* {!onDelete && <Link to="/whishlist" href="#" title="Add to Favorites"
            className=" hover:text-red-500 duration-300 text-2xl text-gray-900   ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>

          </Link>} */}
        </div>

        <img loading='lazy' className="aspect-[4/3]	w-full sm:object-fit md:object-cover rounded-xl border border-gray-100 shadow-sm "
          src={listing.imgUrls[0]}
          alt={listing.title}
        />
        <div className=" ">




          <div className=" my-3">
            <p className="text-[16px] font-medium md:text-xl overflow-hidden line-clamp-2">{listing.title}</p>

            <div className='my-2'>

              <RatingUI rating={rating} />
          </div>

          <div className="">
            <p className='text-xs md:text-sm font-medium text-gray-600'>rent</p>
            <span className="text-sm  text-blue-500 md:text-sm font-semibold">
              ₹
              {listing.offer
                ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {listing.type === 'rent' && <span>/{listing.rentPeriod}</span>}

            </span>
            {/* <p className="text-[16px] md:text-sm line-through text-gray-500 md:mt-2">{listing.regularPrice}</p>
                <p className="text-[10px] md:text-sm text-red-700">{Math.round(100-(listing.discountedPrice*100)/(listing.regularPrice))} % OFF</p> */}
          </div>
          <div className={onList ? " flex justify-between items-start py-3" : "hidden  justify-between items-start py-3"}>

            {onList && (
              <div className='flex flex-col items-start '>
                <Switch onChange={handleClick} checked={isEnabled} className='editList' height={19}
                  width={34}
                  handleDiameter={13} />
                <p className={isEnabled ? 'text-red-500 text-[15px] text-lg font-semiboldbold ' : 'text-green-500'}>{isEnabled ? 'Deactivate' : 'Activate  '}</p>
              </div>

            )}
            <div className='space-y-1'>
              {onDelete && (
                <DeleteIcon
                  className='ml-3'
                  fill='rgb(231, 76,60)'
                  onClick={() => onDelete(listing.id, listing.name)}
                />
              )}
              {onEdit && <EditIcon className=' ml-3' onClick={() => onEdit(id)} />}
            </div>




          </div>
        </div>
    </div>

      </Link >

    </div >

    // <li className='categoryListing'>
    //   <Link
    //     to={`/category/${listing.type}/${id}`}
    //     className='categoryListingLink'
    //   >
    //     <img
    //       src={listing.imgUrls[0]}
    //       alt={listing.title}
    //       className='categoryListingImg'
    //     />
    //     <div className='categoryListingDetails'>

    //       <p className='categoryListingName'>{listing.title}</p>

    //       <p className='categoryListingLocation'>{listing.location}</p>

    //       <p className='categoryListingPrice'>
    //       ₹
    //         {listing.offer
    //           ? listing.discountedPrice
    //               .toString()
    //               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //           : listing.regularPrice
    //               .toString()
    //               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //         {listing.type === 'rent' && <p>/{listing.rentPeriod}</p> }
    //       </p>

    //     </div>
    //   </Link>

    //   {onDelete && (
    //     <DeleteIcon
    //       className='removeIcon'
    //       fill='rgb(231, 76,60)'
    //       onClick={() => onDelete(listing.id, listing.name)}
    //     />
    //   )}

    //   {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}

    //   {onList && (
    //     <Switch onChange={handleClick} checked={isEnabled} className='editList' height={19}
    //     width={34}
    //     handleDiameter={13}/>
    //   )}


    // </li>
  )
}

export default ListingItem