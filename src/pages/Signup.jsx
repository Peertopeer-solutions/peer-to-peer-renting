import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../../public/assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../../public/assets/svg/visibilityIcon.svg';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import { useForm } from 'react-hook-form';
import {
	IoIosArrowForward,
	IoIosEye,
	IoIosLock,
	IoIosMail,
	IoIosInformation,
	IoIosPerson,
} from 'react-icons/io';
import { PasswordInput, TextInput } from '../components/Form/Input';

const AuthTextInput = ({ id, label, options, placeholder, type }) => {
	return (
		<div className='input-container'>
			<input type={type ?? 'text'} {...options} />
			<label>{label}</label>
		</div>
	);
};

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);

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
				displayName: name,
			});

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			navigate('/');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			toast.error('Something Went Wrong');
		}
	};

	return (
		<div className='md:w-1/4 md:mx-auto'>
			<div className='mb-6 gap-1 flex flex-col '>
				<h1 className='text-3xl'>Create an account</h1>
				<h4 className='text-gray-500 text-sm'>
					Let&apos;s setup an account for you.
				</h4>
			</div>
			<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					id='full-name'
					label='Name'
					placeholder='Your full name'
					options={register('fullName')}
				/>
				<TextInput
					id='full-name'
					label='Email'
					placeholder='example@example.com'
					options={register('email')}
				/>
				<PasswordInput
					type={showPassword ? 'text' : 'password'}
					id='full-name'
					label='Password'
					placeholder='8+ characters'
					options={register('password')}
				/>
				<div className='mt-2'>
					<button
						className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
						disabled={isSubmitting}
					>
						<span className=' text-white flex-grow'>
							{isSubmitting ? 'Creating...' : 'Signup'}
						</span>
						{/* <IoIosArrowForward className='text-sm ' /> */}
					</button>

					<div className='text-sm flex gap-1 mt-4 justify-center'>
						<span className='text-gray-400'>Already have an account? </span>
						<Link
							to='/sign-in'
							className='text-blue-500 underline text-md font-bold'
						>
							Sign in
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

const SignupV2 = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;
	const navigate = useNavigate();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	console.log(formData);
	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user);
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			navigate('/');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			toast.error('Something Went Wrong');
		}
	};
	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Welcome Back!</p>
			</header>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					className='nameInput'
					placeholder='Name'
					id='name'
					value={name}
					onChange={onChange}
				/>
				<input
					type='email'
					className='emailInput'
					placeholder='Email'
					id='email'
					value={email}
					onChange={onChange}
				/>
				<div className='border passwordInputDiv border-1'>
					<input
						type={showPassword ? 'text' : 'password'}
						className='passwordInput'
						placeholder='Password'
						id='password'
						value={password}
						onChange={onChange}
					/>
					<img
						src={visibilityIcon}
						alt='show password'
						className='showPassword'
						onClick={() => setShowPassword((prevState) => !prevState)}
					/>
				</div>
				<Link to='/forgot-password' className='forgotPasswordLink'>
					Forgot Password{' '}
				</Link>
				<div className='signInBar'>
					<p className='signInText'> Sign Up</p>
					<button className='bg-black'>
						<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
					</button>
				</div>
			</form>
			<OAuth />
			<Link to='/signin' className='registerup'>
				Sign In Instead
			</Link>
		</div>
	);
};

export default Signup;
