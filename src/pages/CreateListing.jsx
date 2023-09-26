import React, { useState, useEffect, useRef, useContext } from 'react';
import { categories } from '../../public/assets/data';
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
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../components/Spinner';
import AuthContext from '../FirebaseAuthContext';
import UploadIcon from '../components/Form/UploadIcon';
import DropZone from '../components/UI/DropZone';
import DeleteCrossIcon from '../components/UI/DeleteCrossIcon';

const CreateListing = () => {
	// eslint-disable-next-line
	const [geolocationEnabled, setGeolocationEnabled] = useState(false);
	const [selectedImg, setSelectedImg] = useState([]);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		type: 'rent',
		title: '',
		description: '',
		category: '',
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		rentPeriod: 'Day',
		images: [],
		latitude: 0,
		longitude: 0,
		listingEnabled: true,
	});

	const {
		type,
		title,
		description,
		category,
		address,
		offer,
		regularPrice,
		rentPeriod,
		discountedPrice,
		images,
		latitude,
		longitude,
	} = formData;

	// Hooking up the authContext
	// No need to manually call onAuthStateChanged
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			const user = authCtx.currentUser;
			if (user) {
				setFormData({ ...formData, userRef: user.uid });
			} else {
				navigate('/sign-in');
			}
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	const onSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		// if (discountedPrice > regularPrice) {
		//   setLoading(false)
		//   toast.error('Discounted price needs to be less than regular price')
		//   return
		// }

		if (images.length > 6) {
			setLoading(false);
			toast.error('Max 6 images');
			return;
		}

		let geolocation = {};
		let location;

		if (geolocationEnabled) {
			//Todo : Google geolocation
		} else {
			geolocation.lat = parseFloat(latitude);
			geolocation.lng = parseFloat(longitude);
			location = address;
		}

		// Store image in firebase
		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${authCtx.currentUser.uid}-${image.name}-${uuidv4()}`;

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

		const imgUrls = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch(() => {
			setLoading(false);
			toast.error('Images not uploaded');
			return;
		});
		const formDataCopy = {
			...formData,
			imgUrls,
			geolocation,
			timestamp: serverTimestamp(),
		};

		formDataCopy.location = address;
		delete formDataCopy.images;
		delete formDataCopy.address;
		location && (formDataCopy.location = location);

		!formDataCopy.offer && delete formDataCopy.discountedPrice;

		formDataCopy.imgUrls = imgUrls;
		if (geolocation.lat !== 0 && geolocation.lng !== 0)
			formDataCopy.geolocation = geolocation;

		const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
		setLoading(false);
		toast.success('Listing saved');
		navigate(`/${category}/${docRef.id}`);
	};

	const onUploadFile = (acceptedFiles) => {
		// console.log(acceptedFiles);
		if (acceptedFiles.length > 0) {
			setSelectedImg((prevState) => [...prevState, ...acceptedFiles]);
			setFormData((prevState) => ({
				...prevState,
				images: [...prevState.images, ...acceptedFiles],
			}));
		}
	};

	const onMutate = (e) => {
		let boolean = null;

		if (e.target.value === 'true') {
			boolean = true;
		}
		if (e.target.value === 'false') {
			boolean = false;
		}
		// Text/Booleans/Numbers
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}));
		}
	};

	// const handleImageCrop = (image, croppedAreaPixels) => {
	//   const canvas = document.createElement('canvas');
	//   const ctx = canvas.getContext('2d');

	//   const img = new Image();
	//   img.src = URL.createObjectURL(image);

	//   img.onload = () => {
	//     const { x, y, width, height } = croppedAreaPixels;

	//     canvas.width = 800;
	//     canvas.height = 600;

	//     ctx.drawImage(img, x, y, width, height, 0, 0, 800, 600);

	//     canvas.toBlob((blob) => {
	//       const croppedImageFile = new File([blob], `cropped_${image.name}`);
	//       setCroppedImg((prevState) => [...prevState, croppedImageFile]);

	//       // Set cropped image in formdata
	//       setFormData((prevState) => ({
	//         ...prevState,
	//         croppedImages: [...prevState.croppedImages, croppedImageFile],
	//       }));
	//     }, 'image/jpeg');
	//   };
	// };

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
		<div>
			<div className='relative min-h-screen flex items-center justify-center bg-gray-50 md:py-12  lg:px-8  bg-no-repeat bg-cover '>
				<div className='absolute bg-black opacity-60 '></div>
				<div className=' w-full p-6 md:p-10 bg-white rounded-xl '>
					<div className='text-center'>
						<h2 className='mt-3 text-3xl font-bold text-gray-900'>
							New listing
						</h2>
						<p className='mt-2 text-sm text-gray-400'>
							Make a new listing and start earning
						</p>
					</div>

					<form className='mt-8 space-y-3' onSubmit={onSubmit}>
						<div className='grid grid-cols-1 space-y-2'>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-2 place-content-center place-items-center'>
								{selectedImg?.map((image, index) => (
									<div key={index} className='relative  p-3'>
										<img src={URL.createObjectURL(image)} alt='' />

										<button
											onClick={(e) => {
												handleDeleteImage(index);
											}}
											className='absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white'
										>
											<DeleteCrossIcon />
										</button>
									</div>
								))}
							</div>
							<label
								htmlFor='images'
								className='text-sm font-bold text-gray-500 tracking-wide'
							>
								Upload media
							</label>
							<DropZone onSelectFiles={onUploadFile} />

							<p className='text-sm text-gray-300'>
								<span>File type: doc, pdf, types of images</span>
							</p>
						</div>
						<div className='grid grid-cols-1 space-y-2'>
							<label className='text-sm font-bold text-gray-500 tracking-wide'>
								Title
							</label>
							<input
								className='text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								type='text'
								id='title'
								value={title}
								onChange={onMutate}
								placeholder='XYZ camera'
								required
							/>
							<label className='text-sm font-bold text-gray-500 tracking-wide'>
								Description
							</label>
							<input
								className='text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								placeholder='XYZ camera'
								type='text'
								id='description'
								value={description}
								onChange={onMutate}
								minLength='10'
								required
							/>
							<label
								htmlFor='category'
								className='text-sm font-bold text-gray-500 tracking-wide'
							>
								Category
							</label>

							<select
								className='text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								name='dropdown'
								id='category'
								onChange={onMutate}
								value={formData.category}
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
							<label className='text-sm font-bold text-gray-500 tracking-wide'>
								Address
							</label>
							<textarea
								className='text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
								type='text'
								id='address'
								value={address}
								onChange={onMutate}
								required
							/>
							{/* <label className='text-sm font-bold text-gray-500 tracking-wide'>Offer</label> */}
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
							<label className='text-sm font-bold text-gray-500 tracking-wide'>
								Regular Price
							</label>
							<div className='flex items-center '>
								<input
									className='text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
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
							</div>

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
								className='my-5 mx-auto flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300'
							>
								Create Listing
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateListing;
