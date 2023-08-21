import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const IconButton = ({ className, children, accentColor, ...props }) => {
	const [hover, setHover] = useState(false);
	return (
		<button
			type='button'
			className={cn(
				'transition-all text-5xl',
				`${className}`,
				hover ? `${accentColor ?? 'text-white'}` : 'text-gray-400'
			)}
			onMouseEnter={(e) => setHover(true)}
			onMouseLeave={(e) => setHover(false)}
			onClick={props.onClick}
		>
			{children}
		</button>
	);
};

export default IconButton;
