import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import RatingUI from '../UI/RatingUI';
import { useEffect, useState } from 'react';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase.config';

const Review = ({
	id,
	author,
	profileImgUrl,
	postedOn,
	stars,
	desc,
	isLiked,
}) => {
	const [liked, setLiked] = useState(isLiked);
	if (liked !== isLiked) setLiked(isLiked);

	async function toggleLikeReview(state) {
		if (!auth.currentUser) {
			return;
		}
		setLiked(!state);
		const docRef = doc(db, 'feedback', id);
		const likeCount = await getDoc(docRef).then(
			(val) => val.data().likeCount ?? 0
		);
		try {
			await setDoc(
				docRef,
				{
					likeCount: state ? likeCount - 1 : likeCount + 1,
				},
				{ merge: true }
			);
			await setDoc(
				doc(db, 'users', auth.currentUser.uid),
				{ likedReviews: state ? arrayRemove(id) : arrayUnion(id) },
				{ merge: true }
			);
		} catch (err) {
			console.error('Error liking review!');
			setLiked(state);
		}
	}
	// console.log(' Date: ', postedOn);
	return (
		<div className='flex border-b-2 py-5 last:border-none'>
			<div className='flex gap-6 min-w-[24rem] items-center'>
				<div className='flex gap-6 h-fit items-center'>
					<img
						className='h-16 w-16 rounded-full'
						src={profileImgUrl ?? 'https://placehold.co/512x512'}
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
			<div className='flex flex-col justify-center px-4'>
				<button
					className={`m-2 ${
						liked ? 'text-orange-500' : 'text-gray-600'
					} hover:text-orange-500 text-xl`}
					onClick={toggleLikeReview.bind(null, liked)}
				>
					{liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
				</button>
			</div>
		</div>
	);
};

export default Review;
