import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../../firebase.config';
import { toast } from 'react-toastify';
import {
	DocumentData,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import Review from './Review';
import WriteReview from './WriteReview';
import RatingOverview from './RatingOverview';
import {
	UserDocumentData,
	Feedback,
	FeedbackDocumentData,
	User,
} from '../../types';

type ReviewDetail = {
	id: string;
	rating: number;
	author: User;
	desc: string;
	postedOn: Date;
	liked: boolean;
};

function transformReview(feedback: Feedback, author: User): ReviewDetail {
	return {
		id: feedback.id,
		rating: feedback.overallRating,
		author: author,
		desc: feedback.text,
		postedOn: feedback.timestamp.toDate(),
		liked: author.likedReviews.includes(feedback.id),
	};
}

async function fetchReviews(): Promise<ReviewDetail[]> {
	const feedbackRef = collection(db, 'feedback');
	const q = query(
		feedbackRef,
		orderBy('likeCount', 'desc'),
		orderBy('timestamp', 'desc'),
		limit(3)
	);
	const snapshot = await getDocs(q);

	const feedbacks: Feedback[] = snapshot.docs.map((doc) => {
		const data = doc.data() as FeedbackDocumentData;
		return { id: doc.id, ...data };
	});

	return await Promise.all(
		feedbacks.map(async (feedback) => {
			const authorDocData = (
				await getDoc(doc(db, 'users', feedback.authorId))
			).data() as UserDocumentData;
			const author: User = { id: feedback.authorId, ...authorDocData };
			return transformReview(feedback, author);
		})
	);
}

async function fetchLikedReviews(userId: string): Promise<string[]> {
	return await getDoc(doc(db, 'users', userId)).then(
		(user) => (user.data() as UserDocumentData).likedReviews
	);
}

interface ReviewListProps {
	product: {
		id: string;
		title: string;
		imageUrl: string;
	};
}

const ReviewList: FC<ReviewListProps> = ({ product }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [reviews, setReviews] = useState<ReviewDetail[]>([]);
	const [fetchingReviews, setFetchingReviews] = useState(false);
	const [likedReviews, setLikedReviews] = useState<string[]>([]);
	useEffect(() => {
		async function fetchAndSetReviews() {
			try {
				setFetchingReviews(true);
				const reviewsData = await fetchReviews();
				console.log(reviewsData);
				setFetchingReviews(false);
				setReviews(reviewsData);

				if (auth.currentUser) {
					const likedReviews = await fetchLikedReviews(auth.currentUser.uid);
					setLikedReviews(likedReviews);
				}
			} catch (err) {
				console.error(err.message);
				toast.info('Something went wrong fetching reviews!');
			} finally {
				setFetchingReviews(false);
			}
		}
		fetchAndSetReviews().catch((err) => console.error(err.message));
	}, [fetchReviews]);

	return (
		<>
			{createPortal(
				<WriteReview
					showReviewForm={showReviewForm}
					product={product}
					closeModal={() => setShowReviewForm(false)}
				/>,
				document.getElementById('modal-root')!
			)}
			<div>
				<div className=' rounded-lg my-6'>
					<h2 className='text-2xl font-bold text-gray-900  mb-4'>Reviews</h2>
					<RatingOverview listingId={product.id} />
					<div>
						<span>Want to share your thoughts with other customers?</span>
						<button
							className='px-3 py-1.5 text-sm bg-slate-200 hover:bg-slate-300 rounded ml-4 mt-6'
							onClick={() => {
								if (!auth.currentUser) {
									toast.info('You must be logged in to leave a review.');
									return;
								}
								setShowReviewForm(true);
							}}
						>
							Write a product review
						</button>
					</div>
					<div className='flex flex-col mt-5'>
						{...reviews.map((review) => (
							<Review
								profileImgUrl='https://placehold.co/512x512'
								isLiked={likedReviews?.includes(review.id) ?? false}
								key={review.id}
								id={review.id}
								author={review.author}
								postedOn={review.postedOn}
								stars={review.rating}
								desc={review.desc}
							/>
						))}
						{/* <Review
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
						/> */}
					</div>
					<div className='mx-auto pt-4 text-center'>
						<button className='md:w-1/3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
							See all reviews
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewList;
