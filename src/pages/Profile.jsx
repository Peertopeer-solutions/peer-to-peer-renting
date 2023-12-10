
import {  Outlet } from 'react-router-dom'


import ProfileLayout from '../components/Layout/ProfileLayout/ProfileLayout'

function Profile() {
  return (
    <>

      <ProfileLayout>
        <Outlet/>
      </ProfileLayout>
    
      

    </>

  )
}

export default Profile