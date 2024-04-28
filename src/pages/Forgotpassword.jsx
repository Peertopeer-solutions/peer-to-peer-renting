import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import ArrowRightIcon from '../../public/assets/svg/keyboardArrowRightIcon.svg?react';
import { useForm } from 'react-hook-form';
import { TextInput } from '@src/components/Form/Input';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { routes } from '@src/components/Routing/Routes';

const Forgotpassword = () => {
	const schema = Joi.object({
		email: Joi.string().email({ tlds: { allow: false } })
	});
	const {
    register,
    setError,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: joiResolver(schema) });

	const onSubmit = async (data) => {
		const {email} = data
		console.log(email)
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('Could not send reset email');
		}
	};
	return (
		<div className='w-full'>
			<div className='mb-8 gap-2 flex flex-col '>
				<h1 className='text-3xl'>Forgot password</h1>
				<h4 className='text-gray-500 text-sm'>Get a password reset link.</h4>
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
				<div className=' flex flex-col gap-4'>
					<button
						className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
						disabled={isSubmitting}
					>
						<span className=' text-white flex-grow'>
							{isSubmitting ? 'Loading...' : 'Get reset link'}
						</span>
						{/* <IoIosArrowForward className='text-sm ' /> */}
					</button>
					
				</div>
			</form>
		</div>
			
		
	);
};

export default Forgotpassword;
