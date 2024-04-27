import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import { LinkButton } from './Design/Button';
import { routes } from './Routing/Routes';
import RadixAvatar from './RadixAvatar';
import useSidePanel from '../data/zustand/sidePanelStore';
import SidePanel from './UI/SidePanel';
import useSideNavigation from '@src/hooks/useSideNavigation';
import OpenSideNavigationButton from '@src/components/OpenSideNavigationButton';
import Row from '@src/components/Layout/Row';
import useRequestPanel from '@src/hooks/useRequestPanel';

const Navbar = () => {
	const auth = getAuth();
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [toogleNav, setToogleNav] = useState();
	const [ProfileImage, setProfileImage] = useState(null);

	const { openSideNavigation } = useSideNavigation();
	const {openRequestPanel} = useRequestPanel();
	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
	};

	useEffect(() => {
		setToogleNav(false);
	}, [location.pathname]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setProfileImage(user?.photoURL);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleToogle = () => {
		if (toogleNav) {
			setToogleNav(false);
		} else setToogleNav(true);
	};

	const userNavButtons = (
		<>
			<LinkButton to='/create-listing'>List item</LinkButton>
			<Link></Link>
			<button onClick={openRequestPanel} >Requests</button>
		</>
	);

	const noUserNavButtons = (
		<>
			<Link
				className=' hover:text-gray-800 transition px-4 py-1 font-bold text-gray-600 '
				to='/howitworks'
			>
				How It Works
			</Link>
			<Link
				to={routes.signin}
				className='bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-1 rounded-full'
			>
				Sign In
			</Link>
		</>
	);

	return (
		<nav className=' w-[100%] mx-auto border-b-1 border-black fixed z-10 '>
			<div className='  p-2 md:p-3 bg-white  border '>
				<div className='flex items-center justify-between '>
					<Link to='/'>
						<div className=''>
							<img
								className='h-10 w-full md:h-12'
								src='https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg'
								alt='logo'
							/>
						</div>
					</Link>
					<div>
						<div className='flex space-x-3 items-center'>
							<Row className='gap-1 md:flex hidden'>
								{!user ? noUserNavButtons : userNavButtons}
							</Row>
							<OpenSideNavigationButton user={user} />
							<div
								className='flex cursor-pointer'
								onClick={openSideNavigation}
							></div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
