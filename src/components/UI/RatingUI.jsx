import React, { useState } from 'react';
import { ReactComponent as StarSolid } from '../../../public/assets/svg/star.svg';
import { ReactComponent as StarOutlined } from '../../../public/assets/svg/starOutlined.svg';

export const RatingInput = ({ options, setStar, getStar }) => {
	const stars = [];
	const [hoveredOver, setHoveredOver] = useState(null);
	const [rating, setRating] = useState(null);
	// console.log(`Rating is ${star} stars.`);
	for (let i = 0; i < 5; i++) {
		let star;
		if (i < rating) {
			star = <StarSolid className='w-5 aspect-square mr-0.5 text-orange-400' />;
		} else {
			star = (
				<StarOutlined className='w-5 aspect-square mr-0.5 text-gray-400' />
			);
		}
		stars.push(
			<button
				type='button'
				onClick={() => {
					setStar(i + 1);
					setRating(i + 1);
				}}
				onMouseOver={() => {
					setHoveredOver(i + 1);
				}}
				onMouseOut={() => {
					setHoveredOver(undefined);
				}}
			>
				{star}
			</button>
		);
	}
	return (
		<div className='flex mt-0.5'>
			<input {...options} className='hidden' />
			{stars}
		</div>
	);
};

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
