import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'


const SideNav = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut()
    navigate("/")
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

    <div className="absolute top-12 bg-white rounded-xl flex flex-col p-6 shadow-2xl right-2">
      <div className="flex flex-col ">
        {user ? (
          <div className='flex flex-col gap-2'> <Link to='/profile'>Profile</Link>
            <Link to=''>How it works </Link>
            <Link className='text-blue-600' to="/requestedItems">Requested items</Link>
            <Link className='text-blue-600' to="/rentalRequests">Requests</Link>
            <button onClick={onLogout} className="border border-black">SignOut</button>
          </div>

        ) : (!user &&
          <div className='flex flex-col gap-2'>
            <Link to=''>How it works </Link>

            <Link to="/signin" className="bg-blue-600 text-center text-white p-1 px-2 rounded-full">Sign-In</Link>

          </div>
        )}

      </div>

    </div>
  )
}

export default SideNav