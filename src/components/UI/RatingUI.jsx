import React from 'react';
import { ReactComponent as StarSolid } from '../../../public/assets/svg/star.svg';
import { ReactComponent as StarOutlined } from '../../../public/assets/svg/starOutlined.svg';

const RatingUI = ({ rating }) => {
	const solidStars = rating;
	const outlinedStars = 5 - rating;

	const renderStars = (count, isSolid) => {
		const starType = isSolid ? (
			<StarSolid className='w-3 md:w-4 aspect-square text-yellow-500' />
		) : (
			<StarOutlined className='w-3 md:w-4 aspect-square text-yellow-500' />
		);
		const stars = [];

		for (let i = 0; i < count; i++) {
			stars.push(<span key={i}>{starType}</span>);
		}

		return stars;
	};
	return (
		<div>
			{rating > 0 && (
				<div className='flex items-center'>
					{renderStars(solidStars, true)}
					{renderStars(outlinedStars, false)}
					{/* <span className='text-sm text-gray-600'>(80)</span> */}
				</div>
			)}
		</div>
	);
};

export default RatingUI;
