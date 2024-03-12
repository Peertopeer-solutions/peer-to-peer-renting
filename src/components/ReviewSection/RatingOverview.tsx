import React, { FC, useEffect, useState } from 'react';
import RatingUI from '../UI/RatingUI';
import { doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { RatingDetails } from '../../types';

const reviewData = [46, 23, 13, 6, 12];

async function fetchRatingOverview(
	listingId: string
): Promise<RatingDetails | undefined> {
	try {
		const overview = await getDoc(doc(db, `ratingOverviews/${listingId}`));
		return overview.data() as RatingDetails;
	} catch (err) {
		console.error(err.message);
		console.error('Error fetching overviews for listindId: ' + listingId);
	}
}

interface RatingOverviewProps {
	listingId: string;
}

const RatingOverview: FC<RatingOverviewProps> = ({ listingId }) => {
	const [totalReviews, setTotalReviews] = useState(0);
	const [stars, setStars] = useState([0, 0, 0, 0, 0]);
	const averageReview: number = stars.reduce((prev, cur) => prev + cur, 0);
	useEffect(() => {
		fetchRatingOverview(listingId).then((data) => {
			if (!data) {
				return;
			}
			setTotalReviews(data.totalReviews);
			setStars(data.stars);
		});
	}, []);

	return (
		<div className='grid grid-cols-3 mt-12'>
			<div className='flex justify-center'>
				<div className='flex flex-col'>
					<span className='font-bold mb-2'>Total Reviews</span>
					<span className='text-3xl font-bold'>{totalReviews}</span>
				</div>
			</div>
			<div className='flex justify-center border-x-2'>
				<div className='flex flex-col'>
					<span className='font-bold mb-2'>Average Rating</span>
					<div className='flex items-center gap-2'>
						<span className='text-3xl font-bold'>
							{averageReview.toFixed(1)}
						</span>
						<RatingUI rating={Math.floor(averageReview)} />
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				<ul className='w-3/4 flex flex-col-reverse'>
					{reviewData.map((rating, index) => {
						const star = stars[index];
						return (
							<li className='flex items-center' key={`star-count-${index + 1}`}>
								<span className='mr-1 text-gray-300'>★</span>
								<span className='mr-3'>{index + 1}</span>
								<div className='w-full flex items-center'>
									<div
										className='h-1.5 rounded bg-orange-300 mr-2'
										style={{ width: `${(100 * star) / totalReviews}%` }}
									/>
									{star > 0 && (
										<span className='text-xs font-bold'>{star}</span>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default RatingOverview;
