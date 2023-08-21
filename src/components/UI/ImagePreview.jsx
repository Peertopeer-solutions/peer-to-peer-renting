import React, { useState } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { Button } from './button';
import IconButton from './IconButton';

const ImagePreview = (props) => {
	const [hover, setHover] = useState(false);

	return (
		<div
			className={`rounded-lg shadow-3xl relative md:max-h-64 overflow-hidden items-center flex`}
			onMouseEnter={(e) => setHover(true)}
			onMouseLeave={(e) => setHover(false)}
		>
			<div
				className={`transition-all ease-in absolute bg-black flex h-full w-full justify-center items-center ${
					hover ? 'opacity-80' : 'opacity-0'
				}`}
			>
				<span className='space-x-10'>
					<IconButton>
						<FaPencil />
					</IconButton>
					<IconButton onClick={(e) => props.deleteHandler(props.id)}>
						<FaTrash />
					</IconButton>
				</span>
			</div>
			<img
				className='transition-all ease-in duration-200 rounded-lg h-full max-w-full'
				src={URL.createObjectURL(props.image)}
				alt=''
			/>

			{/* <button
				onClick={(e) => props.deleteHandler(props.id)}
				className='absolute -top-2 -right-2 bg-red-500 rounded-full p-2 text-white'
			>
				<DeleteCrossIcon />
			</button> */}
		</div>
	);
};

export default ImagePreview;
