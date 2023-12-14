import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'
import Switch from 'react-switch'

import { Link } from 'react-router-dom'
import { db } from '../../firebase.config'
import RatingUI from '../UI/RatingUI'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

const ListingProfileTile = ({ listing, id, onEdit, onDelete, onList, keyId, orders }) => {
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
    <div className='w-full' key={keyId} >
      <Link className=" grid grid-cols-2" to={`/${listing.category}/${id}`}>
        <div className='w-full aspect-[4/3] '>
         
          <img rel="preload" as='image' className="w-full h-full object-cover"
          src={listing.imgUrls[0] }
          alt={listing.title}
        />
         {onList && (
              <div className='flex flex-col items-start '>
                <Switch onChange={handleClick} checked={isEnabled} className='editList' height={19}
                  width={34}
                  handleDiameter={13} />
                <p className={isEnabled ? 'text-red-500 text-[15px] text-lg font-semiboldbold ' : 'text-green-500'}>{isEnabled ? 'Deactivate' : 'Activate  '}</p>
              </div>

            )}
        
        </div>
        
        <div className=" ">
          <div className=" my-3">
            <p className="text-[16px] font-medium md:text-xl overflow-hidden line-clamp-2">{listing.title}</p>

          

          <div className="">
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
            <div className='flex flex-col justify-around  items-end '>
            {onDelete && (
                <MdDeleteForever
                  className=''
                  fill='rgb(231, 76,60)'
                  onClick={() => onDelete(listing.id, listing.name)}
                />
              )}
              {onEdit && <MdEdit className=' ' onClick={() => onEdit(id)} />}
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
export default ListingProfileTile
