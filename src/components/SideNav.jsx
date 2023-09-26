import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../firebase.config'
import OAuth from './OAuth';


const SideNav = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut()
    navigate("/")
    toast.success('Signed out')
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    });

    return () => {
      unsubscribe()
    }
  }, []);


  return (

    <div className=" absolute top-12 bg-white rounded-xl flex flex-col p-6 shadow-2xl right-2 z-10">
      <div className="text-[18px]  ">
        {user ? (
          <div className='flex flex-col gap-2  '> 
            <Link className='font-semibold' to='/profile'>Profile</Link>
            <Link to='' className='font-semibold'>How it works </Link>
            <Link className='text-blue-700 font-semibold' to="/requestedItems ">Requested items</Link>
            <Link className='text-blue-700 font-semibold' to="/rentalRequests">Requests</Link>
            <Link className='font-semibold' to=''>Get Help</Link>

            <button onClick={onLogout} className=" mx-auto py-1 w-full bg-red-500 text-white rounded-full">SignOut</button>
          </div>

        ) : (!user &&
          <div className='flex flex-col gap-2 '>
            <Link className='text-blue-700 font-semibold' to=''>How it works?</Link>
            <Link className='text-blue-700 font-semibold' to=''>Get Help</Link>
            

            {/* <Link to="/signin" className="bg-blue-600 text-center  text-white p-1 px-2 rounded-full">Sign-In</Link> */}
            <div > <OAuth />
            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default SideNav