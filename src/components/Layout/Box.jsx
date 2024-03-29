import React from 'react';

function Box({ children, className, ...props }) {
	return (
		<div {...props} className=''>
			{children}
		</div>
	);
}

export default Box;
