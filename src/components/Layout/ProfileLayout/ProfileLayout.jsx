import React, { useState } from 'react'
import ProfileHeader from '../../ProfileComponents/ProfileHeader'
import ProfileNavigation from '../../ProfileComponents/ProfileNavigation'
import ContentWrapper from '../ContentWrapper'
import PageWrapper from '../PageWrapper'
import Hamburger from 'hamburger-react'
const ProfileLayout = ({children}) => {
  const [toogle, setToogle] = useState(false)
  return (
    <div className=''>
      {toogle && (<div className="fixed inset-0 bg-black box-content opacity-60	z-10"></div>)}

      <PageWrapper>  <div class="">
        {/* <!-- Profile Header --> */}
        <ProfileHeader/>
        
        <div class="flex mt-12 md:mt-6 ">
          <div className='flex flex-row md:hidden relative '>
            <div className='fixed z-20 top-16 '>
               <div className=''>
        <Hamburger toggled={toogle}  toggle={setToogle}/>

        </div>
          <div className='h-full'>
              {
                  toogle && <ProfileNavigation/>
                }
          </div>  
            </div>
         
          </div>
        <div className='hidden md:block'>
           <ProfileNavigation/>
            
        </div>
            <div class=" md:p-6 ">
            {children}
            </div>
        </div>
       
       
    </div>
    </PageWrapper>
    
       {/* <div>

      <div className="profile-content">
        {children}  This is where the routed content will be rendered 
      </div>
    </div> */}
    </div>
  )
}

export default ProfileLayout
