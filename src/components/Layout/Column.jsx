import React from 'react';
import { twMerge } from 'tailwind-merge';
function Column({ className = '', children, ...props }) {
	return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export default Column;
