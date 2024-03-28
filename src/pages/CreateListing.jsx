import React, { useState, useEffect, useRef, useContext } from 'react';
import { categories } from '../categoriesData';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4, validate } from 'uuid';
import Spinner from '../components/Spinner';
import AuthContext from '../FirebaseAuthContext';
import DropZone from '../components/UI/DropZone';
import DeleteCrossIcon from '../components/UI/DeleteCrossIcon';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ErrorMessage from '../components/Form/ErrorMessage';
import PageWrapper from '../components/Layout/PageWrapper';
import ContentWrapper from '../components/Layout/ContentWrapper';

const CreateListing = () => {
	// eslint-disable-next-line

	const [selectedImg, setSelectedImg] = useState([]);
	const [loading, setLoading] = useState(false);
	const authCtx = useContext(AuthContext);
	console.log('UID', authCtx?.currentUser);
	const navigate = useNavigate();
	const isMounted = useRef(true);
	useEffect(() => {
		// if (isMounted) {
		// 	const user = authCtx.currentUser;
		// 	if (user != null) {
		// 		console.log(user.uid)
		// 	} else {
		// 		navigate('/sign-in');
		// 	}
		// }

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);
	const { register, handleSubmit, setValue, control, formState } = useForm();
	const onSubmit = async (data) => {
		if (selectedImg.length > 6) {
			setLoading(false);
			toast.error('Max 6 images');
			return;
		} else if (selectedImg.length == 0) {
			setLoading(false);
			toast.error('Upload atleast 1 image');
			return;
		}

		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${authCtx?.currentUser.uid}-${
					image.name
				}-${uuidv4()}`;

				const storageRef = ref(storage, 'images/' + fileName);

				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
							default:
								break;
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgUrls = await toast
			.promise(Promise.all(selectedImg.map((image) => storeImage(image))), {
				pending: 'Images are uploading...',
				success: 'Images successfully uploaded',
				error: 'Error uploading images',
			})
			.catch((error) => {
				console.error('Error uploading images:', error);
				setLoading(false);
				return;
			});
		const formDataCopy = {
			...data,
			imgUrls,
			listingEnabled: true,
			timestamp: serverTimestamp(),
			userRef: authCtx.currentUser.uid,
		};

		formDataCopy.imgUrls = imgUrls;
		const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
		setLoading(false);
		toast.success('Listing saved');
		navigate(`/${data.category}/${docRef.id}`);
	};

	const { errors } = formState;

	const onUploadFile = (acceptedFiles) => {
		// console.log(acceptedFiles);
		if (acceptedFiles.length > 0) {
			setSelectedImg((prevState) => [...prevState, ...acceptedFiles]);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	const handleDeleteImage = (index) => {
		const updatedImages = [...selectedImg];
		updatedImages.splice(index, 1);
		setSelectedImg(updatedImages);

		// update in form data
		setFormData((prevState) => ({
			...prevState,
			images: updatedImages,
		}));
	};

	return (
		<>
			<div className=' flex items-center justify-center min-h-screen bg-no-repeat bg-cover'>
				<div className='w-full bg-white  rounded-xl'>
					<div className='text-center'>
						<h2 className='mt-3 text-3xl font-bold text-gray-900'>
							New listing
						</h2>
						<p className='mt-2 text-sm text-gray-400'>
							Make a new listing and start earning
						</p>
					</div>

					<form
						className='mt-8 space-y-3'
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<div className='grid grid-cols-1 space-y-2'>
							<div className='grid grid-cols-2 gap-2 md:grid-cols-4 place-content-center place-items-center'>
								{selectedImg?.map((image, index) => (
									<div key={index} className='relative p-3'>
										<img src={URL.createObjectURL(image)} alt='' />
										<button
											onClick={(e) => {
												handleDeleteImage(index);
											}}
											className='absolute p-1 text-white bg-red-500 rounded-full top-2 right-2'
										>
											<DeleteCrossIcon />
										</button>
									</div>
								))}
							</div>
							<label
								htmlFor='images'
								className='text-sm font-bold tracking-wide text-gray-500'
							>
								Upload media
							</label>
							<DropZone onSelectFiles={onUploadFile} />

							<p className='text-sm text-gray-300'>
								<span>File type: doc, pdf, types of images</span>
							</p>
						</div>
						<div className='grid grid-cols-1 space-y-2'>
							<label className='text-sm font-bold tracking-wide text-gray-500'>
								Title
							</label>
							<input
								className='p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								type='text'
								placeholder='Camera'
								{...register('title', {
									required: {
										value: true,
										message: 'username is needed',
									},
									maxLength: 100,
								})}
							/>
							<ErrorMessage>{errors.title?.message}</ErrorMessage>
							<label className='text-sm font-bold tracking-wide text-gray-500'>
								Description
							</label>
							<textarea
								className='p-2 text-base border border-gray-300 rounded-lg h-44 focus:outline-none focus:border-indigo-500'
								type='textarea'
								row='20'
								placeholder='Just copy paste from amazon'
								{...register('description', {
									required: {
										value: true,
										message: 'Description required',
									},
									minLength: {
										value: 20,
										message: 'Describe it better',
									},
								})}
							/>
							<ErrorMessage>{errors.description?.message}</ErrorMessage>
							<label className='text-sm font-bold tracking-wide text-gray-500'>
								Regular Price
							</label>
							<div className='flex items-center '>
								<input
									className='w-1/2 p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
									type='number'
									{...register('regularPrice', {
										min: {
											value: 200, // Replace with your minimum value
											message: 'The value must be at least 500', // Custom error message
										},
										max: {
											value: 10000, // Replace with your maximum value
											message: 'The value must not exceed 100000', // Custom error message
										},
										required: {
											value: true,
											message: 'Please input the price',
										},
									})}
								/>

								<div className='flex text-[24px]'>
									<p className='ml-3 mr-1 font-bold'>₹ /</p>
									<select name='dropdown' {...register('rentPeriod')}>
										<option value='Day'>Day</option>
										<option value='Week'>Week</option>
										<option value='Month'>Month</option>
									</select>
								</div>
							</div>
							<ErrorMessage>{errors.regularPrice?.message}</ErrorMessage>
							<label
								htmlFor='category'
								className='text-sm font-bold tracking-wide text-gray-500'
							>
								Category
							</label>

							<select
								className='p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								name='dropdown'
								{...register('category', {
									validate: (fieldvalue) => {
										return (
											fieldvalue !== '⬇️ Select a category ⬇️' ||
											'Select a category'
										);
									},
								})}
							>
								<option value='⬇️ Select a category ⬇️'>
									{' '}
									-- Select a Category --{' '}
								</option>

								{categories.map((items, index) => (
									<option className='w-36' value={items.name} key={index}>
										{' '}
										{items.name}
									</option>
								))}
							</select>
							<ErrorMessage>{errors.category?.message}</ErrorMessage>

							<label className='text-sm font-bold tracking-wide text-gray-500'>
								Pincode
							</label>
							<input
								className='w-1/2 p-2 text-base border border-gray-300 rounded-lg md:w-1/5 focus:outline-none focus:border-indigo-500'
								type='text'
								{...register('pincode', {
									required: {
										value: true,
										message: 'Pincode is required',
									},

									maxLength: {
										value: 6,
										message: 'Enter correct pincode',
									},
									minLength: {
										value: 6,
										message: 'Enter correct pincode',
									},
									pattern: {
										value: /^[1-9][0-9]{5}$/,
										message: 'Enter correct pincode',
									},
								})}
							/>
							<ErrorMessage>{errors.pincode?.message}</ErrorMessage>

							{/* <label className='text-sm font-bold tracking-wide text-gray-500'>Offer</label> */}
							{/* <div className='formButtons'>
							<button
								className={offer ? 'formButtonActive' : 'formButton'}
								type='button'
								id='offer'
								value={true}
								onClick={onMutate}
							>
								Yes
							</button>
							<button
								className={
									!offer && offer !== null ? 'formButtonActive' : 'formButton'
								}
								type='button'
								id='offer'
								value={false}
								onClick={onMutate}
							>
								No
							</button>
						</div> */}
							{/* <label className='text-sm font-bold tracking-wide text-gray-500'>
									Regular Price
								</label>
								<div className='flex items-center '>
									<input
										className='p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
										type='number'
										id='regularPrice'
										value={regularPrice}
										onChange={onMutate}
										min='50'
										max='750000000'
										required
									/>
									{type === 'rent' && (
										<div className='flex'>
											<p className='ml-3 mr-1 font-bold'>₹ /</p>
											<select
												name='dropdown'
												id='rentPeriod'
												onChange={onMutate}
												value={formData.rentPeriod}
											>
												<option value='Day'>Day</option>
												<option value='Week'>Week</option>
												<option value='Month'>Month</option>
											</select>
										</div>
									)}
								</div> */}

							{/* {offer && (
							<>
								<label className='formLabel'>Discounted Price</label>
								<input
									className='formInputSmall'
									type='number'
									id='discountedPrice'
									value={discountedPrice}
									onChange={onMutate}
									min='50'
									max='750000000'
									required={offer}
								/>

							</>
						)} */}
						</div>

						<div>
							<button
								type='submit'
								className='flex justify-center p-4 mx-auto my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600'
							>
								Create Listing
							</button>
						</div>
					</form>
				</div>
			</div>
			<DevTool control={control} />
		</>
	);
};

export default CreateListing;
