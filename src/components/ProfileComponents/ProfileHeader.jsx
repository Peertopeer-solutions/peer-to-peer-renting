import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase.config'
// import arrowRight from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import PageWrapper from '../Layout/PageWrapper'
import ContentWrapper from '../Layout/ContentWrapper'

const ProfileHeader = () => {
  
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData  

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        console.log(auth.currentUser.uid)
        await updateDoc (userRef, {
          name, 
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  console.log(formData)
  return (
    <>
    {/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>  */}


<div class="bg-gradient-to-l from-indigo-400 to-blue-500  text-white rounded-lg p-9 flex flex-col md:flex-row md:justify-between items-center ">
            <div class="flex flex-col space-y-4 md:flex-row items-center space-x-4">
            <img alt="Profile image" src={auth.currentUser.photoURL} class="aspect-square w-24   rounded-full ring-4 ring-white  "/>
                <div className='flex flex-col text-center'>
                <form className=''>  
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'bg-transparent font-bold text-[16px] text-center text-lg leading-normal text-blueGray-700  w-full' : 'p-2 ring-1 ring-black  rounded w-full'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
          </form>

                    <p class="text-sm">Location Placeholder</p>
                </div>
            </div>
            <div class="text-center">
            <button
            className='bg-blue-700 p-2 text-white rounded-full  px-6 my-3'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'Edit'}
          </button>

            </div>
            
        </div>
  {/* <main class="">
  <section class="">
   <div className='bg-gradient-to-r rounded-2xl from-cyan-500 to-blue-500 h-[146px] md:h-[400px] flex justify-between p-2 md:px-36 md:py-6'>
   
   <Link to="/create-listing"><p>List</p></Link>
   
    <div className='flex flex-col h-full'>
      <p className=''>Share</p>
      <p className='mt-auto'>Share</p>
    </div>
    
  
   </div>
  </section>
  <section class="relative -top-16 md:-top-24 pt-16 md:pt-24  ">
    <div class="  w-full ">
      <div class="relative flex break-words max-auto w-full  rounded-lg ">
        <div class="sm:px-6  mx-auto ">
          <div class="flex flex-wrap justify-center">
            <div class="w-full  px-4  flex justify-center">
              <div class="mx-auto absolute -top-12 md:-top-16">
                <img alt="Profile image" src={auth.currentUser.photoURL} class="aspect-square w-24 md:w-44  rounded-full ring-4 ring-white  "/>
              </div>
            </div>

          </div>
          <div class="text-center mt-[4rem] md:mt-36 ">
          
          
          </div>
          
          <div className=' p-3 mx-auto flex flex-col jsutify-start space-y-3  rounded-sm '>
          
          <Link to='/create-listing' className='text-sm md:text-lg mx-auto border-black  flex w-max hover:-translate-y-2 hover:border-b-2 '>
          
          <p>rent your products</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
       
       
        </div>
          <div className=' p-3 mx-auto flex flex-col jsutify-start space-y-3  md:w-max rounded-sm  '>
          
          <button className='text-sm md:text-lg mx-auto  border-black flex hover:-translate-y-2 hover:border-b-2  '>
          
          <p>Share your rental store</p>
          <img src={arrowRight} alt='arrow right' />
        </button>
       
       
        </div>

        </div>
      </div>
    </div>
    
  </section>
  
</main> */}



    </>
    
  )
}
// function ProfilePage() {
//   return (
//     <ProfileLayout>
//       <Routes>
//         <Route path="reviews" element={<ProfileReviews />} />
//         <Route path="photos" element={<ProfilePhotos />} />
//         {/* ... other routes */}
//       </Routes>
//     </ProfileLayout>
//   );
// }

export default ProfileHeader
