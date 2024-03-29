import Icon from '@src/components/Design/Icon';
import { Icons } from '@src/constant/icons';
import React from 'react';

export const Button = ({ children, icon, onClick }) => {
	return (
		<button
			className='px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 h-fit flex items-center justify-center transition'
			onClick={onClick}
		>
			{icon && <Icon name={icon} className='mr-2 text-lg' />}
			<span>{children}</span>
		</button>
	);
};
