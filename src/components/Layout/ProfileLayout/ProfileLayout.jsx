import React, { useEffect, useState } from 'react'
import ProfileHeader from '../../ProfileComponents/ProfileHeader'
import ProfileNavigation from '../../ProfileComponents/ProfileNavigation'
import PageWrapper from '../PageWrapper'
import Hamburger from 'hamburger-react'
import { useLocation } from 'react-router-dom'
import { IoIosMenu } from 'react-icons/io'
const ProfileLayout = ({ children }) => {
  const [toogle, setToogle] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setToogle(false);

  }, [location.pathname]);

  return (
    <>
      {toogle && (<div className="fixed bottom inset-0 bg-black box-content opacity-60 z-10"></div>)}
      
        <ProfileHeader />
        <div className='flex flex-row md:hidden relative '>
          <div className=' z-10 '>
          {!toogle && <IoIosMenu className='my-3' onClick={()=>setToogle(true)}/>}

            <div className=' fixed  left-1/2 top-[50%] transform -translate-x-1/2  w-full '>
              {
                toogle && <ProfileNavigation toogle={toogle} setToogle={setToogle}/>
              }
            </div>
           
          </div>

        </div>

        <div className="flex mt-6 md:mt-6">

          <div className='hidden md:block w-1/5 '>
            <ProfileNavigation />

          </div>
          <div className=" md:p-6 md:w-3/4">
            {children}
          </div>
        </div>


    </>

  )
}

export default ProfileLayout
