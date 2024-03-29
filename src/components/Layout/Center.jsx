import React from 'react';
import { twMerge } from 'tailwind-merge';

function Center({ children, className }) {
	return (
		<div
			className={twMerge(
				'flex items-center justify-center flex-grow',
				className
			)}
		>
			{children}
		</div>
	);
}

export default Center;
