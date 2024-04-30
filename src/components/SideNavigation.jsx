import Icon from '@src/components/Design/Icon';
import Box from '@src/components/Layout/Box';
import Center from '@src/components/Layout/Center';
import Column from '@src/components/Layout/Column';
import Row from '@src/components/Layout/Row';
import RadixAvatar from '@src/components/RadixAvatar';
import { routes } from '@src/components/Routing/Routes';
import { Button } from '@src/components/UI/Buttons';
import Expanded from '@src/components/UI/Expanded';
import Separator from '@src/components/UI/Separator';
import { Icons } from '@src/constant/icons';
import { auth } from '@src/firebase.config';
import AuthContext from '@src/FirebaseAuthContext';
import useAuthStatus from '@src/hooks/useAuthStatus';
import useSideNavigation from '@src/hooks/useSideNavigation';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const navigations = [
	{
		id: 'profile-nav',
		text: 'Your account',
		icon: Icons.LockClosed,
		navigateTo: routes.profile,
	},
	{
		id: 'rental-request-nav',
		text: 'Rental requests',
		icon: Icons.IdCard,
		navigateTo: routes.listings,
	},
	{
		id: 'requested-item-nav',
		text: 'Requested items',
		icon: Icons.Backpack,
		navigateTo: routes.requestedItems,
	},
	{
		id: 'how-it-works-nav',
		text: 'How it works?',
		icon: Icons.FileText,
		navigateTo: routes.profile,
	},
];

function NavigationButtonIcon({ icon, hover }) {
	return (
		<span
			className={`${
				hover ? 'bg-blue-500' : 'bg-gray-400'
			} text-white mr-3 h-8 w-8 flex items-center justify-center rounded-full transition`}
		>
			<Icon name={icon} className='text-lg' />
		</span>
	);
}

function NavigationButton({ leadingIcon, text, navigateTo, onClick }) {
	const { closeSideNavigation } = useSideNavigation();
	const [hover, setHover] = useState(false);
	const onMouseEnter = () => setHover(true);
	const onMouseLeave = () => setHover(false);
	const icon = <NavigationButtonIcon icon={leadingIcon} hover={hover} />;
	function onClickHandler() {
		console.log(onClick);
		if (onClick) {
			onClick();
		}
		closeSideNavigation();
	}
	return (
		<Link
			className='flex items-center py-2 px-4 rounded-md hover:bg-gray-100 transition'
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClickHandler}
			to={navigateTo}
		>
			{leadingIcon && icon}
			<span className='text-base text-gray-900'>{text}</span>
		</Link>
	);
}

export function getDateFromTimestamp(timestamp) {
	console.log(timestamp)
	return new Date(Number.parseInt(timestamp));
}

function SideNavigation() {
	const { signOut } = useContext(AuthContext);
	const { closeSideNavigation } = useSideNavigation();
	const navigate = useNavigate();
	const { user } = useAuthStatus();
	const userAvatar = (
		<RadixAvatar
			size='medium'
			imageUrl={user?.photoURL}
			name={user?.displayName}
		/>
	);

	const userHeader = (
		<>
			{userAvatar}
			<Column className='ml-3'>
				<h1 className='font-bold text-lg text-gray-800'>{user?.displayName}</h1>
				<span className='text-sm text-gray-400'>
					Member since&nbsp;
					{getDateFromTimestamp(user?.metadata.createdAt).toLocaleDateString(
						'en-IN',
						{
							month: 'short',
							day: '2-digit',
							year: 'numeric',
						}
					)}
				</span>
			</Column>
		</>
	);

	const signinHandler = () => {
		closeSideNavigation();
		navigate(routes.signin);
	};

	const noUserHeader = (
		<Center>
			<Column className='gap-1'>
				<Button onClick={signinHandler}>Sign in</Button>
				<Link
					className='underline text-gray-500 text-sm hover:text-orange-600 transition'
					to={routes.signup}
					onClick={closeSideNavigation}
				>
					Create an account?
				</Link>
			</Column>
		</Center>
	);

	const header = (
		<Row className='px-2 py-1 items-center'>
			{user ? userHeader : noUserHeader}
		</Row>
	);

	const signOutButton = !user ? null : (
		<NavigationButton
			key='signout-nav'
			text='Sign out'
			leadingIcon={Icons.Rocket}
			// navigateTo={routes.home}
			onClick={signOut}
		/>
	);

	const navigationButtons = (
		<Column className='gap-1'>
			{navigations.map((nav) => (
				<NavigationButton
					key={nav.id}
					text={nav.text}
					leadingIcon={nav.icon}
					navigateTo={nav.navigateTo}
				/>
			))}
			{signOutButton}
		</Column>
	);

	return (
		<Box className='w-full'>
			{header}
			<Separator />
			{navigationButtons}
		</Box>
	);
}

export default SideNavigation;
