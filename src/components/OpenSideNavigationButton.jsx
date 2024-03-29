import Icon from '@src/components/Design/Icon';
import Center from '@src/components/Layout/Center';
import RadixAvatar from '@src/components/RadixAvatar';
import { Icons } from '@src/constant/icons';
import useSideNavigation from '@src/hooks/useSideNavigation';
import React from 'react';

const OpenSideNavigationButton = ({ user }) => {
	const { openSideNavigation, closeSideNavigation } = useSideNavigation();

	return (
		<button onClick={openSideNavigation}>
			{user ? (
				<RadixAvatar imageUrl={user?.photoURL} name={user?.displayName} />
			) : (
				<Center className='text-xl hover:bg-blue-200 h-9 w-9 transition rounded-full'>
					<Icon
						name={Icons.HamburgerMenu}
						className='hover:bg-[inherit] transition'
					/>
				</Center>
			)}
		</button>
	);
};

export default OpenSideNavigationButton;
