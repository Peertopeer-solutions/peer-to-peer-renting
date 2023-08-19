import React from 'react';

const DeleteCrossIcon = (props) => {
	return (
		<div className={props.className ?? ''}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				className='h-4 w-4'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					d='M6 18L18 6M6 6l12 12'
				></path>
			</svg>
		</div>
	);
};

export default DeleteCrossIcon;
