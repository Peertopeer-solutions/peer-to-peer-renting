import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../Form/UploadIcon';

const DropZone = (props) => {
	const onDrop = props.onSelectFiles;
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.png'],
		},
		maxFiles: 4,
	});

	return (
		<div
			{...getRootProps({
				className: 'flex items-center justify-center w-full',
			})}
		>
			<label
				htmlFor='images'
				className='flex flex-col rounded-lg border border-2px w-full items-center justify-center h-28  p-3 group text-center cursor-pointer'
			>
				Select or drop an image
				<UploadIcon className='mt-2' />
			</label>
			<input
				{...getInputProps()}
				// type='file'
				// id='images'
				// // onChange={onMutate}
				// max='4'
				// accept='.jpg,.png,.jpeg'
				// multiple
				// required
				// className='hidden'
			/>
		</div>
	);
};

export default DropZone;
