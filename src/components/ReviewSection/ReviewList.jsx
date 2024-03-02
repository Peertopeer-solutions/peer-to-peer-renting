import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { ReactComponent as StarSolid } from '../../../public/assets/svg/star.svg';
import RatingUI, { RatingInput } from '../UI/RatingUI';
import Modal from '../UI/Modal';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const reviewData = [46, 23, 13, 6, 12];

const RatingOverview = () => {
	const [writeReview, setWriteReview] = useState(false);
	return (
		<div className='grid grid-cols-3 mt-12'>
			<div className='flex justify-center'>
				<div className='flex flex-col'>
					<span className='font-bold mb-2'>Total Reviews</span>
					<span className='text-3xl font-bold'>10.0k</span>
				</div>
			</div>
			<div className='flex justify-center border-x-2'>
				<div className='flex flex-col'>
					<span className='font-bold mb-2'>Average Rating</span>
					<div className='flex items-center gap-2'>
						<span className='text-3xl font-bold'>4.0</span>
						<RatingUI rating={4} />
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				<ul className='w-3/4 flex flex-col-reverse'>
					{reviewData.map((rating, index) => (
						<li className='flex items-center'>
							<span className='mr-1 text-gray-300'>★</span>
							<span className='mr-3'>{index + 1}</span>
							<div className='w-full flex items-center'>
								<div className='h-1.5 rounded w-1/2 bg-orange-300 mr-2' />
								<span className='text-xs font-bold'>2.3k</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const Review = ({ author, profileImgUrl, postedOn, stars, desc }) => {
	return (
		<div className='flex border-b-2 py-5 last:border-none'>
			<div className='flex gap-6 min-w-[24rem] items-center'>
				<div className='flex gap-6 h-fit items-center'>
					<img
						class='h-16 w-16 rounded-full'
						src='https://placehold.co/512x512'
						alt='Reviewer avatar'
					/>
					<div className='flex flex-col'>
						<span className='font-bold text-lg text-gray-900'>
							{author.name}
						</span>
						<span className='text-gray-500 text-sm'>
							Total reviews:
							<span className='text-gray-900 font-bold ml-0.5'>
								{author.totalReviews}
							</span>
						</span>
					</div>
				</div>
			</div>
			<div className='flex-grow'>
				<div className='flex gap-2 mb-2'>
					<RatingUI rating={stars} />
					<div class='text-sm text-gray-500'>{postedOn}</div>
				</div>
				<div class='text-gray-700'>{desc}</div>
			</div>
		</div>
	);
};

const reviewSchema = Joi.object({
	text: Joi.string().label('Description'),
	overallRating: Joi.number().required(),
	affordabilityRating: Joi.number().optional(),
	easeOfUseRating: Joi.number().optional(),
	rentingExperienceRating: Joi.number().optional(),
});

const ReviewForm = ({ closeModal }) => {
	const {
		register,
		setError,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: joiResolver(reviewSchema) });

	function renderRatingInput(id) {
		return (
			<RatingInput setStar={setValue.bind(null, id)} options={register(id)} />
		);
	}

	function submitForm(data, event) {
		// TODO: handle review post
		event.preventDefault();
		console.log(data);
	}
	return (
		<form className='flex-grow' onSubmit={handleSubmit(submitForm)}>
			<div className='flex flex-col'>
				<span>1. Describe your experience?</span>
				<span className='text-sm mb-1 text-gray-600'>
					Your review will be public on the product details page.
				</span>
				<textarea
					rows={4}
					className='w-full outline-none border-2 rounded-md px-3 py-1.5 text-sm resize-none mt-1	'
					placeholder='How was the product and the experience of renting it?'
					{...register('text')}
				/>
			</div>
			<div className='flex flex-col mt-2'>
				<span>2. Overall rating</span>
				{renderRatingInput('overallRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>3. Affordability rating</span>
				{renderRatingInput('affordabilityRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>4. Ease of use rating</span>
				{renderRatingInput('easeOfUseRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>5. Renting experience rating</span>
				{renderRatingInput('rentingExperienceRating')}
			</div>
			<div className='flex-grow' />
			<div className='flex gap-2 justify-end mt-10'>
				<button
					className='bg-slate-200 px-3 py-1 rounded-md'
					type='button'
					onClick={closeModal}
				>
					Cancel
				</button>
				<button className='bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-600'>
					Post
				</button>
			</div>
		</form>
	);
};

const ReviewList = ({ product }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	return (
		<>
			{createPortal(
				<Modal status={showReviewForm} className='h-3/4 p-4'>
					<div className='px-4 py-2'>
						<h1 className='font-bold text-xl'>Leave a review</h1>
						<div className='flex mt-4 h-full'>
							<div className='flex flex-col gap-2'>
								<img
									class='h-52 aspect-[4/3] object-cover rounded'
									src='https://placehold.co/1024x1024'
									alt='Reviewer avatar'
								/>
								<h2>4K UHD 50inch SMART TV</h2>
							</div>
							<div className='h-full w-6 bg-gray-400' />
							<ReviewForm closeModal={() => setShowReviewForm(false)} />
						</div>
					</div>
				</Modal>,
				document.getElementById('modal-root')
			)}
			<div>
				<div class=' rounded-lg my-6'>
					<h2 class='text-2xl font-bold text-gray-900  mb-4'>Reviews</h2>
					<RatingOverview />
					<div>
						<span>Want to share your thoughts with other customers?</span>
						<button
							className='px-3 py-1.5 text-sm bg-slate-200 hover:bg-slate-300 rounded ml-4 mt-6'
							onClick={() => setShowReviewForm(true)}
						>
							Write a product review
						</button>
					</div>
					<div className='flex flex-col mt-5'>
						<Review
							author={{ name: 'Reinold', totalReviews: 4 }}
							postedOn='26 Oct 23'
							stars={4}
							desc='Great as always, item returned as borrowed'
						/>
						<Review
							author={{ name: 'Dayo', totalReviews: 4 }}
							postedOn='26 Oct 23'
							stars={4}
							desc="The quality of these balls is kinda weird. I've ordered around 5 - 6 of these same balls over the years and the quality of every one of the balls is different. Some last long, and some did only for 2 weeks. The build of the ball is pretty strong and try avoid getting hit on the face with this thing."
						/>
						<Review
							author={{ name: 'Jack', totalReviews: 4 }}
							postedOn='26 Oct 23'
							stars={4}
						/>
					</div>
					<div class='mx-auto pt-4 text-center'>
						<button class='md:w-1/3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
							See all reviews
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewList;
