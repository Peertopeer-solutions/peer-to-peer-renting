import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

const Alert = ({ text }) => {
	return (
		<div className='flex py-3 border-gray-300 border-2 rounded-lg items-center px-4 w-full xl:w-2/3 mx-auto'>
			<span className='text-3xl text-amber-300 mr-2'>
				<FaCircleExclamation />
			</span>
			<span>{text}</span>
		</div>
	);
};

export default Alert;
