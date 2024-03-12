import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
} from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import { useForm } from 'react-hook-form';
import { PasswordInput, TextInput } from '../components/Form/Input';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { routes } from '../components/Routing/Routes';
import Modal from '../components/UI/Modal';
import { MdMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import {
	Content,
	PrimaryHeading,
	SubHeading,
} from '../components/Design/Typography';
import { Button } from '../components/Design/Button';
import ErrorMessage from '../components/Form/ErrorMessage';

const schema = Joi.object({
	fullName: Joi.string().min(3).required().label('Name'),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.label('Email'),
	password: Joi.string().min(8).label('Password'),
});

const Signup = () => {
	const [emailVerficationStatus, SetEmailVerificationStatus] = useState();
	const [verificationSent, SetVerificationSent] = useState(null);
	console.log(auth.currentUser);

	async function checkVerification() {
		await auth.currentUser.reload();
		if (auth.currentUser.emailVerified) {
			SetEmailVerificationStatus(true);
			navigate(routes.emailVerification, { replace: true });
		} else {
			console.log('not verified');
			SetEmailVerificationStatus(false);
		}
	}

	const {
		register,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: joiResolver(schema) });
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		try {
			const { email, password, fullName } = data;
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user);
			updateProfile(auth.currentUser, {
				displayName: fullName,
			});

			const userData = {
				email: user.email,
				name: fullName,
				timestamp: user.metadata.creationTime ?? serverTimestamp(),
				phone: user.phoneNumber,
			};

			await setDoc(doc(db, 'users', user.uid), userData);
			sendEmailVerification(auth.currentUser)
				.then(() => {
					// Verification email sent. Show an alert or a message to the user.
					console.log(auth.currentUser);
					SetVerificationSent(true);
					alert('Verification email sent. Please check your inbox.');
				})
				.catch((error) => {
					// Handle any errors here
					console.error('Error sending verification email:', error);
					alert('Failed to send verification email. Please try again later.');
				});
			// navigate(routes.emailVerification, { replace: true });
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorMessage.includes('auth/email-already-in-use')) {
				setError(
					'email',
					{
						message: 'Email is already registered with another account.',
					},
					{ shouldFocus: true }
				);
			}

			console.log(errorCode, errorMessage);
			toast.error('Something Went Wrong');
		}
	};

	return (
		<>
			<Modal className='h-[400px]' status={verificationSent}>
				<div className='p-6 grid grid-rows-3 place-items-center'>
					<MdOutlineMarkEmailUnread className='text-blue-500 w-12 h-12 mb-3' />
					<PrimaryHeading className='text-center'>
						Verification Email sent
					</PrimaryHeading>
					<Content className='text-center'>
						We've just sent a verification email to{' '}
						<span className='font-bold	'>
							{verificationSent && auth.currentUser.email}
						</span>
						. Please click the link provided in that email to verify your
						address and get started.
					</Content>
					<Button variant={'primary'} onClick={checkVerification}>
						Email Verified
					</Button>
					{emailVerficationStatus === false && (
						<ErrorMessage>Please verify email first</ErrorMessage>
					)}
				</div>
			</Modal>
			<div className='w-full'>
				<div className='mb-6 gap-2 flex flex-col '>
					<h1 className='text-3xl'>Create an account</h1>
					<h4 className='text-gray-500 text-sm'>
						Let&apos;s setup an account for you.
					</h4>
				</div>
				<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
					{errors.root && (
						<div className='text-red-400'>{errors.root.message}</div>
					)}
					<TextInput
						id='full-name'
						label='Name'
						options={register('fullName')}
						error={errors.fullName}
					/>
					<TextInput
						id='email'
						label='Email'
						options={register('email')}
						error={errors.email}
					/>
					<PasswordInput
						id='password'
						label='Password'
						options={register('password')}
						error={errors.password}
					/>
					<div className='mt-2 flex flex-col gap-3'>
						<button
							className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
							disabled={isSubmitting}
						>
							<span className=' text-white flex-grow'>
								{isSubmitting ? 'Creating...' : 'Signup'}
							</span>
							{/* <IoIosArrowForward className='text-sm ' /> */}
						</button>
						<OAuth />
						<div className='text-sm flex gap-1 mt-2 justify-center'>
							<span className='text-gray-400'>Already have an account? </span>
							<Link
								to={routes.signin}
								className='text-blue-500 underline text-md font-bold'
							>
								Sign in
							</Link>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default Signup;
