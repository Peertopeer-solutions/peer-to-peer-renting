import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export function FloatingLabelTextInput({ id, label, error, options }) {
	const borderColor = error ? 'focus:border-red-300' : 'focus:border-blue-500';
	return (
		<div className='relative'>
			<input
				type='text'
				id={id}
				className={
					'block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 peer outline-none ' +
					borderColor
				}
				placeholder=' '
				{...options}
			/>
			<label
				htmlFor={id}
				className={twMerge(
					`absolute text peer-focus:font-bold bg-transparent text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2`,
					error && 'peer-focus:text-red-500'
				)}
			>
				{label}
			</label>
			{error && <div className='text-red-400'>{error.message}</div>}
		</div>
	);
}

export function TextInput({ id, label, options, error }) {
	const borderColor = error ? 'focus:border-red-300' : 'focus:border-blue-300';
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-gray-500 text-sm font-bold'>
				{label}
			</label>
			<input
				id={id}
				type='text'
				{...options}
				className={'py-2 px-4 border-2 rounded-lg outline-none ' + borderColor}
			/>
			{error && <div className='text-red-400'>{error.message}</div>}
		</div>
	);
}

export function FloatingLabelPasswordInput({ id, label, error, options }) {
	const borderColor = error ? 'focus:border-red-300' : 'focus:border-blue-500';
	return (
		<div className='relative'>
			<input
				type='text'
				id={id}
				className={
					'block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 peer outline-none ' +
					borderColor
				}
				placeholder=' '
				{...options}
			/>
			<label
				htmlFor={id}
				className='absolute text peer-focus:font-bold bg-transparent text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2'
			>
				{label}
			</label>
			{error && <div className='text-red-400'>{error.message}</div>}
		</div>
	);
}

export function PasswordInput({ id, label, options, error }) {
	const borderColor = error
		? 'focus-within:border-red-300'
		: 'focus-within:border-blue-300';
	const [show, setShow] = useState(false);
	function toggleShowPassword() {
		setShow((show) => !show);
	}
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-gray-500 text-sm font-bold'>
				{label}
			</label>
			<div
				className={
					'flex border-2 pr-2 overflow-hidden rounded-lg ' + borderColor
				}
			>
				<input
					id={id}
					type={show ? 'text' : 'password'}
					{...options}
					className='py-2 pl-4 pr-2 outline-none flex-grow'
				/>
				<button
					type='button'
					className='text-gray-500 text-lg'
					onClick={toggleShowPassword}
				>
					{show ? <IoIosEyeOff /> : <IoIosEye />}
				</button>
			</div>
			{error && <div className='text-red-400'>{error.message}</div>}
		</div>
	);
}

export const MobileNumber = ({ id, label, options, error }) => {
	const borderColor = error
		? 'focus-within:border-red-300'
		: 'focus-within:border-blue-300';
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-gray-500 text-sm font-bold'>
				{label}
			</label>
			<div
				className={
					'flex border-2 pr-2 overflow-hidden rounded-lg items-center ' +
					borderColor
				}
			>
				<div className='text-gray-600 px-4'>+91</div>
				<input
					id={id}
					inputMode='tel'
					placeholder='Mobile Number'
					{...options}
					className='py-2  pr-2 outline-none flex-grow'
				/>
			</div>
			{error && <div className='text-red-400'>{error.message}</div>}
		</div>
	);
};

const OtpInput = ({ error }) => {
	const borderColor = error ? 'focus:border-red-300' : 'focus:border-blue-300';
	return (
		<input
			className={'w-12 rounded-lg border-2 p-2 outline-none ' + borderColor}
		/>
	);
};

export const OtpBox = ({ error }) => {
	const boxes = [];
	for (let i = 0; i < 4; i++) {
		boxes.push(<OtpInput error={error} key={`otp-${i}`} />);
	}
	return <div className='flex gap-4 flex-grow justify-center'>{boxes}</div>;
};
