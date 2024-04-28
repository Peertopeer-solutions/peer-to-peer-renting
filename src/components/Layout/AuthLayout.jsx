import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '../Routing/Routes';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AuthLayout = ({ children }) => {
	return (
		<div className='flex px-4 py-2 sm:px-8 max-w-md mx-auto md:max-w-none md:px-0 h-[100vh]'>
			<div className='md:w-2/5 lg:w-1/3 md:px-4 lg:px-10 xl:px-16 w-full py-4'>
				<div className='flex justify-between'>
					<span className=' text-xl'>Rentivity</span>
					<Link
						className='flex items-center gap-2 text-blue-500'
						to={routes.home}
					>
						<span className='text-sm'>
							<FaArrowLeft />
						</span>
						<span className='font-bold translate-y-[1px]'>Go back</span>
					</Link>
				</div>
				<div className='flex mt-20'>{children}</div>
			</div>
			<div className='hidden md:block flex-grow bg-gradient-to-l from-indigo-400 to-blue-500 mx-2 rounded-lg'></div>
			<ToastContainer />

		</div>

	);
};

export default AuthLayout;
