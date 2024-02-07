import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

const EmailVerification = () => {
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: joiResolver(schema) });
	const navigate = useNavigate();
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
				displayName: fullName,
			});
			
			const userData = {
				email: user.email,
				name: fullName,
				timestamp: user.metadata.creationTime ?? serverTimestamp(),
				phone: user.phoneNumber,
			};

			await setDoc(doc(db, 'users', user.uid), userData);
			
			// navigate('/');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
				setError(
					'email',
					{
						message: 'Email is already registered with another account.',
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
			<div className='mb-6 gap-2 flex flex-col '>
				<h1 className='text-3xl'>Create an account</h1>
				<h4 className='text-gray-500 text-sm'>
					Let&apos;s setup an account for you.
				</h4>
			</div>
			<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
				{errors.root && (
					<div className='text-red-400'>{errors.root.message}</div>
				)}
				<TextInput
					id='full-name'
					label='Name'
					options={register('fullName')}
					error={errors.fullName}
				/>
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
				<div className='mt-2 flex flex-col gap-3'>
					<button
						className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
						disabled={isSubmitting}
					>
						<span className=' text-white flex-grow'>
							{isSubmitting ? 'Creating...' : 'Signup'}
						</span>
						{/* <IoIosArrowForward className='text-sm ' /> */}
					</button>
					<OAuth />
					<div className='text-sm flex gap-1 mt-2 justify-center'>
						<span className='text-gray-400'>Already have an account? </span>
						<Link
							to={routes.signin}
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

export default EmailVerification;