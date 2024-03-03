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

export default RatingOverview;
