import Hamburger from 'hamburger-react';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const ProfileNavigation = ({ toogle, setToogle }) => {
	const activeNavLink = 'text-blue-700 border-l-2 border-blue-700';
	const nonActiveNavLink = 'text-black';
	return (
		<div>
			<div className='max-w-content no-scrollbar overflow-y-scroll h-[50vh] bg-gray-50  border-r rounded-lg p-6'>
				{toogle && (
					<button
						className=' container  mt-2 '
						onClick={() => setToogle(false)}
					>
						<IoIosClose className='' />
					</button>
				)}
				<ul>
					<nav className='flex flex-col space-y-2'>
						<NavLink
							className={({ isActive }) =>
								`p-1  ${isActive ? activeNavLink : nonActiveNavLink}`
							}
							to='listings'
						>
							Listings
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								`p-1 ${isActive ? activeNavLink : nonActiveNavLink}`
							}
							to='requestedItems'
						>
							Your requests
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								`p-1 ${isActive ? activeNavLink : nonActiveNavLink}`
							}
							to='rentalRequests'
						>
							Requests
						</NavLink>
					</nav>
				</ul>
			</div>
		</div>
	);
};

export default ProfileNavigation;
