import { Icons } from '@src/constant/icons';
import * as allIcons from 'react-icons/rx';

const IconsMap = Object.entries(allIcons).reduce(
	(prev, [key, value]) => ({ ...prev, [key]: value }),
	{}
);

const Icon = ({ name, className = '' }) => {
	const IconType = IconsMap[name];
	return IconType ? <IconType className={className} /> : null;
};

export default Icon;
