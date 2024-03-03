import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../../firebase.config';
import { toast } from 'react-toastify';
import {
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
import RatingOverview from './RatingOverview';
import Review from './Review';
import WriteReview from './WriteReview';

function transformReview(review) {
	return {
		id: review.feedback.id,
		rating: review.feedback.overallRating,
		author: review.author,
		desc: review.feedback.text,
		postedOn: review.feedback.timestamp.toDate(),
	};
}

async function fetchReviews() {
	const feedbackRef = collection(db, 'feedback');
	const q = query(feedbackRef, orderBy('timestamp', 'desc'));
	const snapshot = await getDocs(q);
	const reviewsData = snapshot.docs.map((doc) => {
		return { feedback: { id: doc.id, ...doc.data() } };
	});
	const authorDocs = Promise.all(
		reviewsData.map((review) => {
			const { authorId } = review.feedback;
			return getDoc(doc(db, 'users', authorId));
		})
	);
	console.log(authorDocs);
	return await Promise.all(
		reviewsData.map(async (review) => {
			const authorDoc = await getDoc(
				doc(db, 'users', review.feedback.authorId)
			);
			review.author = {
				name: authorDoc.data().name,
				totalReviews: authorDoc.data().reviewsPosted ?? 0,
			};
			return transformReview(review);
		})
	);
}

const ReviewList = ({ product }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [fetchingReviews, setFetchingReviews] = useState(false);
	useEffect(() => {
		async function fetchAndSetReviews() {
			try {
				setFetchingReviews(true);
				const reviewsData = await fetchReviews();
				console.log(reviewsData);
				setFetchingReviews(false);
				setReviews(reviewsData);
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
				document.getElementById('modal-root')
			)}
			<div>
				<div className=' rounded-lg my-6'>
					<h2 className='text-2xl font-bold text-gray-900  mb-4'>Reviews</h2>
					<RatingOverview />
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
