import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase.config'
import arrowRight from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

const ProfilePage = () => {
  
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


<main class="">
  <section class="">
   <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[146px] md:h-[250px] flex justify-end p-2'>
    <p>edit</p>
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
            {/* <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div class="py-6 px-3 mt-32 sm:mt-0">
                <button class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                  Connect
                </button>
              </div>
            </div> */}
            {/* <div class="w-full lg:w-4/12 px-4 lg:order-1">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span class="text-sm text-blueGray-400">Friends</span>
                </div>
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span class="text-sm text-blueGray-400">Photos</span>
                </div>
                <div class="lg:mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span class="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div> */}
          </div>
          <div class="text-center mt-[4rem] md:mt-36 ">
          <form className='space-y-6'>  
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'bg-white text-[16px] text-center md:text-4xl font-semibold leading-normal text-blueGray-700  w-full' : 'p-2 ring-1 ring-black  rounded w-full'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            {/* { <input
              type='email'
              id='email'
              className={!changeDetails ? 'bg-white text-lg  text-center md:text-xl  leading-normal text-blueGray-700  w-full' : 'p-2 ring-1 ring-black rounded w-full'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />} */}
          </form>
          <button
            className='bg-blue-700 p-2 text-white rounded-full  px-6 my-3'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'Edit'}
          </button>
            {/* <h3 class="text-2xl  md:text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
              <i class=" mr-2 text-lg text-blueGray-400"></i>
              devesh.lakwal911@gmail.com
            </div> */}
            {/* <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
            </div>
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
            </div> */}
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
          {/* <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </p>
                <a href="#pablo" class="font-normal text-pink-500">Show more</a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    
  </section>
  
</main>
    </>
    
  )
}

export default ProfilePage
