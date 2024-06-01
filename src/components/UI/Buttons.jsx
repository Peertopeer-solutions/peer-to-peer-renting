import Icon from '@src/components/Design/Icon';
import { Icons } from '@src/constant/icons';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, icon, onClick, className='' }) => {
	return (
		<button
			className= {twMerge("px-4 py-1 rounded bg-blue-500 text-white hover:text-white hover:bg-blue-600 h-fit flex items-center justify-center transition",className)}
			onClick={onClick}
		>
			{icon && <Icon name={icon} className='mr-2 text-lg' />}
			<span>{children}</span>
		</button>
	);
};
