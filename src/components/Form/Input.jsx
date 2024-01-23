import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

export function TextInput({ id, label, options, type }) {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-gray-500 text-sm font-bold'>
				{label}
			</label>
			<input
				id={id}
				type='text'
				{...options}
				className='py-2 px-4 border-2 rounded-lg outline-none focus:border-blue-300'
			/>
		</div>
	);
}

export function PasswordInput({ id, label, options }) {
	const [show, setShow] = useState(false);
	function toggleShowPassword() {
		setShow((show) => !show);
	}
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-gray-500 text-sm font-bold'>
				{label}
			</label>
			<div className='flex border-2 pr-2 overflow-hidden rounded-lg focus-within:border-blue-300'>
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
		</div>
	);
}
