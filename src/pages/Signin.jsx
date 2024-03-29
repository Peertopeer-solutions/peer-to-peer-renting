import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import PageWrapper from '../components/Layout/PageWrapper';
import {
	IoIosArrowForward,
	IoIosEye,
	IoIosLock,
	IoIosMail,
} from 'react-icons/io';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
	FloatingLabelPasswordInput,
	FloatingLabelTextInput,
	PasswordInput,
	TextInput,
} from '@src/components/Form/Input';
import { routes } from '../components/Routing/Routes';
import { auth } from '@src/firebase.config';

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(8),
});

const Signin = () => {
	const navigate = useNavigate();
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: joiResolver(schema) });

	const onSubmit = async (data) => {
		try {
			const { email, password } = data;
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential.user) navigate(routes.home);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorMessage.includes('auth/wrong-password')) {
				setError(
					'password',
					{
						message: 'Wrong password',
					},
					{ shouldFocus: true }
				);
			} else if (errorMessage.includes('auth/user-not-found')) {
				setError(
					'email',
					{
						message: 'No user registered with this email',
					},
					{ shouldFocus: true }
				);
			}

			console.log(errorCode, errorMessage);
			toast.error('Something Went Wrong');
		}
	};

	return (
		<div className='w-full'>
			<div className='mb-8 gap-2 flex flex-col '>
				<h1 className='text-3xl'>Welcome back</h1>
				<h4 className='text-gray-500 text-sm'>Sign in to Rentivity</h4>
			</div>
			<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
				{errors.root && (
					<div className='text-red-400'>{errors.root.message}</div>
				)}
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
				<div className='flex justify-end my-1'>
					<Link
						to='/forgotpassword'
						className='text-sm text-blue-500 underline font-bold'
					>
						Forgot password?
					</Link>
				</div>
				<div className=' flex flex-col gap-4'>
					<button
						className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
						disabled={isSubmitting}
					>
						<span className=' text-white flex-grow'>
							{isSubmitting ? 'Loading...' : 'Sign in'}
						</span>
						{/* <IoIosArrowForward className='text-sm ' /> */}
					</button>
					<OAuth />
					<div className='text-sm flex gap-1 mt-4 justify-center'>
						<span className='text-gray-400'>Don&apos;t have an account? </span>
						<Link
							to={routes.signup}
							className='text-blue-500 underline text-md font-bold'
						>
							Sign up
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

const SigninV1 = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	const navigate = useNavigate();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate('/');
			}
		} catch (error) {
			toast.error('Wrong User Credentials');
		}
	};
	return (
		<PageWrapper>
			{' '}
			<div className='bg-gradient-to-l from-indigo-400 to-blue-500 md:border flex flex-col items-center justify-center max-w-fit p-9  rounded-xl  space-y-6  w-full  mx-auto md:h-[80vh] sm:text-[16px] md:text-xl '>
				<header>
					<p className='text-2xl font-bold text-white'>Welcome!</p>
				</header>
				<form onSubmit={onSubmit} className='space-y-2'>
					<div className='flex items-center w-full space-x-2'>
						<label htmlFor='email'>
							<IoIosMail className='text-sm text-white' />
						</label>
						<input
							type='email'
							className='w-full p-1 text-sm text-black bg-white opacity-50 rounded-2xl'
							placeholder='Email'
							id='email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='flex items-center w-full space-x-2'>
						<label htmlFor='password'>
							<IoIosLock className='text-sm text-white' />
						</label>
						<div className='relative flex items-center justify-between w-full h-fit'>
							<input
								type={showPassword ? 'text' : 'password'}
								className='w-full p-1 text-sm text-black bg-white opacity-50 rounded-2xl'
								placeholder='Password'
								id='password'
								value={password}
								onChange={onChange}
							/>
							<IoIosEye
								className='absolute text-sm right-2 '
								onClick={() => setShowPassword((prevState) => !prevState)}
							/>
						</div>
					</div>
					<div className='flex justify-between'>
						<div className='flex items-center '>
							<p className='text-sm font-bold text-white'> Sign In</p>
							<button className=''>
								<IoIosArrowForward className='text-sm text-white' />
							</button>
						</div>
						<Link
							to='/forgotpassword'
							className='flex justify-center my-4 text-sm text-red-500'
						>
							Forgot Password{' '}
						</Link>
					</div>
				</form>
				<OAuth className='' />
				<Link to={routes.signup} className='text-white'>
					Sign Up Instead
				</Link>
			</div>
		</PageWrapper>
	);
};

export default Signin;
