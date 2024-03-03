import React, { useContext, useState } from 'react';
import { auth, db } from '../../firebase.config';
// import arrowRight from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import AuthContext from '../../FirebaseAuthContext';
import { BsPen, BsShare } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md';
import { IconButton, LinkButton } from '../Design/Button';
import { TbUpload } from 'react-icons/tb';
import { RxShare2 } from 'react-icons/rx';
import { IoIosAdd, IoIosShare } from 'react-icons/io';

const ProfileHeader = () => {
	const authCtx = useContext(AuthContext);
	console.log('displayname', authCtx.currentUser?.displayName);
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: authCtx.currentUser?.displayName,
	});
	const { name } = formData;

	const onSubmit = async () => {
		try {
			if (authCtx.currentUser?.displayName !== name) {
				// Update display name in fb
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// Update in firestore
				const userRef = doc(db, 'users', auth.currentUser.uid);
				console.log(auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error('Could not update profile details');
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	console.log(formData);
	return (
		<>
			{/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>  */}

			<div className='bg-gradient-to-l from-indigo-400 to-blue-500  text-white rounded-lg p-9 flex flex-col md:flex-row md:justify-between md:h-[300px] '>
				<div className='flex flex-col space-y-3  items-center '>
					<img
						alt='Profile image'
						src={auth.currentUser?.photoURL}
						className='aspect-square w-24 rounded-full ring-4 ring-white  '
					/>
					<div className='flex flex-col '>
						<div className='relative z-0 '>
							<form className='text-center'>
								<input
									type='text'
									id='name'
									placeholder='Enter new name'
									className={
										!changeDetails
											? 'bg-transparent font-bold text-[16px] text-center  text-lg leading-normal text-blueGray-700  w-full'
											: 'bg-transparent  border-b border-sky-200 shadow-xl  text-center p-1 ring-1  rounded w-full'
									}
									disabled={!changeDetails}
									value={name}
									onChange={onChange}
								/>
							</form>
							<IconButton
								className='absolute right-9 -top-3'
								onClick={() => {
									changeDetails && onSubmit();
									setChangeDetails((prevState) => !prevState);
								}}
							>
								{changeDetails ? <MdOutlineDone className='' /> : <BsPen />}
							</IconButton>
						</div>

						<p className='text-sm text-center'>Location Placeholder</p>
					</div>
				</div>

				<div className='flex flex-row justify-center space-x-4 m-3'>
					<div>
						<LinkButton to={'/create-listing'}>
							{' '}
							<IoIosAdd />
						</LinkButton>
					</div>
					<div>
						<LinkButton to={'/create-listing'}>
							{' '}
							<IoIosShare />
						</LinkButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileHeader;
