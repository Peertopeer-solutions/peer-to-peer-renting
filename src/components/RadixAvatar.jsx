import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

function getAvatarSizeClass(size) {
	switch (size) {
		case 'medium':
			return 'h-12 w-12';
		case 'large':
			return 'h-16 w-16';
		default:
		case 'small':
			return 'h-9 w-9';
	}
}

function RadixAvatar({ imageUrl, name, size }) {
	const sizeClass = getAvatarSizeClass(size);
	const fallbackText = name?.at(0).toUpperCase();
	return (
		<Avatar.Root className={`rounded-full ${sizeClass}`}>
			<Avatar.Image
				src={imageUrl}
				alt={name}
				className='rounded-[inherit] h-[inherit] w-[inherit] object-cover'
			/>
			<Avatar.Fallback
				delayMs={600}
				className='flex items-center h-[inherit] w-[inherit] justify-center bg-orange-600 rounded-[inherit] font-bold text-white text-lg'
			>
				{fallbackText}
			</Avatar.Fallback>
		</Avatar.Root>
	);
}

export default RadixAvatar;
