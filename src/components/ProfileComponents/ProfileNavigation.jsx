import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileNavigation = () => {
  const activeNavLink = "text-blue-700 border-l-2 border-blue-700"
  const nonActiveNavLink = 'text-black'
  return (  
    <div>
       <div class=" bg-gray-50 p-6 border-r rounded-lg">
                <h2 class="font-bold text-lg mb-4">ACTIVITY</h2>
                <ul>
                  <nav className='flex flex-col'>
                  <NavLink className={({ isActive }) => `p-1 ${isActive ? activeNavLink : nonActiveNavLink}`}  to='listings'>Listings</NavLink>
                  <NavLink className={({ isActive }) => `p-1 ${isActive ? activeNavLink : nonActiveNavLink}`}   to='requestedItems'>Rental requests</NavLink>
                  <NavLink className={({ isActive }) => `p-1 ${isActive ? activeNavLink : nonActiveNavLink}`}  to='rentalRequests'>Requests</NavLink>
                  </nav>
                    
                  
                </ul>
            </div>
    </div>
  )
}

export default ProfileNavigation
