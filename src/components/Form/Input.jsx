import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

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
					'flex border-2 pr-2 overflow-hidden rounded-lg items-center ' + borderColor
				}
			>
				<div	
					className='text-gray-600 px-4'
				>
					+91
				</div>
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
}


const OtpInput = ({error}) => {
	const borderColor = error ? 'focus:border-red-300' : 'focus:border-blue-300';
	return <input className={'w-12 rounded-lg border-2 p-2 outline-none ' + borderColor}/>;
}

export const OtpBox = ({error}) => {
	const boxes = [];
	for (let i = 0; i < 4; i++) {
		boxes.push(<OtpInput error={error} key={`otp-${i}`}/>)
	}
	return <div className='flex gap-4 flex-grow justify-center'>
		{boxes}
	</div>
}