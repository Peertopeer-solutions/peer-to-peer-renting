import Alert from '@src/components/Design/Alert';
import { SIDE_PANELS } from '@src/constant/sidesheet';
import React, { useEffect, useState } from 'react';

// Hack for dynamic import(), @src is same  ../ for this file so doing some
// conversion to allow dynamic imports with vite
// Example: @src/file.jsx -> ../file.jsx
export default function getAsyncElement(component) {
	const componentPath = SIDE_PANELS[component] || SIDE_PANELS.notFound;
	const relativePath = componentPath.substring(5);

	return React.lazy(() => import(`../${relativePath}`));
}
