import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { ReactComponent as StarSolid } from '../../../public/assets/svg/star.svg';
import RatingUI from '../UI/RatingUI';

const reviewData = [46, 23, 13, 6, 12];

const RatingOverview = () => {
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

const ReviewList = () => {
	return (
		<div>
			<div class=' rounded-lg my-6'>
				<h2 class='text-2xl font-bold text-gray-900  mb-4'>Reviews</h2>
				<RatingOverview />

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
	);
};

export default ReviewList;
