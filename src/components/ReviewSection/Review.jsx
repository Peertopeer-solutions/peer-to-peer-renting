import RatingUI from '../UI/RatingUI';

const Review = ({ author, profileImgUrl, postedOn, stars, desc }) => {
	console.log(' Date: ', postedOn);
	return (
		<div className='flex border-b-2 py-5 last:border-none'>
			<div className='flex gap-6 min-w-[24rem] items-center'>
				<div className='flex gap-6 h-fit items-center'>
					<img
						className='h-16 w-16 rounded-full'
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
					<div className='text-sm text-gray-500'>
						{postedOn.toLocaleDateString()}
					</div>
				</div>
				<div className='text-gray-700'>{desc}</div>
			</div>
		</div>
	);
};

export default Review;
