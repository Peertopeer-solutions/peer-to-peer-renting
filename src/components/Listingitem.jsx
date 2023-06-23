import { Link } from 'react-router-dom'

import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import { ReactComponent as LockIcon } from '../assets/svg/lockIcon.svg'
import { ReactComponent as CheckIcon } from '../assets/svg/checkIcon.svg'
import Switch from 'react-switch'

import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function ListingItem({ listing, id, onEdit, onDelete, onList, keyId, orders }) {
  const [formData, setFormData] = useState({ ...listing })
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
  useEffect(() => {

  })
  console.log(listing)
  return (
      <div className='w-full ' key={keyId} >
    <Link className=" w-full" to={`/category/${listing.category}/${id}`}>

        <div className=" bg-white drop-shadow-md rounded-lg">

          <div className="absolute right-0 md:top-2 p-3 flex flex-col space-y-3">
            {!onDelete && <Link to="/whishlist" href="#" title="Add to Favorites"
              className="md:text-[50px] text-lg text-gray-300 hover:text-red-500 duration-300">&hearts;</Link>}
          </div>


          <img className=" w-[100%] h-24 md:h-34 object-scale-down rounded-tl-lg rounded-tr-lg"
            src={listing.imgUrls[0]}
            alt={listing.title}
          />
          <div className="px-5 md:px-7 py-0 md:py-5">
            <p className="text-[20px] font-semibold md:text-2xl mb-2 truncate">{listing.title}</p>

            <div className="mt-6">
              <p className='text-[15px] md:text-sm font-medium text-gray-600'>rent</p>
              <span className="text-[20px]  text-blue-500 md:text-sm font-semibold">
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
            <div className="flex justify-between items-start py-3">

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

    </Link>

      </div>

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