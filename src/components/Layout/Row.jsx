import React from 'react';
import { twMerge } from 'tailwind-merge';
function Row({ className = '', children, ...props }) {
	return <div className={`flex ${className}`}>{children}</div>;
}

export default Row;
