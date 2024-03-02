import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Modal = ({ status, children, className = '' }) => {
	if (status) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.attributeStyleMap.delete('overflow');
	}
	return (
		<div>
			{status && (
				<div className='fixed inset-0  bg-black box-content opacity-60 z-20'></div>
			)}
			{status && (
				<div
					className={twMerge(
						'fixed -bottom-2 left-0 w-full md:translate-x-1/2 md:bottom-32 md:w-1/2 mx-auto bg-white rounded-2xl z-20 ',
						className
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Modal;
